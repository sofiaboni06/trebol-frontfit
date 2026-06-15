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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
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
  Loader,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import productService from "../../../../services/product.service";
import categoryService from "../../../../services/category.service";

interface ProductForm {
  nombre: string;
  descripcion: string;
  precio: string;
  costo: string;
  precioVenta: string;
  stock: string;
  categoriaId: string;
  imagenPrincipal: string;
}

const INITIAL_FORM: ProductForm = {
  nombre: "",
  descripcion: "",
  precio: "",
  costo: "",
  precioVenta: "",
  stock: "",
  categoriaId: "",
  imagenPrincipal: "",
};

export function CatalogManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [productError, setProductError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [formData, setFormData] = useState<ProductForm>(INITIAL_FORM);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [deletingProductId, setDeletingProductId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const productImageInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      setLoadingProducts(true);
      setProductError("");
      try {
        const data = await productService.getProducts();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        setProductError("No se pudieron cargar los productos.");
        toast.error("Error al cargar productos");
      } finally {
        setLoadingProducts(false);
      }
    };

    const loadCategories = async () => {
      setLoadingCategories(true);
      setCategoryError("");
      try {
        const data = await categoryService.getCategories();
        setCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        setCategoryError("No se pudieron cargar las categorías.");
        toast.error("Error al cargar categorías");
      } finally {
        setLoadingCategories(false);
      }
    };

    loadProducts();
    loadCategories();
  }, []);

  // Validar formulario
  const validateForm = (): boolean => {
    if (!formData.nombre.trim()) {
      toast.error("El nombre del producto es requerido");
      return false;
    }
    if (!formData.precio || parseFloat(formData.precio) <= 0) {
      toast.error("El precio debe ser mayor a 0");
      return false;
    }
    if (formData.costo && parseFloat(formData.costo) < 0) {
      toast.error("El costo no puede ser negativo");
      return false;
    }
    if (!formData.stock || parseInt(formData.stock) < 0) {
      toast.error("El stock no puede ser negativo");
      return false;
    }
    if (!formData.categoriaId) {
      toast.error("La categoría es requerida");
      return false;
    }
    return true;
  };

  // Validar y procesar imagen
  const validateAndPreviewImage = (file: File): boolean => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
    const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];

    // Validar tamaño
    if (file.size > maxSize) {
      toast.error("Imagen demasiado grande. Máximo 5MB");
      return false;
    }

    // Validar formato por MIME type
    if (!allowedFormats.includes(file.type)) {
      toast.error("Formato no permitido. Solo JPG, PNG o WebP");
      return false;
    }

    // Validar extensión del archivo
    const fileName = file.name.toLowerCase();
    const hasValidExtension = allowedExtensions.some((ext) =>
      fileName.endsWith(ext)
    );
    if (!hasValidExtension) {
      toast.error("Formato no permitido. Solo JPG, PNG o WebP");
      return false;
    }

    return true;
  };

  // Manejar selección de archivo
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (validateAndPreviewImage(file)) {
      setSelectedImage(file);

      // Crear vista previa
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target?.result as string;
        setPreviewUrl(url);
        toast.success("Imagen cargada, lista para subir");
      };
      reader.readAsDataURL(file);
    } else {
      // Limpiar estados si hay error
      setSelectedImage(null);
      setPreviewUrl("");
      e.target.value = ""; // Reset input
    }
  };

  // Subir imagen y obtener URL
  const uploadImageAndGetUrl = async (file: File): Promise<string | null> => {
    try {
      setUploadingImage(true);
      const url = await productService.uploadImage(file);
      if (url) {
        toast.success("Imagen cargada correctamente");
        return url;
      }
      return null;
    } catch (error) {
      toast.error("Error al subir la imagen");
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  // Limpiar imagen
  const clearImage = () => {
    setSelectedImage(null);
    setPreviewUrl("");
    if (productImageInputRef.current) {
      productImageInputRef.current.value = "";
    }
  };

  // Crear producto
  const handleCreateProduct = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      let imagenUrl = formData.imagenPrincipal;

      // Subir imagen si existe una seleccionada
      if (selectedImage) {
        const uploadedUrl = await uploadImageAndGetUrl(selectedImage);
        if (uploadedUrl) {
          imagenUrl = uploadedUrl;
        } else {
          setIsSubmitting(false);
          return; // Detener si falla la subida
        }
      }

      const productData = {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        precio: parseFloat(formData.precio),
        costo: formData.costo ? parseFloat(formData.costo) : undefined,
        precioVenta: formData.precioVenta ? parseFloat(formData.precioVenta) : undefined,
        stock: parseInt(formData.stock),
        categoriaId: parseInt(formData.categoriaId),
        imagenPrincipal: imagenUrl || "",
        estado: true,
        sku: `SKU-${Date.now()}`,
      };

      await productService.createProduct(productData);
      toast.success("Producto creado exitosamente");
      setFormData(INITIAL_FORM);
      clearImage();
      setIsCreateDialogOpen(false);

      // Recargar productos
      const data = await productService.getProducts();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || "Error al crear el producto";
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Actualizar producto
  const handleUpdateProduct = async () => {
    if (!validateForm() || editingProductId === null) return;

    setIsSubmitting(true);
    try {
      let imagenUrl = formData.imagenPrincipal;

      // Subir imagen si existe una seleccionada
      if (selectedImage) {
        const uploadedUrl = await uploadImageAndGetUrl(selectedImage);
        if (uploadedUrl) {
          imagenUrl = uploadedUrl;
        } else {
          setIsSubmitting(false);
          return; // Detener si falla la subida
        }
      }

      const productData = {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        precio: parseFloat(formData.precio),
        costo: formData.costo ? parseFloat(formData.costo) : undefined,
        precioVenta: formData.precioVenta ? parseFloat(formData.precioVenta) : undefined,
        stock: parseInt(formData.stock),
        categoriaId: parseInt(formData.categoriaId),
        imagenPrincipal: imagenUrl || "",
        estado: true,
      };

      await productService.updateProduct(editingProductId, productData);
      toast.success("Producto actualizado exitosamente");
      setFormData(INITIAL_FORM);
      clearImage();
      setEditingProductId(null);
      setIsEditDialogOpen(false);

      // Recargar productos
      const data = await productService.getProducts();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || "Error al actualizar el producto";
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Eliminar producto
  const handleDeleteProduct = async () => {
    if (deletingProductId === null) return;

    setIsDeleting(true);
    try {
      await productService.deleteProduct(deletingProductId);
      toast.success("Producto eliminado exitosamente");
      setDeletingProductId(null);
      setIsDeleteDialogOpen(false);

      // Recargar productos
      const data = await productService.getProducts();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || "Error al eliminar el producto";
      toast.error(errorMsg);
    } finally {
      setIsDeleting(false);
    }
  };

  // Abrir formulario para editar
  const openEditDialog = (product: any) => {
    setEditingProductId(product.id);
    setFormData({
      nombre: product.nombre || "",
      descripcion: product.descripcion || "",
      precio: product.precio?.toString() || "",
      costo: product.costo?.toString() || "",
      precioVenta: product.precioVenta?.toString() || "",
      stock: product.stock?.toString() || "",
      categoriaId: product.categoria?.id?.toString() || "",
      imagenPrincipal: product.imagenPrincipal || "",
    });
    setIsEditDialogOpen(true);
  };

  // Cerrar diálogos
  const closeCreateDialog = () => {
    setIsCreateDialogOpen(false);
    setFormData(INITIAL_FORM);
    clearImage();
  };

  const closeEditDialog = () => {
    setIsEditDialogOpen(false);
    setEditingProductId(null);
    setFormData(INITIAL_FORM);
    clearImage();
  };

  const productItems = products.map((product) => ({
    id: product.id,
    ...product,
    name: product.nombre || product.name || "Producto sin nombre",
    category:
      product.categoria?.nombre || product.categoria || product.category ||
      "Sin categoría",
    price: parseFloat(product.precio ?? product.price ?? 0) || 0,
    costo: parseFloat(product.costo ?? 0) || 0,
    precioVenta: parseFloat(product.precioVenta ?? product.precio ?? 0) || 0,
    stock: Number(product.stock ?? 0),
    status:
      product.estado === false
        ? "inactivo"
        : Number(product.stock ?? 0) === 0
        ? "sin-stock"
        : Number(product.stock ?? 0) < 10
        ? "bajo-stock"
        : "activo",
    image:
      product.imagenPrincipal ||
      product.image ||
      product.imagen ||
      "https://images.unsplash.com/photo-1525498128493-380d1990a112",
  }));

  const categoryOptions = categories.map((category, index) => {
    if (typeof category === "string") {
      return { id: category, name: category };
    }
    return {
      id: category.id || category.nombre || category.name || `category-${index}`,
      name: category.nombre || category.name || `Categoría ${category.id || ""}`,
    };
  });

  const filteredProducts = useMemo(() => {
    return productItems.filter((product) => {
      const matchesSearch =
        searchTerm.trim() === "" ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" ||
        product.category.toLowerCase() === selectedCategory.toLowerCase();
      return matchesSearch && matchesCategory;
    });
  }, [productItems, searchTerm, selectedCategory]);

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

  const renderProductFormContent = () => (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <Label className="text-white">Nombre del Producto *</Label>
        <Input
          placeholder="Ej: Monstera Deliciosa"
          value={formData.nombre}
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
          className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-white">Categoría *</Label>
          <Select value={formData.categoriaId} onValueChange={(value) => setFormData({ ...formData, categoriaId: value })}>
            <SelectTrigger className="bg-white/5 border-white/10 text-[#1E2B24]">
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent>
              {categoryOptions.length > 0 ? (
                categoryOptions.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id.toString()}>
                    {cat.name}
                  </SelectItem>
                ))
              ) : loadingCategories ? (
                <SelectItem value="">Cargando categorías...</SelectItem>
              ) : (
                <SelectItem value="">No hay categorías disponibles</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-white">Precio (MXN) *</Label>
          <Input
            type="number"
            placeholder="0.00"
            value={formData.precio}
            onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
            className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
            min="0"
            step="0.01"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-white">Costo (MXN)</Label>
          <Input
            type="number"
            placeholder="0.00"
            value={formData.costo}
            onChange={(e) => setFormData({ ...formData, costo: e.target.value })}
            className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
            min="0"
            step="0.01"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-white">Precio Venta (MXN)</Label>
          <Input
            type="number"
            placeholder="0.00"
            value={formData.precioVenta}
            onChange={(e) => setFormData({ ...formData, precioVenta: e.target.value })}
            className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
            min="0"
            step="0.01"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-white">Stock Inicial *</Label>
        <Input
          type="number"
          placeholder="0"
          value={formData.stock}
          onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
          className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
          min="0"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-white">Descripción</Label>
        <Textarea
          placeholder="Descripción del producto..."
          value={formData.descripcion}
          onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
          className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-white">Imagen del Producto</Label>
        
        {/* Imagen actual o previsualización */}
        <div className="w-full h-[250px] rounded-lg bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center mb-4">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : formData.imagenPrincipal ? (
            <img
              src={formData.imagenPrincipal}
              alt="Actual"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 text-gray-400">
              <ImageIcon className="w-10 h-10" />
              <span className="text-sm">Sin imagen</span>
            </div>
          )}
        </div>

        {/* Selector de archivo */}
        <div className="flex gap-2">
          <input
            ref={productImageInputRef}
            id="product-image-file"
            type="file"
            accept=".jpg,.jpeg,.png,.webp"
            onChange={handleImageSelect}
            onClick={(event) => {
              event.currentTarget.value = "";
            }}
            className="hidden"
            disabled={uploadingImage}
          />
          <label htmlFor="product-image-file" className="flex-1">
            <Button
              asChild
              className="w-full bg-gradient-to-r from-[#2E5E4E] to-[#7BAE7F] hover:opacity-90 text-white disabled:opacity-50 cursor-pointer"
              disabled={uploadingImage}
            >
              <span>
                {uploadingImage ? (
                  <>
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                    Subiendo...
                  </>
                ) : previewUrl ? (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Cambiar Imagen
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Seleccionar Imagen
                  </>
                )}
              </span>
            </Button>
          </label>
          {previewUrl && (
            <Button
              variant="ghost"
              onClick={clearImage}
              disabled={uploadingImage}
              className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
            >
              ✕
            </Button>
          )}
        </div>

        {/* Información de validación */}
        <p className="text-xs text-gray-400 flex items-center gap-2 mt-2">
          <AlertCircle className="w-3 h-3" />
          JPG, PNG o WebP • Máximo 5MB
        </p>
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          onClick={editingProductId ? handleUpdateProduct : handleCreateProduct}
          disabled={isSubmitting}
          className="flex-1 bg-gradient-to-r from-[#2E5E4E] to-[#7BAE7F] hover:opacity-90 text-white disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader className="w-4 h-4 mr-2 animate-spin" />
              Guardando...
            </>
          ) : (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              {editingProductId ? "Actualizar Producto" : "Crear Producto"}
            </>
          )}
        </Button>
        <Button
          variant="ghost"
          onClick={editingProductId ? closeEditDialog : closeCreateDialog}
          disabled={isSubmitting}
          className="text-gray-300 hover:text-white hover:bg-white/10 disabled:opacity-50"
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
            {renderProductFormContent()}
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
              {categoryOptions.length > 0 ? (
                categoryOptions.map((cat) => (
                  <SelectItem key={cat.id} value={cat.name.toLowerCase()}>
                    {cat.name}
                  </SelectItem>
                ))
              ) : loadingCategories ? (
                <SelectItem value="all">Cargando categorías...</SelectItem>
              ) : null}
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Products Table */}
      <Card className="bg-white/5 backdrop-blur-md border-white/10 overflow-hidden">
        {loadingProducts ? (
          <div className="p-8 text-center text-gray-300">Cargando productos...</div>
        ) : productError ? (
          <div className="p-8 text-center text-red-300">{productError}</div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-8 text-center text-gray-300">
            No se encontraron productos.
          </div>
        ) : (
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
              {filteredProducts.map((product) => (
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
                    ${product.precioVenta ? product.precioVenta.toLocaleString() : product.price.toLocaleString()}
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
                        onClick={() => {
                          // TODO: Vista detallada del producto
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Dialog open={isEditDialogOpen && editingProductId === product.id} onOpenChange={(open) => !open && closeEditDialog()}>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                            onClick={() => openEditDialog(product)}
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
                          {renderProductFormContent()}
                        </DialogContent>
                      </Dialog>
                      <AlertDialog
                        open={isDeleteDialogOpen && deletingProductId === product.id}
                        onOpenChange={(open) => {
                          if (!open) {
                            setDeletingProductId(null);
                            setIsDeleteDialogOpen(false);
                          }
                        }}
                      >
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                            onClick={() => {
                              setDeletingProductId(product.id);
                              setIsDeleteDialogOpen(true);
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-[#1E2B24] border-white/10">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-white">
                              Eliminar Producto
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-gray-300">
                              ¿Estás seguro de que deseas eliminar "{product.name}"? Esta acción no se puede deshacer.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <div className="flex gap-3 justify-end">
                            <AlertDialogCancel className="bg-white/5 border-white/10 text-white hover:bg-white/10">
                              Cancelar
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={handleDeleteProduct}
                              disabled={isDeleting}
                              className="bg-red-500/20 text-red-400 hover:bg-red-500/30 border-red-500/30 disabled:opacity-50"
                            >
                              {isDeleting ? (
                                <>
                                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                                  Eliminando...
                                </>
                              ) : (
                                "Eliminar"
                              )}
                            </AlertDialogAction>
                          </div>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
}
