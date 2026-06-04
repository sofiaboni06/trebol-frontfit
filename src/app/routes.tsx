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
import { LoginPage } from "./pages/login-page";
import { RegisterPage } from "./pages/register-page";
import { MobileHome } from "./pages/mobile/mobile-home";
import { MobileProduct } from "./pages/mobile/mobile-product";
import { MobileScanner } from "./pages/mobile/mobile-scanner";
import { MobileProfile } from "./pages/mobile/mobile-profile";
import { RootLayout } from "./layouts/root-layout";
import { MobileLayout } from "./layouts/mobile-layout";
import { AdminLayout } from "../feacture/admin/layouts/admin-layout";
import { EmployeeLayout } from "../feacture/admin/layouts/employee-layout";
import { AdminDashboardNew } from "../feacture/admin/pages/admin/admin-dashboard-new";
import { UserManagement } from "../feacture/admin/pages/admin/user-management";
import { ReportsAnalytics } from "../feacture/admin/pages/admin/reports-analytics";
import { AIManagement } from "../feacture/admin/pages/admin/ai-management";
import { SettingsPage } from "../feacture/admin/pages/admin/settings-page";
import { CategoryManagement } from "../feacture/admin/pages/admin/category-management";
import { ServiceManagement } from "../feacture/admin/pages/admin/service-management";
import { EmployeeDashboard } from "../feacture/admin/pages/employee/employee-dashboard";
import { CatalogManagement } from "../feacture/admin/pages/employee/catalog-management";
import { InventoryManagement } from "../feacture/admin/pages/employee/inventory-management";
import { AppointmentsManagement } from "../feacture/admin/pages/employee/appointments-management";
import { SalesManagement } from "../feacture/admin/pages/employee/sales-management";
import { useAuth } from "../hooks/useAuth";

function RequireAuth(Component) {
  return function Protected(props) {
    const { isAuthenticated, loading } = useAuth();
    if (loading) return null;
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    return <Component {...props} />;
  };
}

function ProtectedRoleRoute(Component, roleName) {
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
      
      { path: "perfil", Component: RequireAuth(ProfilePage) },
    ],
  },
  {
    path: "/admin",
    Component: ProtectedRoleRoute(AdminLayout, "ADMIN"),
    children: [
      { index: true, Component: AdminDashboardNew },
      { path: "productos", Component: CatalogManagement },
      { path: "categorias", Component: CategoryManagement },
      { path: "inventario", Component: InventoryManagement },
      { path: "ventas", Component: SalesManagement },
      { path: "citas", Component: AppointmentsManagement },
      { path: "servicios", Component: ServiceManagement },
      { path: "usuarios", Component: UserManagement },
      { path: "ia", Component: AIManagement },
      { path: "reportes", Component: ReportsAnalytics },
      { path: "configuracion", Component: SettingsPage },
    ],
  },
  {
    path: "/empleado",
    Component: ProtectedRoleRoute(EmployeeLayout, "EMPLEADO"),
    children: [
      { index: true, Component: EmployeeDashboard },
      { path: "catalogo", Component: CatalogManagement },
      { path: "inventario", Component: InventoryManagement },
      { path: "citas", Component: AppointmentsManagement },
      { path: "ventas", Component: SalesManagement },
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
