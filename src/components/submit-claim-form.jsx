"use client";
import { useState } from "react"
import { useForm } from "react-hook-form"
import { CalendarIcon, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { apiService } from "@/lib/api";

export function SubmitClaimForm({
  onClaimSubmitted
}) {
  const [loading, setLoading] = useState(false)
  const [treatmentDate, setTreatmentDate] = useState()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      currency: "NGN",
    },
  })

  const claimType = watch("claim_type")

  const onSubmit = async (data) => {
    try {
      setLoading(true)

      const claimData = {
        customer_ref: data.customer_ref,
        claim_type: data.claim_type,
        hospital_name: data.hospital_name,
        hospital_address: data.hospital_address,
        diagnosis: data.diagnosis,
        treatment_date: treatmentDate ? format(treatmentDate, "yyyy-MM-dd") : "",
        claim_amount: data.claim_amount,
        currency: data.currency,
        description: data.description,
        status: "pending",
        documents: Array.from(data.documents || []),
      }

      const submittedClaim = await apiService.submitHealthClaim(claimData)
      onClaimSubmitted(submittedClaim)
    } catch (error) {
      console.error("Failed to submit claim:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Customer Information */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="customer_ref">Customer Reference *</Label>
            <Input
              id="customer_ref"
              {...register("customer_ref", { required: "Customer reference is required" })}
              placeholder="Enter customer reference ID" />
            {errors.customer_ref && <p className="text-sm text-red-600 mt-1">{errors.customer_ref.message}</p>}
          </div>
        </CardContent>
      </Card>
      {/* Claim Details */}
      <Card>
        <CardHeader>
          <CardTitle>Claim Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="claim_type">Claim Type *</Label>
              <Select onValueChange={(value) => setValue("claim_type", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select claim type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inpatient">Inpatient</SelectItem>
                  <SelectItem value="outpatient">Outpatient</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                  <SelectItem value="pharmacy">Pharmacy</SelectItem>
                  <SelectItem value="diagnostic">Diagnostic</SelectItem>
                </SelectContent>
              </Select>
              {errors.claim_type && <p className="text-sm text-red-600 mt-1">{errors.claim_type.message}</p>}
            </div>

            <div>
              <Label>Treatment Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !treatmentDate && "text-muted-foreground"
                    )}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {treatmentDate ? format(treatmentDate, "PPP") : "Select treatment date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={treatmentDate}
                    onSelect={setTreatmentDate}
                    initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div>
            <Label htmlFor="diagnosis">Diagnosis *</Label>
            <Input
              id="diagnosis"
              {...register("diagnosis", { required: "Diagnosis is required" })}
              placeholder="Enter diagnosis" />
            {errors.diagnosis && <p className="text-sm text-red-600 mt-1">{errors.diagnosis.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="claim_amount">Claim Amount *</Label>
              <Input
                id="claim_amount"
                type="number"
                step="0.01"
                {...register("claim_amount", {
                  required: "Claim amount is required",
                  min: { value: 0, message: "Amount must be positive" },
                })}
                placeholder="0.00" />
              {errors.claim_amount && <p className="text-sm text-red-600 mt-1">{errors.claim_amount.message}</p>}
            </div>
            <div>
              <Label htmlFor="currency">Currency</Label>
              <Select defaultValue="NGN" onValueChange={(value) => setValue("currency", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NGN">NGN (₦)</SelectItem>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Additional details about the claim..."
              rows={3} />
          </div>
        </CardContent>
      </Card>
      {/* Hospital Information */}
      <Card>
        <CardHeader>
          <CardTitle>Hospital Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="hospital_name">Hospital Name *</Label>
            <Input
              id="hospital_name"
              {...register("hospital_name", { required: "Hospital name is required" })}
              placeholder="Enter hospital name" />
            {errors.hospital_name && <p className="text-sm text-red-600 mt-1">{errors.hospital_name.message}</p>}
          </div>

          <div>
            <Label htmlFor="hospital_address">Hospital Address *</Label>
            <Textarea
              id="hospital_address"
              {...register("hospital_address", { required: "Hospital address is required" })}
              placeholder="Enter complete hospital address"
              rows={2} />
            {errors.hospital_address && <p className="text-sm text-red-600 mt-1">{errors.hospital_address.message}</p>}
          </div>
        </CardContent>
      </Card>
      {/* Documents */}
      <Card>
        <CardHeader>
          <CardTitle>Supporting Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="documents">Upload Documents</Label>
            <div className="mt-2">
              <Input
                id="documents"
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                {...register("documents")}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" />
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Upload medical reports, receipts, and other supporting documents (PDF, JPG, PNG, DOC)
            </p>
          </div>
        </CardContent>
      </Card>
      {/* Submit Button */}
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline">
          Save as Draft
        </Button>
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit Claim
        </Button>
      </div>
    </form>
  );
}
