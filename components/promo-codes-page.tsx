"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Tag,
  Copy,
  Percent,
} from "lucide-react";
import { toast } from "sonner";

interface PromoCode {
  id: string;
  code: string;
  description: string;
  type: "percentage" | "fixed";
  value: number;
  minOrder: number;
  maxUses: number;
  currentUses: number;
  status: "active" | "inactive" | "expired";
  expiresAt: string;
  createdAt: string;
}

const mockPromoCodes: PromoCode[] = [
  {
    id: "1",
    code: "SUMMER2024",
    description: "Summer sale discount",
    type: "percentage",
    value: 25,
    minOrder: 100,
    maxUses: 1000,
    currentUses: 245,
    status: "active",
    expiresAt: "2024-08-31",
    createdAt: "2024-06-01",
  },
  {
    id: "2",
    code: "WELCOME10",
    description: "Welcome discount for new users",
    type: "fixed",
    value: 10,
    minOrder: 50,
    maxUses: 500,
    currentUses: 123,
    status: "active",
    expiresAt: "2024-12-31",
    createdAt: "2024-01-01",
  },
  {
    id: "3",
    code: "FLASH50",
    description: "Flash sale - 50% off",
    type: "percentage",
    value: 50,
    minOrder: 200,
    maxUses: 100,
    currentUses: 100,
    status: "expired",
    expiresAt: "2024-01-15",
    createdAt: "2024-01-10",
  },
];

export function PromoCodesPage() {
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>(mockPromoCodes);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    description: "",
    type: "percentage" as "percentage" | "fixed",
    value: "",
    minOrder: "",
    maxUses: "",
    expiresAt: "",
  });

  const filteredPromoCodes = promoCodes.filter(
    (promo) =>
      promo.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promo.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generateRandomCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData({ ...formData, code: result });
  };

  const handleCreatePromoCode = () => {
    if (!formData.code || !formData.description || !formData.value) {
      toast.error("Error", {
        description: `Please fill in all required fields`,
      });
      return;
    }

    const newPromoCode: PromoCode = {
      id: Date.now().toString(),
      code: formData.code.toUpperCase(),
      description: formData.description,
      type: formData.type,
      value: Number.parseFloat(formData.value),
      minOrder: Number.parseFloat(formData.minOrder) || 0,
      maxUses: Number.parseInt(formData.maxUses) || 1000,
      currentUses: 0,
      status: "active",
      expiresAt: formData.expiresAt,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setPromoCodes([newPromoCode, ...promoCodes]);
    setFormData({
      code: "",
      description: "",
      type: "percentage",
      value: "",
      minOrder: "",
      maxUses: "",
      expiresAt: "",
    });
    setShowForm(false);

    toast.success("Success", {
      description: `Promo code created successfully`,
    });
  };

  const handleDeletePromoCode = (id: string) => {
    setPromoCodes(promoCodes.filter((p) => p.id !== id));

    toast.success("Success", {
      description: `Promo code deleted successfully`,
    });
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Copied", {
      description: `Promo code "${code}" copied to clipboard`,
    });
  };

  const stats = [
    { title: "Total Codes", value: promoCodes.length, color: "text-blue-600" },
    {
      title: "Active Codes",
      value: promoCodes.filter((p) => p.status === "active").length,
      color: "text-green-600",
    },
    {
      title: "Total Uses",
      value: promoCodes.reduce((sum, p) => sum + p.currentUses, 0),
      color: "text-purple-600",
    },
    {
      title: "Avg Discount",
      value: `${Math.round(
        promoCodes.reduce((sum, p) => sum + p.value, 0) / promoCodes.length
      )}%`,
      color: "text-orange-600",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Promo Codes</h1>
          <p className="text-muted-foreground">
            Create and manage discount codes
          </p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-primary to-primary/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Promo Code
        </Button>
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
              <Tag className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {showForm && (
        <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Create New Promo Code</CardTitle>
            <CardDescription>
              Set up a new discount code for your customers
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="code">Promo Code</Label>
                <div className="flex space-x-2">
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        code: e.target.value.toUpperCase(),
                      })
                    }
                    placeholder="Enter code"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={generateRandomCode}
                  >
                    Generate
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Enter description"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Discount Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: "percentage" | "fixed") =>
                    setFormData({ ...formData, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage</SelectItem>
                    <SelectItem value="fixed">Fixed Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="value">
                  {formData.type === "percentage"
                    ? "Percentage (%)"
                    : "Amount ($)"}
                </Label>
                <Input
                  id="value"
                  type="number"
                  value={formData.value}
                  onChange={(e) =>
                    setFormData({ ...formData, value: e.target.value })
                  }
                  placeholder={formData.type === "percentage" ? "25" : "10"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="minOrder">Min Order ($)</Label>
                <Input
                  id="minOrder"
                  type="number"
                  value={formData.minOrder}
                  onChange={(e) =>
                    setFormData({ ...formData, minOrder: e.target.value })
                  }
                  placeholder="100"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="maxUses">Max Uses</Label>
                <Input
                  id="maxUses"
                  type="number"
                  value={formData.maxUses}
                  onChange={(e) =>
                    setFormData({ ...formData, maxUses: e.target.value })
                  }
                  placeholder="1000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiresAt">Expires At</Label>
                <Input
                  id="expiresAt"
                  type="date"
                  value={formData.expiresAt}
                  onChange={(e) =>
                    setFormData({ ...formData, expiresAt: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex space-x-2">
              <Button
                onClick={handleCreatePromoCode}
                className="bg-gradient-to-r from-primary to-primary/90"
              >
                Create Promo Code
              </Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Promo Code List</CardTitle>
              <CardDescription>
                {filteredPromoCodes.length} promo codes found
              </CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search promo codes..."
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
                <TableHead>Code</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPromoCodes.map((promo) => (
                <TableRow key={promo.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div>
                        <div className="font-mono font-medium">
                          {promo.code}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {promo.description}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard(promo.code)}
                        className="h-6 w-6"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {promo.type === "percentage" ? "%" : "$"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      {promo.type === "percentage" ? (
                        <Percent className="h-3 w-3" />
                      ) : (
                        <span className="text-sm">$</span>
                      )}
                      <span className="font-medium">{promo.value}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {promo.currentUses} / {promo.maxUses}
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5 mt-1">
                      <div
                        className="bg-primary h-1.5 rounded-full"
                        style={{
                          width: `${
                            (promo.currentUses / promo.maxUses) * 100
                          }%`,
                        }}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        promo.status === "active"
                          ? "default"
                          : promo.status === "expired"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {promo.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(promo.expiresAt).toLocaleDateString()}
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
                          onClick={() => copyToClipboard(promo.code)}
                        >
                          <Copy className="mr-2 h-4 w-4" />
                          Copy Code
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeletePromoCode(promo.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
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
  );
}
