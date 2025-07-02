"use client";

import { ArrowLeft, Search, Home, Package, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProductNotFound() {
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Mahsulot topilmadi
          </h1>
        </div>

        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="max-w-2xl w-full">
            <Card className="bg-white border-gray-200 shadow-lg dark:bg-slate-800/50 dark:border-slate-700 text-center">
              <CardHeader className="pb-4">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-32 h-32 bg-gray-100 dark:bg-slate-700/50 rounded-full flex items-center justify-center">
                      <Package className="w-16 h-16 text-gray-400 dark:text-slate-500" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-12 h-12 bg-red-100 dark:bg-red-500/20 rounded-full flex items-center justify-center">
                      <AlertCircle className="w-6 h-6 text-red-500 dark:text-red-400" />
                    </div>
                  </div>
                </div>
                <CardTitle className="text-3xl text-gray-900 dark:text-white mb-2">
                  404
                </CardTitle>
                <p className="text-xl text-gray-700 dark:text-slate-300 mb-4">
                  Mahsulot topilmadi
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
                    {` Kechirasiz, siz qidirayotgan mahsulot mavjud emas yoki
                    o'chirilgan bo'lishi mumkin.`}
                  </p>
                  <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
                    {`Iltimos, mahsulot nomini tekshiring yoki boshqa
                    mahsulotlarni ko'rib chiqing.`}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3"
                    onClick={() => window.history.back()}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Orqaga qaytish
                  </Button>

                  <Button
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white px-6 py-3 bg-transparent"
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Bosh sahifa
                  </Button>

                  <Button
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white px-6 py-3 bg-transparent"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Mahsulotlarni qidirish
                  </Button>
                </div>

                {/* Suggestions */}
                <div className="pt-6 border-t border-gray-200 dark:border-slate-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Tavsiya etamiz:
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Card className="bg-gray-50 border-gray-200 hover:bg-gray-100 dark:bg-slate-700/30 dark:border-slate-600 dark:hover:bg-slate-700/50 transition-colors cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-600/20 rounded-lg flex items-center justify-center">
                            <Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              Barcha mahsulotlar
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-slate-400">
                              {"Katalogni ko'rish"}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-50 border-gray-200 hover:bg-gray-100 dark:bg-slate-700/30 dark:border-slate-600 dark:hover:bg-slate-700/50 transition-colors cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-green-100 dark:bg-green-600/20 rounded-lg flex items-center justify-center">
                            <Search className="w-6 h-6 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              Qidiruv
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-slate-400">
                              Mahsulot qidirish
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Popular Categories */}
                <div className="pt-6 border-t border-gray-200 dark:border-slate-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Mashhur kategoriyalar:
                  </h3>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-300 text-gray-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-blue-600 dark:hover:text-white dark:hover:border-blue-600 bg-transparent"
                    >
                      Bluetooth
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-300 text-gray-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-blue-600 dark:hover:text-white dark:hover:border-blue-600 bg-transparent"
                    >
                      Laptops
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-300 text-gray-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-blue-600 dark:hover:text-white dark:hover:border-blue-600 bg-transparent"
                    >
                      Telefonlar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-300 text-gray-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-blue-600 dark:hover:text-white dark:hover:border-blue-600 bg-transparent"
                    >
                      Aksessuarlar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
