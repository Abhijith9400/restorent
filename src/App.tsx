import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import Sidebar from "./components/admin/Sidebar";

// Lazy load components for better performance
const UserManagement = lazy(() => import("./components/admin/UserManagement"));
const MenuManagement = lazy(() => import("./components/admin/MenuManagement"));
const TableManagement = lazy(
  () => import("./components/admin/TableManagement"),
);
const Settings = lazy(() => import("./components/admin/Settings"));
const Reports = lazy(() => import("./components/admin/Reports"));

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 overflow-auto p-6">{children}</div>
    </div>
  );
}

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <p>Loading...</p>
        </div>
      }
    >
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/users"
            element={
              <AdminLayout>
                <UserManagement />
              </AdminLayout>
            }
          />
          <Route
            path="/menu"
            element={
              <AdminLayout>
                <MenuManagement />
              </AdminLayout>
            }
          />
          <Route
            path="/tables"
            element={
              <AdminLayout>
                <TableManagement />
              </AdminLayout>
            }
          />
          <Route
            path="/reports"
            element={
              <AdminLayout>
                <Reports />
              </AdminLayout>
            }
          />
          <Route
            path="/settings"
            element={
              <AdminLayout>
                <Settings />
              </AdminLayout>
            }
          />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
