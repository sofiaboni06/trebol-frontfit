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
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import {
  Calendar,
  Clock,
  User,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
  CalendarDays,
  MessageSquare,
  Filter,
} from "lucide-react";
import { useState } from "react";

export function AppointmentsManagement() {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const appointments = [
    {
      id: 1,
      client: "María González",
      service: "Diseño de Jardín Residencial",
      date: "2026-06-01",
      time: "10:00 AM",
      status: "pendiente",
      phone: "+52 55 1234 5678",
      email: "maria.gonzalez@email.com",
      address: "Av. Reforma 123, CDMX",
      notes: "Cliente interesado en jardín zen con plantas nativas",
      employee: null,
    },
    {
      id: 2,
      client: "Carlos Mendoza",
      service: "Mantenimiento Mensual",
      date: "2026-06-01",
      time: "2:00 PM",
      status: "confirmada",
      phone: "+52 55 9876 5432",
      email: "carlos.m@email.com",
      address: "Polanco 456, CDMX",
      notes: "Mantenimiento regular de jardín corporativo",
      employee: "Juan Pérez",
    },
    {
      id: 3,
      client: "Ana Rodríguez",
      service: "Consultoría de Plantas",
      date: "2026-06-02",
      time: "11:30 AM",
      status: "confirmada",
      phone: "+52 55 5555 1111",
      email: "ana.rodriguez@email.com",
      address: "Condesa 789, CDMX",
      notes: "Asesoría para plantas de interior en oficina",
      employee: "María García",
    },
    {
      id: 4,
      client: "Roberto Sánchez",
      service: "Instalación de Sistema de Riego",
      date: "2026-05-30",
      time: "9:00 AM",
      status: "finalizada",
      phone: "+52 55 2222 3333",
      email: "roberto.s@email.com",
      address: "Santa Fe 321, CDMX",
      notes: "Sistema de riego automatizado completado exitosamente",
      employee: "Carlos López",
    },
    {
      id: 5,
      client: "Laura Torres",
      service: "Paisajismo Comercial",
      date: "2026-05-28",
      time: "3:00 PM",
      status: "cancelada",
      phone: "+52 55 4444 5555",
      email: "laura.torres@email.com",
      address: "Centro 654, CDMX",
      notes: "Cliente reprogramó por conflicto de agenda",
      employee: null,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pendiente":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "confirmada":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "finalizada":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "cancelada":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-white/20 text-gray-300 border-white/30";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pendiente":
        return <Clock className="w-4 h-4" />;
      case "confirmada":
        return <CheckCircle className="w-4 h-4" />;
      case "finalizada":
        return <CheckCircle className="w-4 h-4" />;
      case "cancelada":
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const stats = [
    {
      label: "Pendientes",
      value: appointments.filter((a) => a.status === "pendiente").length,
      color: "text-orange-400",
    },
    {
      label: "Confirmadas",
      value: appointments.filter((a) => a.status === "confirmada").length,
      color: "text-blue-400",
    },
    {
      label: "Finalizadas",
      value: appointments.filter((a) => a.status === "finalizada").length,
      color: "text-green-400",
    },
    {
      label: "Canceladas",
      value: appointments.filter((a) => a.status === "cancelada").length,
      color: "text-red-400",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white">
            Gestión de Citas
          </h1>
          <p className="text-gray-300 mt-1">
            Administra citas de servicios y paisajismo
          </p>
        </div>
        <Button className="bg-gradient-to-r from-[#2E5E4E] to-[#7BAE7F] hover:opacity-90 text-white">
          <Calendar className="w-4 h-4 mr-2" />
          Ver Calendario
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="p-4 bg-white/5 backdrop-blur-md border-white/10"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">{stat.label}</p>
                <p className={`text-3xl font-semibold ${stat.color}`}>
                  {stat.value}
                </p>
              </div>
              <CalendarDays className={`w-8 h-8 ${stat.color} opacity-50`} />
            </div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="p-4 bg-white/5 backdrop-blur-md border-white/10">
        <div className="flex items-center gap-4">
          <Filter className="w-5 h-5 text-gray-300" />
          <Select value={selectedFilter} onValueChange={setSelectedFilter}>
            <SelectTrigger className="w-[200px] bg-white/5 border-white/10 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las citas</SelectItem>
              <SelectItem value="pendiente">Pendientes</SelectItem>
              <SelectItem value="confirmada">Confirmadas</SelectItem>
              <SelectItem value="finalizada">Finalizadas</SelectItem>
              <SelectItem value="cancelada">Canceladas</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Appointments List */}
      <div className="space-y-4">
        {appointments.map((appointment) => (
          <Card
            key={appointment.id}
            className="p-6 bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2E5E4E] to-[#7BAE7F] flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {appointment.client}
                  </h3>
                  <p className="text-gray-300">{appointment.service}</p>
                </div>
              </div>
              <Badge className={getStatusColor(appointment.status)}>
                <span className="flex items-center gap-1">
                  {getStatusIcon(appointment.status)}
                  {appointment.status}
                </span>
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-400">
                  <Calendar className="w-4 h-4 text-gray-300" />
                  <span className="text-sm">{appointment.date}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Clock className="w-4 h-4 text-gray-300" />
                  <span className="text-sm">{appointment.time}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Phone className="w-4 h-4 text-gray-300" />
                  <span className="text-sm">{appointment.phone}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-400">
                  <Mail className="w-4 h-4 text-gray-300" />
                  <span className="text-sm">{appointment.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <MapPin className="w-4 h-4 text-gray-300" />
                  <span className="text-sm">{appointment.address}</span>
                </div>
                {appointment.employee && (
                  <div className="flex items-center gap-2 text-gray-400">
                    <User className="w-4 h-4 text-gray-300" />
                    <span className="text-sm">
                      Asignado a: {appointment.employee}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {appointment.notes && (
              <div className="p-3 rounded-lg bg-white/5 border border-white/10 mb-4">
                <div className="flex items-start gap-2">
                  <MessageSquare className="w-4 h-4 text-gray-300 mt-0.5" />
                  <p className="text-gray-400 text-sm">{appointment.notes}</p>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              {appointment.status === "pendiente" && (
                <>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Aceptar Cita
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-[#1E2B24] border-white/10 text-white">
                      <DialogHeader>
                        <DialogTitle>Confirmar Cita</DialogTitle>
                        <DialogDescription className="text-gray-300">
                          Asigna un empleado y confirma la cita
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label className="text-white">Asignar a</Label>
                          <Select>
                            <SelectTrigger className="bg-white/5 border-white/10 text-[#1E2B24]">
                              <SelectValue placeholder="Seleccionar empleado" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="juan">Juan Pérez</SelectItem>
                              <SelectItem value="maria">María García</SelectItem>
                              <SelectItem value="carlos">Carlos López</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white">Notas adicionales</Label>
                          <Textarea
                            placeholder="Instrucciones especiales..."
                            className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                          />
                        </div>
                        <Button className="w-full bg-gradient-to-r from-[#2E5E4E] to-[#7BAE7F] hover:opacity-90 text-white">
                          Confirmar Cita
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="ghost"
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Rechazar
                  </Button>
                </>
              )}
              {appointment.status === "confirmada" && (
                <>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30">
                        <CalendarDays className="w-4 h-4 mr-2" />
                        Reprogramar
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-[#1E2B24] border-white/10 text-white">
                      <DialogHeader>
                        <DialogTitle>Reprogramar Cita</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-white">Nueva Fecha</Label>
                            <Input
                              type="date"
                              className="bg-white/5 border-white/10 text-[#1E2B24]"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-white">Nueva Hora</Label>
                            <Input
                              type="time"
                              className="bg-white/5 border-white/10 text-[#1E2B24]"
                            />
                          </div>
                        </div>
                        <Button className="w-full bg-gradient-to-r from-[#2E5E4E] to-[#7BAE7F] hover:opacity-90 text-white">
                          Guardar Cambios
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button className="bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Marcar como Finalizada
                  </Button>
                </>
              )}
              <Button
                variant="ghost"
                className="text-gray-300 hover:text-white hover:bg-white/10"
              >
                Ver Detalles
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
