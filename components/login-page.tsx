"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Chrome, Shield, Zap, Sparkles, ArrowRight } from "lucide-react";
import { signIn } from "next-auth/react";

export function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    try {
      setLoading(true);
      await signIn("google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-blue-900 dark:to-violet-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-400/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-cyan-400/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-violet-400/30 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-md space-y-8 relative z-10">
        {/* Header with enhanced animations */}
        <div className="text-center space-y-4 animate-fade-in-up">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-violet-500 to-blue-500 rounded-3xl flex items-center justify-center shadow-2xl hover:shadow-violet-500/25 transition-all duration-500 hover:scale-110 hover:rotate-3 group">
            <Sparkles className="w-10 h-10 text-white group-hover:animate-spin transition-transform duration-500" />
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent animate-gradient-x">
              Admin Panel
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg animate-fade-in-up delay-200">
              E-commerce Management System
            </p>
          </div>
        </div>

        {/* Main card with enhanced styling */}
        <Card className="border-0 shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] animate-fade-in-up delay-300">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-semibold animate-fade-in-up delay-400">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-base animate-fade-in-up delay-500">
              Sign in with your Google account to access the admin panel
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Enhanced Google Sign-in Button */}
            <Button
              onClick={handleSignIn}
              disabled={loading}
              className="w-full h-14 text-lg font-medium bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden animate-fade-in-up delay-600"
            >
              {/* Button shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

              {loading ? (
                <div className="flex items-center">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <Chrome className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-200" />
                  <span>Continue with Google</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              )}
            </Button>

            {/* Feature highlights with animations */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="text-center space-y-3 group cursor-pointer animate-fade-in-up delay-700">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-emerald-200/50">
                  <Shield className="w-6 h-6 text-emerald-600 group-hover:animate-pulse" />
                </div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-emerald-600 transition-colors duration-200">
                  Secure Access
                </p>
              </div>

              <div className="text-center space-y-3 group cursor-pointer animate-fade-in-up delay-800">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-orange-200/50">
                  <Zap className="w-6 h-6 text-orange-600 group-hover:animate-bounce" />
                </div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-orange-600 transition-colors duration-200">
                  Fast & Reliable
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer text with animation */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 animate-fade-in-up delay-900">
          Only authorized administrators can access this panel
        </p>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient-x {
          0%,
          100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-300 {
          animation-delay: 0.3s;
        }

        .delay-400 {
          animation-delay: 0.4s;
        }

        .delay-500 {
          animation-delay: 0.5s;
        }

        .delay-600 {
          animation-delay: 0.6s;
        }

        .delay-700 {
          animation-delay: 0.7s;
        }

        .delay-800 {
          animation-delay: 0.8s;
        }

        .delay-900 {
          animation-delay: 0.9s;
        }

        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
}
