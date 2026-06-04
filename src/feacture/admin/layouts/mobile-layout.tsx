import { Outlet, Link, useLocation } from "react-router";
import { Home, ShoppingBag, Scan, User } from "lucide-react";

export function MobileLayout() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/mobile" && location.pathname === "/mobile") return true;
    if (path !== "/mobile" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-[#F4F1EA] pb-20">
      <Outlet />

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 backdrop-blur-lg bg-white/90 z-50">
        <div className="flex items-center justify-around px-6 py-3">
          <Link
            to="/mobile"
            className={`flex flex-col items-center gap-1 ${
              isActive("/mobile") ? "text-[#2E5E4E]" : "text-gray-500"
            }`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs">Inicio</span>
          </Link>
          <Link
            to="/catalogo"
            className={`flex flex-col items-center gap-1 ${
              location.pathname.includes("/catalogo")
                ? "text-[#2E5E4E]"
                : "text-gray-500"
            }`}
          >
            <ShoppingBag className="w-6 h-6" />
            <span className="text-xs">Catálogo</span>
          </Link>
          <Link
            to="/mobile/escaner"
            className={`flex flex-col items-center gap-1 ${
              isActive("/mobile/escaner") ? "text-[#2E5E4E]" : "text-gray-500"
            }`}
          >
            <div className="w-14 h-14 -mt-6 rounded-full bg-gradient-to-br from-[#2E5E4E] to-[#7BAE7F] flex items-center justify-center shadow-lg">
              <Scan className="w-7 h-7 text-white" />
            </div>
            <span className="text-xs mt-1">Escáner</span>
          </Link>
          <Link
            to="/mobile/perfil"
            className={`flex flex-col items-center gap-1 ${
              isActive("/mobile/perfil") ? "text-[#2E5E4E]" : "text-gray-500"
            }`}
          >
            <User className="w-6 h-6" />
            <span className="text-xs">Perfil</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
