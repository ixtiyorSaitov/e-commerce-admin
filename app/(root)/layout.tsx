"use client";

import { LoginPage } from "@/components/login-page";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useSession } from "next-auth/react";
import React from "react";

const ClientRootLayout = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-blue-900 dark:to-violet-900">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return <LoginPage />;
  }
  return <div>{children}</div>;
};

export default ClientRootLayout;
