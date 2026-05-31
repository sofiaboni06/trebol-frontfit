import { useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Progress } from "../components/ui/progress";
import {
  Scan,
  Camera,
  QrCode,
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

export function PlantScannerPage() {
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

  const scanResult = {
    plantName: "Monstera Deliciosa",
    confidence: 98,
    health: "Buena",
    status: "healthy",
    issues: [
      {
        type: "warning",
        title: "Humedad baja detectada",
        description: "Las hojas muestran signos de deshidratación leve",
        severity: "Media",
      },
    ],
    recommendations: [
      "Aumentar la frecuencia de riego a cada 5-7 días",
      "Rociar las hojas con agua cada 2-3 días",
      "Mantener alejada de corrientes de aire",
    ],
    careInfo: {
      light: "Luz indirecta brillante",
      water: "Cada 7-10 días",
      temperature: "18-24°C",
      humidity: "Media-Alta (60-80%)",
    },
  };

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
              Identifica plantas, detecta enfermedades y recibe tratamientos
              precisos con tecnología de IA
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Scanner Interface */}
            <Card className="backdrop-blur-xl bg-white/5 border-white/10 overflow-hidden">
              <Tabs defaultValue="camera" className="h-full">
                <div className="p-6 border-b border-white/10">
                  <TabsList className="grid w-full grid-cols-3 bg-white/5">
                    <TabsTrigger value="camera">
                      <Camera className="w-4 h-4 mr-2" />
                      Cámara
                    </TabsTrigger>
                    <TabsTrigger value="upload">
                      <Upload className="w-4 h-4 mr-2" />
                      Subir
                    </TabsTrigger>
                    <TabsTrigger value="qr">
                      <QrCode className="w-4 h-4 mr-2" />
                      QR
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="camera" className="p-0">
                  <div className="relative aspect-square bg-gradient-to-br from-[#2E5E4E]/20 to-[#1E2B24]/40 flex items-center justify-center">
                    {!isScanning && !scanComplete && (
                      <div className="text-center p-12">
                        <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#7BAE7F] to-[#2E5E4E] flex items-center justify-center">
                          <Scan className="w-16 h-16 text-white" />
                        </div>
                        <h3 className="text-2xl font-semibold text-white mb-4">
                          Listo para escanear
                        </h3>
                        <p className="text-white/70 mb-8">
                          Coloca la planta frente a la cámara
                        </p>
                        <Button
                          size="lg"
                          onClick={handleScan}
                          className="bg-gradient-to-br from-[#7BAE7F] to-[#2E5E4E] hover:from-[#2E5E4E] hover:to-[#1E2B24] text-white rounded-full px-8"
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
                        <div className="text-center">
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
                            className="w-32 h-32 mx-auto mb-6 rounded-full border-4 border-[#7BAE7F] border-t-transparent"
                          />
                          <h3 className="text-2xl font-semibold text-white mb-4">
                            Analizando...
                          </h3>
                          <Progress
                            value={scanProgress}
                            className="w-64 mx-auto mb-4"
                          />
                          <p className="text-white/70">{scanProgress}%</p>
                        </div>
                      </motion.div>
                    )}

                    {scanComplete && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute inset-0 p-8 flex items-center justify-center"
                      >
                        <div className="text-center">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                            className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#7BAE7F] to-[#2E5E4E] flex items-center justify-center"
                          >
                            <CheckCircle className="w-12 h-12 text-white" />
                          </motion.div>
                          <h3 className="text-2xl font-semibold text-white mb-2">
                            Análisis completo
                          </h3>
                          <p className="text-white/70 mb-6">
                            Planta identificada exitosamente
                          </p>
                          <Button
                            variant="outline"
                            onClick={() => {
                              setScanComplete(false);
                              setScanProgress(0);
                            }}
                            className="border-white/20 text-white hover:bg-white/10 rounded-full"
                          >
                            Nuevo escaneo
                          </Button>
                        </div>
                      </motion.div>
                    )}

                    {/* Scanner Grid Overlay */}
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
                </TabsContent>

                <TabsContent value="upload" className="p-12">
                  <div className="border-2 border-dashed border-white/20 rounded-xl p-12 text-center hover:border-white/40 transition-colors cursor-pointer">
                    <Upload className="w-16 h-16 mx-auto mb-4 text-white/60" />
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Subir imagen
                    </h3>
                    <p className="text-white/60 mb-4">
                      Arrastra una imagen o haz clic para seleccionar
                    </p>
                    <Button
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 rounded-full"
                    >
                      Seleccionar archivo
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="qr" className="p-12">
                  <div className="text-center">
                    <QrCode className="w-24 h-24 mx-auto mb-6 text-white/60" />
                    <h3 className="text-xl font-semibold text-white mb-4">
                      Escanear código QR
                    </h3>
                    <p className="text-white/60 mb-8">
                      Apunta a un código QR de planta para obtener información
                      instantánea
                    </p>
                    <Button
                      size="lg"
                      className="bg-gradient-to-br from-[#7BAE7F] to-[#2E5E4E] hover:from-[#2E5E4E] hover:to-[#1E2B24] text-white rounded-full"
                    >
                      Activar escáner QR
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>

            {/* Results Panel */}
            <div className="space-y-6">
              {scanComplete && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card className="backdrop-blur-xl bg-white/5 border-white/10 p-6">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h2 className="text-3xl font-bold text-white mb-2">
                          {scanResult.plantName}
                        </h2>
                        <div className="flex items-center gap-3">
                          <Badge
                            className={`${
                              scanResult.status === "healthy"
                                ? "bg-[#7BAE7F]"
                                : "bg-yellow-500"
                            } text-white`}
                          >
                            {scanResult.health}
                          </Badge>
                          <span className="text-white/60">
                            Confianza: {scanResult.confidence}%
                          </span>
                        </div>
                      </div>
                      <Leaf className="w-12 h-12 text-[#7BAE7F]" />
                    </div>

                    {/* Issues */}
                    {scanResult.issues.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5 text-yellow-400" />
                          Problemas detectados
                        </h3>
                        {scanResult.issues.map((issue, index) => (
                          <Card
                            key={index}
                            className="backdrop-blur-md bg-yellow-500/10 border-yellow-500/30 p-4 mb-3"
                          >
                            <div className="flex items-start gap-3">
                              <Bug className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                              <div>
                                <h4 className="font-semibold text-white mb-1">
                                  {issue.title}
                                </h4>
                                <p className="text-sm text-white/70 mb-2">
                                  {issue.description}
                                </p>
                                <Badge
                                  variant="outline"
                                  className="border-yellow-400/30 text-yellow-400"
                                >
                                  Severidad: {issue.severity}
                                </Badge>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    )}

                    {/* Recommendations */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-[#7BAE7F]" />
                        Recomendaciones
                      </h3>
                      <ul className="space-y-2">
                        {scanResult.recommendations.map((rec, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3 text-white/80"
                          >
                            <span className="w-2 h-2 rounded-full bg-[#7BAE7F] flex-shrink-0 mt-2" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Care Info */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">
                        Cuidados básicos
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl backdrop-blur-md bg-white/5 border border-white/10">
                          <div className="flex items-center gap-3 mb-2">
                            <Sun className="w-5 h-5 text-[#7BAE7F]" />
                            <span className="text-sm text-white/60">Luz</span>
                          </div>
                          <p className="text-white font-semibold">
                            {scanResult.careInfo.light}
                          </p>
                        </div>
                        <div className="p-4 rounded-xl backdrop-blur-md bg-white/5 border border-white/10">
                          <div className="flex items-center gap-3 mb-2">
                            <Droplets className="w-5 h-5 text-[#7BAE7F]" />
                            <span className="text-sm text-white/60">Riego</span>
                          </div>
                          <p className="text-white font-semibold">
                            {scanResult.careInfo.water}
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button
                      size="lg"
                      className="w-full mt-6 bg-gradient-to-br from-[#7BAE7F] to-[#2E5E4E] hover:from-[#2E5E4E] hover:to-[#1E2B24] text-white rounded-full"
                    >
                      Ver más detalles
                    </Button>
                  </Card>
                </motion.div>
              )}

              {!scanComplete && (
                <Card className="backdrop-blur-xl bg-white/5 border-white/10 p-8 text-center">
                  <Scan className="w-16 h-16 mx-auto mb-4 text-white/40" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Esperando escaneo
                  </h3>
                  <p className="text-white/60">
                    Los resultados aparecerán aquí después del análisis
                  </p>
                </Card>
              )}

              {/* Features */}
              <Card className="backdrop-blur-xl bg-white/5 border-white/10 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Capacidades del escáner
                </h3>
                <div className="space-y-3">
                  {[
                    "Identificación de más de 10,000 especies",
                    "Detección de enfermedades y plagas",
                    "Análisis de salud en tiempo real",
                    "Recomendaciones de tratamiento",
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
