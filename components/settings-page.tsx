"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  Shield,
  Palette,
  Database,
  Save,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";

export function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      sms: true,
      marketing: false,
    },
    security: {
      twoFactor: false,
      sessionTimeout: "30",
      loginAlerts: true,
    },
    appearance: {
      theme: "system",
      language: "en",
      timezone: "UTC-8",
    },
    system: {
      autoBackup: true,
      maintenanceMode: false,
      debugMode: false,
    },
  });

  const handleSave = () => {
    toast.success("Settings Saved", {
      description: "Your settings have been successfully updated.",
    });
  };

  const settingSections = [
    {
      title: "Notifications",
      description: "Manage how you receive notifications",
      icon: Bell,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <p className="text-sm text-gray-500">
                Receive notifications via email
              </p>
            </div>
            <Switch
              id="email-notifications"
              checked={settings.notifications.email}
              onCheckedChange={(checked) =>
                setSettings((prev) => ({
                  ...prev,
                  notifications: { ...prev.notifications, email: checked },
                }))
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="push-notifications">Push Notifications</Label>
              <p className="text-sm text-gray-500">
                Receive browser push notifications
              </p>
            </div>
            <Switch
              id="push-notifications"
              checked={settings.notifications.push}
              onCheckedChange={(checked) =>
                setSettings((prev) => ({
                  ...prev,
                  notifications: { ...prev.notifications, push: checked },
                }))
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="sms-notifications">SMS Notifications</Label>
              <p className="text-sm text-gray-500">
                Receive important alerts via SMS
              </p>
            </div>
            <Switch
              id="sms-notifications"
              checked={settings.notifications.sms}
              onCheckedChange={(checked) =>
                setSettings((prev) => ({
                  ...prev,
                  notifications: { ...prev.notifications, sms: checked },
                }))
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="marketing-notifications">Marketing Emails</Label>
              <p className="text-sm text-gray-500">
                Receive product updates and promotions
              </p>
            </div>
            <Switch
              id="marketing-notifications"
              checked={settings.notifications.marketing}
              onCheckedChange={(checked) =>
                setSettings((prev) => ({
                  ...prev,
                  notifications: { ...prev.notifications, marketing: checked },
                }))
              }
            />
          </div>
        </div>
      ),
    },
    {
      title: "Security",
      description: "Manage your account security settings",
      icon: Shield,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="two-factor">Two-Factor Authentication</Label>
              <p className="text-sm text-gray-500">
                Add an extra layer of security
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge
                variant={settings.security.twoFactor ? "default" : "secondary"}
              >
                {settings.security.twoFactor ? "Enabled" : "Disabled"}
              </Badge>
              <Switch
                id="two-factor"
                checked={settings.security.twoFactor}
                onCheckedChange={(checked) =>
                  setSettings((prev) => ({
                    ...prev,
                    security: { ...prev.security, twoFactor: checked },
                  }))
                }
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
            <Select
              value={settings.security.sessionTimeout}
              onValueChange={(value) =>
                setSettings((prev) => ({
                  ...prev,
                  security: { ...prev.security, sessionTimeout: value },
                }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
                <SelectItem value="120">2 hours</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="login-alerts">Login Alerts</Label>
              <p className="text-sm text-gray-500">
                Get notified of new login attempts
              </p>
            </div>
            <Switch
              id="login-alerts"
              checked={settings.security.loginAlerts}
              onCheckedChange={(checked) =>
                setSettings((prev) => ({
                  ...prev,
                  security: { ...prev.security, loginAlerts: checked },
                }))
              }
            />
          </div>
        </div>
      ),
    },
    {
      title: "Appearance",
      description: "Customize the look and feel",
      icon: Palette,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="theme">Theme</Label>
            <Select
              value={settings.appearance.theme}
              onValueChange={(value) =>
                setSettings((prev) => ({
                  ...prev,
                  appearance: { ...prev.appearance, theme: value },
                }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Select
              value={settings.appearance.language}
              onValueChange={(value) =>
                setSettings((prev) => ({
                  ...prev,
                  appearance: { ...prev.appearance, language: value },
                }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Select
              value={settings.appearance.timezone}
              onValueChange={(value) =>
                setSettings((prev) => ({
                  ...prev,
                  appearance: { ...prev.appearance, timezone: value },
                }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                <SelectItem value="UTC+0">
                  Greenwich Mean Time (UTC+0)
                </SelectItem>
                <SelectItem value="UTC+1">
                  Central European Time (UTC+1)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      ),
    },
    {
      title: "System",
      description: "System-wide settings and maintenance",
      icon: Database,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="auto-backup">Automatic Backups</Label>
              <p className="text-sm text-gray-500">
                Automatically backup data daily
              </p>
            </div>
            <Switch
              id="auto-backup"
              checked={settings.system.autoBackup}
              onCheckedChange={(checked) =>
                setSettings((prev) => ({
                  ...prev,
                  system: { ...prev.system, autoBackup: checked },
                }))
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
              <p className="text-sm text-gray-500">
                Put the system in maintenance mode
              </p>
            </div>
            <div className="flex items-center space-x-2">
              {settings.system.maintenanceMode && (
                <Badge
                  variant="destructive"
                  className="flex items-center space-x-1"
                >
                  <AlertTriangle className="w-3 h-3" />
                  <span>Active</span>
                </Badge>
              )}
              <Switch
                id="maintenance-mode"
                checked={settings.system.maintenanceMode}
                onCheckedChange={(checked) =>
                  setSettings((prev) => ({
                    ...prev,
                    system: { ...prev.system, maintenanceMode: checked },
                  }))
                }
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="debug-mode">Debug Mode</Label>
              <p className="text-sm text-gray-500">
                Enable detailed logging for troubleshooting
              </p>
            </div>
            <Switch
              id="debug-mode"
              checked={settings.system.debugMode}
              onCheckedChange={(checked) =>
                setSettings((prev) => ({
                  ...prev,
                  system: { ...prev.system, debugMode: checked },
                }))
              }
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage your application preferences and configurations
        </p>
      </div>

      <div className="space-y-6">
        {settingSections.map((section, index) => {
          const Icon = section.icon;
          return (
            <Card
              key={index}
              className="border-0 shadow-lg bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl"
            >
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${section.bgColor}`}>
                    <Icon className={`h-5 w-5 ${section.color}`} />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                      {section.title}
                    </CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>{section.content}</CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="border-0 shadow-lg bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Save Changes
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Make sure to save your changes before leaving this page
              </p>
            </div>
            <Button
              onClick={handleSave}
              className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600"
            >
              <Save className="w-4 h-4 mr-2" />
              Save All Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
