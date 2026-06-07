import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { FolderTree, Plus, Tag } from "lucide-react";

export function CategoryManagement() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-[#E8EFE5]">Categorías</h1>
          <p className="text-[#B8C5B3] mt-1">
            Administración de categorías y agrupaciones de productos.
          </p>
        </div>
        <Button className="bg-gradient-to-br from-[#2E5E4E] to-[#3D7A5E] hover:from-[#3D7A5E] hover:to-[#4D8A6E] text-white shadow-[0_8px_24px_rgba(46,94,78,0.3)] transition-all duration-300">
          Nueva categoría
        </Button>
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
        <div className="grid gap-4 md:grid-cols-2">
          {[
            "Plantas de Interior",
            "Plantas de Exterior",
            "Macetas y Accesorios",
            "Fertilizantes y Cuidado",
          ].map((category) => (
            <div key={category} className="rounded-[1.5rem] border border-white/[0.08] bg-white/[0.04] p-4 backdrop-blur-sm hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
              <p className="text-[#E8EFE5] font-semibold">{category}</p>
              <p className="text-[#B8C5B3] text-sm mt-1">Productos y subcategorías relacionadas.</p>
            </div>
          ))}
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
