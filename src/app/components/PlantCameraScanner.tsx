import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Camera, CameraOff, CheckCircle, X } from "lucide-react";

interface PlantCameraScannerProps {
  onPhotoCaptured: (imageFile: File, previewUrl: string) => void;
  onAnalyze?: (imageFile: File) => void;
  onClear?: () => void;
  disabled?: boolean;
}

export function PlantCameraScanner({
  onPhotoCaptured,
  onAnalyze,
  onClear,
  disabled = false,
}: PlantCameraScannerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [captured, setCaptured] = useState(false);
  const [capturedFile, setCapturedFile] = useState<File | null>(null);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const startCamera = async () => {
    setPermissionError(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });
      setStream(mediaStream);
      setIsCameraActive(true);
    } catch (error) {
      setPermissionError(
        "No se otorgaron permisos para usar la cámara. Verifica la configuración del navegador."
      );
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setStream(null);
    setIsCameraActive(false);
  };

  const capturePhoto = async () => {
    if (!videoRef.current) {
      return;
    }

    const video = videoRef.current;
    const width = video.videoWidth || 640;
    const height = video.videoHeight || 480;

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    context.drawImage(video, 0, 0, width, height);

    canvas.toBlob((blob) => {
      if (!blob) {
        return;
      }

      const file = new File([blob], `planta-${Date.now()}.png`, {
        type: "image/png",
      });
      const url = URL.createObjectURL(file);
      setCapturedFile(file);
      setPreviewUrl(url);
      setCaptured(true);
      stopCamera();
      onPhotoCaptured(file, url);
    }, "image/png");
  };

  const handleRestart = () => {
    setCaptured(false);
    setCapturedFile(null);
    setPreviewUrl(null);
    if (onClear) {
      onClear();
    }
    startCamera();
  };

  const handleClear = () => {
    setCaptured(false);
    setPreviewUrl(null);
    if (onClear) {
      onClear();
    }
    stopCamera();
  };

  return (
    <div className="space-y-4">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-white">Escanear con cámara</h3>
            <p className="text-sm text-white/70">
              Permite capturar una foto desde la cámara y enviar la imagen al backend.
            </p>
          </div>
          {!isCameraActive && !captured && (
            <Button
              size="sm"
              onClick={startCamera}
              disabled={disabled}
              className="bg-[#7BAE7F] text-white"
            >
              <Camera className="w-4 h-4 mr-2" />
              Abrir cámara
            </Button>
          )}
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 h-[300px] w-full">
          {permissionError ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 p-4 text-center text-sm text-red-300">
              <CameraOff className="w-10 h-10" />
              <p>{permissionError}</p>
              <Button size="sm" onClick={startCamera} className="bg-[#7BAE7F] text-white">
                Reintentar permisos
              </Button>
            </div>
          ) : captured && previewUrl ? (
            <div className="relative h-full w-full">
              <img
                src={previewUrl}
                alt="Previsualización de planta"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-between gap-2 bg-black/60 p-3">
                <Button
                  size="sm"
                  onClick={() => capturedFile && onAnalyze?.(capturedFile)}
                  disabled={!capturedFile || disabled}
                  className="bg-[#7BAE7F] text-white"
                >
                  Analizar imagen
                </Button>
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleRestart} className="bg-[#7BAE7F] text-white">
                    Volver a capturar
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleClear} className="border-white/20 text-white hover:bg-white/10">
                    Limpiar imagen
                  </Button>
                </div>
              </div>
            </div>
          ) : isCameraActive ? (
            <div className="relative h-full w-full">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <Button
                  size="sm"
                  onClick={capturePhoto}
                  className="w-full bg-[#7BAE7F] text-white"
                >
                  Capturar foto
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center text-white/70">
              <p>Activa la cámara para previsualizar la planta.</p>
              <p className="text-xs text-white/50">Asegúrate de permitir permisos en el navegador.</p>
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button size="sm" variant="secondary" onClick={stopCamera} className="text-white border-white/20">
            Detener cámara
          </Button>
          {captured && (
            <>
              <Button size="sm" onClick={handleRestart} className="bg-[#7BAE7F] text-white">
                Volver a capturar
              </Button>
              <Button size="sm" variant="outline" onClick={handleClear} className="border-white/20 text-white hover:bg-white/10">
                Limpiar imagen
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
