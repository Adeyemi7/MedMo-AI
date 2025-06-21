"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MainLayout } from "@/components/main-layout"

export default function DocsPage() {
  const [copiedCode, setCopiedCode] = useState(null)

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const sampleResponse200 = `{
  "status": "success",
  "data": [
    "health",
    "3rd_party_auto", 
    "comprehensive_auto",
    "life",
    "marine",
    "git",
    "credit_life",
    "fire_burglary",
    "gadget",
    "job_loss",
    "personal_accident",
    "micro_health",
    "travel",
    "investment_life",
    "investment"
  ],
  "message": "Product types retrieved successfully"
}`

  const sampleResponse422 = `{
  "status": "error",
  "message": "Validation failed",
  "errors": {
    "authorization": [
      "Invalid or missing bearer token"
    ]
  }
}`

  const curlExample = `curl -X GET "https://api.playbox.grow.curacel.co/api/v1/product-types" \\
  -H "Authorization: Bearer YOUR_API_TOKEN" \\
  -H "Content-Type: application/json" \\
  -H "Accept: application/json"`

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">API Documentation</h1>
          <p className="text-muted-foreground mt-2">Complete reference for the Curacel Grow API</p>
        </div>

        {/* Authentication */}
        <Card>
          <CardHeader>
            <CardTitle>Authentication</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              All API requests require authentication using a Bearer token in the Authorization header.
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <code className="text-sm">Authorization: Bearer YOUR_API_TOKEN</code>
            </div>
          </CardContent>
        </Card>

        {/* Base URL */}
        <Card>
          <CardHeader>
            <CardTitle>Base URL</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg">
              <code className="text-sm">https://api.playbox.grow.curacel.co/api/v1</code>
            </div>
          </CardContent>
        </Card>

        {/* Endpoints */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Endpoints</h2>

          {/* List Product Types */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  List Product Types
                  <Badge variant="secondary">GET</Badge>
                </CardTitle>
              </div>
              <p className="text-muted-foreground">Retrieves all available insurance product types.</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Endpoint URL */}
              <div>
                <h4 className="font-semibold mb-2">Endpoint</h4>
                <div className="bg-muted p-3 rounded-lg flex items-center justify-between">
                  <code className="text-sm">GET /api/v1/product-types</code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard("/api/v1/product-types", "endpoint")}>
                    {copiedCode === "endpoint" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* cURL Example */}
              <div>
                <h4 className="font-semibold mb-2">cURL Example</h4>
                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex items-start justify-between">
                    <pre className="text-sm overflow-x-auto flex-1">
                      <code>{curlExample}</code>
                    </pre>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(curlExample, "curl")}
                      className="ml-2 flex-shrink-0">
                      {copiedCode === "curl" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Response Examples */}
              <div>
                <h4 className="font-semibold mb-2">Response Examples</h4>
                <Tabs defaultValue="200" className="w-full">
                  <TabsList>
                    <TabsTrigger value="200" className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        200
                      </Badge>
                      Success
                    </TabsTrigger>
                    <TabsTrigger value="422" className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        422
                      </Badge>
                      Validation Error
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="200" className="mt-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="flex items-start justify-between">
                        <pre className="text-sm overflow-x-auto flex-1">
                          <code>{sampleResponse200}</code>
                        </pre>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(sampleResponse200, "response200")}
                          className="ml-2 flex-shrink-0">
                          {copiedCode === "response200" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="422" className="mt-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="flex items-start justify-between">
                        <pre className="text-sm overflow-x-auto flex-1">
                          <code>{sampleResponse422}</code>
                        </pre>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(sampleResponse422, "response422")}
                          className="ml-2 flex-shrink-0">
                          {copiedCode === "response422" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Response Schema */}
              <div>
                <h4 className="font-semibold mb-2">Response Schema</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <code className="text-sm bg-muted px-2 py-1 rounded">status</code>
                    <Badge variant="outline">string</Badge>
                    <span className="text-sm text-muted-foreground">Response status (success/error)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="text-sm bg-muted px-2 py-1 rounded">data</code>
                    <Badge variant="outline">array</Badge>
                    <span className="text-sm text-muted-foreground">Array of product type strings</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="text-sm bg-muted px-2 py-1 rounded">message</code>
                    <Badge variant="outline">string</Badge>
                    <span className="text-sm text-muted-foreground">Response message</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Rate Limiting */}
        <Card>
          <CardHeader>
            <CardTitle>Rate Limiting</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">API requests are rate limited to ensure fair usage. Current limits:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
              <li>1000 requests per hour per API key</li>
              <li>Rate limit headers are included in all responses</li>
              <li>Exceeded limits return HTTP 429 status code</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
