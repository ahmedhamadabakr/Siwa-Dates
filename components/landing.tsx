"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, ShoppingCart, Star, Truck, Shield, Award } from "lucide-react"

interface Product {
  _id: string
  name: string
  description: string
  price: number
  image: string
  category: string
}

export function Landing() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => setProducts(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="bg-background text-foreground">

      {/* ================= Header ================= */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-primary/10 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20">

            {/* Logo & Brand */}
            <div className="flex items-center gap-3">
              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-100 flex items-center justify-center shadow-md ring-2 ring-primary/10 hover:ring-primary/30 transition-all">
                <Image
                  src="/logo.png"
                  alt="تمور سيوة"
                  fill
                  className="object-contain p-3"
                  priority
                />
              </div>

              <div className="leading-tight">
                <h1 className="text-2xl font-black bg-gradient-to-r from-amber-700 via-yellow-600 to-orange-600 bg-clip-text text-transparent">
                  تمور سيوة
                </h1>
                <p className="text-xs text-muted-foreground font-medium tracking-wide">
                  Siwa Premium Dates
                </p>
              </div>
            </div>

            {/* Features - Hidden on mobile */}
            <div className="hidden lg:flex items-center gap-8">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200">
                <Shield className="w-4 h-4 text-green-600" />
                <span className="text-sm font-semibold text-green-700">طبيعي 100%</span>
              </div>
              
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200">
                <Award className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-semibold text-amber-700">من واحة سيوة</span>
              </div>

              <Button
                asChild
                size="sm"
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold shadow-md hover:shadow-lg transition-all"
              >
                <a
                  href="https://wa.me/201556479624"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  اطلب عبر واتساب
                </a>
              </Button>
            </div>

            {/* Mobile WhatsApp Button */}
            <div className="lg:hidden">
              <Button
                asChild
                size="sm"
                className="bg-gradient-to-r from-green-600 to-green-700 text-white font-bold shadow-md"
              >
                <a
                  href="https://wa.me/201556479624"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">واتساب</span>
                </a>
              </Button>
            </div>

          </div>
        </div>
      </header>

      {/* ================= Hero ================= */}
      <section className="relative min-h-[90vh] flex items-center justify-center text-center overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0 ">
          <Image
            src="/cover.jpg"
            alt="تمور سيوة"
            fill
            priority
            className="object-cover"
            quality={100}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 z-10" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-20">

          {/* Badge */}
          <div className="inline-block mb-8 px-6 py-3 rounded-full bg-white/20 backdrop-blur-md border border-white/40 shadow-lg animate-pulse">
            <span className="text-sm tracking-widest text-white font-bold flex items-center gap-2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              جودة فاخرة من واحة سيوة
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            </span>
          </div>

          {/* Title */}
          <h1 className="text-6xl md:text-8xl font-black text-white mb-6 drop-shadow-2xl">
            تمور سيوة
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-3xl text-white/95 max-w-3xl mx-auto mb-12 font-medium drop-shadow-lg">
            تمور طبيعية فاخرة • بدون إضافات • طعم استثنائي
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">

            <Button
              size="lg"
              onClick={() =>
                document
                  .getElementById("products")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-12 py-7 text-lg font-bold bg-gradient-to-r from-primary to-accent text-white rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              تصفح المنتجات
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="px-12 py-7 text-lg font-bold text-gray border-2 border-white/50 hover:bg-white/20 rounded-xl backdrop-blur-sm transition-all duration-300"
            >
              <a
                href="https://wa.me/201556479624"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                اطلب الآن
              </a>
            </Button>

          </div>
        </div>
      </section>



      {/* ================= Features ================= */}
      <section className="py-24 bg-gradient-to-b from-background via-secondary/20 to-background">
        <div className="container mx-auto px-4">

          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">لماذا تمور سيوة؟</h2>
            <p className="text-muted-foreground text-lg">نقدم لك الأفضل دائماً</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "طبيعي 100%",
                desc: "بدون أي إضافات أو مواد حافظة",
                color: "text-green-600"
              },
              {
                icon: Award,
                title: "جودة عالية",
                desc: "اختيار وفحص دقيق لكل منتج",
                color: "text-yellow-600"
              },
              {
                icon: Truck,
                title: "توصيل سريع",
                desc: "لكل محافظات مصر",
                color: "text-blue-600"
              },
            ].map((f, i) => {
              const Icon = f.icon
              return (
                <div
                  key={i}
                  className="text-center p-10 bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 border border-primary/5"
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 mb-6 ${f.color}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{f.title}</h3>
                  <p className="text-muted-foreground text-base">{f.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ================= Products ================= */}
      <section id="products" className="py-28 bg-gradient-to-b from-background via-muted/30 to-background">
        <div className="container mx-auto px-4">

          <div className="text-center mb-20">
            <span className="inline-block mb-6 px-8 py-3 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full text-primary font-bold text-sm border border-primary/20">
              🎁 مجموعتنا المميزة
            </span>
            <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              أفضل منتجاتنا
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              مختارة بعناية من أجود تمور واحة سيوة
            </p>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-[500px] rounded-2xl bg-muted animate-pulse" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📦</div>
              <p className="text-xl text-muted-foreground">لا توجد منتجات متاحة حالياً</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map(product => (
                <Card key={product._id} className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 group border-2 border-transparent hover:border-primary/20">

                  <div className="relative h-80 overflow-hidden bg-muted">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="inline-block px-4 py-2 bg-white/95 backdrop-blur-sm text-primary text-xs font-bold rounded-full shadow-lg">
                        {product.category}
                      </span>
                    </div>
                  </div>

                  <CardContent className="pt-8 pb-6 px-6">

                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    <div className="flex items-center gap-2 mb-6 text-xs text-muted-foreground">
                      <Shield className="w-4 h-4 text-green-600" />
                      <span>طبيعي</span>
                      <span>•</span>
                      <Award className="w-4 h-4 text-yellow-600" />
                      <span>فحص جودة</span>
                      <span>•</span>
                      <span>تعبئة آمنة</span>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">السعر / الكيلو</p>
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            {product.price}
                          </span>
                          <span className="text-sm text-muted-foreground font-medium">ج.م</span>
                        </div>
                      </div>

                      <Button className="bg-gradient-to-r from-primary to-accent text-white font-bold hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center gap-2">
                        <a
                          href="https://wa.me/201556479624"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <MessageCircle className="w-5 h-5" />
                          اطلب الآن
                        </a>
                      </Button>
                    </div>
                  </CardContent>

                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================= Footer ================= */}
      <footer className="bg-gradient-to-b from-foreground to-foreground/95 text-primary-foreground py-16">
        <div className="container mx-auto px-4">

          <div className="text-center space-y-6 mb-12">
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-white/10 backdrop-blur-sm">
              <Image
                src="/logo-footer.png"
                alt="تمور سيوة"
                width={110}
                height={110}
                className="object-contain rounded-4xl"
              />
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-2">تمور سيوة</h3>
              <p className="text-sm opacity-80 max-w-md mx-auto">
                تمور طبيعية فاخرة من قلب واحة سيوة
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-xs opacity-70">
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                الدفع عند الاستلام
              </span>
              <span>•</span>
              <span className="flex items-center gap-2">
                <Truck className="w-4 h-4" />
                توصيل لكل المحافظات
              </span>
            </div>
          </div>

          <div className="flex justify-center gap-6 mb-8">
            <a
              href="https://wa.me/201556479624"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:scale-110"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61586801931073"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:scale-110"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="https://instagram.com/siwadates.1612002"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:scale-110"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>

          <div className="text-center pt-8 border-t border-white/10">
            <p className="text-xs opacity-60">
              © 2026 تمور سيوة — جميع الحقوق محفوظة
            </p>
          </div>

        </div>
      </footer>

    </div>
  )
}
