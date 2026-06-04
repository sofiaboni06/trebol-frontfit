import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import {
  Users,
  UserPlus,
  Search,
  Edit,
  Trash2,
  Shield,
  User,
  Briefcase,
  Filter,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useState } from "react";

export function UserManagement() {
  const [roleFilter, setRoleFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const userStats = [
    {
      label: "Total Usuarios",
      value: "3,542",
      icon: Users,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
    {
      label: "Clientes",
      value: "3,450",
      icon: User,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
    },
    {
      label: "Empleados",
      value: "85",
      icon: Briefcase,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
    },
    {
      label: "Admins",
      value: "7",
      icon: Shield,
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
    },
  ];

  const users = [
    {
      id: 1,
      name: "María González",
      email: "maria.gonzalez@email.com",
      phone: "+52 55 1234 5678",
      role: "cliente",
      status: "activo",
      registerDate: "2026-01-15",
      lastLogin: "2026-05-31 09:30",
      orders: 12,
      totalSpent: 15890,
    },
    {
      id: 2,
      name: "Juan Pérez",
      email: "juan.perez@trebol.com",
      phone: "+52 55 9876 5432",
      role: "empleado",
      status: "activo",
      registerDate: "2024-06-10",
      lastLogin: "2026-05-31 10:15",
      department: "Ventas",
    },
    {
      id: 3,
      name: "Carlos López",
      email: "carlos.lopez@trebol.com",
      phone: "+52 55 5555 1111",
      role: "admin",
      status: "activo",
      registerDate: "2023-03-20",
      lastLogin: "2026-05-31 08:00",
      permissions: "Full Access",
    },
    {
      id: 4,
      name: "Ana Rodríguez",
      email: "ana.rodriguez@email.com",
      phone: "+52 55 2222 3333",
      role: "cliente",
      status: "activo",
      registerDate: "2025-11-05",
      lastLogin: "2026-05-30 16:45",
      orders: 8,
      totalSpent: 8450,
    },
    {
      id: 5,
      name: "María García",
      email: "maria.garcia@trebol.com",
      phone: "+52 55 4444 5555",
      role: "empleado",
      status: "activo",
      registerDate: "2024-09-12",
      lastLogin: "2026-05-31 09:00",
      department: "Servicios",
    },
    {
      id: 6,
      name: "Roberto Sánchez",
      email: "roberto.s@email.com",
      phone: "+52 55 6666 7777",
      role: "cliente",
      status: "inactivo",
      registerDate: "2024-02-28",
      lastLogin: "2026-03-15 12:00",
      orders: 3,
      totalSpent: 2340,
    },
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "empleado":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "cliente":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default:
        return "bg-white/20 text-gray-300 border-white/30";
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Shield className="w-3 h-3" />;
      case "empleado":
        return <Briefcase className="w-3 h-3" />;
      case "cliente":
        return <User className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    return status === "activo"
      ? "bg-green-500/20 text-green-400 border-green-500/30"
      : "bg-red-500/20 text-red-400 border-red-500/30";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white">
            Gestión de Usuarios
          </h1>
          <p className="text-gray-300 mt-1">
            Administra clientes, empleados y roles
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-[#2E5E4E] to-[#7BAE7F] hover:opacity-90 text-white">
              <UserPlus className="w-4 h-4 mr-2" />
              Nuevo Usuario
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#1E2B24] border-white/10 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white text-xl">
                Crear Nuevo Usuario
              </DialogTitle>
              <DialogDescription className="text-gray-300">
                Completa los datos del usuario
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white">Nombre Completo</Label>
                  <Input
                    placeholder="Ej: Juan Pérez"
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Rol</Label>
                  <Select>
                    <SelectTrigger className="bg-white/5 border-white/10 text-[#1E2B24]">
                      <SelectValue placeholder="Seleccionar rol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cliente">Cliente</SelectItem>
                      <SelectItem value="empleado">Empleado</SelectItem>
                      <SelectItem value="admin">Administrador</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white">Email</Label>
                  <Input
                    type="email"
                    placeholder="usuario@email.com"
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Teléfono</Label>
                  <Input
                    type="tel"
                    placeholder="+52 55 1234 5678"
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-white">Contraseña Temporal</Label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button className="flex-1 bg-gradient-to-r from-[#2E5E4E] to-[#7BAE7F] hover:opacity-90 text-white">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Crear Usuario
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {userStats.map((stat, index) => (
          <Card
            key={index}
            className="p-6 bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-gray-300 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-semibold text-white">
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="p-4 bg-white/5 backdrop-blur-md border-white/10">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Buscar por nombre o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
            />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full md:w-[200px] bg-white/5 border-white/10 text-[#1E2B24]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los roles</SelectItem>
              <SelectItem value="cliente">Clientes</SelectItem>
              <SelectItem value="empleado">Empleados</SelectItem>
              <SelectItem value="admin">Administradores</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Users Table */}
      <Card className="bg-white/5 backdrop-blur-md border-white/10 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-white/5">
              <TableHead className="text-gray-300">Usuario</TableHead>
              <TableHead className="text-gray-300">Contacto</TableHead>
              <TableHead className="text-gray-300">Rol</TableHead>
              <TableHead className="text-gray-300">Estado</TableHead>
              <TableHead className="text-gray-300">Último Acceso</TableHead>
              <TableHead className="text-gray-300">Info Adicional</TableHead>
              <TableHead className="text-gray-300 text-right">
                Acciones
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                className="border-white/10 hover:bg-white/5"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2E5E4E] to-[#7BAE7F] flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {user.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">{user.name}</p>
                      <p className="text-gray-400 text-xs">ID: {user.id}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-gray-400 text-sm">
                      <Mail className="w-3 h-3 text-gray-300" />
                      <span className="text-xs">{user.email}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400 text-sm">
                      <Phone className="w-3 h-3 text-gray-300" />
                      <span className="text-xs">{user.phone}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getRoleColor(user.role)}>
                    <span className="flex items-center gap-1">
                      {getRoleIcon(user.role)}
                      {user.role}
                    </span>
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(user.status)}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-300 text-sm">
                  {user.lastLogin}
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {user.role === "cliente" && (
                      <div className="space-y-1">
                        <p className="text-gray-400">
                          {user.orders} órdenes
                        </p>
                        <p className="text-[#7BAE7F]">
                          ${user.totalSpent?.toLocaleString()}
                        </p>
                      </div>
                    )}
                    {user.role === "empleado" && (
                      <p className="text-gray-400">{user.department}</p>
                    )}
                    {user.role === "admin" && (
                      <p className="text-orange-400">{user.permissions}</p>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    >
                      {user.status === "activo" ? (
                        <XCircle className="w-4 h-4" />
                      ) : (
                        <CheckCircle className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
