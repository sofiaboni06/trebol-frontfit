import { createBrowserRouter } from "react-router";
import { RootLayout } from "./layouts/root-layout";
import { HomePage } from "./pages/home-page";
import { CatalogPage } from "./pages/catalog-page";
import { ServicesPage } from "./pages/services-page";
import { AIAssistantPage } from "./pages/ai-assistant-page";
import { PlantScannerPage } from "./pages/plant-scanner-page";
import { CartPage } from "./pages/cart-page";
import { CheckoutPage } from "./pages/checkout-page";
import { ProductDetailPage } from "./pages/product-detail-page";
import { ProfilePage } from "./pages/profile-page";
import { LoginPage } from "./pages/login-page";
import { RegisterPage } from "./pages/register-page";
import { MobileLayout } from "./layouts/mobile-layout";
import { MobileHome } from "./pages/mobile/mobile-home";
import { MobileProduct } from "./pages/mobile/mobile-product";
import { MobileScanner } from "./pages/mobile/mobile-scanner";
import { MobileProfile } from "./pages/mobile/mobile-profile";
import { AdminLayout } from "../feacture/admin/layouts/admin-layout";
import { EmployeeLayout } from "../feacture/admin/layouts/employee-layout";
import { AdminDashboardNew } from "../feacture/admin/pages/admin/admin-dashboard-new";
import { CategoryManagement } from "../feacture/admin/pages/admin/category-management";
import { ServiceManagement } from "../feacture/admin/pages/admin/service-management";
import { UserManagement } from "../feacture/admin/pages/admin/user-management";
import { ReportsAnalytics } from "../feacture/admin/pages/admin/reports-analytics";
import { AIManagement } from "../feacture/admin/pages/admin/ai-management";
import { SettingsPage } from "../feacture/admin/pages/admin/settings-page";
import { EmployeeDashboard } from "../feacture/admin/pages/employee/employee-dashboard";
import { AppointmentsManagement } from "../feacture/admin/pages/employee/appointments-management";
import { InventoryManagement } from "../feacture/admin/pages/employee/inventory-management";
import { SalesManagement } from "../feacture/admin/pages/employee/sales-management";
import { CatalogManagement } from "../feacture/admin/pages/employee/catalog-management";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "catalogo", Component: CatalogPage },
      { path: "servicios", Component: ServicesPage },
      { path: "asistente-ia", Component: AIAssistantPage },
      { path: "escaner", Component: PlantScannerPage },
      { path: "carrito", Component: CartPage },
      { path: "checkout", Component: CheckoutPage },
      { path: "producto/:id", Component: ProductDetailPage },
      { path: "perfil", Component: ProfilePage },
      {
        path: "mobile",
        Component: MobileLayout,
        children: [
          { index: true, Component: MobileHome },
          { path: "producto/:id", Component: MobileProduct },
          { path: "escaner", Component: MobileScanner },
          { path: "perfil", Component: MobileProfile },
        ],
      },
    ],
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/register",
    Component: RegisterPage,
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { index: true, Component: AdminDashboardNew },
      { path: "productos", Component: CategoryManagement },
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
    Component: EmployeeLayout,
    children: [
      { index: true, Component: EmployeeDashboard },
      { path: "citas", Component: AppointmentsManagement },
      { path: "inventario", Component: InventoryManagement },
      { path: "ventas", Component: SalesManagement },
      { path: "catalogo", Component: CatalogManagement },
    ],
  },
]);
