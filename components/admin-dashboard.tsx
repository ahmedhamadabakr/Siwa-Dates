"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProductForm } from "./product-form"
import { ProductList } from "./product-list"

interface Product {
  _id: string
  name: string
  description: string
  price: number
  image: string
  category: string
}

interface AdminDashboardProps {
  onLogout: () => void
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
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

  const handleProductSaved = () => {
    setShowForm(false)
    setEditingProduct(null)
    fetchProducts()
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذا المنتج؟")) {
      try {
        await fetch(`/api/products/${id}`, { method: "DELETE" })
        fetchProducts()
      } catch (error) {
        console.error("Failed to delete product:", error)
      }
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border p-6">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-bold">لوحة التحكم</h1>
          <Button variant="outline" onClick={onLogout}>
            تسجيل الخروج
          </Button>
        </div>
      </header>

      <main className="container mx-auto p-6">
        <div className="mb-6">
          <Button
            onClick={() => {
              setEditingProduct(null)
              setShowForm(!showForm)
            }}
            className="bg-primary hover:bg-primary/90"
          >
            {showForm ? "إلغاء" : "إضافة منتج جديد"}
          </Button>
        </div>

        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingProduct ? "تعديل المنتج" : "إضافة منتج جديد"}</CardTitle>
            </CardHeader>
            <CardContent>
              <ProductForm product={editingProduct} onSaved={handleProductSaved} />
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>المنتجات</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p>جاري التحميل...</p>
            ) : (
              <ProductList products={products} onEdit={handleEdit} onDelete={handleDelete} />
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
