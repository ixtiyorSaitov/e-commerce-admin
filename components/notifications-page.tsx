"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bell, Send, Users, Clock, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "error";
  recipients: "all" | "active" | "inactive";
  status: "draft" | "sent";
  createdAt: string;
  sentAt?: string;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New Product Launch",
    message: "Check out our latest iPhone 15 Pro with amazing features!",
    type: "info",
    recipients: "all",
    status: "sent",
    createdAt: "2024-01-20",
    sentAt: "2024-01-20",
  },
  {
    id: "2",
    title: "Flash Sale Alert",
    message: "50% off on all electronics. Limited time offer!",
    type: "warning",
    recipients: "active",
    status: "sent",
    createdAt: "2024-01-19",
    sentAt: "2024-01-19",
  },
  {
    id: "3",
    title: "System Maintenance",
    message: "Scheduled maintenance on Sunday from 2-4 AM.",
    type: "info",
    recipients: "all",
    status: "draft",
    createdAt: "2024-01-18",
  },
];

export function NotificationsPage() {
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    type: "info" as "info" | "warning" | "success" | "error",
    recipients: "all" as "all" | "active" | "inactive",
  });

  const handleSendNotification = () => {
    if (!formData.title || !formData.message) {
      toast.error("Error", {
        description: "Please fill in all required fields",
      });
      return;
    }

    const newNotification: Notification = {
      id: Date.now().toString(),
      title: formData.title,
      message: formData.message,
      type: formData.type,
      recipients: formData.recipients,
      status: "sent",
      createdAt: new Date().toISOString().split("T")[0],
      sentAt: new Date().toISOString().split("T")[0],
    };

    setNotifications([newNotification, ...notifications]);
    setFormData({
      title: "",
      message: "",
      type: "info",
      recipients: "all",
    });

    toast.error("Success", {
      description: "Notification sent successfully to all users",
    });
  };

  const handleSaveDraft = () => {
    if (!formData.title || !formData.message) {
      toast.error("Error", {
        description: "Please fill in all required fields",
      });
      return;
    }

    const newNotification: Notification = {
      id: Date.now().toString(),
      title: formData.title,
      message: formData.message,
      type: formData.type,
      recipients: formData.recipients,
      status: "draft",
      createdAt: new Date().toISOString().split("T")[0],
    };

    setNotifications([newNotification, ...notifications]);
    setFormData({
      title: "",
      message: "",
      type: "info",
      recipients: "all",
    });

    toast.success("Success", {
      description: "Notification saved as draft",
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "info":
        return "text-blue-600";
      case "warning":
        return "text-orange-600";
      case "success":
        return "text-green-600";
      case "error":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getRecipientCount = (recipients: string) => {
    switch (recipients) {
      case "all":
        return "All Users (1,234)";
      case "active":
        return "Active Users (1,089)";
      case "inactive":
        return "Inactive Users (145)";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
        <p className="text-muted-foreground">
          Send broadcast messages to your users
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {[
          {
            title: "Total Sent",
            value: notifications.filter((n) => n.status === "sent").length,
            color: "text-blue-600",
            icon: Send,
          },
          {
            title: "Drafts",
            value: notifications.filter((n) => n.status === "draft").length,
            color: "text-orange-600",
            icon: Clock,
          },
          {
            title: "This Month",
            value: notifications.filter(
              (n) => new Date(n.createdAt).getMonth() === new Date().getMonth()
            ).length,
            color: "text-green-600",
            icon: Bell,
          },
          {
            title: "Success Rate",
            value: "98.5%",
            color: "text-purple-600",
            icon: CheckCircle,
          },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="border-0 shadow-lg bg-card/50 backdrop-blur-sm"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Create Notification</CardTitle>
            <CardDescription>Send a message to your users</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Enter notification title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Enter your message"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(
                    value: "info" | "warning" | "success" | "error"
                  ) => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Recipients</Label>
                <Select
                  value={formData.recipients}
                  onValueChange={(value: "all" | "active" | "inactive") =>
                    setFormData({ ...formData, recipients: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="active">Active Users</SelectItem>
                    <SelectItem value="inactive">Inactive Users</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Will be sent to: {getRecipientCount(formData.recipients)}
                </span>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button
                onClick={handleSendNotification}
                className="flex-1 bg-gradient-to-r from-primary to-primary/90"
              >
                <Send className="mr-2 h-4 w-4" />
                Send Now
              </Button>
              <Button
                variant="outline"
                onClick={handleSaveDraft}
                className="flex-1 bg-transparent"
              >
                <Clock className="mr-2 h-4 w-4" />
                Save Draft
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Recent Notifications</CardTitle>
            <CardDescription>
              {notifications.length} notifications sent
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {notifications.slice(0, 5).map((notification) => (
                  <TableRow key={notification.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{notification.title}</div>
                        <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                          {notification.message}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={getTypeColor(notification.type)}
                      >
                        {notification.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          notification.status === "sent"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {notification.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(notification.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
