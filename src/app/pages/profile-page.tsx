import { useEffect, useRef, useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import {
  ShoppingBag,
  Heart,
  Calendar,
  Settings,
  Sparkles,
  Package,
  Clock,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useAuth } from "../../hooks/useAuth";
import authService from "../../services/auth.service";

export function ProfilePage() {
  const { user: authUser } = useAuth();
  const localUser =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("usuario") || "null")
      : null;
  const savedUser = authUser || localUser;

  const [profile, setProfile] = useState<{
    nombre: string;
    apellido: string;
    correo: string;
    rol: string;
    telefono: string;
    direccion: string;
  }>({
    nombre: savedUser?.nombre || "",
    apellido: savedUser?.apellido || "",
    correo: savedUser?.correo || "",
    rol: savedUser?.rol || savedUser?.role || "",
    telefono: savedUser?.telefono || "",
    direccion: savedUser?.direccion || "",
  });

  const [password, setPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("orders");

  const settingsSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setProfile({
      nombre: savedUser?.nombre || "",
      apellido: savedUser?.apellido || "",
      correo: savedUser?.correo || "",
      rol: savedUser?.rol || savedUser?.role || "",
      telefono: savedUser?.telefono || "",
      direccion: savedUser?.direccion || "",
    });
  }, [savedUser]);

  const saveProfileLocally = (updatedProfile: {
    nombre: string;
    apellido: string;
    correo: string;
    rol: string;
    telefono: string;
    direccion: string;
  }) => {
    const persistedUser = {
      ...(savedUser || {}),
      ...updatedProfile,
    };

    localStorage.setItem("usuario", JSON.stringify(persistedUser));
  };

  const handleProfileChange = (
    field: "nombre" | "apellido" | "correo" | "rol" | "telefono" | "direccion",
    value: string
  ) => {
    const nextProfile = { ...profile, [field]: value };
    setProfile(nextProfile);
    saveProfileLocally(nextProfile);
  };

  const handleSaveChanges = async () => {
    setSaveError(null);
    setIsSaving(true);

    try {
      const userId = savedUser?.id;
      if (!userId) {
        throw new Error("No se encontró el ID del usuario");
      }

      if (!password || password.trim().length === 0) {
        throw new Error("La contraseña es obligatoria para guardar cambios");
      }

      // Hacer solicitud al backend para actualizar usuario
      await authService.updateUserProfile(userId, {
        nombre: profile.nombre,
        apellido: profile.apellido,
        correo: profile.correo,
        password: password,
        telefono: profile.telefono,
        direccion: profile.direccion,
      });

      // Limpiar contraseña después de guardar exitosamente
      setPassword("");
      // Success - localStorage ya fue actualizado por authService
    } catch (error) {
      const err = error as any;
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Error al guardar cambios";
      setSaveError(errorMessage);
      console.error("Error guardando perfil:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleScrollToSettings = () => {
    setActiveTab("settings");
    // Delay pequeño para que se renderice la pestaña antes de hacer scroll
    setTimeout(() => {
      settingsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const fullName =
    [profile?.nombre, profile?.apellido].filter(Boolean).join(" ") || "Usuario";
  const email = profile?.correo || "";
  const roleLabel = profile?.rol || savedUser?.role || "Cliente";
  const memberSince = savedUser?.fechaCreacion
    ? new Date(savedUser.fechaCreacion).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
      })
    : "Mayo 2025";
  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "U";
  const isAuthenticated = !!savedUser;

  const orders: {
    id: string;
    date: string;
    status: string;
    total: number;
    items: number;
    image: string;
  }[] = [];

  const favorites: {
    id: number;
    name: string;
    price: number;
    image: string;
  }[] = [];

  const appointments: {
    id: number;
    service: string;
    date: string;
    time: string;
    status: string;
  }[] = [];

  const aiHistory: { id: number; query: string; date: string }[] = [];

  const stats = [
    {
      icon: ShoppingBag,
      label: "Órdenes totales",
      value: orders.length.toString(),
      color: "from-[#2E5E4E] to-[#1E2B24]",
    },
    {
      icon: Heart,
      label: "Favoritos",
      value: favorites.length.toString(),
      color: "from-[#7BAE7F] to-[#2E5E4E]",
    },
    {
      icon: Calendar,
      label: "Citas activas",
      value: appointments.length.toString(),
      color: "from-[#2E5E4E] to-[#7BAE7F]",
    },
    {
      icon: Sparkles,
      label: "Consultas IA",
      value: aiHistory.length.toString(),
      color: "from-[#1E2B24] to-[#2E5E4E]",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4F1EA] py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Profile Header */}
        <Card className="p-8 mb-8 backdrop-blur-sm bg-white/80">
          <div className="flex items-start gap-6">
            <Avatar className="w-24 h-24">
              <AvatarFallback className="bg-gradient-to-br from-[#2E5E4E] to-[#7BAE7F] text-white text-2xl">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-[#1E2B24] mb-2">
                {fullName}
              </h1>
              <p className="text-gray-600 mb-4">{email}</p>
              <div className="flex items-center gap-4">
                <Badge className="bg-[#7BAE7F] text-white">
                  {savedUser?.roles?.[0]?.nombre || roleLabel}
                </Badge>
                <span className="text-sm text-gray-600">
                  Miembro desde {memberSince}
                </span>
              </div>
            </div>
            <Button
              variant="outline"
              className="rounded-full"
              onClick={handleScrollToSettings}
            >
              <Settings className="w-4 h-4 mr-2" />
              Editar perfil
            </Button>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className={`p-6 bg-gradient-to-br ${stat.color} text-white`}
            >
              <stat.icon className="w-8 h-8 mb-4 opacity-80" />
              <p className="text-3xl font-bold mb-1">{stat.value}</p>
              <p className="text-sm text-white/80">{stat.label}</p>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="orders">
              <Package className="w-4 h-4 mr-2" />
              Mis órdenes
            </TabsTrigger>
            <TabsTrigger value="favorites">
              <Heart className="w-4 h-4 mr-2" />
              Favoritos
            </TabsTrigger>
            <TabsTrigger value="appointments">
              <Calendar className="w-4 h-4 mr-2" />
              Citas
            </TabsTrigger>
            <TabsTrigger value="ai-history">
              <Sparkles className="w-4 h-4 mr-2" />
              Historial IA
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="w-4 h-4 mr-2" />
              Configuración
            </TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <div className="space-y-4">
              {orders.length === 0 ? (
                <Card className="p-6 bg-white">
                  <p className="text-gray-600">No hay actividad todavía</p>
                </Card>
              ) : (
                orders.map((order) => (
                  <Card key={order.id} className="p-6 bg-white">
                    <div className="flex gap-6">
                      <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                        <ImageWithFallback
                          src={order.image}
                          alt={`Order ${order.id}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-[#1E2B24] mb-1">
                              Orden {order.id}
                            </h3>
                            <p className="text-sm text-gray-600 flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              {order.date}
                            </p>
                          </div>
                          <Badge
                            className={
                              order.status === "Entregado"
                                ? "bg-[#7BAE7F] text-white"
                                : "bg-blue-500 text-white"
                            }
                          >
                            {order.status}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">
                              {order.items} productos
                            </p>
                            <p className="text-2xl font-bold text-[#2E5E4E]">
                              ${order.total}
                            </p>
                          </div>
                          <div className="flex gap-3">
                            <Button variant="outline" className="rounded-full">
                              Ver detalles
                            </Button>
                            <Button className="bg-[#2E5E4E] hover:bg-[#1E2B24] text-white rounded-full">
                              Rastrear envío
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {favorites.length === 0 ? (
                <Card className="p-6 bg-white">
                  <p className="text-gray-600">No hay actividad todavía</p>
                </Card>
              ) : (
                favorites.map((product) => (
                  <Card key={product.id} className="overflow-hidden bg-white">
                    <div className="aspect-square overflow-hidden">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-[#1E2B24] mb-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <p className="text-2xl font-bold text-[#2E5E4E]">
                          ${product.price}
                        </p>
                        <Button
                          size="sm"
                          className="bg-[#2E5E4E] hover:bg-[#1E2B24] text-white rounded-full"
                        >
                          Agregar
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Appointments Tab */}
          <TabsContent value="appointments">
            <div className="space-y-4">
              {appointments.length === 0 ? (
                <Card className="p-6 bg-white">
                  <p className="text-gray-600">No hay actividad todavía</p>
                </Card>
              ) : (
                appointments.map((appointment) => (
                  <Card key={appointment.id} className="p-6 bg-white">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2E5E4E] to-[#7BAE7F] flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-[#1E2B24] mb-1">
                            {appointment.service}
                          </h3>
                          <p className="text-gray-600 mb-2">
                            {appointment.date} a las {appointment.time}
                          </p>
                          <Badge
                            className={
                              appointment.status === "Confirmada"
                                ? "bg-[#7BAE7F] text-white"
                                : "bg-yellow-500 text-white"
                            }
                          >
                            {appointment.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Button variant="outline" className="rounded-full">
                          Reprogramar
                        </Button>
                        <Button
                          variant="outline"
                          className="rounded-full text-red-600 hover:bg-red-50"
                        >
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* AI History Tab */}
          <TabsContent value="ai-history">
            {aiHistory.length === 0 ? (
              <Card className="p-8 bg-white">
                <Sparkles className="w-12 h-12 mb-4 text-[#2E5E4E]" />
                <h3 className="text-2xl font-semibold text-[#1E2B24] mb-3">
                  Historial de Asistente IA
                </h3>
                <p className="text-gray-600">No hay actividad todavía</p>
              </Card>
            ) : (
              <Card className="p-8 bg-gradient-to-br from-[#2E5E4E] to-[#1E2B24] text-white">
                <Sparkles className="w-12 h-12 mb-4" />
                <h3 className="text-2xl font-semibold mb-3">
                  Historial de Asistente IA
                </h3>
                <p className="text-white/80 mb-6">
                  Has realizado {aiHistory.length} consultas con nuestro asistente inteligente
                </p>
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white/20 hover:bg-white/30 text-white rounded-full"
                >
                  Ver historial completo
                </Button>
              </Card>
            )}
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div ref={settingsSectionRef}>
              <Card className="p-8 bg-white">
                <h2 className="text-2xl font-bold text-[#1E2B24] mb-6">
                  Configuración de cuenta
                </h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">Nombre</Label>
                      <Input
                        id="firstName"
                        value={profile.nombre || ""}
                        onChange={(event) =>
                          handleProfileChange("nombre", event.target.value)
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Apellido</Label>
                      <Input
                        id="lastName"
                        value={profile.apellido || ""}
                        onChange={(event) =>
                          handleProfileChange("apellido", event.target.value)
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Correo electrónico</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.correo || ""}
                        onChange={(event) =>
                          handleProfileChange("correo", event.target.value)
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input
                        id="phone"
                        value={profile.telefono || ""}
                        onChange={(event) =>
                          handleProfileChange("telefono", event.target.value)
                        }
                        className="mt-1"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="address">Dirección</Label>
                      <Input
                        id="address"
                        value={profile.direccion || ""}
                        onChange={(event) =>
                          handleProfileChange("direccion", event.target.value)
                        }
                        className="mt-1"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="password">Contraseña *</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Ingrese su contraseña para confirmar cambios"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="mt-1"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Requerida para confirmar los cambios en tu perfil
                      </p>
                    </div>
                  </div>
                  {saveError && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-700">{saveError}</p>
                    </div>
                  )}
                  <Button
                    size="lg"
                    className="bg-[#2E5E4E] hover:bg-[#1E2B24] text-white rounded-full px-8"
                    onClick={handleSaveChanges}
                    disabled={isSaving}
                  >
                    {isSaving ? "Guardando..." : "Guardar cambios"}
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
