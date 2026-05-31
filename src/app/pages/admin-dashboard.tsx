import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarInset,
  SidebarTrigger,
} from "../components/ui/sidebar";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Calendar,
  BarChart3,
  Settings,
  Leaf,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Search,
  Sparkles,
} from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const salesData = [
  { month: "Ene", ventas: 45000, ordenes: 120 },
  { month: "Feb", ventas: 52000, ordenes: 145 },
  { month: "Mar", ventas: 61000, ordenes: 167 },
  { month: "Abr", ventas: 58000, ordenes: 154 },
  { month: "May", ventas: 75000, ordenes: 198 },
];

const categoryData = [
  { name: "Plantas Interior", value: 35 },
  { name: "Plantas Exterior", value: 25 },
  { name: "Macetas", value: 20 },
  { name: "Herramientas", value: 12 },
  { name: "Fertilizantes", value: 8 },
];

const COLORS = ["#2E5E4E", "#7BAE7F", "#1E2B24", "#A8D5BA", "#5C8D7E"];

export function AdminDashboard() {
  const recentOrders = [
    {
      id: "#12345",
      customer: "María González",
      product: "Monstera Deliciosa",
      amount: 890,
      status: "Completado",
    },
    {
      id: "#12344",
      customer: "Carlos Mendoza",
      product: "Ficus Lyrata",
      amount: 1290,
      status: "En proceso",
    },
    {
      id: "#12343",
      customer: "Ana Rodríguez",
      product: "Kit Herramientas",
      amount: 690,
      status: "Pendiente",
    },
  ];

  const lowStockProducts = [
    { name: "Monstera Deliciosa", stock: 5, min: 10 },
    { name: "Fertilizante Orgánico", stock: 3, min: 15 },
    { name: "Maceta Cerámica Grande", stock: 7, min: 12 },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-[#1E2B24] flex w-full">
        {/* Sidebar */}
        <Sidebar className="border-r border-white/10 bg-[#1E2B24]">
          <SidebarContent>
            <div className="p-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2E5E4E] to-[#7BAE7F] flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">Trebol Paisajismo</p>
                  <p className="text-xs text-white/60">Admin Panel</p>
                </div>
              </div>
            </div>

            <SidebarGroup>
              <SidebarGroupLabel className="text-white/60">
                Principal
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="text-white hover:bg-white/10">
                      <LayoutDashboard className="w-4 h-4" />
                      <span>Dashboard</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="text-white/60 hover:bg-white/10 hover:text-white">
                      <Package className="w-4 h-4" />
                      <span>Productos</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="text-white/60 hover:bg-white/10 hover:text-white">
                      <ShoppingCart className="w-4 h-4" />
                      <span>Órdenes</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="text-white/60 hover:bg-white/10 hover:text-white">
                      <Users className="w-4 h-4" />
                      <span>Clientes</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="text-white/60 hover:bg-white/10 hover:text-white">
                      <Calendar className="w-4 h-4" />
                      <span>Citas</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel className="text-white/60">
                Análisis
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="text-white/60 hover:bg-white/10 hover:text-white">
                      <BarChart3 className="w-4 h-4" />
                      <span>Reportes</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="text-white/60 hover:bg-white/10 hover:text-white">
                      <Sparkles className="w-4 h-4" />
                      <span>Analytics IA</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel className="text-white/60">
                Sistema
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="text-white/60 hover:bg-white/10 hover:text-white">
                      <Settings className="w-4 h-4" />
                      <span>Configuración</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <SidebarInset className="flex-1">
          <header className="sticky top-0 z-10 backdrop-blur-md bg-[#1E2B24]/80 border-b border-white/10 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="text-white" />
                <h1 className="text-2xl font-bold text-white">Dashboard</h1>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <Input
                    placeholder="Buscar..."
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40 w-64"
                  />
                </div>
                <Button className="bg-gradient-to-br from-[#7BAE7F] to-[#2E5E4E] hover:from-[#2E5E4E] hover:to-[#1E2B24] text-white rounded-full">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Insights IA
                </Button>
              </div>
            </div>
          </header>

          <main className="p-6 space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="backdrop-blur-md bg-gradient-to-br from-[#2E5E4E] to-[#1E2B24] border-white/10 p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-white/80 mb-2">Ventas del mes</p>
                    <h3 className="text-3xl font-bold text-white mb-2">
                      $75,000
                    </h3>
                    <div className="flex items-center gap-2 text-[#7BAE7F]">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-sm">+12.5%</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                </div>
              </Card>

              <Card className="backdrop-blur-md bg-gradient-to-br from-[#7BAE7F] to-[#2E5E4E] border-white/10 p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-white/80 mb-2">Órdenes nuevas</p>
                    <h3 className="text-3xl font-bold text-white mb-2">198</h3>
                    <div className="flex items-center gap-2 text-white">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-sm">+8.3%</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <ShoppingCart className="w-6 h-6 text-white" />
                  </div>
                </div>
              </Card>

              <Card className="backdrop-blur-md bg-gradient-to-br from-[#1E2B24] to-[#2E5E4E] border-white/10 p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-white/80 mb-2">Clientes activos</p>
                    <h3 className="text-3xl font-bold text-white mb-2">1,284</h3>
                    <div className="flex items-center gap-2 text-[#7BAE7F]">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-sm">+15.2%</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
              </Card>

              <Card className="backdrop-blur-md bg-gradient-to-br from-[#2E5E4E] to-[#7BAE7F] border-white/10 p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-white/80 mb-2">Inventario</p>
                    <h3 className="text-3xl font-bold text-white mb-2">847</h3>
                    <div className="flex items-center gap-2 text-red-400">
                      <TrendingDown className="w-4 h-4" />
                      <span className="text-sm">-3.1%</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sales Chart */}
              <Card className="backdrop-blur-md bg-white/5 border-white/10 p-6">
                <h3 className="text-xl font-semibold text-white mb-6">
                  Ventas mensuales
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                    <XAxis dataKey="month" stroke="#ffffff60" />
                    <YAxis stroke="#ffffff60" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1E2B24",
                        border: "1px solid #ffffff20",
                        borderRadius: "8px",
                        color: "#ffffff",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="ventas"
                      stroke="#7BAE7F"
                      strokeWidth={3}
                      name="Ventas ($)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              {/* Category Distribution */}
              <Card className="backdrop-blur-md bg-white/5 border-white/10 p-6">
                <h3 className="text-xl font-semibold text-white mb-6">
                  Distribución por categoría
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1E2B24",
                        border: "1px solid #ffffff20",
                        borderRadius: "8px",
                        color: "#ffffff",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </div>

            {/* Tables Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Orders */}
              <Card className="backdrop-blur-md bg-white/5 border-white/10 p-6">
                <h3 className="text-xl font-semibold text-white mb-6">
                  Órdenes recientes
                </h3>
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10">
                      <TableHead className="text-white/60">ID</TableHead>
                      <TableHead className="text-white/60">Cliente</TableHead>
                      <TableHead className="text-white/60">Monto</TableHead>
                      <TableHead className="text-white/60">Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentOrders.map((order) => (
                      <TableRow key={order.id} className="border-white/10">
                        <TableCell className="text-white/90">
                          {order.id}
                        </TableCell>
                        <TableCell className="text-white/90">
                          {order.customer}
                        </TableCell>
                        <TableCell className="text-white/90">
                          ${order.amount}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              order.status === "Completado"
                                ? "bg-[#7BAE7F] text-white"
                                : order.status === "En proceso"
                                ? "bg-blue-500 text-white"
                                : "bg-yellow-500 text-white"
                            }
                          >
                            {order.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>

              {/* Low Stock Alert */}
              <Card className="backdrop-blur-md bg-white/5 border-white/10 p-6">
                <div className="flex items-center gap-2 mb-6">
                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                  <h3 className="text-xl font-semibold text-white">
                    Alertas de inventario
                  </h3>
                </div>
                <div className="space-y-4">
                  {lowStockProducts.map((product, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl backdrop-blur-md bg-yellow-500/10 border border-yellow-500/30"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-white">
                          {product.name}
                        </p>
                        <Badge className="bg-yellow-500 text-white">
                          Stock bajo
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-white/70">
                        <span>Stock actual: {product.stock}</span>
                        <span>Mínimo: {product.min}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
