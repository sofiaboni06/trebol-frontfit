import { createBrowserRouter, Navigate } from "react-router";
import { HomePage } from "./pages/home-page";
import { CatalogPage } from "./pages/catalog-page";
import { ProductDetailPage } from "./pages/product-detail-page";
import { CartPage } from "./pages/cart-page";
import { CheckoutPage } from "./pages/checkout-page";
import { ServicesPage } from "./pages/services-page";
import { AIAssistantPage } from "./pages/ai-assistant-page";
import { PlantScannerPage } from "./pages/plant-scanner-page";
import { ProfilePage } from "./pages/profile-page";
import { AdminDashboard } from "./pages/admin-dashboard";
import { LoginPage } from "./pages/login-page";
import { RegisterPage } from "./pages/register-page";
import { MobileHome } from "./pages/mobile/mobile-home";
import { MobileProduct } from "./pages/mobile/mobile-product";
import { MobileScanner } from "./pages/mobile/mobile-scanner";
import { MobileProfile } from "./pages/mobile/mobile-profile";
import { RootLayout } from "./layouts/root-layout";
import { MobileLayout } from "./layouts/mobile-layout";
import { useAuth } from "../hooks/useAuth";

function RequireAuth(Component) {
  return function Protected(props) {
    const { isAuthenticated, loading } = useAuth();
    if (loading) return null;
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    return <Component {...props} />;
  };
}

function RequireRole(Component, roleName) {
  return function RoleProtected(props) {
    const { isAuthenticated, loading, hasRole } = useAuth();
    if (loading) return null;
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    if (!hasRole(roleName)) return <Navigate to="/" replace />;
    return <Component {...props} />;
  };
}

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/registro",
    Component: RegisterPage,
  },
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "catalogo", Component: CatalogPage },
      { path: "producto/:id", Component: ProductDetailPage },
      { path: "carrito", Component: CartPage },
      { path: "checkout", Component: CheckoutPage },
      { path: "servicios", Component: ServicesPage },
      { path: "asistente-ia", Component: AIAssistantPage },
      { path: "escaner", Component: PlantScannerPage },
      { path: "perfil", Component: ProfilePage },
      { path: "perfil", Component: RequireAuth(ProfilePage) },
      { path: "admin", Component: RequireRole(AdminDashboard, "ADMIN") },
    ],
  },
  {
    path: "/mobile",
    Component: MobileLayout,
    children: [
      { index: true, Component: MobileHome },
      { path: "producto/:id", Component: MobileProduct },
      { path: "escaner", Component: MobileScanner },
      { path: "perfil", Component: MobileProfile },
    ],
  },
]);
