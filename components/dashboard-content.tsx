"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package, Users, ShoppingCart, TrendingUp, ArrowUpRight, ArrowDownRight, Plus, Send, Tag } from "lucide-react"
import { useRouter } from "next/navigation"
import { ProductDialog } from "@/components/modals/product-dialog"
import { NotificationDialog } from "@/components/modals/notification-dialog"
import { PromoCodeDialog } from "@/components/modals/promo-code-dialog"

const stats = [
  {
    title: "Total Products",
    value: "1,234",
    change: "+12%",
    trend: "up",
    icon: Package,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
  },
  {
    title: "Active Users",
    value: "8,945",
    change: "+8%",
    trend: "up",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    title: "Total Orders",
    value: "2,456",
    change: "-3%",
    trend: "down",
    icon: ShoppingCart,
    color: "text-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
  },
  {
    title: "Revenue",
    value: "$45,678",
    change: "+15%",
    trend: "up",
    icon: TrendingUp,
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
  },
]

const recentActivity = [
  { action: "New product added", item: "iPhone 15 Pro", time: "2 minutes ago", type: "success" },
  { action: "Order completed", item: "#ORD-1234", time: "5 minutes ago", type: "info" },
  { action: "User registered", item: "john@example.com", time: "10 minutes ago", type: "success" },
  { action: "Category updated", item: "Electronics", time: "15 minutes ago", type: "warning" },
  { action: "Promo code created", item: "SUMMER2024", time: "20 minutes ago", type: "info" },
]

export function DashboardContent() {
  const router = useRouter()
  const [productDialogOpen, setProductDialogOpen] = useState(false)
  const [notificationDialogOpen, setNotificationDialogOpen] = useState(false)
  const [promoDialogOpen, setPromoDialogOpen] = useState(false)

  const getActivityColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400"
      case "info":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "warning":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Overview of your e-commerce platform</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card
              key={stat.title}
              className="border-0 shadow-lg bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl hover:shadow-xl transition-all duration-300 hover:scale-105 group"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor} group-hover:scale-110 transition-transform`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-3 w-3 text-emerald-600 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 text-red-600 mr-1" />
                  )}
                  <span className={stat.trend === "up" ? "text-emerald-600" : "text-red-600"}>{stat.change}</span>
                  <span className="ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-0 shadow-lg bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">Recent Activity</CardTitle>
            <CardDescription>Latest actions in your admin panel</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 hover:shadow-md transition-all duration-200"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.action}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{activity.item}</p>
                  </div>
                  <Badge className={`text-xs ${getActivityColor(activity.type)}`}>{activity.time}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <Button
                onClick={() => setProductDialogOpen(true)}
                className="p-6 h-auto rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 group"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/20 rounded-lg group-hover:scale-110 transition-transform">
                    <Plus className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold">Add New Product</h4>
                    <p className="text-sm opacity-90">Create a new product listing</p>
                  </div>
                </div>
              </Button>

              <Button
                onClick={() => setNotificationDialogOpen(true)}
                className="p-6 h-auto rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 group"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/20 rounded-lg group-hover:scale-110 transition-transform">
                    <Send className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold">Send Notification</h4>
                    <p className="text-sm opacity-90">Broadcast message to users</p>
                  </div>
                </div>
              </Button>

              <Button
                onClick={() => setPromoDialogOpen(true)}
                className="p-6 h-auto rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 group"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/20 rounded-lg group-hover:scale-110 transition-transform">
                    <Tag className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold">Create Promo Code</h4>
                    <p className="text-sm opacity-90">Generate discount codes</p>
                  </div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <ProductDialog
        open={productDialogOpen}
        onOpenChange={setProductDialogOpen}
        onSave={() => setProductDialogOpen(false)}
      />

      <NotificationDialog
        open={notificationDialogOpen}
        onOpenChange={setNotificationDialogOpen}
        onSave={() => setNotificationDialogOpen(false)}
      />

      <PromoCodeDialog
        open={promoDialogOpen}
        onOpenChange={setPromoDialogOpen}
        onSave={() => setPromoDialogOpen(false)}
      />
    </div>
  )
}
