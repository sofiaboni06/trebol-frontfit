import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import {
  User,
  ShoppingBag,
  Heart,
  Calendar,
  Settings,
  Sparkles,
  ChevronRight,
  LogOut,
  Bell,
  CreditCard,
  MapPin,
} from "lucide-react";

export function MobileProfile() {
  const stats = [
    { icon: ShoppingBag, label: "Órdenes", value: "24" },
    { icon: Heart, label: "Favoritos", value: "12" },
    { icon: Calendar, label: "Citas", value: "2" },
    { icon: Sparkles, label: "IA", value: "87" },
  ];

  const menuItems = [
    { icon: User, label: "Editar perfil", chevron: true },
    { icon: ShoppingBag, label: "Mis órdenes", chevron: true },
    { icon: Heart, label: "Lista de favoritos", chevron: true },
    { icon: MapPin, label: "Direcciones", chevron: true },
    { icon: CreditCard, label: "Métodos de pago", chevron: true },
    { icon: Bell, label: "Notificaciones", chevron: true },
    { icon: Settings, label: "Configuración", chevron: true },
  ];

  return (
    <div className="min-h-screen bg-[#F4F1EA] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#2E5E4E] to-[#1E2B24] text-white p-6 pb-12">
        <div className="flex items-center gap-4 mb-6">
          <Avatar className="w-20 h-20">
            <AvatarFallback className="bg-gradient-to-br from-[#7BAE7F] to-[#2E5E4E] text-white text-2xl">
              JD
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-1">Juan Pérez</h1>
            <p className="text-white/80 text-sm mb-2">
              juan.perez@ejemplo.com
            </p>
            <Badge className="bg-white/20 text-white border-0">
              Cliente Premium
            </Badge>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-4 -mt-8 mb-6">
        <Card className="p-4 bg-white shadow-lg">
          <div className="grid grid-cols-4 gap-3">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-gradient-to-br from-[#2E5E4E] to-[#7BAE7F] flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-xl font-bold text-[#1E2B24]">{stat.value}</p>
                <p className="text-xs text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Menu Items */}
      <div className="px-4 space-y-2">
        {menuItems.map((item, index) => (
          <Card
            key={index}
            className="p-4 bg-white hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F4F1EA] flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-[#2E5E4E]" />
                </div>
                <span className="font-semibold text-[#1E2B24]">
                  {item.label}
                </span>
              </div>
              {item.chevron && (
                <ChevronRight className="w-5 h-5 text-gray-400" />
              )}
            </div>
          </Card>
        ))}

        {/* Logout */}
        <Card className="p-4 bg-white hover:bg-red-50 transition-colors cursor-pointer">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <LogOut className="w-5 h-5 text-red-600" />
              </div>
              <span className="font-semibold text-red-600">Cerrar sesión</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Version */}
      <div className="text-center mt-8 text-sm text-gray-500">
        Versión 1.0.0
      </div>
    </div>
  );
}
