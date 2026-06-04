import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  TrendingUp,
  TrendingDown,
  Package,
  ShoppingCart,
  Calendar,
  Users,
  DollarSign,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  Eye,
  CheckCircle,
  Clock,
} from "lucide-react";
import { Link } from "react-router";
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

export function AdminDashboardNew() {
  const kpiCards = [
    {
      title: "Ingresos Totales",
      value: "$245,890",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      period: "Este mes",
    },
    {
      title: "Órdenes Totales",
      value: "1,245",
      change: "+8.2%",
      trend: "up",
      icon: ShoppingCart,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      period: "Este mes",
    },
    {
      title: "Clientes Activos",
      value: "3,450",
      change: "+15.3%",
      trend: "up",
      icon: Users,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      period: "Total",
    },
    {
      title: "Productos",
      value: "485",
      change: "+23",
      trend: "up",
      icon: Package,
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
      period: "En catálogo",
    },
  ];

  const revenueData = [
    { month: "Ene", ventas: 45000, servicios: 28000 },
    { month: "Feb", ventas: 52000, servicios: 32000 },
    { month: "Mar", ventas: 61000, servicios: 35000 },
    { month: "Abr", ventas: 58000, servicios: 38000 },
    { month: "May", ventas: 75000, servicios: 42000 },
  ];

  const categoryData = [
    { name: "Interior", value: 35, color: "#2E5E4E" },
    { name: "Exterior", value: 25, color: "#7BAE7F" },
    { name: "Macetas", value: 20, color: "#1E2B24" },
    { name: "Herramientas", value: 12, color: "#A8D5BA" },
    { name: "Insumos", value: 8, color: "#5C8D7E" },
  ];

  const recentOrders = [
    {
      id: "#12345",
      customer: "María González",
      product: "Monstera Deliciosa",
      amount: 890,
      status: "completado",
      time: "Hace 15 min",
    },
    {
      id: "#12346",
      customer: "Carlos Mendoza",
      product: "Ficus Lyrata",
      amount: 1290,
      status: "en-proceso",
      time: "Hace 1 hora",
    },
    {
      id: "#12347",
      customer: "Ana Rodríguez",
      product: "Kit Herramientas",
      amount: 690,
      status: "pendiente",
      time: "Hace 2 horas",
    },
    {
      id: "#12348",
      customer: "Roberto Sánchez",
      product: "Sustrato Premium",
      amount: 450,
      status: "completado",
      time: "Hace 3 horas",
    },
  ];

  const lowStockAlerts = [
    { product: "Monstera Deliciosa", stock: 5, min: 15, urgency: "alta" },
    { product: "Fertilizante Orgánico", stock: 3, min: 20, urgency: "alta" },
    { product: "Maceta Cerámica", stock: 7, min: 12, urgency: "media" },
  ];

  const upcomingAppointments = [
    {
      client: "Laura Torres",
      service: "Diseño de Jardín",
      date: "Hoy, 2:00 PM",
      employee: "Juan Pérez",
    },
    {
      client: "Diego Ramírez",
      service: "Mantenimiento",
      date: "Hoy, 4:30 PM",
      employee: "María García",
    },
    {
      client: "Sofia Vargas",
      service: "Consultoría",
      date: "Mañana, 10:00 AM",
      employee: "Carlos López",
    },
  ];

  const aiAnalytics = [
    { module: "Asistente IA", queries: 1245, change: "+18%" },
    { module: "Escáner Plantas", scans: 892, change: "+25%" },
    { module: "Detección Enfermedades", detections: 456, change: "+12%" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completado":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "en-proceso":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "pendiente":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      default:
        return "bg-[#F4F6F1] text-[#1E2B24] border-[#DCE7DF]";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-[#1E2B24]">
            Panel de Administración
          </h1>
          <p className="text-[#4B6358] mt-1">
            Control total del ecosistema Trebol Paisajismo
          </p>
        </div>
        <div className="text-right">
          <p className="text-[#4B6358] text-sm">Última actualización</p>
          <p className="text-[#1E2B24]">31 Mayo 2026 - 10:45 AM</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi, index) => (
          <Card
            key={index}
            className="p-6 bg-white/70 backdrop-blur-md border-white/20 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-[#4B6358] text-sm mb-1">{kpi.title}</p>
                <p className="text-3xl font-semibold text-[#1E2B24] mb-2">
                  {kpi.value}
                </p>
                <div className="flex items-center gap-1 mb-1">
                  {kpi.trend === "up" ? (
                    <TrendingUp className="w-3 h-3 text-green-400" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-red-400" />
                  )}
                  <span
                    className={`text-xs ${kpi.trend === "up" ? "text-green-400" : "text-red-400"}`}
                  >
                    {kpi.change}
                  </span>
                  <span className="text-xs text-[#6B7C74]">vs mes anterior</span>
                </div>
                <p className="text-xs text-[#6B7C74]">{kpi.period}</p>
              </div>
              <div className={`p-3 rounded-xl ${kpi.bgColor}`}>
                <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2 p-6 bg-white/70 backdrop-blur-md border-white/20">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-[#1E2B24]">
                Ingresos por Categoría
              </h2>
              <p className="text-[#4B6358] text-sm">Últimos 5 meses</p>
            </div>
            <Link to="/admin/reportes">
              <Button
                variant="ghost"
                className="text-[#2E5E4E] hover:text-[#1E2B24] hover:bg-[#7BAE7F]/20"
              >
                Ver reportes completos
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
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
              <Line
                type="monotone"
                dataKey="ventas"
                stroke="#7BAE7F"
                strokeWidth={3}
                name="Ventas"
                dot={{ fill: "#7BAE7F", r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="servicios"
                stroke="#2E5E4E"
                strokeWidth={3}
                name="Servicios"
                dot={{ fill: "#2E5E4E", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Category Distribution */}
        <Card className="p-6 bg-white/70 backdrop-blur-md border-white/20">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-[#1E2B24]">
              Distribución por Categoría
            </h2>
            <p className="text-[#4B6358] text-sm">Ventas este mes</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
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
            {categoryData.map((cat, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="text-[#6B7C74] text-sm">{cat.name}</span>
                </div>
                <span className="text-[#1E2B24] font-semibold">{cat.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <Card className="lg:col-span-2 bg-white/70 backdrop-blur-md border-white/20 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-[#1E2B24]">
                Órdenes Recientes
              </h2>
              <p className="text-[#4B6358] text-sm">
                {recentOrders.length} órdenes nuevas
              </p>
            </div>
            <Link to="/admin/ventas">
              <Button
                variant="ghost"
                className="text-[#2E5E4E] hover:text-[#1E2B24] hover:bg-[#7BAE7F]/20"
              >
                Ver todas
              </Button>
            </Link>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="p-4 rounded-xl bg-white/70 border border-white/20 hover:bg-white/80 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2E5E4E] to-[#7BAE7F] flex items-center justify-center">
                      <ShoppingCart className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[#1E2B24] font-medium">{order.customer}</p>
                      <p className="text-[#4B6358] text-sm">{order.product}</p>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-4">
                    <div>
                      <p className="text-[#7BAE7F] font-semibold">
                        ${order.amount.toLocaleString()}
                      </p>
                      <p className="text-[#6B7C74] text-xs">{order.time}</p>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status === "completado"
                        ? "Completado"
                        : order.status === "en-proceso"
                          ? "En Proceso"
                          : "Pendiente"}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Alerts Column */}
        <div className="space-y-6">
          {/* Low Stock Alerts */}
          <Card className="bg-white/70 backdrop-blur-md border-white/20 p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-orange-400" />
              <h2 className="text-lg font-semibold text-[#1E2B24]">
                Alertas de Stock
              </h2>
            </div>
            <div className="space-y-3">
              {lowStockAlerts.map((alert, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20"
                >
                  <p className="text-[#1E2B24] text-sm font-medium mb-1">
                    {alert.product}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-orange-400 text-xs">
                      Stock: {alert.stock} / Min: {alert.min}
                    </span>
                    <Badge
                      className={
                        alert.urgency === "alta"
                          ? "bg-red-500/20 text-red-400 border-red-500/30 text-xs"
                          : "bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs"
                      }
                    >
                      {alert.urgency}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/admin/inventario">
              <Button className="w-full mt-4 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 border border-orange-500/30">
                Gestionar Inventario
              </Button>
            </Link>
          </Card>

          {/* Upcoming Appointments */}
          <Card className="bg-white/70 backdrop-blur-md border-white/20 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-blue-400" />
              <h2 className="text-lg font-semibold text-[#1E2B24]">
                Próximas Citas
              </h2>
            </div>
            <div className="space-y-3">
              {upcomingAppointments.map((apt, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg bg-white/70 border border-white/20"
                >
                  <p className="text-[#1E2B24] text-sm font-medium">{apt.client}</p>
                  <p className="text-[#4B6358] text-xs mb-1">{apt.service}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-400 text-xs">{apt.date}</span>
                    <span className="text-[#6B7C74] text-xs">{apt.employee}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* AI Analytics */}
      <Card className="bg-white/70 backdrop-blur-md border-white/20 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-purple-500/10">
            <Sparkles className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[#1E2B24]">
              Análisis de Módulos IA
            </h2>
            <p className="text-[#4B6358] text-sm">
              Rendimiento de funciones inteligentes
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {aiAnalytics.map((ai, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-white/70 border border-white/20"
            >
              <p className="text-[#4B6358] text-sm mb-1">{ai.module}</p>
              <div className="flex items-end justify-between">
                <p className="text-2xl font-semibold text-[#1E2B24]">
                  {ai.queries || ai.scans || ai.detections}
                </p>
                <span className="text-green-400 text-sm">{ai.change}</span>
              </div>
            </div>
          ))}
        </div>
        <Link to="/admin/ia">
          <Button className="w-full mt-4 bg-[#2E5E4E] hover:bg-[#265a46] text-white border border-[#2E5E4E]">
            Ver Analytics Completos de IA
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </Card>
    </div>
  );
}
