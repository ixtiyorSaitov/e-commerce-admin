"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Users,
  Bell,
  Tag,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const menuItems = [
  {
    id: "/",
    label: "Dashboard",
    icon: LayoutDashboard,
    color: "text-blue-600",
  },
  {
    id: "/products",
    label: "Products",
    icon: Package,
    color: "text-green-600",
  },
  {
    id: "/categories",
    label: "Categories",
    icon: FolderTree,
    color: "text-purple-600",
  },
  { id: "/users", label: "Users", icon: Users, color: "text-orange-600" },
  {
    id: "/notifications",
    label: "Notifications",
    icon: Bell,
    color: "text-red-600",
  },
  {
    id: "/promo-codes",
    label: "Promo Codes",
    icon: Tag,
    color: "text-yellow-600",
  },
  {
    id: "/analytics",
    label: "Analytics",
    icon: BarChart3,
    color: "text-indigo-600",
  },
] as const;

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-r border-violet-200/50 dark:border-gray-700/50 transition-all duration-300 shadow-2xl",
        isOpen ? "w-64" : "w-16"
      )}
    >
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center justify-between px-4 border-b border-violet-200/50 dark:border-gray-700/50 bg-gradient-to-r from-violet-500/10 to-blue-500/10">
          {isOpen && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-lg font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                Admin Panel
              </h2>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="h-8 w-8 hover:bg-violet-100 dark:hover:bg-gray-800"
          >
            {isOpen ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </div>

        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.id;

              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start h-11 transition-all duration-200 group",
                    isActive &&
                      "bg-gradient-to-r from-violet-500 to-blue-500 shadow-lg shadow-violet-500/25 text-white",
                    !isActive &&
                      "hover:bg-gradient-to-r hover:from-violet-50 hover:to-blue-50 dark:hover:from-gray-800 dark:hover:to-gray-700",
                    !isOpen && "px-2"
                  )}
                  onClick={() => router.push(item.id)}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5 transition-colors",
                      isActive ? "text-white" : item.color,
                      isOpen && "mr-3"
                    )}
                  />
                  {isOpen && <span className="font-medium">{item.label}</span>}
                  {!isOpen && (
                    <div className="absolute left-16 bg-gray-900 text-white px-2 py-1 rounded-md text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                      {item.label}
                    </div>
                  )}
                </Button>
              );
            })}
          </nav>
        </ScrollArea>
      </div>
    </div>
  );
}
