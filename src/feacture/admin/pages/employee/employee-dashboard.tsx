import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  TrendingUp,
  TrendingDown,
  Package,
  ShoppingCart,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  BarChart3,
} from "lucide-react";
import { Link } from "react-router";

export function EmployeeDashboard() {
  const kpiCards = [
    {
      title: "Citas Pendientes",
      value: "12",
      change: "+3",
      trend: "up",
      icon: Calendar,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Productos Bajo Stock",
      value: "8",
      change: "+2",
      trend: "up",
      icon: AlertTriangle,
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
    },
    {
      title: "Ventas Esta Semana",
      value: "$45,890",
      change: "+12%",
      trend: "up",
      icon: ShoppingCart,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Órdenes Hoy",
      value: "23",
      change: "+8",
      trend: "up",
      icon: Package,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
    },
  ];

  const todayAppointments = [
    {
      id: 1,
      client: "María González",
      service: "Diseño de Jardín",
      time: "10:00 AM",
      status: "confirmada",
    },
    {
      id: 2,
      client: "Carlos Mendoza",
      service: "Mantenimiento Mensual",
      time: "2:00 PM",
      status: "pendiente",
    },
    {
      id: 3,
      client: "Ana Rodríguez",
      service: "Consultoría Plantas",
      time: "4:30 PM",
      status: "confirmada",
    },
  ];

  const lowStockProducts = [
    { name: "Monstera Deliciosa", stock: 5, min: 15, category: "Interior" },
    { name: "Fertilizante Orgánico", stock: 3, min: 20, category: "Insumos" },
    { name: "Maceta Cerámica Grande", stock: 7, min: 12, category: "Macetas" },
    { name: "Sustrato Premium", stock: 4, min: 25, category: "Insumos" },
  ];

  const recentSales = [
    {
      id: "#12345",
      customer: "Roberto Sánchez",
      product: "Ficus Lyrata",
      amount: 1290,
      time: "Hace 15 min",
    },
    {
      id: "#12346",
      customer: "Laura Torres",
      product: "Kit Herramientas Pro",
      amount: 890,
      time: "Hace 1 hora",
    },
    {
      id: "#12347",
      customer: "Diego Ramírez",
      product: "Sansevieria",
      amount: 490,
      time: "Hace 2 horas",
    },
  ];

  const pendingTasks = [
    {
      title: "Actualizar precios temporada",
      priority: "alta",
      due: "Hoy",
    },
    {
      title: "Revisar inventario bodega 2",
      priority: "media",
      due: "Mañana",
    },
    {
      title: "Confirmar citas de la semana",
      priority: "alta",
      due: "Hoy",
    },
    {
      title: "Subir fotos productos nuevos",
      priority: "baja",
      due: "Esta semana",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white">
            Panel de Operaciones
          </h1>
          <p className="text-gray-300 mt-1">
            Resumen de actividades y tareas del día
          </p>
        </div>
        <div className="text-right">
          <p className="text-gray-300 text-sm">Última actualización</p>
          <p className="text-white">Hoy, 31 Mayo 2026 - 10:45 AM</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi, index) => (
          <Card
            key={index}
            className="p-6 bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-gray-300 text-sm mb-1">{kpi.title}</p>
                <p className="text-3xl font-semibold text-white mb-2">
                  {kpi.value}
                </p>
                <div className="flex items-center gap-1">
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
                  <span className="text-xs text-gray-400">vs ayer</span>
                </div>
              </div>
              <div className={`p-3 rounded-xl ${kpi.bgColor}`}>
                <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Appointments */}
        <Card className="lg:col-span-2 bg-white/5 backdrop-blur-md border-white/10 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-white">Citas de Hoy</h2>
              <p className="text-gray-300 text-sm">
                {todayAppointments.length} citas programadas
              </p>
            </div>
            <Link to="/empleado/citas">
              <Button
                variant="ghost"
                className="text-[#7BAE7F] hover:text-white hover:bg-white/10"
              >
                Ver todas
              </Button>
            </Link>
          </div>
          <div className="space-y-3">
            {todayAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2E5E4E] to-[#7BAE7F] flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        {appointment.client}
                      </p>
                      <p className="text-gray-300 text-sm">
                        {appointment.service}
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-3">
                    <div>
                      <p className="text-white text-sm">{appointment.time}</p>
                      <Badge
                        className={
                          appointment.status === "confirmada"
                            ? "bg-green-500/20 text-green-400 border-green-500/30"
                            : "bg-orange-500/20 text-orange-400 border-orange-500/30"
                        }
                      >
                        {appointment.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Pending Tasks */}
        <Card className="bg-white/5 backdrop-blur-md border-white/10 p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white">
              Tareas Pendientes
            </h2>
            <p className="text-gray-300 text-sm">
              {pendingTasks.length} tareas por completar
            </p>
          </div>
          <div className="space-y-3">
            {pendingTasks.map((task, index) => (
              <div
                key={index}
                className="p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
              >
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded border-2 border-white/30 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-white text-sm mb-1">{task.title}</p>
                    <div className="flex items-center gap-2">
                      <Badge
                        className={
                          task.priority === "alta"
                            ? "bg-red-500/20 text-red-400 border-red-500/30 text-xs"
                            : task.priority === "media"
                              ? "bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs"
                              : "bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs"
                        }
                      >
                        {task.priority}
                      </Badge>
                      <span className="text-gray-400 text-xs">{task.due}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low Stock Products */}
        <Card className="bg-white/5 backdrop-blur-md border-white/10 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-white">
                Productos Bajo Stock
              </h2>
              <p className="text-gray-300 text-sm">Requieren reabastecimiento</p>
            </div>
            <Link to="/empleado/inventario">
              <Button
                variant="ghost"
                className="text-orange-400 hover:text-white hover:bg-white/10"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Ver inventario
              </Button>
            </Link>
          </div>
          <div className="space-y-3">
            {lowStockProducts.map((product, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-white/5 border border-orange-500/20 hover:bg-white/10 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-white font-medium">{product.name}</p>
                    <p className="text-gray-300 text-sm">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-orange-400 font-semibold">
                      {product.stock} unidades
                    </p>
                    <p className="text-gray-400 text-xs">
                      Mínimo: {product.min}
                    </p>
                  </div>
                </div>
                <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-orange-500 rounded-full"
                    style={{
                      width: `${(product.stock / product.min) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Sales */}
        <Card className="bg-white/5 backdrop-blur-md border-white/10 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-white">
                Ventas Recientes
              </h2>
              <p className="text-gray-300 text-sm">Últimas transacciones</p>
            </div>
            <Link to="/empleado/ventas">
              <Button
                variant="ghost"
                className="text-[#7BAE7F] hover:text-white hover:bg-white/10"
              >
                Ver todas
              </Button>
            </Link>
          </div>
          <div className="space-y-3">
            {recentSales.map((sale) => (
              <div
                key={sale.id}
                className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2E5E4E] to-[#7BAE7F] flex items-center justify-center">
                      <ShoppingCart className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{sale.customer}</p>
                      <p className="text-gray-300 text-sm">{sale.product}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[#7BAE7F] font-semibold">
                      ${sale.amount.toLocaleString()}
                    </p>
                    <p className="text-gray-400 text-xs">{sale.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-to-br from-[#2E5E4E]/20 to-[#7BAE7F]/20 backdrop-blur-md border-white/10 p-8">
        <h2 className="text-xl font-semibold text-white mb-6">
          Acciones Rápidas
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/empleado/catalogo">
            <Button className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 h-auto py-4 flex flex-col gap-2">
              <Package className="w-6 h-6" />
              <span>Agregar Producto</span>
            </Button>
          </Link>
          <Link to="/empleado/inventario">
            <Button className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 h-auto py-4 flex flex-col gap-2">
              <BarChart3 className="w-6 h-6" />
              <span>Actualizar Stock</span>
            </Button>
          </Link>
          <Link to="/empleado/citas">
            <Button className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 h-auto py-4 flex flex-col gap-2">
              <Calendar className="w-6 h-6" />
              <span>Nueva Cita</span>
            </Button>
          </Link>
          <Link to="/empleado/ventas">
            <Button className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 h-auto py-4 flex flex-col gap-2">
              <ShoppingCart className="w-6 h-6" />
              <span>Ver Ventas</span>
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
