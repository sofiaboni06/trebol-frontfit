import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  FileText,
  Download,
  TrendingUp,
  DollarSign,
  Package,
  ShoppingCart,
  Users,
  Calendar,
  BarChart3,
  PieChart as PieChartIcon,
} from "lucide-react";
import { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export function ReportsAnalytics() {
  const [timePeriod, setTimePeriod] = useState("monthly");

  const revenueData = [
    { month: "Ene", ventas: 45000, servicios: 28000, total: 73000 },
    { month: "Feb", ventas: 52000, servicios: 32000, total: 84000 },
    { month: "Mar", ventas: 61000, servicios: 35000, total: 96000 },
    { month: "Abr", ventas: 58000, servicios: 38000, total: 96000 },
    { month: "May", ventas: 75000, servicios: 42000, total: 117000 },
  ];

  const productPerformance = [
    { product: "Monstera", ventas: 145, ingresos: 129050 },
    { product: "Ficus", ventas: 98, ingresos: 126420 },
    { product: "Fertilizantes", ventas: 234, ingresos: 65520 },
    { product: "Macetas", ventas: 189, ingresos: 122850 },
    { product: "Herramientas", ventas: 76, ingresos: 67640 },
  ];

  const categoryRevenue = [
    { name: "Plantas Interior", value: 245890, color: "#2E5E4E" },
    { name: "Plantas Exterior", value: 189450, color: "#7BAE7F" },
    { name: "Macetas", value: 156780, color: "#A8D5BA" },
    { name: "Insumos", value: 98560, color: "#5C8D7E" },
    { name: "Herramientas", value: 67640, color: "#1E2B24" },
  ];

  const customerData = [
    { month: "Ene", nuevos: 145, recurrentes: 423 },
    { month: "Feb", nuevos: 198, recurrentes: 456 },
    { month: "Mar", nuevos: 234, recurrentes: 489 },
    { month: "Abr", nuevos: 212, recurrentes: 512 },
    { month: "May", nuevos: 267, recurrentes: 548 },
  ];

  const topMetrics = [
    {
      label: "Ingresos Totales",
      value: "$758,320",
      change: "+15.2%",
      period: "Últimos 6 meses",
      icon: DollarSign,
      color: "text-green-400",
    },
    {
      label: "Productos Vendidos",
      value: "4,892",
      change: "+22.8%",
      period: "Últimos 6 meses",
      icon: Package,
      color: "text-blue-400",
    },
    {
      label: "Órdenes Completadas",
      value: "1,456",
      change: "+12.5%",
      period: "Últimos 6 meses",
      icon: ShoppingCart,
      color: "text-purple-400",
    },
    {
      label: "Nuevos Clientes",
      value: "1,056",
      change: "+18.9%",
      period: "Últimos 6 meses",
      icon: Users,
      color: "text-orange-400",
    },
  ];

  const reportTypes = [
    {
      title: "Reporte de Ventas",
      description: "Análisis completo de ventas por período",
      icon: ShoppingCart,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Reporte de Inventario",
      description: "Estado de stock y movimientos",
      icon: Package,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Reporte de Clientes",
      description: "Análisis de comportamiento y segmentación",
      icon: Users,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Reporte de Servicios",
      description: "Rendimiento de servicios de paisajismo",
      icon: Calendar,
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-[#E8EFE5] flex items-center gap-3">
            <div className="p-3 rounded-xl bg-blue-500/15 border border-blue-500/30">
              <BarChart3 className="w-8 h-8 text-blue-400" />
            </div>
            Reportes y Análisis
          </h1>
          <p className="text-[#4B6358] mt-1">
            Métricas completas del ecosistema
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timePeriod} onValueChange={setTimePeriod}>
            <SelectTrigger className="w-[180px] bg-white/5 border-white/10 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Diario</SelectItem>
              <SelectItem value="weekly">Semanal</SelectItem>
              <SelectItem value="monthly">Mensual</SelectItem>
              <SelectItem value="yearly">Anual</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="ghost"
            className="text-[#4B6358] hover:text-white hover:bg-white/10"
          >
            <Download className="w-4 h-4 mr-2" />
            Exportar Todo
          </Button>
        </div>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {topMetrics.map((metric, index) => (
          <Card
            key={index}
            className="p-6 bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <metric.icon className={`w-8 h-8 ${metric.color}`} />
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                {metric.change}
              </Badge>
            </div>
            <div>
              <p className="text-[#4B6358] text-sm mb-1">{metric.label}</p>
              <p className="text-3xl font-semibold text-white mb-1">
                {metric.value}
              </p>
              <p className="text-[#4B6358] text-xs">{metric.period}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Revenue Trends */}
      <Card className="p-6 bg-white/5 backdrop-blur-md border-white/10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Tendencias de Ingresos
            </h2>
            <p className="text-[#4B6358] text-sm">
              Comparativa de ventas y servicios
            </p>
          </div>
          <Button
            variant="ghost"
            className="text-[#4B6358] hover:text-white hover:bg-white/10"
          >
            <Download className="w-4 h-4 mr-2" />
            Descargar
          </Button>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7BAE7F" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#7BAE7F" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorServicios" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2E5E4E" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#2E5E4E" stopOpacity={0} />
              </linearGradient>
            </defs>
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
            <Legend />
            <Area
              type="monotone"
              dataKey="ventas"
              stroke="#7BAE7F"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorVentas)"
              name="Ventas"
            />
            <Area
              type="monotone"
              dataKey="servicios"
              stroke="#2E5E4E"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorServicios)"
              name="Servicios"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* Product Performance & Category Revenue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Performance */}
        <Card className="p-6 bg-white/5 backdrop-blur-md border-white/10">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white">
              Rendimiento de Productos
            </h2>
            <p className="text-[#4B6358] text-sm">Top 5 productos</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productPerformance} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis type="number" stroke="rgba(255,255,255,0.6)" />
              <YAxis dataKey="product" type="category" stroke="rgba(255,255,255,0.6)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(30, 43, 36, 0.95)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Bar dataKey="ingresos" fill="#7BAE7F" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Category Revenue */}
        <Card className="p-6 bg-white/5 backdrop-blur-md border-white/10">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white">
              Ingresos por Categoría
            </h2>
            <p className="text-[#4B6358] text-sm">Distribución de ventas</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={categoryRevenue}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {categoryRevenue.map((entry, index) => (
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
                formatter={(value: any) => `$${value.toLocaleString()}`}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {categoryRevenue.map((cat, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="text-[#4B6358] text-sm">{cat.name}</span>
                </div>
                <span className="text-[#7BAE7F] font-semibold">
                  ${cat.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Customer Analytics */}
      <Card className="p-6 bg-white/5 backdrop-blur-md border-white/10">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white">
            Análisis de Clientes
          </h2>
          <p className="text-[#4B6358] text-sm">Clientes nuevos vs recurrentes</p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={customerData}>
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
            <Legend />
            <Bar dataKey="nuevos" fill="#60A5FA" name="Nuevos" radius={[8, 8, 0, 0]} />
            <Bar
              dataKey="recurrentes"
              fill="#7BAE7F"
              name="Recurrentes"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Report Types */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">
          Generar Reportes Personalizados
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reportTypes.map((report, index) => (
            <Card
              key={index}
              className="p-6 bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all cursor-pointer"
            >
              <div className={`p-3 rounded-xl ${report.bgColor} w-fit mb-4`}>
                <report.icon className={`w-6 h-6 ${report.color}`} />
              </div>
              <h3 className="text-white font-semibold mb-2">{report.title}</h3>
              <p className="text-[#4B6358] text-sm mb-4">{report.description}</p>
              <Button className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20">
                <Download className="w-4 h-4 mr-2" />
                Generar
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
