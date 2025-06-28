"use client";

import { useAuth } from "@/components/auth-provider";
import { LoginPage } from "@/components/login-page";
import { AdminLayout } from "@/components/admin-layout";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { DashboardContent } from "@/components/dashboard-content";

export default function HomePage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-blue-900 dark:to-violet-900">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <AdminLayout>
      <DashboardContent />
    </AdminLayout>
  );
}
