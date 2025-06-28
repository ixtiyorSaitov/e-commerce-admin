"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  TrendingUp,
  Users,
  ShoppingCart,
  DollarSign,
  Package,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    trend: "up",
    icon: DollarSign,
    color: "text-green-600",
  },
  {
    title: "Total Orders",
    value: "2,350",
    change: "+15.3%",
    trend: "up",
    icon: ShoppingCart,
    color: "text-blue-600",
  },
  {
    title: "Active Users",
    value: "1,234",
    change: "+8.2%",
    trend: "up",
    icon: Users,
    color: "text-purple-600",
  },
  {
    title: "Products Sold",
    value: "5,678",
    change: "-2.4%",
    trend: "down",
    icon: Package,
    color: "text-orange-600",
  },
]

const topProducts = [
  { name: "iPhone 15 Pro", sales: 234, revenue: "$234,000", change: "+12%" },
  { name: "MacBook Air M3", sales: 189, revenue: "$245,370", change: "+8%" },
  { name: "AirPods Pro", sales: 156, revenue: "$31,200", change: "+15%" },
  { name: "iPad Air", sales: 134, revenue: "$80,400", change: "+5%" },
  { name: "Apple Watch", sales: 98, revenue: "$39,200", change: "-3%" },
]

const topCategories = [
  { name: "Electronics", sales: 1234, percentage: 45, color: "bg-blue-500" },
  { name: "Fashion", sales: 856, percentage: 31, color: "bg-purple-500" },
  { name: "Home & Garden", sales: 432, percentage: 16, color: "bg-green-500" },
  { name: "Sports", sales: 218, percentage: 8, color: "bg-orange-500" },
]

const recentActivity = [
  { type: "order", message: "New order #ORD-1234 placed", time: "2 minutes ago", amount: "$299.99" },
  { type: "user", message: "New user registered", time: "5 minutes ago", amount: null },
  { type: "product", message: "Product 'iPhone 15' updated", time: "10 minutes ago", amount: null },
  { type: "order", message: "Order #ORD-1233 completed", time: "15 minutes ago", amount: "$149.99" },
  { type: "refund", message: "Refund processed for #ORD-1230", time: "20 minutes ago", amount: "-$89.99" },
]

export function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">Insights and performance metrics for your e-commerce platform</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card
              key={stat.title}
              className="border-0 shadow-lg bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-200"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 text-red-600 mr-1" />
                  )}
                  <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>{stat.change}</span>
                  <span className="ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span>Top Performing Products</span>
            </CardTitle>
            <CardDescription>Best selling products this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.sales} sales</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{product.revenue}</p>
                    <p className={`text-sm ${product.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                      {product.change}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              <span>Sales by Category</span>
            </CardTitle>
            <CardDescription>Category performance breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCategories.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{category.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">{category.sales} sales</span>
                      <Badge variant="secondary">{category.percentage}%</Badge>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${category.color}`}
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-0 shadow-lg bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue trend for the past 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between space-x-2">
              {[32000, 28000, 35000, 42000, 38000, 45000].map((value, index) => (
                <div key={index} className="flex flex-col items-center space-y-2 flex-1">
                  <div
                    className="w-full bg-gradient-to-t from-primary to-primary/60 rounded-t-md transition-all duration-500 hover:from-primary/80 hover:to-primary/40"
                    style={{ height: `${(value / 50000) * 200}px` }}
                  />
                  <div className="text-xs text-muted-foreground">
                    {["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][index]}
                  </div>
                  <div className="text-xs font-medium">${(value / 1000).toFixed(0)}k</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest platform activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === "order"
                        ? "bg-green-500"
                        : activity.type === "user"
                          ? "bg-blue-500"
                          : activity.type === "product"
                            ? "bg-purple-500"
                            : "bg-red-500"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                      {activity.amount && (
                        <Badge
                          variant={activity.amount.startsWith("-") ? "destructive" : "default"}
                          className="text-xs"
                        >
                          {activity.amount}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
