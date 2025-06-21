"use client";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { apiService } from "@/lib/api";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MainLayout } from "@/components/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ProductDetailPage() {
  const router = useRouter();

  // State for product data and loading status
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Use useEffect to fetch data only when the router is ready and id is available
  useEffect(() => {
    // Check if the router is ready and if 'id' exists in the query
    if (!router.isReady) {
      return; // Router not ready yet, do nothing
    }

    const { id } = router.query; // Destructure 'id' ONLY when router.isReady is true

    if (!id) {
      // If id is still undefined after router is ready (e.g., direct navigation to /products)
      setLoading(false); // Stop loading
      setProduct(null); // Indicate no product found
      return;
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);
        // Cast id to string as it can be string or string[]
        const data = await apiService.getProduct(id);
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        setProduct(null); // Set product to null on error to display "Not Found"
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [router.isReady, router.query]); // Depend on router.isReady and router.query

  // --- Render Logic ---

  // Show a loading state if router isn't ready OR if data is still being fetched
  if (!router.isReady || loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading product...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  // If after loading, no product was found
  if (!product) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Button onClick={() => router.push("/products")}>
            Back to Products
          </Button>
        </div>
      </MainLayout>
    );
  }

  // If product data is available, render the details
  return (
    <MainLayout>
      <div className="space-y-6">
        <Button variant="outline" onClick={() => router.push("/products")}>
          Back to Products
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
            <Badge>{product.type}</Badge>
          </CardHeader>
          <CardContent>
            <p>{product.description}</p>
            <p>
              <strong>Premium:</strong> {product.premium}
            </p>
            <p>
              <strong>Coverage:</strong> {product.coverage}
            </p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
