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
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
import { useEffect, useMemo, useState } from "react";
import userService from "../../../../services/user.service";

const roleOptions = [
  { value: "CLIENTE", label: "Cliente" },
  { value: "EMPLEADO", label: "Empleado" },
  { value: "ADMIN", label: "Administrador" },
];

const getRoleColor = (role: string) => {
  const normalized = role?.toString().toLowerCase();
  switch (normalized) {
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
  const normalized = role?.toString().toLowerCase();
  switch (normalized) {
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

const getStatusColor = (estado?: boolean) => {
  return estado
    ? "bg-green-500/20 text-green-400 border-green-500/30"
    : "bg-red-500/20 text-red-400 border-red-500/30";
};

export function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formValues, setFormValues] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    direccion: "",
    password: "",
    role: "CLIENTE",
    estado: true,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [actionMessage, setActionMessage] = useState("");
  const [actionError, setActionError] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await userService.getUsers();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("No se pudieron cargar los usuarios.");
    } finally {
      setLoading(false);
    }
  };

  const openCreateDialog = () => {
    setEditingUser(null);
    setFormValues({
      nombre: "",
      apellido: "",
      correo: "",
      telefono: "",
      direccion: "",
      password: "",
      role: "CLIENTE",
      estado: true,
    });
    setActionError("");
    setActionMessage("");
    setIsDialogOpen(true);
  };

  const openEditDialog = (user: any) => {
    setEditingUser(user);
    setFormValues({
      nombre: user.nombre || "",
      apellido: user.apellido || "",
      correo: user.correo || "",
      telefono: user.telefono || "",
      direccion: user.direccion || "",
      password: "",
      role: user.roles?.[0]?.nombre || "CLIENTE",
      estado: user.estado ?? true,
    });
    setActionError("");
    setActionMessage("");
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingUser(null);
    setActionError("");
  };

  const handleFormChange = (field: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setActionError("");
    setActionMessage("");
    setIsSaving(true);

    try {
      const payload: any = {
        nombre: formValues.nombre,
        apellido: formValues.apellido,
        correo: formValues.correo,
        telefono: formValues.telefono,
        direccion: formValues.direccion,
        estado: formValues.estado,
        roles: [formValues.role],
      };

      if (formValues.password) {
        payload.password = formValues.password;
      }

      let savedUser;
      if (editingUser?.id) {
        savedUser = await userService.updateUser(editingUser.id, payload);
        setUsers((prev) =>
          prev.map((user) => (user.id === savedUser.id ? savedUser : user))
        );
        setActionMessage("Usuario actualizado correctamente.");
      } else {
        payload.password = formValues.password || "123456";
        savedUser = await userService.createUser(payload);
        setUsers((prev) => [savedUser, ...prev]);
        setActionMessage("Usuario creado correctamente.");
      }

      closeDialog();
    } catch (err) {
      console.error(err);
      setActionError("No se pudo guardar el usuario. Verifica los datos e intenta de nuevo.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleStatus = async (user: any) => {
    setActionError("");
    try {
      const updated = await userService.updateUser(user.id, {
        estado: !user.estado,
      });
      setUsers((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
      setActionMessage(
        `Usuario ${updated.estado ? "activado" : "desactivado"} correctamente.`
      );
    } catch (err) {
      console.error(err);
      setActionError("No se pudo cambiar el estado del usuario.");
    }
  };

  const handleDeleteUser = async (user: any) => {
    const confirmed = window.confirm(
      `¿Estás seguro de eliminar a ${user.nombre} ${user.apellido}?`
    );
    if (!confirmed) {
      return;
    }

    setActionError("");
    try {
      await userService.deleteUser(user.id);
      setUsers((prev) => prev.filter((item) => item.id !== user.id));
      setActionMessage("Usuario eliminado correctamente.");
    } catch (err) {
      console.error(err);
      setActionError("No se pudo eliminar el usuario.");
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user: any) => {
      const term = searchTerm.trim().toLowerCase();
      const matchesSearch =
        !term ||
        user.nombre?.toLowerCase().includes(term) ||
        user.apellido?.toLowerCase().includes(term) ||
        user.correo?.toLowerCase().includes(term);
      const matchesRole =
        roleFilter === "all" ||
        user.roles?.some(
          (role: any) => role?.nombre?.toLowerCase() === roleFilter.toLowerCase()
        );
      return matchesSearch && matchesRole;
    });
  }, [users, searchTerm, roleFilter]);

  const stats = useMemo(() => {
    const totalUsuarios = users.length;
    const activos = users.filter((user: any) => user.estado).length;
    const inactivos = totalUsuarios - activos;
    const clientes = users.filter((user: any) =>
      user.roles?.some((role: any) => role?.nombre?.toLowerCase() === "cliente")
    ).length;
    const empleados = users.filter((user: any) =>
      user.roles?.some((role: any) => role?.nombre?.toLowerCase() === "empleado")
    ).length;
    const admins = users.filter((user: any) =>
      user.roles?.some((role: any) => role?.nombre?.toLowerCase() === "admin")
    ).length;

    return [
      {
        label: "Total Usuarios",
        value: totalUsuarios,
        icon: Users,
        color: "text-blue-400",
        bgColor: "bg-blue-500/10",
      },
      {
        label: "Activos",
        value: activos,
        icon: CheckCircle,
        color: "text-emerald-400",
        bgColor: "bg-emerald-500/10",
      },
      {
        label: "Clientes",
        value: clientes,
        icon: User,
        color: "text-green-400",
        bgColor: "bg-green-500/10",
      },
      {
        label: "Admins",
        value: admins,
        icon: Shield,
        color: "text-orange-400",
        bgColor: "bg-orange-500/10",
      },
    ];
  }, [users]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-[#E8EFE5]">Gestión de Usuarios</h1>
          <p className="text-[#B8C5B3] mt-1">Administra clientes, empleados y roles.</p>
        </div>
        <Button
          onClick={openCreateDialog}
          className="bg-gradient-to-br from-[#2E5E4E] to-[#3D7A5E] hover:from-[#3D7A5E] hover:to-[#4D8A6E] text-white shadow-[0_8px_24px_rgba(46,94,78,0.3)] transition-all duration-300"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Nuevo Usuario
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="p-6 bg-white/[0.04] backdrop-blur-xl border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-[#B8C5B3] text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-semibold text-[#E8EFE5]">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

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
            <SelectTrigger className="w-full md:w-[200px] bg-white/5 border-white/10 text-white">
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

      {error ? (
        <Card className="p-4 bg-red-500/10 border border-red-500/20 text-red-100">
          {error}
        </Card>
      ) : null}

      {actionMessage ? (
        <Card className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-100">
          {actionMessage}
        </Card>
      ) : null}

      {actionError ? (
        <Card className="p-4 bg-red-500/10 border border-red-500/20 text-red-100">
          {actionError}
        </Card>
      ) : null}

      <Card className="bg-white/5 backdrop-blur-md border-white/10 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-white/5">
              <TableHead className="text-gray-300">Usuario</TableHead>
              <TableHead className="text-gray-300">Contacto</TableHead>
              <TableHead className="text-gray-300">Rol</TableHead>
              <TableHead className="text-gray-300">Estado</TableHead>
              <TableHead className="text-gray-300">Creado</TableHead>
              <TableHead className="text-gray-300 text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow className="border-white/10 hover:bg-white/5">
                <TableCell colSpan={6} className="text-center text-gray-400 py-6">
                  Cargando usuarios...
                </TableCell>
              </TableRow>
            ) : filteredUsers.length === 0 ? (
              <TableRow className="border-white/10 hover:bg-white/5">
                <TableCell colSpan={6} className="text-center text-gray-400 py-6">
                  No se encontraron usuarios.
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user: any) => (
                <TableRow
                  key={user.id}
                  className="border-white/10 hover:bg-white/5"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2E5E4E] to-[#7BAE7F] flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {user.nombre?.charAt(0) || "U"}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{`${user.nombre || ""} ${user.apellido || ""}`}</p>
                        <p className="text-gray-400 text-xs">ID: {user.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-gray-400 text-sm">
                        <Mail className="w-3 h-3 text-gray-300" />
                        <span className="text-xs">{user.correo}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-400 text-sm">
                        <Phone className="w-3 h-3 text-gray-300" />
                        <span className="text-xs">{user.telefono || "-"}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getRoleColor(user.roles?.[0]?.nombre)}>
                      <span className="flex items-center gap-1">
                        {getRoleIcon(user.roles?.[0]?.nombre)}
                        {user.roles?.[0]?.nombre?.toLowerCase() || "-"}
                      </span>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(user.estado)}>
                      {user.estado ? "activo" : "inactivo"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-300 text-sm">
                    {user.fechaCreacion
                      ? new Date(user.fechaCreacion).toLocaleDateString("es-ES")
                      : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                        onClick={() => openEditDialog(user)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`${
                          user.estado
                            ? "text-red-400 hover:text-red-300 hover:bg-red-500/10"
                            : "text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10"
                        }`}
                        onClick={() => handleToggleStatus(user)}
                      >
                        {user.estado ? (
                          <XCircle className="w-4 h-4" />
                        ) : (
                          <CheckCircle className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        onClick={() => handleDeleteUser(user)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-[#0B1410] border-white/[0.08] text-[#E8EFE5] max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-[#E8EFE5] text-xl">
              {editingUser ? "Editar Usuario" : "Crear Nuevo Usuario"}
            </DialogTitle>
            <DialogDescription className="text-[#B8C5B3]">
              {editingUser
                ? "Actualiza el rol y estado del usuario."
                : "Completa los datos para crear un usuario nuevo."}
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4 py-4" onSubmit={handleSaveUser}>
            {actionError ? (
              <div className="rounded-[1rem] border border-red-500/20 bg-red-500/10 p-3 text-red-100">
                {actionError}
              </div>
            ) : null}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[#E8EFE5]">Nombre</Label>
                <Input
                  value={formValues.nombre}
                  onChange={(e) => handleFormChange("nombre", e.target.value)}
                  placeholder="Ej: Juan"
                  className="bg-white/[0.04] border-white/[0.08] text-[#E8EFE5] placeholder:text-[#8B9A88]"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[#E8EFE5]">Apellido</Label>
                <Input
                  value={formValues.apellido}
                  onChange={(e) => handleFormChange("apellido", e.target.value)}
                  placeholder="Ej: Pérez"
                  className="bg-white/[0.04] border-white/[0.08] text-[#E8EFE5] placeholder:text-[#8B9A88]"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[#E8EFE5]">Email</Label>
                <Input
                  type="email"
                  value={formValues.correo}
                  onChange={(e) => handleFormChange("correo", e.target.value)}
                  placeholder="usuario@email.com"
                  className="bg-white/[0.04] border-white/[0.08] text-[#E8EFE5] placeholder:text-[#8B9A88]"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[#E8EFE5]">Teléfono</Label>
                <Input
                  type="tel"
                  value={formValues.telefono}
                  onChange={(e) => handleFormChange("telefono", e.target.value)}
                  placeholder="+52 55 1234 5678"
                  className="bg-white/[0.04] border-white/[0.08] text-[#E8EFE5] placeholder:text-[#8B9A88]"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label className="text-[#E8EFE5]">Dirección</Label>
                <Input
                  value={formValues.direccion}
                  onChange={(e) => handleFormChange("direccion", e.target.value)}
                  placeholder="Calle, colonia, ciudad"
                  className="bg-white/[0.04] border-white/[0.08] text-[#E8EFE5] placeholder:text-[#8B9A88]"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[#E8EFE5]">Rol</Label>
                <Select
                  value={formValues.role}
                  onValueChange={(value) => handleFormChange("role", value)}
                >
                  <SelectTrigger className="bg-white/[0.04] border-white/[0.08] text-[#E8EFE5]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0B1410] border-white/[0.08]">
                    {roleOptions.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-[#E8EFE5]">Estado</Label>
                <Select
                  value={formValues.estado ? "activo" : "inactivo"}
                  onValueChange={(value) =>
                    handleFormChange("estado", value === "activo")
                  }
                >
                  <SelectTrigger className="bg-white/[0.04] border-white/[0.08] text-[#E8EFE5]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0B1410] border-white/[0.08]">
                    <SelectItem value="activo">Activo</SelectItem>
                    <SelectItem value="inactivo">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label className="text-[#E8EFE5]">Contraseña</Label>
                <Input
                  type="password"
                  value={formValues.password}
                  onChange={(e) => handleFormChange("password", e.target.value)}
                  placeholder={editingUser ? "Dejar en blanco para no cambiar" : "••••••••"}
                  className="bg-white/[0.04] border-white/[0.08] text-[#E8EFE5] placeholder:text-[#8B9A88]"
                  required={!editingUser}
                />
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-br from-[#2E5E4E] to-[#3D7A5E] hover:from-[#3D7A5E] hover:to-[#4D8A6E] text-white"
                disabled={isSaving}
              >
                {editingUser ? "Guardar cambios" : "Crear usuario"}
              </Button>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="ghost"
                  className="text-gray-300 hover:text-white hover:bg-white/10"
                  onClick={closeDialog}
                >
                  Cancelar
                </Button>
              </DialogClose>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
