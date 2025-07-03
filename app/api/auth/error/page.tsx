"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ShieldX, Home, AlertTriangle } from "lucide-react";
import { Suspense } from "react";

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Icon and emoji */}
        <div className="mb-8 relative">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-red-500 to-red-600 rounded-full shadow-2xl mb-4 animate-bounce">
            <ShieldX className="w-16 h-16 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 text-6xl animate-pulse">
            👮‍♂️
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent animate-pulse">
          Access Denied!
        </h1>

        {/* Error message card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-white/20 shadow-2xl">
          <div className="flex items-center justify-center mb-4">
            <AlertTriangle className="w-8 h-8 text-yellow-400 mr-3" />
            <span className="text-yellow-400 font-semibold text-lg">
              Security Alert!
            </span>
          </div>

          <p className="text-xl md:text-2xl leading-relaxed text-gray-200">
            {error === "AccessDenied" ? (
              <>
                You{" "}
                <span className="text-red-400 font-bold">cannot access</span>{" "}
                this admin panel because{" "}
                <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent font-black">
                  {"you don't have permission"}
                </span>
                .<br />
                <span className="text-lg text-gray-300 mt-2 block">
                  Please contact your administrator or try a different account
                  🔐
                </span>
              </>
            ) : (
              <span className="text-red-400 font-semibold">
                An unknown error occurred during authentication.
              </span>
            )}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 focus:outline-none focus:ring-4 focus:ring-purple-500/50"
          >
            <Home className="w-5 h-5 mr-2 group-hover:animate-pulse" />
            Return to Homepage
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="group inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-white/20 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/25"
          >
            Go Back
          </button>
        </div>

        {/* Footer message */}
        <div className="mt-12 text-gray-400 text-sm">
          <p>
            If you believe this is an error, please contact your system
            administrator.
          </p>
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthErrorContent />
    </Suspense>
  );
}
