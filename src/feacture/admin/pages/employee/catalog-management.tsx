import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
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
  Package,
  Plus,
  Search,
  Edit,
  Trash2,
  Image as ImageIcon,
  Upload,
  AlertCircle,
  CheckCircle,
  Eye,
  Filter,
} from "lucide-react";
import { useState } from "react";

export function CatalogManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const products = [
    {
      id: 1,
      name: "Monstera Deliciosa",
      category: "Interior",
      price: 890,
      stock: 25,
      status: "activo",
      image: "https://images.unsplash.com/photo-1525498128493-380d1990a112",
    },
    {
      id: 2,
      name: "Ficus Lyrata",
      category: "Interior",
      price: 1290,
      stock: 15,
      status: "activo",
      image: "https://images.unsplash.com/photo-1531875985735-f135dac5f230",
    },
    {
      id: 3,
      name: "Lavanda",
      category: "Exterior",
      price: 340,
      stock: 8,
      status: "bajo-stock",
      image: "https://images.unsplash.com/photo-1499002238440-d264edd596ec",
    },
    {
      id: 4,
      name: "Sansevieria",
      category: "Interior",
      price: 490,
      stock: 30,
      status: "activo",
      image: "https://images.unsplash.com/photo-1687552212914-03a30c82053c",
    },
    {
      id: 5,
      name: "Maceta Cerámica",
      category: "Macetas",
      price: 650,
      stock: 0,
      status: "sin-stock",
      image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411",
    },
    {
      id: 6,
      name: "Fertilizante Orgánico",
      category: "Insumos",
      price: 280,
      stock: 45,
      status: "activo",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b",
    },
  ];

  const categories = [
    "Interior",
    "Exterior",
    "Macetas",
    "Insumos",
    "Herramientas",
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "activo":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "bajo-stock":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "sin-stock":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-white/20 text-gray-300 border-white/30";
    }
  };

  const ProductFormContent = () => (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <Label className="text-white">Nombre del Producto</Label>
        <Input
          placeholder="Ej: Monstera Deliciosa"
          className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-white">Categoría</Label>
          <Select>
            <SelectTrigger className="bg-white/5 border-white/10 text-[#1E2B24]">
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat.toLowerCase()}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-white">Precio (MXN)</Label>
          <Input
            type="number"
            placeholder="0.00"
            className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-white">Stock Inicial</Label>
          <Input
            type="number"
            placeholder="0"
            className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-white">Stock Mínimo</Label>
          <Input
            type="number"
            placeholder="0"
            className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-white">Descripción</Label>
        <Textarea
          placeholder="Descripción del producto..."
          className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-white">Imagen del Producto</Label>
        <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-[#7BAE7F] transition-colors cursor-pointer bg-white/5">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-300 text-sm mb-1">
            Arrastra una imagen o haz clic para seleccionar
          </p>
          <p className="text-gray-400 text-xs">PNG, JPG hasta 5MB</p>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button className="flex-1 bg-gradient-to-r from-[#2E5E4E] to-[#7BAE7F] hover:opacity-90 text-white">
          <CheckCircle className="w-4 h-4 mr-2" />
          Guardar Producto
        </Button>
        <Button
          variant="ghost"
          className="text-gray-300 hover:text-white hover:bg-white/10"
        >
          Cancelar
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white">
            Gestión de Catálogo
          </h1>
          <p className="text-gray-300 mt-1">
            Administra productos, precios e inventario
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-[#2E5E4E] to-[#7BAE7F] hover:opacity-90 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Producto
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#1E2B24] border-white/10 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white text-xl">
                Crear Nuevo Producto
              </DialogTitle>
              <DialogDescription className="text-gray-300">
                Completa los datos del producto para agregarlo al catálogo
              </DialogDescription>
            </DialogHeader>
            <ProductFormContent />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-white/5 backdrop-blur-md border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-green-500/10">
              <Package className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-gray-300 text-sm">Total Productos</p>
              <p className="text-2xl font-semibold text-white">
                {products.length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-white/5 backdrop-blur-md border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-green-500/10">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-gray-300 text-sm">Activos</p>
              <p className="text-2xl font-semibold text-white">
                {products.filter((p) => p.status === "activo").length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-white/5 backdrop-blur-md border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-orange-500/10">
              <AlertCircle className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <p className="text-gray-300 text-sm">Bajo Stock</p>
              <p className="text-2xl font-semibold text-white">
                {products.filter((p) => p.status === "bajo-stock").length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-white/5 backdrop-blur-md border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-red-500/10">
              <AlertCircle className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <p className="text-gray-300 text-sm">Sin Stock</p>
              <p className="text-2xl font-semibold text-white">
                {products.filter((p) => p.status === "sin-stock").length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="p-6 bg-white/5 backdrop-blur-md border-white/10">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Buscar productos por nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-[200px] bg-white/5 border-white/10 text-[#1E2B24]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las categorías</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat.toLowerCase()}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Products Table */}
      <Card className="bg-white/5 backdrop-blur-md border-white/10 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-white/5">
              <TableHead className="text-gray-300">Producto</TableHead>
              <TableHead className="text-gray-300">Categoría</TableHead>
              <TableHead className="text-gray-300">Precio</TableHead>
              <TableHead className="text-gray-300">Stock</TableHead>
              <TableHead className="text-gray-300">Estado</TableHead>
              <TableHead className="text-gray-300 text-right">
                Acciones
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                className="border-white/10 hover:bg-white/5"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-white/10 overflow-hidden flex-shrink-0">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="w-5 h-5 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-white font-medium">{product.name}</p>
                      <p className="text-gray-400 text-sm">ID: {product.id}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className="bg-white/10 text-gray-400 border-white/20">
                    {product.category}
                  </Badge>
                </TableCell>
                <TableCell className="text-white">
                  ${product.price.toLocaleString()}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-white">{product.stock}</span>
                    <span className="text-gray-400 text-sm">unidades</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(product.status)}>
                    {product.status === "activo"
                      ? "Activo"
                      : product.status === "bajo-stock"
                        ? "Bajo Stock"
                        : "Sin Stock"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-300 hover:text-white hover:bg-white/10"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-[#1E2B24] border-white/10 text-white max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="text-white text-xl">
                            Editar Producto
                          </DialogTitle>
                          <DialogDescription className="text-gray-300">
                            Modifica los datos del producto {product.name}
                          </DialogDescription>
                        </DialogHeader>
                        <ProductFormContent />
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
