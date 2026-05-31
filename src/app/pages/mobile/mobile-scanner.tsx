import { useState } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";
import {
  Camera,
  Upload,
  QrCode,
  Scan,
  CheckCircle,
  AlertTriangle,
  Leaf,
  Sun,
  Droplets,
} from "lucide-react";
import { motion } from "motion/react";

export function MobileScanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const handleScan = () => {
    setIsScanning(true);
    setScanComplete(false);
    setScanProgress(0);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setScanComplete(true);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const result = {
    plantName: "Monstera Deliciosa",
    confidence: 98,
    health: "Buena",
    issues: ["Humedad baja detectada"],
    recommendations: [
      "Aumentar frecuencia de riego",
      "Rociar hojas cada 2-3 días",
    ],
  };

  return (
    <div className="min-h-screen bg-[#1E2B24] text-white pb-20">
      {/* Header */}
      <div className="p-4">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold mb-2">Escáner de Plantas</h1>
          <p className="text-white/70 text-sm">
            Identifica y analiza con IA
          </p>
        </div>
      </div>

      {/* Scanner Card */}
      <div className="px-4 mb-6">
        <Card className="backdrop-blur-xl bg-white/5 border-white/10 overflow-hidden">
          <div className="relative aspect-square bg-gradient-to-br from-[#2E5E4E]/20 to-[#1E2B24]/40 flex items-center justify-center">
            {!isScanning && !scanComplete && (
              <div className="text-center p-8">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#7BAE7F] to-[#2E5E4E] flex items-center justify-center">
                  <Scan className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Listo para escanear
                </h3>
                <p className="text-white/70 text-sm mb-8">
                  Apunta a una planta para identificarla
                </p>
                <Button
                  size="lg"
                  onClick={handleScan}
                  className="bg-gradient-to-br from-[#7BAE7F] to-[#2E5E4E] text-white rounded-full w-full"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  Iniciar escaneo
                </Button>
              </div>
            )}

            {isScanning && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="text-center p-8">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-24 h-24 mx-auto mb-6 rounded-full border-4 border-[#7BAE7F] border-t-transparent"
                  />
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Analizando...
                  </h3>
                  <Progress value={scanProgress} className="w-full mb-4" />
                  <p className="text-white/70">{scanProgress}%</p>
                </div>
              </motion.div>
            )}

            {scanComplete && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 p-6 flex items-center justify-center"
              >
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#7BAE7F] to-[#2E5E4E] flex items-center justify-center"
                  >
                    <CheckCircle className="w-10 h-10 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    ¡Identificada!
                  </h3>
                  <p className="text-white/70 text-sm">
                    Desliza para ver resultados
                  </p>
                </div>
              </motion.div>
            )}

            {/* Scanner Grid */}
            {isScanning && (
              <div className="absolute inset-0 pointer-events-none">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(123, 174, 127, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(123, 174, 127, 0.1) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />
                <motion.div
                  animate={{ y: ["0%", "100%"] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#7BAE7F] to-transparent"
                />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="p-4 grid grid-cols-3 gap-2 border-t border-white/10">
            <Button
              variant="ghost"
              className="text-white hover:bg-white/10 flex flex-col gap-1 h-auto py-3"
            >
              <Camera className="w-5 h-5" />
              <span className="text-xs">Cámara</span>
            </Button>
            <Button
              variant="ghost"
              className="text-white hover:bg-white/10 flex flex-col gap-1 h-auto py-3"
            >
              <Upload className="w-5 h-5" />
              <span className="text-xs">Subir</span>
            </Button>
            <Button
              variant="ghost"
              className="text-white hover:bg-white/10 flex flex-col gap-1 h-auto py-3"
            >
              <QrCode className="w-5 h-5" />
              <span className="text-xs">QR</span>
            </Button>
          </div>
        </Card>
      </div>

      {/* Results */}
      {scanComplete && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 space-y-4"
        >
          <Card className="backdrop-blur-xl bg-white/5 border-white/10 p-4">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {result.plantName}
                </h2>
                <div className="flex items-center gap-2">
                  <Badge className="bg-[#7BAE7F] text-white">
                    {result.health}
                  </Badge>
                  <span className="text-white/60 text-sm">
                    {result.confidence}% confianza
                  </span>
                </div>
              </div>
              <Leaf className="w-10 h-10 text-[#7BAE7F]" />
            </div>

            {/* Issues */}
            {result.issues.length > 0 && (
              <Card className="backdrop-blur-md bg-yellow-500/10 border-yellow-500/30 p-3 mb-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-white mb-1 text-sm">
                      Problema detectado
                    </h4>
                    <p className="text-xs text-white/70">
                      {result.issues[0]}
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* Recommendations */}
            <div className="mb-4">
              <h4 className="font-semibold text-white mb-2 text-sm">
                Recomendaciones
              </h4>
              <ul className="space-y-1">
                {result.recommendations.map((rec, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-white/80 text-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7BAE7F] flex-shrink-0 mt-1.5" />
                    {rec}
                  </li>
                ))}
              </ul>
            </div>

            {/* Care */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl backdrop-blur-md bg-white/5 border border-white/10">
                <Sun className="w-5 h-5 text-[#7BAE7F] mb-1" />
                <p className="text-xs text-white/60">Luz</p>
                <p className="text-white font-semibold text-sm">Indirecta</p>
              </div>
              <div className="p-3 rounded-xl backdrop-blur-md bg-white/5 border border-white/10">
                <Droplets className="w-5 h-5 text-[#7BAE7F] mb-1" />
                <p className="text-xs text-white/60">Riego</p>
                <p className="text-white font-semibold text-sm">7-10 días</p>
              </div>
            </div>

            <Button
              onClick={() => {
                setScanComplete(false);
                setScanProgress(0);
              }}
              className="w-full mt-4 bg-gradient-to-br from-[#7BAE7F] to-[#2E5E4E] text-white rounded-full"
            >
              Nuevo escaneo
            </Button>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
