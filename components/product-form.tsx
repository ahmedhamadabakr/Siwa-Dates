"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface Product {
  _id: string
  name: string
  description: string
  price: number
  image: string
  category: string
}

interface ProductFormProps {
  product?: Product | null
  onSaved: () => void
}

export function ProductForm({ product, onSaved }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || 0,
    category: product?.category || "",
    image: product?.image || "",
  })
  const [loading, setLoading] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)

  const handleImageUpload = async (file: File) => {
    setUploadingImage(true)
    const formDataObj = new FormData()
    formDataObj.append("file", file)

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formDataObj,
      })
      const data = await res.json()
      setFormData({ ...formData, image: data.url })
    } catch (error) {
      console.error("Upload failed:", error)
    } finally {
      setUploadingImage(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = product ? `/api/products/${product._id}` : "/api/products"
      const method = product ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        onSaved()
      }
    } catch (error) {
      console.error("Failed to save product:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">اسم المنتج</label>
        <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">الوصف</label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">السعر (ج.م)</label>
          <Input
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: Number.parseFloat(e.target.value) })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">الفئة</label>
          <Input
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            placeholder="مثل: فاخر، عادي، إلخ"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">صورة المنتج</label>
        <div className="border-2 border-dashed border-border rounded-lg p-6">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                handleImageUpload(e.target.files[0])
              }
            }}
            disabled={uploadingImage}
            className="block w-full"
          />
          {uploadingImage && <p className="text-sm text-muted-foreground mt-2">جاري الرفع...</p>}
        </div>
        {formData.image && (
          <img src={formData.image || "/placeholder.svg"} alt="preview" className="mt-4 max-w-xs rounded-lg" />
        )}
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "جاري الحفظ..." : product ? "تحديث" : "إضافة"}
      </Button>
    </form>
  )
}
