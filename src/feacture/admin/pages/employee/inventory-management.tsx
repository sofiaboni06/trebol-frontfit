import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import {
  Archive,
  TrendingUp,
  TrendingDown,
  Package,
  AlertTriangle,
  Plus,
  ArrowUpCircle,
  ArrowDownCircle,
  RefreshCw,
  BarChart3,
} from "lucide-react";
import { useEffect, useState } from "react";
import productService from "../../../../services/product.service";
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

export function InventoryManagement() {
  const [isAdjustDialogOpen, setIsAdjustDialogOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [inventoryError, setInventoryError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      setLoadingProducts(true);
      setInventoryError("");
      try {
        const fetchedProducts = await productService.getProducts();
        setProducts(Array.isArray(fetchedProducts) ? fetchedProducts : []);
      } catch (error) {
        console.error(error);
        setInventoryError("No se pudo cargar el inventario.");
      } finally {
        setLoadingProducts(false);
      }
    };

    loadProducts();
  }, []);

  const totalStockValue = products.reduce((sum, product) => {
    const stock = Number(product.stock ?? 0);
    const price = Number(product.precio ?? 0);
    return sum + stock * price;
  }, 0);

  const inStockCount = products.filter((product) => Number(product.stock ?? 0) > 0).length;
  const lowStockCount = products.filter(
    (product) => Number(product.stock ?? 0) > 0 && Number(product.stock ?? 0) < 10
  ).length;

  const inventoryStats = [
    {
      title: "Valor Total Inventario",
      value: `$${totalStockValue.toLocaleString()}`,
      change: "+8.2%",
      trend: "up",
      icon: Package,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Productos en Stock",
      value: inStockCount.toLocaleString(),
      change: "+12",
      trend: "up",
      icon: Archive,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Bajo Stock",
      value: lowStockCount.toLocaleString(),
      change: "+5",
      trend: "up",
      icon: AlertTriangle,
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
    },
    {
      title: "Movimientos Hoy",
      value: "47",
      change: "-8",
      trend: "down",
      icon: RefreshCw,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
    },
  ];

  const stockMovementData = [
    { month: "Ene", entradas: 120, salidas: 95 },
    { month: "Feb", entradas: 145, salidas: 110 },
    { month: "Mar", entradas: 167, salidas: 135 },
    { month: "Abr", entradas: 154, salidas: 142 },
    { month: "May", entradas: 198, salidas: 165 },
  ];

  const recentMovements = [
    {
      id: 1,
      product: "Monstera Deliciosa",
      type: "entrada",
      quantity: 15,
      reason: "Compra a proveedor",
      date: "2026-05-31 09:30",
      user: "Juan Pérez",
    },
    {
      id: 2,
      product: "Fertilizante Orgánico",
      type: "salida",
      quantity: 8,
      reason: "Venta a cliente",
      date: "2026-05-31 08:15",
      user: "María García",
    },
    {
      id: 3,
      product: "Maceta Cerámica",
      type: "ajuste",
      quantity: -2,
      reason: "Productos dañados",
      date: "2026-05-30 16:45",
      user: "Carlos López",
    },
    {
      id: 4,
      product: "Ficus Lyrata",
      type: "entrada",
      quantity: 10,
      reason: "Reabastecimiento",
      date: "2026-05-30 14:20",
      user: "Ana Martínez",
    },
    {
      id: 5,
      product: "Sustrato Premium",
      type: "salida",
      quantity: 25,
      reason: "Servicio de paisajismo",
      date: "2026-05-30 11:00",
      user: "Diego Ramírez",
    },
  ];

  const lowStockItems = products
    .filter((product) => Number(product.stock ?? 0) > 0 && Number(product.stock ?? 0) < 10)
    .slice(0, 4)
    .map((product) => ({
      name: product.nombre || "Producto",
      current: Number(product.stock ?? 0),
      minimum: 10,
      category: product.categoria?.nombre || "Sin categoría",
      lastUpdate: "Reciente",
    }));

  const getMovementIcon = (type: string) => {
    switch (type) {
      case "entrada":
        return <ArrowUpCircle className="w-5 h-5 text-green-400" />;
      case "salida":
        return <ArrowDownCircle className="w-5 h-5 text-red-400" />;
      case "ajuste":
        return <RefreshCw className="w-5 h-5 text-orange-400" />;
      default:
        return null;
    }
  };

  const getMovementColor = (type: string) => {
    switch (type) {
      case "entrada":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "salida":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "ajuste":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      default:
        return "bg-white/20 text-gray-300 border-white/30";
    }
  };

  const renderInventoryStatus = () => {
    if (loadingProducts) {
      return (
        <div className="rounded-3xl border border-white/[0.08] bg-white/[0.04] p-6 text-[#B8C5B3]">
          Cargando datos de inventario...
        </div>
      );
    }

    if (inventoryError) {
      return (
        <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-6 text-red-200">
          {inventoryError}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white">
            Gestión de Inventario
          </h1>
          <p className="text-gray-300 mt-1">
            Control de stock y movimientos de productos
          </p>
        </div>
        <Dialog open={isAdjustDialogOpen} onOpenChange={setIsAdjustDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-[#2E5E4E] to-[#7BAE7F] hover:opacity-90 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Ajustar Inventario
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#1E2B24] border-white/10 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white text-xl">
                Ajuste de Inventario
              </DialogTitle>
              <DialogDescription className="text-gray-300">
                Registra entradas, salidas o ajustes de stock
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label className="text-white">Tipo de Movimiento</Label>
                <Select>
                  <SelectTrigger className="bg-white/5 border-white/10 text-[#1E2B24]">
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entrada">Entrada</SelectItem>
                    <SelectItem value="salida">Salida</SelectItem>
                    <SelectItem value="ajuste">Ajuste</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-white">Producto</Label>
                <Select>
                  <SelectTrigger className="bg-white/5 border-white/10 text-[#1E2B24]">
                    <SelectValue placeholder="Seleccionar producto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monstera">Monstera Deliciosa</SelectItem>
                    <SelectItem value="ficus">Ficus Lyrata</SelectItem>
                    <SelectItem value="fertilizante">
                      Fertilizante Orgánico
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white">Cantidad</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    className="bg-white/5 border-white/10 text-[#1E2B24]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Bodega</Label>
                  <Select>
                    <SelectTrigger className="bg-white/5 border-white/10 text-[#1E2B24]">
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bodega1">Bodega Principal</SelectItem>
                      <SelectItem value="bodega2">Bodega Secundaria</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-white">Motivo</Label>
                <Input
                  placeholder="Ej: Compra a proveedor"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button className="flex-1 bg-gradient-to-r from-[#2E5E4E] to-[#7BAE7F] hover:opacity-90 text-white">
                  Registrar Movimiento
                </Button>
                <Button
                  variant="ghost"
                  className="text-gray-300 hover:text-white hover:bg-white/10"
                  onClick={() => setIsAdjustDialogOpen(false)}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {renderInventoryStatus()}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {inventoryStats.map((stat, index) => (
          <Card
            key={index}
            className="p-6 bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-gray-300 text-sm mb-1">{stat.title}</p>
                <p className="text-3xl font-semibold text-white mb-2">
                  {stat.value}
                </p>
                <div className="flex items-center gap-1">
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
                  <span className="text-xs text-gray-400">vs mes pasado</span>
                </div>
              </div>
              <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-white/5 backdrop-blur-md border-white/10">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white">
              Movimiento de Stock
            </h2>
            <p className="text-gray-300 text-sm">Últimos 5 meses</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stockMovementData}>
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
              <Bar dataKey="entradas" fill="#7BAE7F" name="Entradas" />
              <Bar dataKey="salidas" fill="#2E5E4E" name="Salidas" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-white/5 backdrop-blur-md border-white/10">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white">
              Productos Bajo Stock
            </h2>
            <p className="text-gray-300 text-sm">
              Requieren reabastecimiento urgente
            </p>
          </div>
          <div className="space-y-3">
            {lowStockItems.map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-white/5 border border-orange-500/20 hover:bg-white/10 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex-1">
                    <p className="text-white font-medium">{item.name}</p>
                    <p className="text-gray-300 text-sm">{item.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-orange-400 font-semibold">
                      {item.current} / {item.minimum}
                    </p>
                    <p className="text-gray-400 text-xs">{item.lastUpdate}</p>
                  </div>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
                    style={{
                      width: `${(item.current / item.minimum) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Movements Table */}
      <Card className="bg-white/5 backdrop-blur-md border-white/10">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">
                Movimientos Recientes
              </h2>
              <p className="text-gray-300 text-sm">
                Historial de entradas, salidas y ajustes
              </p>
            </div>
            <Button
              variant="ghost"
              className="text-gray-300 hover:text-white hover:bg-white/10"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Ver Reportes
            </Button>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-white/5">
              <TableHead className="text-gray-300">Tipo</TableHead>
              <TableHead className="text-gray-300">Producto</TableHead>
              <TableHead className="text-gray-300">Cantidad</TableHead>
              <TableHead className="text-gray-300">Motivo</TableHead>
              <TableHead className="text-gray-300">Usuario</TableHead>
              <TableHead className="text-gray-300">Fecha</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentMovements.map((movement) => (
              <TableRow
                key={movement.id}
                className="border-white/10 hover:bg-white/5"
              >
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getMovementIcon(movement.type)}
                    <Badge className={getMovementColor(movement.type)}>
                      {movement.type}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="text-white">{movement.product}</TableCell>
                <TableCell>
                  <span
                    className={`font-semibold ${
                      movement.type === "entrada"
                        ? "text-green-400"
                        : movement.type === "salida"
                          ? "text-red-400"
                          : "text-orange-400"
                    }`}
                  >
                    {movement.quantity > 0 ? "+" : ""}
                    {movement.quantity}
                  </span>
                </TableCell>
                <TableCell className="text-gray-300">
                  {movement.reason}
                </TableCell>
                <TableCell className="text-gray-300">{movement.user}</TableCell>
                <TableCell className="text-gray-300">{movement.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
