import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Shield, Sun, Bell, User, LayoutGrid } from "lucide-react";

export function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-[#1E2B24]">Configuración</h1>
          <p className="text-[#4B6358] mt-1">
            Ajustes de perfil, tema, notificaciones, seguridad y apariencia.
          </p>
        </div>
        <Button className="bg-[#2E5E4E] hover:bg-[#265a46] text-white">
          Guardar cambios
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Card className="p-6 bg-white/70 backdrop-blur-md border-white/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-[#2E5E4E]/10">
              <User className="w-5 h-5 text-[#2E5E4E]" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[#1E2B24]">Perfil Admin</h2>
              <p className="text-[#4B6358] text-sm">Nombre, email y permisos de tu cuenta.</p>
            </div>
          </div>
          <div className="space-y-3 text-[#2F3E37]">
            <p>Nombre: <strong>Administrador Trebol</strong></p>
            <p>Email: <strong>admin@trebol.com</strong></p>
            <p>Rol: <strong>ADMIN</strong></p>
          </div>
        </Card>

        <Card className="p-6 bg-white/70 backdrop-blur-md border-white/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-[#7BAE7F]/10">
              <Sun className="w-5 h-5 text-[#7BAE7F]" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[#1E2B24]">Tema</h2>
              <p className="text-[#4B6358] text-sm">Apariencia del panel con glassmorphism.</p>
            </div>
          </div>
          <div className="space-y-3 text-[#2F3E37]">
            <p>Modo actual: <strong>Premium</strong></p>
            <p>Paleta: <strong>Verde natural y blanco translúcido</strong></p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Card className="p-6 bg-white/70 backdrop-blur-md border-white/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-[#7BAE7F]/10">
              <Bell className="w-5 h-5 text-[#7BAE7F]" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[#1E2B24]">Notificaciones</h2>
              <p className="text-[#4B6358] text-sm">Alertas de inventario, ventas y citas.</p>
            </div>
          </div>
          <div className="space-y-3 text-[#2F3E37]">
            <p>Notificaciones de inventario: <strong>Activadas</strong></p>
            <p>Notificaciones de citas: <strong>Activadas</strong></p>
            <p>Alertas de seguridad: <strong>Activadas</strong></p>
          </div>
        </Card>

        <Card className="p-6 bg-white/70 backdrop-blur-md border-white/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-[#2E5E4E]/10">
              <Shield className="w-5 h-5 text-[#2E5E4E]" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[#1E2B24]">Seguridad</h2>
              <p className="text-[#4B6358] text-sm">Contraseña, permisos y accesos seguros.</p>
            </div>
          </div>
          <div className="space-y-3 text-[#2F3E37]">
            <p>Autenticación: <strong>Para administradores</strong></p>
            <p>Accesos recientes: <strong>Revisados</strong></p>
            <p>Cambio de contraseña: <strong>Disponible</strong></p>
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-white/70 backdrop-blur-md border-white/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-[#2E5E4E]/10">
            <LayoutGrid className="w-5 h-5 text-[#2E5E4E]" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[#1E2B24]">Apariencia</h2>
            <p className="text-[#4B6358] text-sm">Glassmorphism premium y colores naturales.</p>
          </div>
        </div>
        <div className="space-y-3 text-[#2F3E37]">
          <p>Fondo: <strong>Blanco translúcido</strong></p>
          <p>Bordes: <strong>Verde suave</strong></p>
          <p>Textos: <strong>#1E2B24, #4B6358, #2F3E37</strong></p>
        </div>
      </Card>
    </div>
  );
}
