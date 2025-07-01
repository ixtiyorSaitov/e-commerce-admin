"use client";

import {
  ArrowLeft,
  Heart,
  ShoppingCart,
  Star,
  TrendingUp,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function ProductViewSkeleton() {
  const productStats = [
    { icon: TrendingUp },
    { icon: Heart },
    { icon: ShoppingCart },
    { icon: Eye },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-slate-900 dark:via-blue-900 dark:to-slate-900">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Skeleton className="h-8 w-48 bg-gray-200 dark:bg-slate-700" />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Product Images Skeleton */}
          <div className="space-y-4">
            <Card className="bg-white border-gray-200 shadow-lg dark:bg-slate-800/50 dark:border-slate-700">
              <CardContent className="p-6">
                {/* Main Image Skeleton */}
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-50 mb-4 border border-gray-200 dark:bg-slate-700/50 dark:border-slate-600">
                  <Skeleton className="w-full h-full bg-gray-200 dark:bg-slate-600" />
                </div>

                {/* Thumbnail Images Skeleton */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {[...Array(5)].map((_, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 border-gray-300 dark:border-slate-600"
                    >
                      <Skeleton className="w-full h-full bg-gray-200 dark:bg-slate-600" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Details Skeleton */}
          <div className="space-y-6">
            {/* Basic Info Skeleton */}
            <Card className="bg-white border-gray-200 shadow-lg dark:bg-slate-800/50 dark:border-slate-700">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* Product Name Skeleton */}
                    <Skeleton className="h-8 w-48 bg-gray-200 dark:bg-slate-700 mb-2" />

                    {/* Categories Skeleton */}
                    <div className="flex items-center gap-2 mb-3">
                      <Skeleton className="h-6 w-20 bg-gray-200 dark:bg-slate-700 rounded-full" />
                      <Skeleton className="h-6 w-16 bg-gray-200 dark:bg-slate-700 rounded-full" />
                    </div>

                    {/* Rating Skeleton */}
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-gray-300 dark:text-slate-600"
                        />
                      ))}
                      <Skeleton className="h-4 w-8 bg-gray-200 dark:bg-slate-700 ml-2" />
                    </div>
                  </div>
                  <Skeleton className="h-6 w-16 bg-gray-200 dark:bg-slate-700 rounded-full" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Price Skeleton */}
                  <div>
                    <div className="flex items-baseline gap-3">
                      <Skeleton className="h-9 w-40 bg-gray-200 dark:bg-slate-700" />
                      <Skeleton className="h-6 w-32 bg-gray-200 dark:bg-slate-700" />
                    </div>
                  </div>

                  <Separator className="bg-gray-200 dark:bg-slate-700" />

                  {/* Description Skeleton */}
                  <div>
                    <Skeleton className="h-6 w-20 bg-gray-200 dark:bg-slate-700 mb-2" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full bg-gray-200 dark:bg-slate-700" />
                      <Skeleton className="h-4 w-full bg-gray-200 dark:bg-slate-700" />
                      <Skeleton className="h-4 w-3/4 bg-gray-200 dark:bg-slate-700" />
                    </div>
                  </div>

                  <Separator className="bg-gray-200 dark:bg-slate-700" />

                  {/* Benefits Skeleton */}
                  <div>
                    <Skeleton className="h-6 w-36 bg-gray-200 dark:bg-slate-700 mb-3" />
                    <div className="flex flex-wrap gap-2">
                      <Skeleton className="h-6 w-24 bg-gray-200 dark:bg-slate-700 rounded-full" />
                      <Skeleton className="h-6 w-20 bg-gray-200 dark:bg-slate-700 rounded-full" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Statistics Skeleton */}
            <Card className="bg-white border-gray-200 shadow-lg dark:bg-slate-800/50 dark:border-slate-700">
              <CardHeader>
                <Skeleton className="h-6 w-24 bg-gray-200 dark:bg-slate-700" />
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {productStats.map((stat, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200 dark:bg-slate-700/50 dark:border-slate-600"
                    >
                      <div className="p-2 rounded-lg bg-white border border-gray-200 dark:bg-slate-600/50 dark:border-slate-500">
                        <stat.icon className="w-5 h-5 text-gray-300 dark:text-slate-600" />
                      </div>
                      <div className="flex-1">
                        <Skeleton className="h-3 w-16 bg-gray-200 dark:bg-slate-600 mb-1" />
                        <Skeleton className="h-6 w-12 bg-gray-200 dark:bg-slate-600" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Additional Info Skeleton */}
            <Card className="bg-white border-gray-200 shadow-lg dark:bg-slate-800/50 dark:border-slate-700">
              <CardHeader>
                <Skeleton className="h-6 w-40 bg-gray-200 dark:bg-slate-700" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-20 bg-gray-200 dark:bg-slate-700" />
                  <Skeleton className="h-4 w-32 bg-gray-200 dark:bg-slate-700" />
                </div>
                <Separator className="bg-gray-200 dark:bg-slate-700" />
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-16 bg-gray-200 dark:bg-slate-700" />
                  <Skeleton className="h-6 w-16 bg-gray-200 dark:bg-slate-700 rounded-full" />
                </div>
                <Separator className="bg-gray-200 dark:bg-slate-700" />
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-28 bg-gray-200 dark:bg-slate-700" />
                  <Skeleton className="h-4 w-24 bg-gray-200 dark:bg-slate-700" />
                </div>
                <Separator className="bg-gray-200 dark:bg-slate-700" />
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-32 bg-gray-200 dark:bg-slate-700" />
                  <Skeleton className="h-4 w-24 bg-gray-200 dark:bg-slate-700" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
