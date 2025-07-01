"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  Heart,
  ShoppingCart,
  Star,
  TrendingUp,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { IProduct } from "@/interfaces/product.interface";
import { LoadingSpinner } from "../ui/loading-spinner";
import { formatISODateToYMD } from "@/lib/format-date";

const ProductPageComponent = ({ product }: { product: IProduct }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const productStats = [
    {
      icon: TrendingUp,
      label: "Sotilgan",
      value: "1,247",
      color: "text-green-600 dark:text-green-400",
    },
    {
      icon: Heart,
      label: "Layklar",
      value: "3,892",
      color: "text-red-500 dark:text-red-400",
    },
    {
      icon: ShoppingCart,
      label: "Savatda",
      value: "156",
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: Eye,
      label: "Ko'rishlar",
      value: "12,543",
      color: "text-purple-600 dark:text-purple-400",
    },
  ];

  return (
    <div className="min-h-screen">
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Mahsulot tafsilotlari
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <Card className="bg-white border-gray-200 shadow-lg dark:bg-slate-800/50 dark:border-slate-700">
              <CardContent className="p-6">
                <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-50 mb-4 border border-gray-200 dark:bg-slate-700/50 dark:border-slate-600">
                  {isLoading && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-100 dark:bg-slate-800 animate-pulse">
                      <LoadingSpinner size="lg" />
                    </div>
                  )}
                  <Image
                    src={product.images[selectedImage]}
                    alt="Product Image"
                    width={500}
                    height={500}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${
                      isLoading ? "opacity-0" : "opacity-100"
                    }`}
                    onLoad={() => setIsLoading(false)}
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index
                          ? "border-blue-500 ring-2 ring-blue-500/30"
                          : "border-gray-300 hover:border-gray-400 dark:border-slate-600 dark:hover:border-slate-500"
                      }`}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Thumbnail ${index + 1}`}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Basic Info */}
            <Card className="bg-white border-gray-200 shadow-lg dark:bg-slate-800/50 dark:border-slate-700">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl text-gray-900 dark:text-white mb-2">
                      {product.name}
                    </CardTitle>
                    <div className="flex items-center gap-2 mb-3">
                      {product.categories.map((c) => (
                        <Badge
                          key={c}
                          className="bg-blue-600 text-white hover:bg-blue-700"
                        >
                          {c}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                      <span className="text-gray-600 dark:text-slate-300 ml-2">
                        (4.9)
                      </span>
                    </div>
                  </div>
                  <Badge className="bg-green-600 text-white">Original</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">
                        {product.price.toLocaleString("ru-RU")} {"so'm"}
                      </span>
                      <span className="text-lg text-gray-500 dark:text-slate-400 line-through">
                        {product.oldPrice?.toLocaleString("ru-RU")} {"so'm"}
                      </span>
                    </div>
                  </div>

                  <Separator className="bg-gray-200 dark:bg-slate-700" />

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Tavsif
                    </h3>
                    <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <Separator className="bg-gray-200 dark:bg-slate-700" />

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Mahsulot afzalliklari
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {product.benefits.map((b, i) => (
                        <Badge
                          variant="outline"
                          className="border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
                          key={i}
                        >
                          {b}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card className="bg-white border-gray-200 shadow-lg dark:bg-slate-800/50 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">
                  Statistika
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {productStats.map((stat, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200 dark:bg-slate-700/50 dark:border-slate-600"
                    >
                      <div className="p-2 rounded-lg bg-white border border-gray-200 dark:bg-slate-600/50 dark:border-slate-500">
                        <stat.icon className={`w-5 h-5 ${stat.color}`} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-slate-400">
                          {stat.label}
                        </p>
                        <p className={`text-xl font-bold ${stat.color}`}>
                          {stat.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <Card className="bg-white border-gray-200 shadow-lg dark:bg-slate-800/50 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">
                  Qo'shimcha ma'lumotlar
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-slate-300">
                    Kategoriya:
                  </span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {product.categories.map(
                      (c, i) =>
                        `${c}${i + 1 !== product.categories.length ? ", " : ""}`
                    )}
                  </span>
                </div>
                <Separator className="bg-gray-200 dark:bg-slate-700" />
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-slate-300">
                    Holat:
                  </span>
                  <Badge className="bg-green-600 text-white">Original</Badge>
                </div>
                <Separator className="bg-gray-200 dark:bg-slate-700" />
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-slate-300">
                    Qo'shilgan sana:
                  </span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {formatISODateToYMD(product.createdAt)}
                  </span>
                </div>
                <Separator className="bg-gray-200 dark:bg-slate-700" />
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-slate-300">
                    Oxirgi yangilanish:
                  </span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {formatISODateToYMD(product.updatedAt)}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPageComponent;
