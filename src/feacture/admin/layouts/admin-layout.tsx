import { Outlet, Link, NavLink } from "react-router";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarInset,
  SidebarTrigger,
} from "../components/ui/sidebar";
import "./admin-theme.css";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Calendar,
  BarChart3,
  Settings,
  Leaf,
  Archive,
  FolderTree,
  Sparkles,
  FileText,
  Briefcase,
} from "lucide-react";
import { Button } from "../components/ui/button";



export function AdminLayout() {
  const linkClasses = (isActive: boolean) =>
    isActive
      ? "admin-link-active bg-[rgba(46,94,78,0.18)] shadow-[0_16px_36px_rgba(25,50,38,0.18)] rounded-2xl"
      : "admin-link hover:bg-[rgba(123,174,127,0.08)] rounded-2xl transition-all duration-200 ease-out";

  return (
    <SidebarProvider>
      <div className="admin-root min-h-screen flex w-full">
        {/* Admin Sidebar */}
        <Sidebar className="admin-sidebar border-r border-white/6">
          <SidebarContent>
            {/* Logo Section */}
            <div className="p-6">
              <Link to="/admin" className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2E5E4E] to-[#7BAE7F] flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-50">Trebol Paisajismo</p>
                  <p className="text-xs text-gray-400">Admin Panel</p>
                </div>
              </Link>
            </div>

            {/* Navigation Groups */}
            <SidebarGroup>
              <SidebarGroupLabel className="text-gray-400">
                Principal
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <NavLink to="/admin" end>
                      {({ isActive }) => (
                        <SidebarMenuButton className={linkClasses(isActive)}>
                          <LayoutDashboard className="w-4 h-4" />
                          <span>Dashboard</span>
                        </SidebarMenuButton>
                      )}
                    </NavLink>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel className="text-gray-400">
                Catálogo
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <NavLink to="/admin/productos">
                      {({ isActive }) => (
                        <SidebarMenuButton className={linkClasses(isActive)}>
                          <Package className="w-4 h-4" />
                          <span>Productos</span>
                        </SidebarMenuButton>
                      )}
                    </NavLink>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <NavLink to="/admin/categorias">
                      {({ isActive }) => (
                        <SidebarMenuButton className={linkClasses(isActive)}>
                          <FolderTree className="w-4 h-4" />
                          <span>Categorías</span>
                        </SidebarMenuButton>
                      )}
                    </NavLink>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <NavLink to="/admin/inventario">
                      {({ isActive }) => (
                        <SidebarMenuButton className={linkClasses(isActive)}>
                          <Archive className="w-4 h-4" />
                          <span>Inventario</span>
                        </SidebarMenuButton>
                      )}
                    </NavLink>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel className="text-gray-400">
                Operaciones
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <NavLink to="/admin/ventas">
                      {({ isActive }) => (
                        <SidebarMenuButton className={linkClasses(isActive)}>
                          <ShoppingCart className="w-4 h-4" />
                          <span>Ventas</span>
                        </SidebarMenuButton>
                      )}
                    </NavLink>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <NavLink to="/admin/citas">
                      {({ isActive }) => (
                        <SidebarMenuButton className={linkClasses(isActive)}>
                          <Calendar className="w-4 h-4" />
                          <span>Citas</span>
                        </SidebarMenuButton>
                      )}
                    </NavLink>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <NavLink to="/admin/servicios">
                      {({ isActive }) => (
                        <SidebarMenuButton className={linkClasses(isActive)}>
                          <Briefcase className="w-4 h-4" />
                          <span>Servicios</span>
                        </SidebarMenuButton>
                      )}
                    </NavLink>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel className="text-gray-400">
                Gestión
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <NavLink to="/admin/usuarios">
                      {({ isActive }) => (
                        <SidebarMenuButton className={linkClasses(isActive)}>
                          <Users className="w-4 h-4" />
                          <span>Usuarios</span>
                        </SidebarMenuButton>
                      )}
                    </NavLink>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <NavLink to="/admin/ia">
                      {({ isActive }) => (
                        <SidebarMenuButton className={linkClasses(isActive)}>
                          <Sparkles className="w-4 h-4" />
                          <span>IA</span>
                        </SidebarMenuButton>
                      )}
                    </NavLink>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <NavLink to="/admin/reportes">
                      {({ isActive }) => (
                        <SidebarMenuButton className={linkClasses(isActive)}>
                          <FileText className="w-4 h-4" />
                          <span>Reportes</span>
                        </SidebarMenuButton>
                      )}
                    </NavLink>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel className="text-gray-400">
                Sistema
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <NavLink to="/admin/configuracion">
                      {({ isActive }) => (
                        <SidebarMenuButton className={linkClasses(isActive)}>
                          <Settings className="w-4 h-4" />
                          <span>Configuración</span>
                        </SidebarMenuButton>
                      )}
                    </NavLink>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <SidebarInset className="flex-1 overflow-auto">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-white/10 backdrop-blur-xl px-6">
            <SidebarTrigger className="admin-trigger" />
            <div className="flex-1" />
            <Link to="/">
              <Button
                variant="ghost"
                className="text-gray-200 hover:text-gray-50 hover:bg-[#7BAE7F]/18"
              >
                Volver al sitio
              </Button>
            </Link>
          </header>
          <main className="flex-1 p-6 admin-main">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

