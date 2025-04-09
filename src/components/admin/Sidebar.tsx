import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Users,
  UtensilsCrossed,
  LayoutGrid,
  BarChart3,
  Settings,
  LogOut,
  Home,
} from "lucide-react";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  isActive: boolean;
}

const SidebarItem = ({ icon, label, path, isActive }: SidebarItemProps) => {
  return (
    <Link to={path}>
      <div
        className={cn(
          "flex items-center gap-3 px-4 py-3 rounded-md transition-colors",
          isActive
            ? "bg-primary text-primary-foreground"
            : "hover:bg-muted text-foreground",
        )}
      >
        <div className="w-5 h-5">{icon}</div>
        <span className="font-medium">{label}</span>
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    {
      icon: <Home size={20} />,
      label: "Dashboard",
      path: "/",
    },
    {
      icon: <Users size={20} />,
      label: "User Management",
      path: "/users",
    },
    {
      icon: <UtensilsCrossed size={20} />,
      label: "Menu Management",
      path: "/menu",
    },
    {
      icon: <LayoutGrid size={20} />,
      label: "Table Management",
      path: "/tables",
    },
    {
      icon: <BarChart3 size={20} />,
      label: "Reports & Analytics",
      path: "/reports",
    },
    {
      icon: <Settings size={20} />,
      label: "Settings",
      path: "/settings",
    },
  ];

  return (
    <div className="w-[280px] h-full bg-background border-r flex flex-col">
      <div className="p-6">
        <div className="flex items-center gap-2">
          <UtensilsCrossed className="h-8 w-8 text-primary" />
          <h1 className="text-xl font-bold">Cheftab Admin</h1>
        </div>
      </div>

      <div className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.path}
              icon={item.icon}
              label={item.label}
              path={item.path}
              isActive={currentPath === item.path}
            />
          ))}
        </nav>
      </div>

      <div className="p-4 border-t">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-md hover:bg-muted transition-colors text-foreground">
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
