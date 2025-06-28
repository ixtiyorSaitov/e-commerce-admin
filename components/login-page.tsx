"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/components/auth-provider"
import { Chrome, Shield, Zap, Sparkles } from "lucide-react"

export function LoginPage() {
  const { signIn, loading } = useAuth()

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-blue-900 dark:to-violet-900">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-violet-500 to-blue-500 rounded-3xl flex items-center justify-center shadow-2xl">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
              Admin Panel
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">E-commerce Management System</p>
          </div>
        </div>

        <Card className="border-0 shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-semibold">Welcome Back</CardTitle>
            <CardDescription className="text-base">
              Sign in with your Google account to access the admin panel
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button
              onClick={signIn}
              disabled={loading}
              className="w-full h-14 text-lg font-medium bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all duration-200 group"
            >
              <Chrome className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
              {loading ? "Signing in..." : "Continue with Google"}
            </Button>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-xl flex items-center justify-center mx-auto">
                  <Shield className="w-6 h-6 text-emerald-600" />
                </div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Secure Access</p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl flex items-center justify-center mx-auto">
                  <Zap className="w-6 h-6 text-orange-600" />
                </div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Fast & Reliable</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          Only authorized administrators can access this panel
        </p>
      </div>
    </div>
  )
}
