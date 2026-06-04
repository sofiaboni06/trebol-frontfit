import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { FolderTree, Plus, Tag } from "lucide-react";

export function CategoryManagement() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-[#1E2B24]">Categorías</h1>
          <p className="text-[#4B6358] mt-1">
            Administración de categorías y agrupaciones de productos.
          </p>
        </div>
        <Button className="bg-[#2E5E4E] hover:bg-[#265a46] text-white">
          Nueva categoría
        </Button>
      </div>

      <Card className="p-6 bg-white/70 backdrop-blur-md border-white/20">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-3 rounded-xl bg-[#7BAE7F]/10">
            <FolderTree className="w-5 h-5 text-[#2E5E4E]" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[#1E2B24]">Categorías activas</h2>
            <p className="text-[#4B6358] text-sm">Las categorías ayudan a organizar tus productos.</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            "Plantas de Interior",
            "Plantas de Exterior",
            "Macetas y Accesorios",
            "Fertilizantes y Cuidado",
          ].map((category) => (
            <div key={category} className="rounded-2xl border border-white/20 bg-white/80 p-4">
              <p className="text-[#2F3E37] font-semibold">{category}</p>
              <p className="text-[#4B6358] text-sm mt-1">Productos y subcategorías relacionadas.</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 bg-white/70 backdrop-blur-md border-white/20">
        <div className="flex items-center gap-3">
          <Tag className="w-5 h-5 text-[#2E5E4E]" />
          <p className="text-[#2F3E37]">Aquí podrás mantener las categorías sincronizadas con el panel.</p>
        </div>
      </Card>
    </div>
  );
}
