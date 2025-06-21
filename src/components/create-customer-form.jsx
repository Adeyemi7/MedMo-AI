"use client";
import { useState } from "react"
import { useForm } from "react-hook-form"
import { CalendarIcon, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { apiService } from "@/lib/api";

export function CreateCustomerForm({
  onCustomerCreated
}) {
  const [loading, setLoading] = useState(false)
  const [birthDate, setBirthDate] = useState()
  const [idExpiry, setIdExpiry] = useState()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm()

  const onSubmit = async (data) => {
    try {
      setLoading(true)

      const formData = new FormData()

      // Add all text fields
      Object.entries(data).forEach(([key, value]) => {
        if (key !== "id_card" && key !== "proof_of_address" && key !== "birth_date" && key !== "id_expiry") {
          if (value) formData.append(key, value.toString())
        }
      })

      // Add dates
      if (birthDate) formData.append("birth_date", format(birthDate, "yyyy-MM-dd"))
      if (idExpiry) formData.append("id_expiry", format(idExpiry, "yyyy-MM-dd"))

      // Add files
      if (data.id_card && data.id_card.length > 0) {
        formData.append("id_card", data.id_card[0])
      }
      if (data.proof_of_address && data.proof_of_address.length > 0) {
        formData.append("proof_of_address", data.proof_of_address[0])
      }

      const customer = await apiService.createCustomer(formData)
      onCustomerCreated(customer)
    } catch (error) {
      console.error("Failed to create customer:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="ref">Customer Reference *</Label>
            <Input
              id="ref"
              {...register("ref", { required: "Customer reference is required" })}
              placeholder="Your unique identifier for this customer" />
            {errors.ref && <p className="text-sm text-red-600 mt-1">{errors.ref.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="first_name">First Name *</Label>
              <Input
                id="first_name"
                {...register("first_name", { required: "First name is required" })}
                placeholder="First name" />
              {errors.first_name && <p className="text-sm text-red-600 mt-1">{errors.first_name.message}</p>}
            </div>
            <div>
              <Label htmlFor="middle_name">Middle Name</Label>
              <Input id="middle_name" {...register("middle_name")} placeholder="Middle name" />
            </div>
            <div>
              <Label htmlFor="last_name">Last Name *</Label>
              <Input
                id="last_name"
                {...register("last_name", { required: "Last name is required" })}
                placeholder="Last name" />
              {errors.last_name && <p className="text-sm text-red-600 mt-1">{errors.last_name.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sex">Gender *</Label>
              <Select onValueChange={(value) => setValue("sex", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="M">Male</SelectItem>
                  <SelectItem value="F">Female</SelectItem>
                </SelectContent>
              </Select>
              {errors.sex && <p className="text-sm text-red-600 mt-1">{errors.sex.message}</p>}
            </div>

            <div>
              <Label>Date of Birth *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !birthDate && "text-muted-foreground"
                    )}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {birthDate ? format(birthDate, "PPP") : "Select date of birth"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={birthDate} onSelect={setBirthDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                placeholder="email@example.com" />
              {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                {...register("phone", { required: "Phone number is required" })}
                placeholder="+234 xxx xxx xxxx" />
              {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="bvn">BVN (Optional)</Label>
              <Input id="bvn" {...register("bvn")} placeholder="Bank Verification Number" />
            </div>
            <div>
              <Label htmlFor="occupation">Occupation</Label>
              <Input id="occupation" {...register("occupation")} placeholder="Occupation" />
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Identification */}
      <Card>
        <CardHeader>
          <CardTitle>Identification</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="id_type">ID Type *</Label>
              <Select onValueChange={(value) => setValue("id_type", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select ID type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="driversLicense">Driver's License</SelectItem>
                  <SelectItem value="internationalPassport">International Passport</SelectItem>
                  <SelectItem value="votersCard">Voter's Card</SelectItem>
                  <SelectItem value="nimc">NIMC</SelectItem>
                </SelectContent>
              </Select>
              {errors.id_type && <p className="text-sm text-red-600 mt-1">{errors.id_type.message}</p>}
            </div>
            <div>
              <Label htmlFor="id_number">ID Number *</Label>
              <Input
                id="id_number"
                {...register("id_number", { required: "ID number is required" })}
                placeholder="Enter ID number" />
              {errors.id_number && <p className="text-sm text-red-600 mt-1">{errors.id_number.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>ID Expiry Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !idExpiry && "text-muted-foreground"
                    )}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {idExpiry ? format(idExpiry, "PPP") : "Select expiry date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={idExpiry} onSelect={setIdExpiry} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label htmlFor="id_card">ID Card *</Label>
              <Input
                id="id_card"
                type="file"
                accept="image/*,.pdf"
                {...register("id_card", { required: "ID card is required" })}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" />
              {errors.id_card && <p className="text-sm text-red-600 mt-1">{errors.id_card.message}</p>}
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Address Information */}
      <Card>
        <CardHeader>
          <CardTitle>Address Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="residential_address">Residential Address *</Label>
            <Textarea
              id="residential_address"
              {...register("residential_address", { required: "Residential address is required" })}
              placeholder="Enter complete residential address"
              rows={2} />
            {errors.residential_address && (
              <p className="text-sm text-red-600 mt-1">{errors.residential_address.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                {...register("city", { required: "City is required" })}
                placeholder="City" />
              {errors.city && <p className="text-sm text-red-600 mt-1">{errors.city.message}</p>}
            </div>
            <div>
              <Label htmlFor="state">State *</Label>
              <Input
                id="state"
                {...register("state", { required: "State is required" })}
                placeholder="State" />
              {errors.state && <p className="text-sm text-red-600 mt-1">{errors.state.message}</p>}
            </div>
            <div>
              <Label htmlFor="country">Country *</Label>
              <Input
                id="country"
                {...register("country", { required: "Country is required" })}
                placeholder="Country"
                defaultValue="Nigeria" />
              {errors.country && <p className="text-sm text-red-600 mt-1">{errors.country.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nationality">Nationality</Label>
              <Input
                id="nationality"
                {...register("nationality")}
                placeholder="Nationality"
                defaultValue="Nigerian" />
            </div>
            <div>
              <Label htmlFor="proof_of_address">Proof of Address (Optional)</Label>
              <Input
                id="proof_of_address"
                type="file"
                accept="image/*,.pdf"
                {...register("proof_of_address")}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" />
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Next of Kin */}
      <Card>
        <CardHeader>
          <CardTitle>Next of Kin (Optional)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="next_of_kin_name">Next of Kin Name</Label>
              <Input
                id="next_of_kin_name"
                {...register("next_of_kin_name")}
                placeholder="Full name of next of kin" />
            </div>
            <div>
              <Label htmlFor="next_of_kin_phone">Next of Kin Phone</Label>
              <Input
                id="next_of_kin_phone"
                {...register("next_of_kin_phone")}
                placeholder="Phone number of next of kin" />
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Submit Button */}
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Create Customer
        </Button>
      </div>
    </form>
  );
}
