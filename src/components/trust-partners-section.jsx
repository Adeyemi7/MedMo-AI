import { Card, CardContent } from "@/components/ui/card"
import { Shield, Award, Lock, CheckCircle } from "lucide-react"

export default function TrustPartnersSection() {
  const partners = [
    { name: "Curacel AI", description: "Insurance Technology Partner" },
    { name: "NAICOM", description: "Regulatory Compliance" },
    { name: "50+ Insurance Providers", description: "Comprehensive Coverage" },
    { name: "1,000+ Healthcare Providers", description: "Extensive Network" },
  ]

  const certifications = [
    { icon: Shield, title: "ISO 27001 Certified", description: "International security standards" },
    { icon: Award, title: "NAICOM Approved Intermediary", description: "Regulatory compliance" },
    { icon: Lock, title: "Bank-Grade Security", description: "Enterprise-level protection" },
    { icon: CheckCircle, title: "NDPR Compliant", description: "Data protection compliance" },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Powered by Industry Leaders</h2>
        </div>

        {/* Partners Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {partners.map((partner, index) => (
            <Card key={index} className="bg-white text-center border border-gray-200">
              <CardContent className="p-6">
                <div
                  className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-black font-bold text-lg">{partner.name.charAt(0)}</span>
                </div>
                <h3 className="font-semibold text-black mb-1">{partner.name}</h3>
                <p className="text-sm text-gray-600">{partner.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Certifications */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-black text-center mb-8">Certifications & Security</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="text-center">
                <div
                  className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <cert.icon className="w-6 h-6 text-black" />
                </div>
                <h4 className="font-semibold text-black mb-1">{cert.title}</h4>
                <p className="text-sm text-gray-600">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
