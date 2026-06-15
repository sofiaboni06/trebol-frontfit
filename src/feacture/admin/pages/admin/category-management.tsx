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
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { FolderTree, Plus, Tag, Edit, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import categoryService from "../../../../services/category.service";

const initialCategoryForm = {
  nombre: "",
  descripcion: "",
  imagen: "",
  estado: true,
};

export function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [categoryError, setCategoryError] = useState("");
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formValues, setFormValues] = useState(initialCategoryForm);

  useEffect(() => {
    const loadCategories = async () => {
      setLoadingCategories(true);
      setCategoryError("");
      try {
        const data = await categoryService.getCategories();
        setCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        setCategoryError("No se pudieron cargar las categorías.");
      } finally {
        setLoadingCategories(false);
      }
    };

    loadCategories();
  }, []);

  const openCreateDialog = () => {
    setEditingCategory(null);
    setFormValues(initialCategoryForm);
    setFormError("");
    setSuccessMessage("");
    setIsDialogOpen(true);
  };

  const openEditDialog = (category) => {
    setEditingCategory(category);
    setFormValues({
      nombre: category.nombre || "",
      descripcion: category.descripcion || "",
      imagen: category.imagen || "",
      estado: category.estado ?? true,
    });
    setFormError("");
    setSuccessMessage("");
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setFormError("");
  };

  const handleFormChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const saveCategory = async (event) => {
    event.preventDefault();
    setFormError("");
    setSuccessMessage("");

    if (!formValues.nombre.trim() || !formValues.descripcion.trim()) {
      setFormError("Nombre y descripción son obligatorios.");
      return;
    }

    try {
      const payload = {
        nombre: formValues.nombre.trim(),
        descripcion: formValues.descripcion.trim(),
        imagen: formValues.imagen.trim() || null,
        estado: formValues.estado,
      };

      if (editingCategory?.id) {
        const updated = await categoryService.updateCategory(editingCategory.id, payload);
        setCategories((prev) => prev.map((cat) => (cat.id === updated.id ? updated : cat)));
        setSuccessMessage("Categoría actualizada correctamente.");
      } else {
        const created = await categoryService.createCategory(payload);
        setCategories((prev) => [created, ...prev]);
        setSuccessMessage("Categoría creada correctamente.");
      }

      closeDialog();
    } catch (error) {
      setFormError("Ocurrió un error al guardar la categoría.");
    }
  };

  const deleteCategory = async (categoryId) => {
    const confirmed = window.confirm("¿Deseas eliminar esta categoría?");
    if (!confirmed) {
      return;
    }

    try {
      await categoryService.deleteCategory(categoryId);
      setCategories((prev) => prev.filter((category) => category.id !== categoryId));
      setSuccessMessage("Categoría eliminada correctamente.");
    } catch (error) {
      setCategoryError("No se pudo eliminar la categoría.");
    }
  };

  const activeCount = categories.filter((category) => category.estado).length;
  const inactiveCount = categories.length - activeCount;

  const statusBadge = (estado) => {
    return estado
      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
      : "bg-red-500/10 text-red-400 border-red-500/20";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-[#E8EFE5]">Categorías</h1>
          <p className="text-[#B8C5B3] mt-1">
            Administra las categorías que usa el catálogo.
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={openCreateDialog}
              className="bg-gradient-to-br from-[#2E5E4E] to-[#3D7A5E] hover:from-[#3D7A5E] hover:to-[#4D8A6E] text-white shadow-[0_8px_24px_rgba(46,94,78,0.3)] transition-all duration-300"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nueva categoría
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#1E2B24] border-white/10 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white text-xl">
                {editingCategory ? "Editar Categoría" : "Crear Nueva Categoría"}
              </DialogTitle>
              <DialogDescription className="text-gray-300">
                {editingCategory
                  ? "Actualiza los datos de la categoría."
                  : "Completa los datos para crear una categoría nueva."}
              </DialogDescription>
            </DialogHeader>

            <form className="space-y-4 py-4" onSubmit={saveCategory}>
              {formError ? (
                <div className="rounded-[1rem] border border-red-500/20 bg-red-500/10 p-3 text-red-100">
                  {formError}
                </div>
              ) : null}
              <div className="space-y-2">
                <Label className="text-white">Nombre</Label>
                <Input
                  value={formValues.nombre}
                  onChange={(e) => handleFormChange("nombre", e.target.value)}
                  placeholder="Ej: Plantas de Interior"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Descripción</Label>
                <Textarea
                  value={formValues.descripcion}
                  onChange={(e) => handleFormChange("descripcion", e.target.value)}
                  placeholder="Describe la categoría..."
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Estado</Label>
                <Select
                  value={formValues.estado ? "activo" : "inactivo"}
                  onValueChange={(value) => handleFormChange("estado", value === "activo")}
                >
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="Selecciona el estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="activo">Activo</SelectItem>
                    <SelectItem value="inactivo">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-white">Imagen (URL)</Label>
                <Input
                  value={formValues.imagen}
                  onChange={(e) => handleFormChange("imagen", e.target.value)}
                  placeholder="https://..."
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-br from-[#2E5E4E] to-[#3D7A5E] hover:from-[#3D7A5E] hover:to-[#4D8A6E] text-white"
                >
                  Guardar categoría
                </Button>
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-gray-300 hover:text-white hover:bg-white/10"
                    onClick={closeDialog}
                  >
                    Cancelar
                  </Button>
                </DialogClose>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-5 bg-white/5 backdrop-blur-md border-white/10">
          <p className="text-[#B8C5B3] text-sm">Total categorías</p>
          <p className="mt-2 text-3xl font-semibold text-white">{categories.length}</p>
        </Card>
        <Card className="p-5 bg-white/5 backdrop-blur-md border-white/10">
          <p className="text-[#B8C5B3] text-sm">Activas</p>
          <p className="mt-2 text-3xl font-semibold text-white">{activeCount}</p>
        </Card>
        <Card className="p-5 bg-white/5 backdrop-blur-md border-white/10">
          <p className="text-[#B8C5B3] text-sm">Inactivas</p>
          <p className="mt-2 text-3xl font-semibold text-white">{inactiveCount}</p>
        </Card>
      </div>

      {successMessage ? (
        <div className="rounded-[1.5rem] border border-emerald-500/20 bg-emerald-500/10 p-4 text-emerald-100">
          {successMessage}
        </div>
      ) : null}

      <Card className="bg-white/5 backdrop-blur-md border-white/10 overflow-hidden">
        {loadingCategories ? (
          <div className="p-8 text-center text-gray-300">Cargando categorías...</div>
        ) : categoryError ? (
          <div className="p-8 text-center text-red-300">{categoryError}</div>
        ) : categories.length === 0 ? (
          <div className="p-8 text-center text-gray-300">No hay categorías disponibles.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/10">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Nombre
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Descripción
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Estado
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 bg-[#0C1913]">
                {categories.map((category) => (
                  <tr key={category.id} className="hover:bg-white/5 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white max-w-[240px] overflow-hidden text-ellipsis">
                      {category.nombre}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#B8C5B3] max-w-[420px] overflow-hidden text-ellipsis">
                      {category.descripcion}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={statusBadge(category.estado)}>
                        {category.estado ? "Activo" : "Inactivo"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="inline-flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                          onClick={() => openEditDialog(category)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          onClick={() => deleteCategory(category.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
