export interface User {
  id: string
  name: string
  email: string
  image?: string
  role: "admin" | "customer"
  status?: "active" | "inactive"
  joinedAt?: string
  lastActive?: string
  totalOrders?: number
  totalSpent?: number
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  oldPrice?: number
  category: string
  stock: number
  status: "active" | "out_of_stock"
  image: string[]
  benefits?: string[]
}

export interface Category {
  id: string
  name: string
  description: string
  productCount: number
  status: "active" | "inactive"
  createdAt: string
}
