import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  Sparkles,
  Scan,
  MessageSquare,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Activity,
  BarChart3,
  Eye,
  Download,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export function AIManagement() {
  const aiModuleStats = [
    {
      title: "Consultas IA Asistente",
      value: "1,245",
      change: "+18.2%",
      trend: "up",
      icon: MessageSquare,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      period: "Este mes",
    },
    {
      title: "Escaneos de Plantas",
      value: "892",
      change: "+25.5%",
      trend: "up",
      icon: Scan,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      period: "Este mes",
    },
    {
      title: "Detecciones de Enfermedades",
      value: "456",
      change: "+12.3%",
      trend: "up",
      icon: AlertCircle,
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
      period: "Este mes",
    },
    {
      title: "Precisión del Sistema",
      value: "94.8%",
      change: "+2.1%",
      trend: "up",
      icon: Activity,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      period: "Promedio",
    },
  ];

  const assistantData = [
    { month: "Ene", consultas: 820 },
    { month: "Feb", consultas: 950 },
    { month: "Mar", consultas: 1020 },
    { month: "Abr", consultas: 1150 },
    { month: "May", consultas: 1245 },
  ];

  const scannerData = [
    { month: "Ene", escaneos: 650 },
    { month: "Feb", escaneos: 720 },
    { month: "Mar", escaneos: 780 },
    { month: "Abr", escaneos: 820 },
    { month: "May", escaneos: 892 },
  ];

  const topQueries = [
    {
      query: "¿Cómo cuidar una Monstera Deliciosa?",
      count: 156,
      category: "Cuidados",
    },
    {
      query: "Plantas ideales para interior con poca luz",
      count: 142,
      category: "Recomendaciones",
    },
    {
      query: "¿Por qué se le caen las hojas a mi planta?",
      count: 128,
      category: "Diagnóstico",
    },
    {
      query: "Calendario de riego para suculentas",
      count: 115,
      category: "Cuidados",
    },
    {
      query: "Mejor fertilizante para plantas de exterior",
      count: 98,
      category: "Productos",
    },
  ];

  const diseaseDetections = [
    {
      disease: "Hongos foliares",
      count: 145,
      severity: "media",
      accuracy: "96%",
    },
    {
      disease: "Pudrición de raíz",
      count: 89,
      severity: "alta",
      accuracy: "94%",
    },
    {
      disease: "Plagas (ácaros)",
      count: 76,
      severity: "media",
      accuracy: "92%",
    },
    {
      disease: "Deficiencia nutricional",
      count: 68,
      severity: "baja",
      accuracy: "95%",
    },
    {
      disease: "Exceso de riego",
      count: 52,
      severity: "media",
      accuracy: "97%",
    },
  ];

  const categoryDistribution = [
    { name: "Cuidados", value: 42, color: "#7BAE7F" },
    { name: "Diagnóstico", value: 28, color: "#2E5E4E" },
    { name: "Recomendaciones", value: 18, color: "#A8D5BA" },
    { name: "Productos", value: 12, color: "#5C8D7E" },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "alta":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "media":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "baja":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      default:
        return "bg-white/20 text-[#4B6358] border-white/30";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-[#E8EFE5] flex items-center gap-3">
            <div className="p-3 rounded-xl bg-purple-500/15 border border-purple-500/30">
              <Sparkles className="w-8 h-8 text-purple-400" />
            </div>
            Gestión de Módulos IA
          </h1>
          <p className="text-[#B8C5B3] mt-1">
            Análisis y rendimiento de funciones inteligentes
          </p>
        </div>
        <Button
          variant="ghost"
          className="text-[#B8C5B3] hover:text-[#E8EFE5] hover:bg-white/[0.06]"
        >
          <Download className="w-4 h-4 mr-2" />
          Exportar Métricas
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {aiModuleStats.map((stat, index) => (
          <Card
            key={index}
            className="p-6 bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-[#4B6358] text-sm mb-1">{stat.title}</p>
                <p className="text-3xl font-semibold text-white mb-2">
                  {stat.value}
                </p>
                <div className="flex items-center gap-1 mb-1">
                  {stat.trend === "up" ? (
                    <TrendingUp className="w-3 h-3 text-green-400" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-red-400" />
                  )}
                  <span
                    className={`text-xs ${stat.trend === "up" ? "text-green-400" : "text-red-400"}`}
                  >
                    {stat.change}
                  </span>
                </div>
                <p className="text-xs text-[#4B6358]">{stat.period}</p>
              </div>
              <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Assistant Usage */}
        <Card className="lg:col-span-2 p-6 bg-white/5 backdrop-blur-md border-white/10">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-purple-400" />
              Uso del Asistente IA
            </h2>
            <p className="text-[#4B6358] text-sm">Consultas mensuales</p>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={assistantData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.6)" />
              <YAxis stroke="rgba(255,255,255,0.6)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(30, 43, 36, 0.95)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Line
                type="monotone"
                dataKey="consultas"
                stroke="#A78BFA"
                strokeWidth={3}
                dot={{ fill: "#A78BFA", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Category Distribution */}
        <Card className="p-6 bg-white/5 backdrop-blur-md border-white/10">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white">
              Categorías de Consultas
            </h2>
            <p className="text-[#4B6358] text-sm">Distribución</p>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={categoryDistribution}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(30, 43, 36, 0.95)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {categoryDistribution.map((cat, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="text-[#4B6358] text-sm">{cat.name}</span>
                </div>
                <span className="text-white font-semibold">{cat.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Scanner Analytics */}
      <Card className="p-6 bg-white/5 backdrop-blur-md border-white/10">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <Scan className="w-5 h-5 text-blue-400" />
            Actividad del Escáner de Plantas
          </h2>
          <p className="text-[#4B6358] text-sm">Escaneos realizados</p>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={scannerData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="month" stroke="rgba(255,255,255,0.6)" />
            <YAxis stroke="rgba(255,255,255,0.6)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(30, 43, 36, 0.95)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                color: "#fff",
              }}
            />
            <Bar dataKey="escaneos" fill="#60A5FA" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Queries */}
        <Card className="p-6 bg-white/5 backdrop-blur-md border-white/10">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white">
              Consultas Más Frecuentes
            </h2>
            <p className="text-[#4B6358] text-sm">Top 5 preguntas del asistente</p>
          </div>
          <div className="space-y-3">
            {topQueries.map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="text-white font-medium mb-1">{item.query}</p>
                    <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">
                      {item.category}
                    </Badge>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-2xl font-semibold text-purple-400">
                      {item.count}
                    </p>
                    <p className="text-[#4B6358] text-xs">veces</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Disease Detections */}
        <Card className="p-6 bg-white/5 backdrop-blur-md border-white/10">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-400" />
              Detecciones de Enfermedades
            </h2>
            <p className="text-[#4B6358] text-sm">
              Top 5 problemas identificados
            </p>
          </div>
          <div className="space-y-3">
            {diseaseDetections.map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex-1">
                    <p className="text-white font-medium">{item.disease}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getSeverityColor(item.severity)}>
                        {item.severity}
                      </Badge>
                      <span className="text-green-400 text-xs">
                        Precisión: {item.accuracy}
                      </span>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-2xl font-semibold text-orange-400">
                      {item.count}
                    </p>
                    <p className="text-[#4B6358] text-xs">casos</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Performance Insights */}
      <Card className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-md border-white/10 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-green-500/10">
            <Activity className="w-6 h-6 text-green-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">
              Insights de Rendimiento
            </h2>
            <p className="text-[#4B6358] text-sm">
              Métricas clave del sistema IA
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-[#4B6358] text-sm mb-1">
              Tiempo de Respuesta Promedio
            </p>
            <p className="text-2xl font-semibold text-white">1.2s</p>
            <span className="text-green-400 text-xs">-0.3s vs mes pasado</span>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-[#4B6358] text-sm mb-1">
              Satisfacción del Usuario
            </p>
            <p className="text-2xl font-semibold text-white">4.8/5</p>
            <span className="text-green-400 text-xs">+0.2 vs mes pasado</span>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-[#4B6358] text-sm mb-1">Tasa de Éxito</p>
            <p className="text-2xl font-semibold text-white">96.5%</p>
            <span className="text-green-400 text-xs">+1.8% vs mes pasado</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
