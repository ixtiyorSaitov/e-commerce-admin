"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  MoreHorizontal,
  Edit,
  Ban,
  Mail,
  UsersIcon,
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  image: string;
  role: "customer" | "adminstrator";
  status: "active" | "inactive";
  joinedAt: string;
  lastActive: string;
  totalOrders: number;
  totalSpent: number;
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    image: "/placeholder.svg?height=40&width=40",
    role: "customer",
    status: "active",
    joinedAt: "2024-01-15",
    lastActive: "2024-01-20",
    totalOrders: 12,
    totalSpent: 1250.5,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    image: "/placeholder.svg?height=40&width=40",
    role: "customer",
    status: "active",
    joinedAt: "2024-01-10",
    lastActive: "2024-01-19",
    totalOrders: 8,
    totalSpent: 890.25,
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    image: "/placeholder.svg?height=40&width=40",
    role: "customer",
    status: "inactive",
    joinedAt: "2024-01-05",
    lastActive: "2024-01-10",
    totalOrders: 3,
    totalSpent: 245.75,
  },
];

export function UsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleStatus = (id: string) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "active" ? "inactive" : "active",
            }
          : user
      )
    );
  };

  const stats = [
    {
      title: "Total Users",
      value: users.length,
      color: "text-blue-600",
    },
    {
      title: "Active Users",
      value: users.filter((u) => u.status === "active").length,
      color: "text-green-600",
    },
    {
      title: "Total Revenue",
      value: `$${users
        .reduce((sum, u) => sum + (u.totalSpent || 0), 0)
        .toFixed(2)}`,
      color: "text-purple-600",
    },
    {
      title: "Avg Order Value",
      value: `$${(
        users.reduce((sum, u) => sum + (u.totalSpent || 0), 0) /
          users.reduce((sum, u) => sum + (u.totalOrders || 0), 0) || 0
      ).toFixed(2)}`,
      color: "text-orange-600",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">
            Manage and monitor your customers
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="border-0 shadow-lg bg-card/50 backdrop-blur-sm"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <UsersIcon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>User List</CardTitle>
              <CardDescription>
                {filteredUsers.length} users found
              </CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={user.image || "/placeholder.svg"}
                          alt={user.name}
                        />
                        <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary">
                          {user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.status === "active" ? "default" : "secondary"
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.totalOrders || 0}</TableCell>
                  <TableCell>
                    ${user.totalSpent?.toFixed(2) || "0.00"}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(user.joinedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(user.lastActive).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit User
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          Send Message
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleToggleStatus(user.id)}
                          className={
                            user.status === "active"
                              ? "text-destructive"
                              : "text-green-600"
                          }
                        >
                          <Ban className="mr-2 h-4 w-4" />
                          {user.status === "active" ? "Deactivate" : "Activate"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
