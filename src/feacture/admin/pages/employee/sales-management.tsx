import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../components/ui/drawer";
import {
  ShoppingCart,
  TrendingUp,
  DollarSign,
  Package,
  Search,
  Eye,
  Download,
  Filter,
  Calendar,
  User,
  MapPin,
  CreditCard,
  Truck,
} from "lucide-react";
import { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export function SalesManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const salesStats = [
    {
      label: "Ventas Esta Semana",
      value: "$45,890",
      change: "+12.5%",
      icon: DollarSign,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
    },
    {
      label: "Órdenes Totales",
      value: "156",
      change: "+8",
      icon: ShoppingCart,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
    {
      label: "Ticket Promedio",
      value: "$294",
      change: "+5.2%",
      icon: TrendingUp,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
    },
    {
      label: "Productos Vendidos",
      value: "423",
      change: "+18",
      icon: Package,
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
    },
  ];

  const weeklyData = [
    { day: "Lun", ventas: 4200 },
    { day: "Mar", ventas: 5800 },
    { day: "Mié", ventas: 7200 },
    { day: "Jue", ventas: 6500 },
    { day: "Vie", ventas: 8900 },
    { day: "Sáb", ventas: 9400 },
    { day: "Dom", ventas: 3800 },
  ];

  const orders = [
    {
      id: "#ORD-12345",
      customer: "María González",
      date: "2026-05-31 10:30",
      products: [
        { name: "Monstera Deliciosa", qty: 1, price: 890 },
        { name: "Maceta Cerámica", qty: 1, price: 450 },
      ],
      subtotal: 1340,
      shipping: 150,
      total: 1490,
      paymentStatus: "pagado",
      paymentMethod: "Tarjeta de Crédito",
      deliveryStatus: "entregado",
      address: "Av. Reforma 123, CDMX",
      phone: "+52 55 1234 5678",
    },
    {
      id: "#ORD-12346",
      customer: "Carlos Mendoza",
      date: "2026-05-31 09:15",
      products: [
        { name: "Ficus Lyrata", qty: 2, price: 1290 },
        { name: "Fertilizante Orgánico", qty: 3, price: 280 },
      ],
      subtotal: 3420,
      shipping: 200,
      total: 3620,
      paymentStatus: "pagado",
      paymentMethod: "PayPal",
      deliveryStatus: "en-camino",
      address: "Polanco 456, CDMX",
      phone: "+52 55 9876 5432",
    },
    {
      id: "#ORD-12347",
      customer: "Ana Rodríguez",
      date: "2026-05-30 16:45",
      products: [
        { name: "Kit Herramientas Pro", qty: 1, price: 890 },
        { name: "Sustrato Premium", qty: 2, price: 450 },
      ],
      subtotal: 1790,
      shipping: 150,
      total: 1940,
      paymentStatus: "pendiente",
      paymentMethod: "Transferencia",
      deliveryStatus: "procesando",
      address: "Condesa 789, CDMX",
      phone: "+52 55 5555 1111",
    },
    {
      id: "#ORD-12348",
      customer: "Roberto Sánchez",
      date: "2026-05-30 14:20",
      products: [{ name: "Sansevieria", qty: 4, price: 490 }],
      subtotal: 1960,
      shipping: 150,
      total: 2110,
      paymentStatus: "pagado",
      paymentMethod: "Tarjeta de Débito",
      deliveryStatus: "entregado",
      address: "Santa Fe 321, CDMX",
      phone: "+52 55 2222 3333",
    },
  ];

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "pagado":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "pendiente":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "rechazado":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-white/20 text-gray-300 border-white/30";
    }
  };

  const getDeliveryStatusColor = (status: string) => {
    switch (status) {
      case "entregado":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "en-camino":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "procesando":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "cancelado":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-white/20 text-gray-300 border-white/30";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white">
            Gestión de Ventas
          </h1>
          <p className="text-gray-300 mt-1">
            Administra órdenes, pagos y entregas
          </p>
        </div>
        <Button
          variant="ghost"
          className="text-gray-300 hover:text-white hover:bg-white/10"
        >
          <Download className="w-4 h-4 mr-2" />
          Exportar Reporte
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {salesStats.map((stat, index) => (
          <Card
            key={index}
            className="p-6 bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-gray-300 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-semibold text-white mb-2">
                  {stat.value}
                </p>
                <span className="text-green-400 text-xs">{stat.change}</span>
              </div>
              <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Sales Chart */}
      <Card className="p-6 bg-white/5 backdrop-blur-md border-white/10">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white">Ventas Semanales</h2>
          <p className="text-gray-300 text-sm">Ingresos por día</p>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="day" stroke="rgba(255,255,255,0.6)" />
            <YAxis stroke="rgba(255,255,255,0.6)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(30, 43, 36, 0.95)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                color: "#fff",
              }}
            />
            <Bar dataKey="ventas" fill="#7BAE7F" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Filters */}
      <Card className="p-4 bg-white/5 backdrop-blur-md border-white/10">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Buscar por ID de orden o cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[200px] bg-white/5 border-white/10 text-[#1E2B24]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estados</SelectItem>
              <SelectItem value="pagado">Pagado</SelectItem>
              <SelectItem value="pendiente">Pendiente</SelectItem>
              <SelectItem value="procesando">Procesando</SelectItem>
              <SelectItem value="entregado">Entregado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Orders Table */}
      <Card className="bg-white/5 backdrop-blur-md border-white/10 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-white/5">
              <TableHead className="text-gray-300">ID Orden</TableHead>
              <TableHead className="text-gray-300">Cliente</TableHead>
              <TableHead className="text-gray-300">Fecha</TableHead>
              <TableHead className="text-gray-300">Total</TableHead>
              <TableHead className="text-gray-300">Pago</TableHead>
              <TableHead className="text-gray-300">Entrega</TableHead>
              <TableHead className="text-gray-300 text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                key={order.id}
                className="border-white/10 hover:bg-white/5"
              >
                <TableCell className="text-white font-medium">
                  {order.id}
                </TableCell>
                <TableCell className="text-white">{order.customer}</TableCell>
                <TableCell className="text-gray-300 text-sm">
                  {order.date}
                </TableCell>
                <TableCell className="text-[#7BAE7F] font-semibold">
                  ${order.total.toLocaleString()}
                </TableCell>
                <TableCell>
                  <Badge className={getPaymentStatusColor(order.paymentStatus)}>
                    {order.paymentStatus}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    className={getDeliveryStatusColor(order.deliveryStatus)}
                  >
                    {order.deliveryStatus}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Drawer>
                    <DrawerTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-300 hover:text-white hover:bg-white/10"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </DrawerTrigger>
                    <DrawerContent className="bg-[#1E2B24] border-white/10 text-white">
                      <DrawerHeader>
                        <DrawerTitle className="text-white text-2xl">
                          Detalles de Orden {order.id}
                        </DrawerTitle>
                        <DrawerDescription className="text-gray-300">
                          Información completa de la orden
                        </DrawerDescription>
                      </DrawerHeader>
                      <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                        {/* Customer Info */}
                        <Card className="p-4 bg-white/5 border-white/10">
                          <h3 className="text-lg font-semibold text-white mb-3">
                            Información del Cliente
                          </h3>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-gray-400">
                              <User className="w-4 h-4 text-gray-300" />
                              <span>{order.customer}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                              <MapPin className="w-4 h-4 text-gray-300" />
                              <span>{order.address}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                              <Calendar className="w-4 h-4 text-gray-300" />
                              <span>{order.date}</span>
                            </div>
                          </div>
                        </Card>

                        {/* Products */}
                        <Card className="p-4 bg-white/5 border-white/10">
                          <h3 className="text-lg font-semibold text-white mb-3">
                            Productos
                          </h3>
                          <div className="space-y-3">
                            {order.products.map((product, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10"
                              >
                                <div>
                                  <p className="text-white font-medium">
                                    {product.name}
                                  </p>
                                  <p className="text-gray-300 text-sm">
                                    Cantidad: {product.qty}
                                  </p>
                                </div>
                                <p className="text-[#7BAE7F] font-semibold">
                                  ${(product.price * product.qty).toLocaleString()}
                                </p>
                              </div>
                            ))}
                          </div>
                        </Card>

                        {/* Payment & Delivery */}
                        <div className="grid grid-cols-2 gap-4">
                          <Card className="p-4 bg-white/5 border-white/10">
                            <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                              <CreditCard className="w-4 h-4" />
                              Pago
                            </h3>
                            <Badge
                              className={getPaymentStatusColor(
                                order.paymentStatus
                              )}
                            >
                              {order.paymentStatus}
                            </Badge>
                            <p className="text-gray-300 text-sm mt-2">
                              {order.paymentMethod}
                            </p>
                          </Card>
                          <Card className="p-4 bg-white/5 border-white/10">
                            <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                              <Truck className="w-4 h-4" />
                              Entrega
                            </h3>
                            <Badge
                              className={getDeliveryStatusColor(
                                order.deliveryStatus
                              )}
                            >
                              {order.deliveryStatus}
                            </Badge>
                            <p className="text-gray-300 text-sm mt-2">
                              Envío: ${order.shipping}
                            </p>
                          </Card>
                        </div>

                        {/* Total */}
                        <Card className="p-4 bg-gradient-to-br from-[#2E5E4E]/20 to-[#7BAE7F]/20 border-white/10">
                          <div className="space-y-2">
                            <div className="flex justify-between text-gray-400">
                              <span>Subtotal</span>
                              <span>${order.subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-gray-400">
                              <span>Envío</span>
                              <span>${order.shipping.toLocaleString()}</span>
                            </div>
                            <div className="h-px bg-white/10 my-2" />
                            <div className="flex justify-between text-white text-xl font-semibold">
                              <span>Total</span>
                              <span className="text-[#7BAE7F]">
                                ${order.total.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </Card>
                      </div>
                      <DrawerFooter>
                        <Button className="bg-gradient-to-r from-[#2E5E4E] to-[#7BAE7F] hover:opacity-90 text-white">
                          Imprimir Factura
                        </Button>
                        <DrawerClose asChild>
                          <Button
                            variant="ghost"
                            className="text-gray-300 hover:text-white hover:bg-white/10"
                          >
                            Cerrar
                          </Button>
                        </DrawerClose>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
