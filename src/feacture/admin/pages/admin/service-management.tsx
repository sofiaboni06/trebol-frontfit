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
          <h1 className="text-3xl font-semibold text-[#1E2B24]">Servicios</h1>
          <p className="text-[#4B6358] mt-1">
            Gestión de servicios ofrecidos y paquetes de trabajo.
          </p>
        </div>
        <Button className="bg-[#2E5E4E] hover:bg-[#265a46] text-white">
          Agregar servicio
        </Button>
      </div>

      <Card className="p-6 bg-white/70 backdrop-blur-md border-white/20">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-3 rounded-xl bg-[#2E5E4E]/10">
            <Briefcase className="w-5 h-5 text-[#2E5E4E]" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[#1E2B24]">Servicios disponibles</h2>
            <p className="text-[#4B6358] text-sm">Muestra los servicios que puedes ofrecer a tus clientes.</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <div key={service} className="rounded-2xl border border-white/20 bg-white/80 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Settings className="w-4 h-4 text-[#7BAE7F]" />
                <p className="text-[#2F3E37] font-semibold">{service}</p>
              </div>
              <p className="text-[#4B6358] text-sm">Configuración y descripción del servicio.</p>
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
