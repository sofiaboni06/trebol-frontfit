import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { FolderTree, Plus, Tag } from "lucide-react";
import { useEffect, useState } from "react";
import categoryService from "../../../../services/category.service";

export function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [categoryError, setCategoryError] = useState("");
  const [isCreateCategoryDialogOpen, setIsCreateCategoryDialogOpen] = useState(false);

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

  const categoryItems = categories.map((category) => {
    if (typeof category === "string") {
      return { id: category, name: category };
    }

    return {
      id: category.id ?? category.nombre ?? category.name ?? Math.random().toString(36).slice(2),
      name: category.nombre || category.name || "Categoría sin nombre",
    };
  });

  const CategoryFormContent = () => (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <Label className="text-white">Nombre de Categoría</Label>
        <Input
          placeholder="Ej: Plantas de Interior"
          className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
        />
      </div>
      <div className="space-y-2">
        <Label className="text-white">Descripción</Label>
        <Textarea
          placeholder="Describe la categoría..."
          className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 min-h-[100px]"
        />
      </div>
      <div className="flex gap-3 pt-4">
        <Button className="flex-1 bg-gradient-to-br from-[#2E5E4E] to-[#3D7A5E] hover:from-[#3D7A5E] hover:to-[#4D8A6E] text-white">
          Guardar Categoría
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
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-[#E8EFE5]">Categorías</h1>
          <p className="text-[#B8C5B3] mt-1">
            Administración de categorías y agrupaciones de productos.
          </p>
        </div>
        <Dialog open={isCreateCategoryDialogOpen} onOpenChange={setIsCreateCategoryDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-br from-[#2E5E4E] to-[#3D7A5E] hover:from-[#3D7A5E] hover:to-[#4D8A6E] text-white shadow-[0_8px_24px_rgba(46,94,78,0.3)] transition-all duration-300">
              <Plus className="w-4 h-4 mr-2" />
              Nueva categoría
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#1E2B24] border-white/10 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white text-xl">
                Crear Nueva Categoría
              </DialogTitle>
              <DialogDescription className="text-gray-300">
                Completa los datos de la categoría para agregarla al panel.
              </DialogDescription>
            </DialogHeader>
            <CategoryFormContent />
          </DialogContent>
        </Dialog>
      </div>

      <Card className="p-6 bg-white/[0.04] backdrop-blur-xl border-white/[0.08] rounded-[1.5rem] shadow-[0_8px_24px_rgba(0,0,0,0.3)]">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-3 rounded-xl bg-[#7BAE7F]/10 border border-[#7BAE7F]/20">
            <FolderTree className="w-5 h-5 text-[#7BAE7F]" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[#E8EFE5]">Categorías activas</h2>
            <p className="text-[#B8C5B3] text-sm">Las categorías ayudan a organizar tus productos.</p>
          </div>
        </div>
        <div className="space-y-4">
          {categoryError ? (
            <div className="rounded-[1.5rem] border border-red-500/20 bg-red-500/10 p-4 text-red-100">
              {categoryError}
            </div>
          ) : null}
          <div className="grid gap-4 md:grid-cols-2">
            {loadingCategories
              ? Array.from({ length: 4 }, (_, index) => (
                  <div
                    key={index}
                    className="h-24 animate-pulse rounded-[1.5rem] bg-white/5 border border-white/[0.08]"
                  />
                ))
              : categoryItems.length > 0
              ? categoryItems.map((category) => (
                  <div
                    key={category.id}
                    className="rounded-[1.5rem] border border-white/[0.08] bg-white/[0.04] p-4 backdrop-blur-sm hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
                  >
                    <p className="text-[#E8EFE5] font-semibold">{category.name}</p>
                    <p className="text-[#B8C5B3] text-sm mt-1">
                      Productos y subcategorías relacionadas.
                    </p>
                  </div>
                ))
              : (
                <div className="rounded-[1.5rem] border border-white/[0.08] bg-white/[0.04] p-4">
                  <p className="text-[#B8C5B3] text-sm">
                    No hay categorías activas.
                  </p>
                </div>
              )}
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-white/[0.04] backdrop-blur-xl border-white/[0.08] rounded-[1.5rem] shadow-[0_8px_24px_rgba(0,0,0,0.3)]">
        <div className="flex items-center gap-3">
          <Tag className="w-5 h-5 text-[#7BAE7F]" />
          <p className="text-[#B8C5B3]">Aquí podrás mantener las categorías sincronizadas con el panel.</p>
        </div>
      </Card>
    </div>
  );
}
