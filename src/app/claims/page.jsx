"use client"

import { useState, useEffect } from "react"
import { Plus, Search, Filter, FileText, Calendar, DollarSign, User, Hospital } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { MainLayout } from "@/components/main-layout"
import { apiService } from "@/lib/api";
import { SubmitClaimForm } from "@/components/submit-claim-form"
import { CreateCustomerForm } from "@/components/create-customer-form"

const CLAIM_TYPES = [
  { value: "all", label: "All Types" },
  { value: "inpatient", label: "Inpatient" },
  { value: "outpatient", label: "Outpatient" },
  { value: "emergency", label: "Emergency" },
  { value: "pharmacy", label: "Pharmacy" },
  { value: "diagnostic", label: "Diagnostic" },
]

const CLAIM_STATUSES = [
  { value: "all", label: "All Statuses" },
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
]

export default function ClaimsPage() {
  const [claims, setClaims] = useState([])
  const [filteredClaims, setFilteredClaims] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [showSubmitForm, setShowSubmitForm] = useState(false)
  const [showCustomerForm, setShowCustomerForm] = useState(false)

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        setLoading(true)
        const data = await apiService.getHealthClaims()
        setClaims(data)
        setFilteredClaims(data)
      } catch (error) {
        console.error("Failed to fetch claims:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchClaims()
  }, [])

  useEffect(() => {
    let filtered = claims

    // Filter by type
    if (selectedType !== "all") {
      filtered = filtered.filter((claim) => claim.claim_type === selectedType)
    }

    // Filter by status
    if (selectedStatus !== "all") {
      filtered = filtered.filter((claim) => claim.status === selectedStatus)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((claim) =>
        claim.customer_ref.toLowerCase().includes(searchTerm.toLowerCase()) ||
        claim.hospital_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        claim.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    setFilteredClaims(filtered)
  }, [claims, selectedType, selectedStatus, searchTerm])

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200"
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200"
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const formatAmount = (amount, currency) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: currency,
    }).format(amount);
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-NG", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  const handleClaimSubmitted = (newClaim) => {
    setClaims([newClaim, ...claims])
    setShowSubmitForm(false)
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Health Claims Management</h1>
            <p className="text-muted-foreground mt-2">Manage and submit health insurance claims for your patients</p>
          </div>
          <div className="flex gap-2">
            <Dialog open={showCustomerForm} onOpenChange={setShowCustomerForm}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <User className="h-4 w-4 mr-2" />
                  New Customer
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Customer</DialogTitle>
                </DialogHeader>
                <CreateCustomerForm onCustomerCreated={() => setShowCustomerForm(false)} />
              </DialogContent>
            </Dialog>

            <Dialog open={showSubmitForm} onOpenChange={setShowSubmitForm}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Submit Claim
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Submit New Health Claim</DialogTitle>
                </DialogHeader>
                <SubmitClaimForm onClaimSubmitted={handleClaimSubmitted} />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Claims</p>
                  <p className="text-2xl font-bold">{claims.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Approved</p>
                  <p className="text-2xl font-bold">{claims.filter((c) => c.status === "approved").length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold">{claims.filter((c) => c.status === "pending").length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Hospital className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Processing</p>
                  <p className="text-2xl font-bold">{claims.filter((c) => c.status === "processing").length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by customer, hospital, or diagnosis..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10" />
          </div>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Claim Type" />
            </SelectTrigger>
            <SelectContent>
              {CLAIM_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {CLAIM_STATUSES.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Claims List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Loading claims...</p>
            </div>
          ) : filteredClaims.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No claims found matching your criteria.</p>
            </div>
          ) : (
            filteredClaims.map((claim) => (
              <Card key={claim.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div
                    className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">Claim #{claim.id}</h3>
                        <Badge className={getStatusColor(claim.status)}>{claim.status.toUpperCase()}</Badge>
                        <Badge variant="outline">{claim.claim_type.toUpperCase()}</Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Customer</p>
                          <p className="font-medium">{claim.customer_ref}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Hospital</p>
                          <p className="font-medium">{claim.hospital_name}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Diagnosis</p>
                          <p className="font-medium">{claim.diagnosis}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Amount</p>
                          <p className="font-medium">{formatAmount(claim.claim_amount, claim.currency)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Treatment: {formatDate(claim.treatment_date)}</span>
                        {claim.created_at && <span>Submitted: {formatDate(claim.created_at)}</span>}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </MainLayout>
  );
}
