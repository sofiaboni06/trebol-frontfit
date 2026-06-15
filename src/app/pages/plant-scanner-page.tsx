import { useRef, useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Progress } from "../components/ui/progress";
import {
  Scan,
  Camera,
  AlertTriangle,
  CheckCircle,
  Leaf,
  Droplets,
  Sun,
  Bug,
  Upload,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import productService from "../../services/product.service";
import { PlantCameraScanner } from "../components/PlantCameraScanner";

interface PlantAnalysisResponse {
  planta: string;
  tipo: string;
  enfermedad: string;
  sintomas: string[];
  recomendacion: string;
  productoRelacionado?: any;
}

export function PlantScannerPage() {
  const [selectedTab, setSelectedTab] = useState("camera");
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [sku, setSku] = useState("");
  const [scanApiResult, setScanApiResult] = useState<any>(null);
  const [analysisResult, setAnalysisResult] = useState<PlantAnalysisResponse | null>(null);
  const [analysisImageUrl, setAnalysisImageUrl] = useState<string | null>(null);
  const [cameraFile, setCameraFile] = useState<File | null>(null);
  const [cameraPreviewUrl, setCameraPreviewUrl] = useState<string | null>(null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadPreviewUrl, setUploadPreviewUrl] = useState<string | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false);
  const uploadInputRef = useRef<HTMLInputElement | null>(null);

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

  const handleScanBySku = async () => {
    try {
      setIsScanning(true);
      setScanComplete(false);
      setAnalysisResult(null);
      setAnalysisImageUrl(null);
      const res = await productService.scan(sku || "");
      setScanApiResult(res);
      setIsScanning(false);
      setScanComplete(true);
    } catch (err) {
      setIsScanning(false);
      setScanApiResult({ resultado: "NO_ENCONTRADO" });
      setScanComplete(true);
    }
  };

  const handleAnalyzeImage = async (file: File, previewUrl?: string) => {
    setAnalysisError(null);
    setScanComplete(false);
    setIsLoadingAnalysis(true);
    setScanApiResult(null);
    if (previewUrl) {
      setAnalysisImageUrl(previewUrl);
    }

    try {
      const response = await productService.analyzeImage(file);
      setAnalysisResult(response);
      if (!previewUrl && cameraPreviewUrl) {
        setAnalysisImageUrl(cameraPreviewUrl);
      }
      setScanComplete(true);
    } catch (error) {
      setAnalysisError("No se pudo analizar la imagen. Inténtalo de nuevo.");
      setScanComplete(true);
    } finally {
      setIsLoadingAnalysis(false);
    }
  };

  const handleCameraPhotoCaptured = (file: File, previewUrl: string) => {
    setCameraFile(file);
    setCameraPreviewUrl(previewUrl);
    setAnalysisError(null);
    setAnalysisResult(null);
    setScanComplete(false);
  };

  const handleCameraAnalyze = async () => {
    if (!cameraFile || !cameraPreviewUrl) {
      setAnalysisError("Captura una imagen antes de analizar.");
      return;
    }
    await handleAnalyzeImage(cameraFile, cameraPreviewUrl);
  };

  const handleClearCamera = () => {
    setCameraFile(null);
    setCameraPreviewUrl(null);
    setAnalysisError(null);
    setAnalysisResult(null);
    setScanComplete(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadFile(file);
      setUploadPreviewUrl(URL.createObjectURL(file));
      setAnalysisError(null);
      setAnalysisResult(null);
      setScanComplete(false);
    }
  };

  const handleUploadSubmit = async () => {
    if (!uploadFile) {
      setAnalysisError("Selecciona una imagen antes de enviar.");
      return;
    }
    await handleAnalyzeImage(uploadFile, uploadPreviewUrl || undefined);
  };

  const handleClearUpload = () => {
    setUploadFile(null);
    setUploadPreviewUrl(null);
    setAnalysisError(null);
    setAnalysisResult(null);
    setAnalysisImageUrl(null);
    setScanComplete(false);
    if (uploadInputRef.current) {
      uploadInputRef.current.value = "";
    }
  };

  const currentResult = analysisResult || (scanApiResult?.producto ? {
    planta: scanApiResult.producto.nombre,
    tipo: scanApiResult.producto.tipoProducto || "Producto del catálogo",
    enfermedad: scanApiResult.resultado === "ENCONTRADO" ? "Producto relacionado en catálogo" : "No hay coincidencia",
    sintomas: [scanApiResult.resultado === "ENCONTRADO" ? "Producto encontrado" : "No hay producto con ese SKU"],
    recomendacion: scanApiResult.resultado === "ENCONTRADO" ? "Consulta la ficha del producto para más detalles." : "Verifica el SKU o prueba con otra imagen.",
    productoRelacionado: scanApiResult.resultado === "ENCONTRADO" ? scanApiResult.producto : "Producto no disponible en catálogo",
  } : null);

  return (
    <div className="min-h-screen bg-[#1E2B24] text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-10 w-96 h-96 bg-[#7BAE7F]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-64 h-64 bg-[#2E5E4E]/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md bg-white/10 border border-white/20 mb-6">
              <Zap className="w-5 h-5 text-[#7BAE7F]" />
              <span className="text-sm">Reconocimiento visual avanzado</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-[#7BAE7F] bg-clip-text text-transparent">
              Escáner de Plantas
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Identifica plantas, detecta enfermedades y recibe tratamientos precisos con tecnología de IA.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="backdrop-blur-xl bg-white/5 border-white/10 overflow-hidden">
              <Tabs value={selectedTab} onValueChange={(value) => setSelectedTab(value)} className="h-full">
                <div className="p-6 border-b border-white/10">
                  <TabsList className="grid w-full grid-cols-3 bg-white/5">
                    <TabsTrigger value="camera">
                      <Camera className="w-4 h-4 mr-2" />
                      Cámara
                    </TabsTrigger>
                    <TabsTrigger value="upload">
                      <Upload className="w-4 h-4 mr-2" />
                      Subir imagen
                    </TabsTrigger>
                    <TabsTrigger value="sku">
                      <Scan className="w-4 h-4 mr-2" />
                      SKU
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="camera" className="p-6">
                  <PlantCameraScanner
                    onPhotoCaptured={handleCameraPhotoCaptured}
                    onAnalyze={handleCameraAnalyze}
                    onClear={handleClearCamera}
                    disabled={isLoadingAnalysis}
                  />
                  {isLoadingAnalysis && (
                    <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-white/80">
                      Analizando imagen desde la cámara...
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="upload" className="p-6">
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                    <p className="text-sm text-white/70 mb-4">
                      Selecciona una imagen jpg, jpeg, png o webp para analizar.
                    </p>
                    <input
                      ref={uploadInputRef}
                      id="plant-image-upload"
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                      onChange={handleFileChange}
                      onClick={(event) => {
                        event.currentTarget.value = "";
                      }}
                    />
                    <label htmlFor="plant-image-upload">
                      <Button
                        type="button"
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10 rounded-full"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Subir imagen
                      </Button>
                    </label>

                    {uploadPreviewUrl && (
                      <div className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-white/5 h-[300px] w-full">
                        <img
                          src={uploadPreviewUrl}
                          alt="Vista previa de la imagen subida"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}

                    {analysisError && (
                      <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                        {analysisError}
                      </div>
                    )}

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                      <Button
                        type="button"
                        onClick={handleUploadSubmit}
                        disabled={!uploadFile || isLoadingAnalysis}
                        className="bg-[#7BAE7F] text-white rounded-full"
                      >
                        Analizar imagen
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10 rounded-full"
                        onClick={handleClearUpload}
                        disabled={!uploadFile && !uploadPreviewUrl}
                      >
                        Limpiar imagen
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="sku" className="p-6">
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                    <label className="block text-sm text-white/70 mb-2">Escaneo por SKU existente</label>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <input
                        value={sku}
                        onChange={(e) => setSku(e.target.value)}
                        placeholder="SKU-..."
                        className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white"
                      />
                      <Button onClick={handleScanBySku} className="bg-[#7BAE7F] text-white rounded-full">
                        Escanear SKU
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>

            <div className="space-y-6">
              {scanComplete && currentResult ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card className="backdrop-blur-xl bg-white/5 border-white/10 p-6">
                    <div className="flex items-start justify-between mb-6 gap-4">
                      <div className="min-w-0">
                        <h2 className="text-3xl font-bold text-white mb-2 truncate">
                          {analysisResult?.planta || currentResult.planta}
                        </h2>
                        <div className="flex flex-wrap items-center gap-3">
                          <Badge className="bg-[#7BAE7F] text-white">{currentResult.tipo}</Badge>
                          <span className="text-white/60">{analysisResult ? "Análisis de imagen" : "Escaneo por SKU"}</span>
                        </div>
                      </div>
                      <Leaf className="w-12 h-12 text-[#7BAE7F]" />
                    </div>

                    {analysisImageUrl && (
                      <div className="mb-6 overflow-hidden rounded-3xl border border-white/10">
                        <img
                          src={analysisImageUrl}
                          alt="Imagen analizada"
                          className="h-64 w-full object-cover"
                        />
                      </div>
                    )}

                    <div className="grid gap-4">
                      <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                        <h3 className="text-lg font-semibold text-white mb-2">Enfermedad</h3>
                        <p className="text-white/80">{currentResult.enfermedad}</p>
                      </div>

                      <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                        <h3 className="text-lg font-semibold text-white mb-2">Síntomas</h3>
                        <ul className="list-disc space-y-2 pl-5 text-white/80">
                          {currentResult.sintomas.map((sintoma, index) => (
                            <li key={index}>{sintoma}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                        <h3 className="text-lg font-semibold text-white mb-2">Consejo</h3>
                        <p className="text-white/80">{currentResult.recomendacion}</p>
                      </div>

                      {analysisResult?.productoRelacionado && (
                        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                          <h3 className="text-lg font-semibold text-white mb-2">Producto relacionado</h3>
                          {typeof analysisResult.productoRelacionado === "string" ? (
                            <p className="text-white/80">{analysisResult.productoRelacionado}</p>
                          ) : (
                            <div className="space-y-2 text-white/80">
                              <p className="font-semibold text-white">{analysisResult.productoRelacionado.nombre}</p>
                              <p>SKU: {analysisResult.productoRelacionado.sku}</p>
                              <p>Precio: {analysisResult.productoRelacionado.precio || "N/A"}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ) : (
                <Card className="backdrop-blur-xl bg-white/5 border-white/10 p-8 text-center">
                  <Scan className="w-16 h-16 mx-auto mb-4 text-white/40" />
                  <h3 className="text-xl font-semibold text-white mb-2">Esperando escaneo</h3>
                  <p className="text-white/60">
                    Usa la cámara o sube una imagen para recibir el análisis.
                  </p>
                </Card>
              )}

              <Card className="backdrop-blur-xl bg-white/5 border-white/10 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Capacidades del escáner</h3>
                <div className="space-y-3">
                  {[
                    "Escaneo con cámara en vivo",
                    "Subida de imagen y previsualización",
                    "Búsqueda de planta en el catálogo",
                    "Resultado con enfermedad y recomendación",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-[#7BAE7F]" />
                      <span className="text-white/80">{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
