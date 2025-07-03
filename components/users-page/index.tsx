"use client";

import { useEffect, useState } from "react";
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
  Trash,
} from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { IUser } from "@/interfaces/user.interface";
import { UserEditDialog } from "./user-edit-dialog";
import { AlertModal } from "../ui/alert-modal";

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
interface UserPageProps {
  datas: IUser[];
}
export function UsersPage({ datas }: UserPageProps) {
  const [users, setUsers] = useState<IUser[]>(datas);
  const [editingUser, setEditingUser] = useState<IUser | null>(null);
  const [deletingUser, setDeletingUser] = useState<IUser | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [editingDialog, setEditingDialog] = useState<boolean>(false);
  const [deleteAlert, setDeleteAlert] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleSaveUser = (user: IUser) => {
    setUsers(users.map((u) => (u._id === user._id ? user : u)));
    setEditingDialog(false);
    setEditingUser(null);
  };
  const handleDeleteUser = async () => {
    try {
      setDeleteLoading(true);
      const { data: response } = await axios.delete(
        `/api/user/delete-user/${deletingUser?._id}`
      );
      console.log(response);
      if (response.success) {
        setUsers(users.filter((u) => u._id !== deletingUser?._id));
        setDeleteAlert(false);
        setDeletingUser(null);
        toast.success("Deleted", { description: "User deleted successfuly!" });
      } else {
        toast.success("Deleted", { description: response.error });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setDeleteLoading(false);
    }
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
          users.reduce((sum, u) => sum + (u.orders?.length || 0), 0) || 0
      ).toFixed(2)}`,
      color: "text-orange-600",
    },
  ];

  return (
    <>
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
                  <TableRow key={user._id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={user.profileImage || "/placeholder.svg"}
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
                        {user.status || "inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.orders?.length || 0}</TableCell>
                    <TableCell>
                      {user.totalSpent?.toLocaleString("ru-RU") || "0"} {"so'm"}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(user.updatedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setEditingUser(user);
                              setEditingDialog(true);
                            }}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            Send Message
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setDeleteAlert(true);
                              setDeletingUser(user);
                            }}
                            variant="destructive"
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
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
      {editingUser && (
        <UserEditDialog
          user={editingUser}
          open={editingDialog}
          onOpenChange={setEditingDialog}
          onSave={handleSaveUser}
        />
      )}
      <AlertModal
        open={deleteAlert}
        setOpen={setDeleteAlert}
        title="Delete user"
        description={`Do you want delete this user: ${deletingUser?.name}`}
        submitBtnText="Delete User"
        loading={deleteLoading}
        submitBtnVariant={"destructive"}
        onSubmit={handleDeleteUser}
      />
    </>
  );
}
