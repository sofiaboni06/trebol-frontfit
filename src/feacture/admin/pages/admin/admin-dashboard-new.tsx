import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Calendar, ShoppingCart, AlertTriangle, Package, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { useEffect, useState } from "react";
import dashboardService from "../../../../services/dashboard.service";

export function AdminDashboardNew() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await dashboardService.getDashboard();
        setDashboard(data);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los datos del dashboard.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const formatValue = (value) =>
    value !== undefined && value !== null ? value.toLocaleString() : "–";

  const kpiCards = [
    {
      title: "Usuarios",
      value: formatValue(dashboard?.usuarios),
      icon: Calendar,
      color: "text-emerald-300",
      bgColor: "bg-emerald-500/10",
      period: "Total de cuentas",
    },
    {
      title: "Productos",
      value: formatValue(dashboard?.productos),
      icon: ShoppingCart,
      color: "text-slate-200",
      bgColor: "bg-slate-400/10",
      period: "Artículos registrados",
    },
    {
      title: "Bajo stock",
      value: formatValue(dashboard?.lowStockCount),
      icon: AlertTriangle,
      color: "text-orange-300",
      bgColor: "bg-orange-400/10",
      period: "Productos críticos",
    },
  ];

  const summaryCards = [
    {
      title: "Categorías",
      value: formatValue(dashboard?.categorias),
      subtitle: "Tipos de productos",
    },
    {
      title: "Pedidos",
      value: formatValue(dashboard?.pedidos),
      subtitle: "Órdenes registradas",
    },
    {
      title: "Citas",
      value: formatValue(dashboard?.citas),
      subtitle: "Reservas totales",
    },
    {
      title: "Stock total",
      value: formatValue(dashboard?.stockTotal),
      subtitle: "Unidades disponibles",
    },
  ];

  const lineData = [
    { month: "Ene", value: 35 },
    { month: "Feb", value: 42 },
    { month: "Mar", value: 38 },
    { month: "Abr", value: 47 },
    { month: "May", value: 52 },
    { month: "Jun", value: 48 },
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
      client: "Sofía Vargas",
      service: "Consultoría",
      date: "Mañana, 10:00 AM",
      employee: "Carlos López",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completado":
        return "bg-emerald-500/15 text-emerald-300 border border-emerald-500/20";
      case "en-proceso":
        return "bg-sky-500/15 text-sky-300 border border-sky-500/20";
      case "pendiente":
        return "bg-orange-500/15 text-orange-300 border border-orange-500/20";
      default:
        return "bg-slate-200/10 text-slate-500 border border-slate-200/30";
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-4xl font-semibold text-[#E8EFE5]">
            Control de operaciones
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-[#B8C5B3]">
            Un espacio sereno para gestionar citas, pedidos y stock con precisión premium.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {kpiCards.map((kpi, index) => (
              <Card
                key={index}
                className="p-5 bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] shadow-[0_12px_40px_rgba(46,94,78,0.2)] rounded-[1.5rem] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-[#8B9A88]">
                      {kpi.title}
                    </p>
                    <p className="mt-3 text-3xl font-semibold text-[#E8EFE5]">
                      {kpi.value}
                    </p>
                    <p className="mt-2 text-sm text-[#B8C5B3]">{kpi.period}</p>
                  </div>
                  <div className={`flex h-12 w-12 items-center justify-center rounded-3xl ${kpi.bgColor}`}>
                    <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      {loading && (
        <div className="rounded-3xl border border-white/[0.08] bg-white/[0.04] p-6 text-[#B8C5B3]">
          Cargando indicadores del dashboard...
        </div>
      )}

      {error && (
        <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-6 text-red-200">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-7 space-y-6">
          <Card className="p-8 bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] shadow-[0_16px_48px_rgba(46,94,78,0.2)] rounded-[2rem]">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <p className="text-sm text-[#8B9A88]">Agenda destacada</p>
                <h2 className="text-2xl font-semibold text-[#E8EFE5]">
                  Próximas citas
                </h2>
              </div>
              <Button className="rounded-2xl bg-gradient-to-br from-[#2E5E4E] to-[#3D7A5E] px-5 py-3 text-white hover:from-[#3D7A5E] hover:to-[#4D8A6E] shadow-[0_8px_24px_rgba(46,94,78,0.3)] transition-all duration-300">
                Agregar cita
              </Button>
            </div>

            <div className="grid gap-4">
              {upcomingAppointments.map((appointment, index) => (
                <div
                  key={index}
                  className="rounded-[1.75rem] border border-white/[0.08] bg-white/[0.04] p-6 shadow-[0_8px_24px_rgba(0,0,0,0.3)] backdrop-blur-sm hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-lg font-semibold text-[#E8EFE5]">{appointment.client}</p>
                      <p className="mt-1 text-sm text-[#B8C5B3]">{appointment.service}</p>
                    </div>
                    <Badge className="rounded-2xl bg-[#7BAE7F]/15 text-[#7BAE7F] border border-[#7BAE7F]/30">
                      {appointment.date}
                    </Badge>
                  </div>
                  <p className="mt-4 text-sm text-[#8B9A88]">Responsable: {appointment.employee}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-8 bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] shadow-[0_16px_48px_rgba(46,94,78,0.2)] rounded-[2rem]">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <p className="text-sm text-[#8B9A88]">Prioridad operacional</p>
                <h2 className="text-2xl font-semibold text-[#E8EFE5]">
                  Pedidos y stock
                </h2>
              </div>
              <Sparkles className="w-6 h-6 text-[#7BAE7F]" />
            </div>
            <div className="grid gap-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-[1.75rem] border border-white/[0.08] bg-white/[0.04] p-5 shadow-[0_8px_24px_rgba(0,0,0,0.3)] backdrop-blur-sm hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-base font-semibold text-[#E8EFE5]">{order.customer}</p>
                      <p className="text-sm text-[#B8C5B3]">{order.product}</p>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status === "completado"
                        ? "Completado"
                        : order.status === "en-proceso"
                        ? "En Proceso"
                        : "Pendiente"}
                    </Badge>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm text-[#8B9A88]">
                    <span>{order.time}</span>
                    <span>${order.amount.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="xl:col-span-5 space-y-6">
          <Card className="p-8 bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] shadow-[0_16px_48px_rgba(46,94,78,0.2)] rounded-[2rem]">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <p className="text-sm text-[#8B9A88]">Resumen rápido</p>
                <h2 className="text-2xl font-semibold text-[#E8EFE5]">
                  Indicadores clave
                </h2>
              </div>
              <Package className="w-6 h-6 text-[#7BAE7F]" />
            </div>
            <div className="grid gap-4">
              {summaryCards.map((item, index) => (
                <div
                  key={index}
                  className="rounded-[1.75rem] border border-white/[0.08] bg-white/[0.04] p-5 backdrop-blur-sm hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300"
                >
                  <p className="text-base font-semibold text-[#E8EFE5]">{item.title}</p>
                  <p className="mt-1 text-3xl font-semibold text-[#B8C5B3]">{item.value}</p>
                  <p className="mt-2 text-sm text-[#8B9A88]">{item.subtitle}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-8 bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] shadow-[0_16px_48px_rgba(46,94,78,0.2)] rounded-[2rem]">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <p className="text-sm text-[#8B9A88]">Alerta inmediata</p>
                <h2 className="text-2xl font-semibold text-[#E8EFE5]">
                  Inventario crítico
                </h2>
              </div>
              <AlertTriangle className="w-6 h-6 text-orange-300" />
            </div>
            <div className="space-y-3">
              {lowStockAlerts.map((alert, index) => (
                <div
                  key={index}
                  className="rounded-[1.75rem] border border-white/[0.08] bg-white/[0.04] p-5 backdrop-blur-sm hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-base font-semibold text-[#E8EFE5]">{alert.product}</p>
                    <Badge
                      className={
                        alert.urgency === "alta"
                          ? "bg-red-500/15 text-red-300 border border-red-500/20"
                          : "bg-orange-500/15 text-orange-300 border border-orange-500/20"
                      }
                    >
                      {alert.urgency === "alta" ? "Alta" : "Media"}
                    </Badge>
                  </div>
                  <p className="mt-2 text-sm text-[#B8C5B3]">
                    Stock {alert.stock} · Mínimo {alert.min}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <Card className="p-8 bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] shadow-[0_16px_48px_rgba(46,94,78,0.2)] rounded-[2rem]">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <p className="text-sm text-[#8B9A88]">Ritmo operativo</p>
            <h2 className="text-2xl font-semibold text-[#E8EFE5]">
              Flujo de actividades
            </h2>
          </div>
          <Link to="/admin/reportes">
            <Button variant="secondary" className="rounded-2xl text-[#E8EFE5] hover:text-white border-white/[0.08] hover:border-white/[0.12] hover:bg-white/[0.06]">
              Ver reportes
            </Button>
          </Link>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={lineData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
            <XAxis dataKey="month" stroke="rgba(255,255,255,0.38)" />
            <YAxis stroke="rgba(255,255,255,0.38)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(8, 12, 10, 0.95)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "12px",
                color: "#E8EFE5",
              }}
            />
            <Line type="monotone" dataKey="value" stroke="#7BAE7F" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
