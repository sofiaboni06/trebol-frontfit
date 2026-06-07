import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Briefcase, Settings, CheckCircle } from "lucide-react";

export function ServiceManagement() {
  const services = [
    "Diseño de Jardines",
    "Mantenimiento de Césped",
    "Riego Automatizado",
    "Control de Plagas",
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-[#E8EFE5]">Servicios</h1>
          <p className="text-[#B8C5B3] mt-1">
            Gestión de servicios ofrecidos y paquetes de trabajo.
          </p>
        </div>
        <Button className="bg-gradient-to-br from-[#2E5E4E] to-[#3D7A5E] hover:from-[#3D7A5E] hover:to-[#4D8A6E] text-white shadow-[0_8px_24px_rgba(46,94,78,0.3)] transition-all duration-300">
          Agregar servicio
        </Button>
      </div>

      <Card className="p-6 bg-white/[0.04] backdrop-blur-xl border-white/[0.08] rounded-[1.5rem] shadow-[0_8px_24px_rgba(0,0,0,0.3)]">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-3 rounded-xl bg-[#2E5E4E]/15 border border-[#2E5E4E]/30">
            <Briefcase className="w-5 h-5 text-[#7BAE7F]" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[#E8EFE5]">Servicios disponibles</h2>
            <p className="text-[#B8C5B3] text-sm">Muestra los servicios que puedes ofrecer a tus clientes.</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <div key={service} className="rounded-[1.5rem] border border-white/[0.08] bg-white/[0.04] p-4 backdrop-blur-sm hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
              <div className="flex items-center gap-2 mb-2">
                <Settings className="w-4 h-4 text-[#7BAE7F]" />
                <p className="text-[#E8EFE5] font-semibold">{service}</p>
              </div>
              <p className="text-[#B8C5B3] text-sm">Configuración y descripción del servicio.</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 bg-white/70 backdrop-blur-md border-white/20">
        <div className="flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-[#2E5E4E]" />
          <p className="text-[#2F3E37]">Cada servicio se mantiene dentro del diseño premium del panel.</p>
        </div>
      </Card>
    </div>
  );
}
