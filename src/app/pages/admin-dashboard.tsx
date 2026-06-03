import { useState, useEffect } from "react";
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
  Trash2,
  Edit,
  Plus,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import categoryService from "../../services/category.service";

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
  // Estado para categorías
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    imagen: "",
    estado: "activo",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  // Datos estáticos existentes
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

  // ==================== FUNCIONES CRUD ====================

  // 1. Cargar categorías
  const loadCategories = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await categoryService.getCategories();
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Error al cargar categorías: " + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Cargar categorías al montar el componente
  useEffect(() => {
    loadCategories();
  }, []);

  // Limpiar mensajes después de 5 segundos
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // 2. Crear categoría
  const handleCreateCategory = async () => {
    try {
      if (!formData.nombre || !formData.descripcion) {
        setError("Por favor completa nombre y descripción");
        return;
      }

      setLoading(true);
      setError("");
      await categoryService.createCategory(formData);
      setSuccess("Categoría creada exitosamente");
      setFormData({
        nombre: "",
        descripcion: "",
        imagen: "",
        estado: "activo",
      });
      await loadCategories();
    } catch (err) {
      setError("Error al crear categoría: " + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 3. Editar categoría - Cargar datos
  const handleEditStart = (category) => {
    setEditingId(category.id);
    setFormData({
      nombre: category.nombre || "",
      descripcion: category.descripcion || "",
      imagen: category.imagen || "",
      estado: category.estado || "activo",
    });
  };

  // 4. Guardar cambios de edición
  const handleUpdateCategory = async () => {
    try {
      if (!formData.nombre || !formData.descripcion) {
        setError("Por favor completa nombre y descripción");
        return;
      }

      setLoading(true);
      setError("");
      await categoryService.updateCategory(editingId, formData);
      setSuccess("Categoría actualizada exitosamente");
      setEditingId(null);
      setFormData({
        nombre: "",
        descripcion: "",
        imagen: "",
        estado: "activo",
      });
      await loadCategories();
    } catch (err) {
      setError("Error al actualizar categoría: " + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 5. Eliminar categoría (con confirmación)
  const handleDeleteCategory = async (id) => {
    try {
      setLoading(true);
      setError("");
      await categoryService.deleteCategory(id);
      setSuccess("Categoría eliminada exitosamente");
      setShowDeleteConfirm(null);
      await loadCategories();
    } catch (err) {
      setError("Error al eliminar categoría: " + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Cancelar edición
  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({
      nombre: "",
      descripcion: "",
      imagen: "",
      estado: "activo",
    });
  };

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
                    <SidebarMenuButton 
                      className={`${activeTab === 'dashboard' ? 'text-white bg-white/10' : 'text-white/60 hover:bg-white/10 hover:text-white'}`}
                      onClick={() => setActiveTab("dashboard")}
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      <span>Dashboard</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      className={`${activeTab === 'categorias' ? 'text-white bg-white/10' : 'text-white/60 hover:bg-white/10 hover:text-white'}`}
                      onClick={() => setActiveTab("categorias")}
                    >
                      <Package className="w-4 h-4" />
                      <span>Categorías</span>
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
                <h1 className="text-2xl font-bold text-white">
                  {activeTab === "dashboard" ? "Dashboard" : "Gestión de Categorías"}
                </h1>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <Input
                    placeholder="Buscar..."
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40 w-64"
                  />
                </div>
                {activeTab === "dashboard" && (
                  <Button className="bg-gradient-to-br from-[#7BAE7F] to-[#2E5E4E] hover:from-[#2E5E4E] hover:to-[#1E2B24] text-white rounded-full">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Insights IA
                  </Button>
                )}
              </div>
            </div>
          </header>

          <main className="p-6 space-y-6">
            {/* Mostrar Dashboard o Categorías según activeTab */}
            {activeTab === "dashboard" ? (
              <>
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
              </>
            ) : (
              <>
                {/* ==================== SECCIÓN DE CATEGORÍAS - CRUD ==================== */}
                
                {/* Mensajes de éxito y error */}
                {success && (
                  <Card className="bg-green-500/10 border-green-500/30 p-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <p className="text-green-400">{success}</p>
                  </Card>
                )}
                {error && (
                  <Card className="bg-red-500/10 border-red-500/30 p-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    <p className="text-red-400">{error}</p>
                  </Card>
                )}

                {/* Formulario para crear/editar categoría */}
                <Card className="backdrop-blur-md bg-white/5 border-white/10 p-6">
                  <h3 className="text-xl font-semibold text-white mb-6">
                    {editingId ? "Editar Categoría" : "Crear Nueva Categoría"}
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">
                        Nombre *
                      </label>
                      <Input
                        value={formData.nombre}
                        onChange={(e) =>
                          setFormData({ ...formData, nombre: e.target.value })
                        }
                        placeholder="Ej: Plantas de Interior"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                      />
                    </div>

                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-2">
                        Estado
                      </label>
                      <select
                        value={formData.estado}
                        onChange={(e) =>
                          setFormData({ ...formData, estado: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#7BAE7F]"
                      >
                        <option value="activo" className="bg-[#1E2B24]">Activo</option>
                        <option value="inactivo" className="bg-[#1E2B24]">Inactivo</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      Descripción *
                    </label>
                    <textarea
                      value={formData.descripcion}
                      onChange={(e) =>
                        setFormData({ ...formData, descripcion: e.target.value })
                      }
                      placeholder="Ej: Plantas ideales para interiores con poca luz"
                      rows={3}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 text-white placeholder:text-white/40 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7BAE7F]"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-white/80 text-sm font-medium mb-2">
                      URL Imagen (opcional)
                    </label>
                    <Input
                      value={formData.imagen}
                      onChange={(e) =>
                        setFormData({ ...formData, imagen: e.target.value })
                      }
                      placeholder="https://ejemplo.com/imagen.jpg"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                    />
                  </div>

                  <div className="flex gap-4">
                    {editingId ? (
                      <>
                        <Button
                          onClick={handleUpdateCategory}
                          disabled={loading}
                          className="bg-gradient-to-br from-[#7BAE7F] to-[#2E5E4E] hover:from-[#2E5E4E] hover:to-[#1E2B24] text-white"
                        >
                          {loading ? "Guardando..." : "Guardar Cambios"}
                        </Button>
                        <Button
                          onClick={handleCancelEdit}
                          disabled={loading}
                          className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
                        >
                          Cancelar
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={handleCreateCategory}
                        disabled={loading}
                        className="bg-gradient-to-br from-[#7BAE7F] to-[#2E5E4E] hover:from-[#2E5E4E] hover:to-[#1E2B24] text-white"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        {loading ? "Creando..." : "Crear Categoría"}
                      </Button>
                    )}
                  </div>
                </Card>

                {/* Tabla de categorías */}
                <Card className="backdrop-blur-md bg-white/5 border-white/10 p-6">
                  <h3 className="text-xl font-semibold text-white mb-6">
                    Categorías Registradas
                  </h3>

                  {loading && categories.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-white/60">Cargando categorías...</p>
                    </div>
                  ) : categories.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-white/60">No hay categorías registradas aún</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-white/10">
                            <TableHead className="text-white/60">ID</TableHead>
                            <TableHead className="text-white/60">Nombre</TableHead>
                            <TableHead className="text-white/60">Descripción</TableHead>
                            <TableHead className="text-white/60">Estado</TableHead>
                            <TableHead className="text-white/60">Acciones</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {categories.map((category) => (
                            <TableRow
                              key={category.id}
                              className="border-white/10 hover:bg-white/5"
                            >
                              <TableCell className="text-white/90">
                                {category.id}
                              </TableCell>
                              <TableCell className="text-white/90">
                                {category.nombre}
                              </TableCell>
                              <TableCell className="text-white/70">
                                {category.descripcion?.substring(0, 50)}
                                {category.descripcion?.length > 50 ? "..." : ""}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  className={
                                    category.estado === "activo"
                                      ? "bg-[#7BAE7F] text-white"
                                      : "bg-gray-500 text-white"
                                  }
                                >
                                  {category.estado}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button
                                    onClick={() => handleEditStart(category)}
                                    disabled={loading || editingId !== null}
                                    className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/30 text-xs"
                                  >
                                    <Edit className="w-3 h-3 mr-1" />
                                    Editar
                                  </Button>
                                  <Button
                                    onClick={() => setShowDeleteConfirm(category.id)}
                                    disabled={loading}
                                    className="bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 text-xs"
                                  >
                                    <Trash2 className="w-3 h-3 mr-1" />
                                    Eliminar
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </Card>

                {/* Modal de confirmación para eliminar */}
                {showDeleteConfirm && (
                  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <Card className="bg-[#1E2B24] border-white/10 p-8 max-w-md">
                      <h3 className="text-lg font-semibold text-white mb-4">
                        Confirmar eliminación
                      </h3>
                      <p className="text-white/70 mb-6">
                        ¿Estás seguro de que deseas eliminar esta categoría? Esta acción no se
                        puede deshacer.
                      </p>
                      <div className="flex gap-4">
                        <Button
                          onClick={() => handleDeleteCategory(showDeleteConfirm)}
                          disabled={loading}
                          className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                        >
                          {loading ? "Eliminando..." : "Eliminar"}
                        </Button>
                        <Button
                          onClick={() => setShowDeleteConfirm(null)}
                          disabled={loading}
                          className="flex-1 bg-white/10 hover:bg-white/20 text-white border border-white/20"
                        >
                          Cancelar
                        </Button>
                      </div>
                    </Card>
                  </div>
                )}
              </>
            )}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
