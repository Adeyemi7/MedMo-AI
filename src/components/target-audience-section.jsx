import { Card, CardContent } from "@/components/ui/card"
import { Users, Building, User } from "lucide-react"

export default function TargetAudienceSection() {
  const audiences = [
    {
      icon: Users,
      title: "For Individuals & Families",
      subtitle: "Personal Health Insurance Made Simple",
      features: [
        "Individual health plans starting from ₦15,000/year",
        "Family coverage options",
        "Maternity and child care benefits",
        "Emergency medical coverage",
        "Access to 1,000+ hospitals nationwide",
      ],
    },
    {
      icon: Building,
      title: "For Small Businesses",
      subtitle: "Employee Benefits That Attract Top Talent",
      features: [
        "Group insurance plans for 2-50 employees",
        "Competitive rates with bulk pricing",
        "Easy employee enrollment management",
        "Comprehensive coverage options",
        "Tax-deductible business expense",
      ],
    },
    {
      icon: User,
      title: "For Solo Entrepreneurs",
      subtitle: "Health Coverage for the Self-Employed",
      features: [
        "Flexible payment options",
        "Coverage during income fluctuations",
        "Business-related injury protection",
        "Mental health support",
        "Telemedicine services",
      ],
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {audiences.map((audience, index) => (
            <Card
              key={index}
              className="border-2 border-gray-200 hover:border-gray-400 transition-colors h-full">
              <CardContent className="p-8">
                <div
                  className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                  <audience.icon className="w-8 h-8 text-black" />
                </div>

                <h3 className="text-2xl font-bold text-black mb-2">{audience.title}</h3>
                <p className="text-lg font-semibold text-gray-800 mb-6">{audience.subtitle}</p>

                <ul className="space-y-3">
                  {audience.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
