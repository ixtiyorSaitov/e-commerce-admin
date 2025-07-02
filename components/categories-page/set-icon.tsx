"use client";

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import * as LucideIcons from "lucide-react";
import { HelpCircle } from "lucide-react";
import Link from "next/link";

interface IconInputProps {
  value: string;
  onChange: (iconName: string) => void;
  label?: string;
  disabled: boolean;
  existIcon: boolean;
  setExistIcon: Dispatch<SetStateAction<boolean>>;
}

// Dynamic icon getter
function getDynamicIcon(iconName: string) {
  if (!iconName) return HelpCircle;

  // Convert to PascalCase
  const pascalName = iconName
    .split(/[\s-_]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");

  // Get icon from Lucide exports
  const IconComponent = (LucideIcons as any)[pascalName];
  return IconComponent || HelpCircle;
}

// Check if icon exists
function iconExists(iconName: string): boolean {
  if (!iconName) return false;
  const pascalName = iconName
    .split(/[\s-_]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
  return !!(LucideIcons as any)[pascalName];
}

export function SimpleIconInput({
  value,
  onChange,
  label = "Icon",
  setExistIcon,
  disabled,
}: IconInputProps) {
  const [inputValue, setInputValue] = useState(value);
  const IconComponent = getDynamicIcon(inputValue);
  const exists = iconExists(inputValue);

  useEffect(() => {
    setInputValue(value);
    setExistIcon(exists);
  }, [value]);

  const handleChange = (newValue: string) => {
    if (newValue.toLowerCase() !== "icon") {
      setInputValue(newValue);
      onChange(newValue);
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex items-center gap-2">
        <div className="flex-shrink-0 w-10 h-10 border rounded flex items-center justify-center bg-muted/50">
          <IconComponent size={20} />
        </div>
        <Input
          disabled={disabled}
          value={inputValue}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Icon nomini kiriting (masalan: Home, User, Star)"
          className="flex-1"
        />
      </div>

      {inputValue && (
        <Alert
          className={
            exists
              ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950 dark:text-green-100"
              : "border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-100"
          }
        >
          <AlertDescription className="flex items-center gap-2">
            <IconComponent size={16} />
            <span>
              {exists ? (
                <>
                  Icon topildi:{" "}
                  <code className="bg-white dark:bg-gray-800 dark:text-gray-100 px-1 rounded">
                    {inputValue}
                  </code>
                </>
              ) : (
                <>
                  Icon topilmadi:{" "}
                  <code className="bg-white dark:bg-gray-800 dark:text-gray-100 px-1 rounded">
                    {inputValue}
                  </code>{" "}
                  | Icon nomini{" "}
                  <Link
                    className="text-blue-500 font-semibold hover:underline"
                    target="_blank"
                    href="https://lucide.dev/icons/"
                  >
                    Lucide Icons
                  </Link>{" "}
                  dan oling
                </>
              )}
            </span>
          </AlertDescription>
        </Alert>
      )}

      <div className="text-xs text-muted-foreground">
        Masalan: Home, User, Star, ShoppingCart, Calendar, Settings, Heart,
        Mail, Phone
      </div>
    </div>
  );
}
