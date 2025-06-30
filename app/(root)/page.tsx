"use client";

import { AdminLayout } from "@/components/admin-layout";
import { DashboardContent } from "@/components/dashboard-content";

export default function HomePage() {
  return (
    <AdminLayout>
      <DashboardContent />
    </AdminLayout>
  );
}
