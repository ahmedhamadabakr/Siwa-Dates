"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

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
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products")
        const data = await res.json()
        if (Array.isArray(data)) {
          setProducts(data)
        } else {
          console.error("Invalid products data:", data)
          setProducts([])
        }
      } catch (error) {
        console.error("Failed to fetch products:", error)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">ت</span>
            </div>
            <h1 className="text-2xl font-bold text-primary">تمر سيوة</h1>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="/admin" className="text-foreground hover:text-primary transition">
              لوحة التحكم
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">تمور سيوة الفاخرة</h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            اكتشف أفضل التمور الطبيعية من واحة سيوة المصرية. جودة عالية، طعم استثنائي، وفوائد صحية عظيمة.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg">
            اطلب الآن
          </Button>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <Card className="border-0 shadow-md hover:shadow-lg transition">
            <CardContent className="pt-6 text-center">
              <div className="text-4xl mb-4">🌴</div>
              <h3 className="text-xl font-semibold mb-2">طبيعي 100%</h3>
              <p className="text-muted-foreground">بدون إضافات أو مواد حافظة، مباشرة من البستان</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md hover:shadow-lg transition">
            <CardContent className="pt-6 text-center">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-xl font-semibold mb-2">جودة عالية</h3>
              <p className="text-muted-foreground">اختيار دقيق وفحص جودة صارم لكل دفعة</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md hover:shadow-lg transition">
            <CardContent className="pt-6 text-center">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-2">توصيل سريع</h3>
              <p className="text-muted-foreground">شحن آمن ومحفوظ إلى جميع أنحاء البلاد</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="bg-card/50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">منتجاتنا</h2>

          {loading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-muted rounded-lg h-96 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {products.map((product) => (
                <Card key={product._id} className="overflow-hidden hover:shadow-lg transition border-0">
                  <div className="relative w-full h-48 bg-muted">
                    {product.image && (
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <CardContent className="pt-6">
                    <p className="text-sm text-accent font-semibold mb-2">{product.category}</p>
                    <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">{product.price} ج.م</span>
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        أضف للسلة
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">تمر سيوة</h3>
              <p className="text-sm opacity-90">أفضل التمور الطبيعية من واحة سيوة المصرية</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">الروابط</h4>
              <ul className="space-y-2 text-sm opacity-90">
                <li>
                  <a href="#" className="hover:opacity-100 transition">
                    الصفحة الرئيسية
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-100 transition">
                    المنتجات
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:opacity-100 transition">
                    اتصل بنا
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">معلومات التواصل</h4>
              <p className="text-sm opacity-90">البريد: info@siwadates.com</p>
              <p className="text-sm opacity-90">الهاتف: +20 (0) 123 456 7890</p>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-90">
            <p>© 2026 تمر سيوة. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
