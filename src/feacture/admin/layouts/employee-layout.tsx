import { Outlet, Link, useLocation } from "react-router";
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
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Calendar,
  BarChart3,
  Leaf,
  Archive,
  ClipboardList,
  FileBarChart,
} from "lucide-react";
import { Button } from "../components/ui/button";

export function EmployeeLayout() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-[#1E2B24] flex w-full">
        {/* Employee Sidebar */}
        <Sidebar className="border-r border-white/10 bg-[#1E2B24]">
          <SidebarContent>
            {/* Logo Section */}
            <div className="p-6">
              <Link to="/empleado" className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2E5E4E] to-[#7BAE7F] flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">Trebol Paisajismo</p>
                  <p className="text-xs text-gray-300">Panel de Empleado</p>
                </div>
              </Link>
            </div>

            {/* Navigation Groups */}
            <SidebarGroup>
              <SidebarGroupLabel className="text-gray-300">
                Principal
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <Link to="/empleado">
                      <SidebarMenuButton
                        className={
                          isActive("/empleado")
                            ? "text-[#2E5E4E] bg-white/10"
                            : "text-gray-300 hover:bg-white/10 hover:text-[#2E5E4E]"
                        }
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        <span>Dashboard</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel className="text-gray-300">
                Operaciones
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <Link to="/empleado/catalogo">
                      <SidebarMenuButton
                        className={
                          isActive("/empleado/catalogo")
                            ? "text-[#2E5E4E] bg-white/10"
                            : "text-gray-300 hover:bg-white/10 hover:text-[#2E5E4E]"
                        }
                      >
                        <Package className="w-4 h-4" />
                        <span>Catálogo</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Link to="/empleado/inventario">
                      <SidebarMenuButton
                        className={
                          isActive("/empleado/inventario")
                            ? "text-white bg-white/10"
                            : "text-gray-300 hover:bg-white/10 hover:text-[#2E5E4E]"
                        }
                      >
                        <Archive className="w-4 h-4" />
                        <span>Inventario</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Link to="/empleado/citas">
                      <SidebarMenuButton
                        className={
                          isActive("/empleado/citas")
                            ? "text-white bg-white/10"
                            : "text-gray-300 hover:bg-white/10 hover:text-[#2E5E4E]"
                        }
                      >
                        <Calendar className="w-4 h-4" />
                        <span>Citas</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Link to="/empleado/ventas">
                      <SidebarMenuButton
                        className={
                          isActive("/empleado/ventas")
                            ? "text-white bg-white/10"
                            : "text-gray-300 hover:bg-white/10 hover:text-[#2E5E4E]"
                        }
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>Ventas</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel className="text-gray-300">
                Gestión
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="text-gray-300 hover:bg-white/10 hover:text-[#2E5E4E]">
                      <ClipboardList className="w-4 h-4" />
                      <span>Productos</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="text-gray-300 hover:bg-white/10 hover:text-[#2E5E4E]">
                      <Users className="w-4 h-4" />
                      <span>Clientes</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="text-gray-300 hover:bg-white/10 hover:text-[#2E5E4E]">
                      <FileBarChart className="w-4 h-4" />
                      <span>Reportes</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <SidebarInset className="flex-1 overflow-auto">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-white/10 bg-[#1E2B24]/80 backdrop-blur-sm px-6">
            <SidebarTrigger className="text-gray-300" />
            <div className="flex-1" />
            <Link to="/">
              <Button
                variant="ghost"
                className="text-gray-300 hover:text-[#2E5E4E] hover:bg-white/10"
              >
                Volver al sitio
              </Button>
            </Link>
          </header>
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

