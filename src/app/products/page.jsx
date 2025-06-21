"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Filter, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MainLayout } from "@/components/main-layout"
import { apiService } from "@/lib/api";

const PRODUCT_CATEGORIES = [
  { value: "all", label: "All Categories" },
  { value: "health", label: "Health Insurance" },
  { value: "3rd_party_auto", label: "Third Party Auto" },
  { value: "comprehensive_auto", label: "Comprehensive Auto" },
  { value: "life", label: "Life Insurance" },
  { value: "marine", label: "Marine Insurance" },
  { value: "git", label: "GIT Insurance" },
  { value: "credit_life", label: "Credit Life" },
  { value: "fire_burglary", label: "Fire & Burglary" },
  { value: "gadget", label: "Gadget Protection" },
  { value: "job_loss", label: "Job Loss" },
  { value: "personal_accident", label: "Personal Accident" },
  { value: "micro_health", label: "Micro Health" },
  { value: "travel", label: "Travel Insurance" },
  { value: "investment_life", label: "Investment Life" },
  { value: "investment", label: "Investment" },
]

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const data = await apiService.getProducts()
        setProducts(data)
        //setFilteredProducts(data)
      } catch (error) {
        console.error("Failed to fetch products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
  let filtered = products

  // Filter by category
  if (selectedCategory !== "all") {
    filtered = filtered.filter((product) => product.name === selectedCategory)
  }

  // Filter by search term
  if (searchTerm) {
    filtered = filtered.filter((product) => {
      const productName = product.name?.toLowerCase() || ''  // Safe check for product.name
      const insurerName = product.insurer?.name?.toLowerCase() || ''  // Safe check for insurer.name

      return (productName.includes(searchTerm.toLowerCase()) || insurerName.includes(searchTerm.toLowerCase()));
    })
  }

  setFilteredProducts(filtered)
}, [products, selectedCategory, searchTerm])

  const formatCategoryName = (type) => {
    return PRODUCT_CATEGORIES.find((cat) => cat.value === type)?.label || type;
  }

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Insurance Products</h1>
          <p className="text-muted-foreground mt-2">Explore our comprehensive range of insurance products</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products or insurers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10" />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {PRODUCT_CATEGORIES.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Results count */}
        <div className="text-sm text-muted-foreground">
          Showing {filteredProducts.length} of {products.length} products
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <Image
                      src={product.insurer.logo_url || "/placeholder.svg"}
                      alt={`${product.insurer.name} logo`}
                      width={80}
                      height={60}
                      className="object-contain" />
                    <Badge variant="secondary">{formatCategoryName(product.type)}</Badge>
                  </div>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      <strong>Insurer:</strong> {product.insurer.name}
                    </p>
                    {product.premium && (
                      <p className="text-sm text-muted-foreground">
                        <strong>Premium:</strong> {product.premium}
                      </p>
                    )}
                    {product.coverage && (
                      <p className="text-sm text-muted-foreground">
                        <strong>Coverage:</strong> {product.coverage}
                      </p>
                    )}
                    {product.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={`/products/${product?.id}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
