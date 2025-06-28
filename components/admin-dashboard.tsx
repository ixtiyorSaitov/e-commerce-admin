"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { DashboardContent } from "@/components/dashboard-content";
import { ProductsPage } from "@/components/products-page";
import { CategoriesPage } from "@/components/categories-page";
import { UsersPage } from "@/components/users-page";
import { NotificationsPage } from "@/components/notifications-page";
import { PromoCodesPage } from "@/components/promo-codes-page";
import { AnalyticsPage } from "@/components/analytics-page";

export type ActivePage =
  | "dashboard"
  | "products"
  | "categories"
  | "users"
  | "notifications"
  | "promo-codes"
  | "analytics";

export function AdminDashboard() {
  const [activePage, setActivePage] = useState<ActivePage>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardContent />;
      case "products":
        return <ProductsPage />;
      case "categories":
        return <CategoriesPage />;
      case "users":
        return <UsersPage />;
      case "notifications":
        return <NotificationsPage />;
      case "promo-codes":
        return <PromoCodesPage />;
      case "analytics":
        return <AnalyticsPage />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar
          // activePage={activePage}
          // setActivePage={setActivePage}
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
        />
        <div
          className={`flex-1 transition-all duration-300 ${
            sidebarOpen ? "ml-64" : "ml-16"
          }`}
        >
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main className="p-6">{renderContent()}</main>
        </div>
      </div>
    </div>
  );
}
