import { Outlet, Link, useLocation } from "react-router";
import { ShoppingCart, Leaf, Sparkles, Scan, User, Menu } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";
import { useAuth } from "../../hooks/useAuth";

export function RootLayout() {
  const location = useLocation();
  const [cartCount] = useState(3);
  const isAdminOrEmployeePage =
    location.pathname.includes("/admin") || location.pathname.includes("/empleado");
  const { isAuthenticated, logout } = useAuth();

  if (isAdminOrEmployeePage) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-[#F4F1EA]">
      {/* Transparent Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/70 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2E5E4E] to-[#7BAE7F] flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-[#1E2B24] tracking-tight">
                Trebol Paisajismo
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                to="/catalogo"
                className="text-[#1E2B24] hover:text-[#2E5E4E] transition-colors"
              >
                Catálogo
              </Link>
              <Link
                to="/servicios"
                className="text-[#1E2B24] hover:text-[#2E5E4E] transition-colors"
              >
                Servicios
              </Link>
              <Link
                to="/asistente-ia"
                className="flex items-center gap-1 text-[#1E2B24] hover:text-[#2E5E4E] transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                Asistente IA
              </Link>
              <Link
                to="/escaner"
                className="flex items-center gap-1 text-[#1E2B24] hover:text-[#2E5E4E] transition-colors"
              >
                <Scan className="w-4 h-4" />
                Escáner
              </Link>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <Link to="/carrito">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative hover:bg-white/50"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-[#2E5E4E] text-white">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </Link>
              <Link to="/perfil">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-white/50"
                >
                  <User className="w-5 h-5" />
                </Button>
              </Link>

              {isAuthenticated && (
                <Button
                  variant="ghost"
                  className="text-sm hidden md:inline-flex"
                  onClick={() => logout()}
                >
                  Cerrar sesión
                </Button>
              )}

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="bg-white">
                  <div className="flex flex-col gap-6 mt-8">
                    <Link
                      to="/catalogo"
                      className="text-lg text-[#1E2B24] hover:text-[#2E5E4E]"
                    >
                      Catálogo
                    </Link>
                    <Link
                      to="/servicios"
                      className="text-lg text-[#1E2B24] hover:text-[#2E5E4E]"
                    >
                      Servicios
                    </Link>
                    <Link
                      to="/asistente-ia"
                      className="flex items-center gap-2 text-lg text-[#1E2B24] hover:text-[#2E5E4E]"
                    >
                      <Sparkles className="w-5 h-5" />
                      Asistente IA
                    </Link>
                    <Link
                      to="/escaner"
                      className="flex items-center gap-2 text-lg text-[#1E2B24] hover:text-[#2E5E4E]"
                    >
                      <Scan className="w-5 h-5" />
                      Escáner
                    </Link>

                    {isAuthenticated && (
                      <button
                        onClick={() => logout()}
                        className="text-left text-lg text-[#1E2B24] hover:text-[#2E5E4E]"
                      >
                        Cerrar sesión
                      </button>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#1E2B24] text-white mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2E5E4E] to-[#7BAE7F] flex items-center justify-center">
                  <Leaf className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold">Trebol Paisajismo</span>
              </div>
              <p className="text-gray-400 text-sm">
                Transformamos espacios con naturaleza y tecnología
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Productos</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Plantas de interior</li>
                <li>Plantas de exterior</li>
                <li>Macetas y decoración</li>
                <li>Herramientas</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Servicios</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Diseño de jardines</li>
                <li>Mantenimiento</li>
                <li>Consultoría</li>
                <li>Asistente IA</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contacto</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>info@trebolpaisajismo.com</li>
                <li>+52 55 1234 5678</li>
                <li>CDMX, México</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            © 2026 Trebol Paisajismo. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
