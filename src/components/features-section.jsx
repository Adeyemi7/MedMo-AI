import { Card, CardContent } from "@/components/ui/card"
import { Search, Bot, Smartphone, Building2, DollarSign, Zap } from "lucide-react"

export default function FeaturesSection() {
  const features = [
    {
      icon: Search,
      title: "Smart Comparison Engine",
      description: "Compare 200+ insurance plans across price, coverage, and network size in real-time.",
    },
    {
      icon: Bot,
      title: "AI-Powered Recommendations",
      description: "Get personalized insurance suggestions based on your health history, budget, and preferences.",
    },
    {
      icon: Smartphone,
      title: "Digital-First Experience",
      description: "Complete enrollment, manage policies, and file claims entirely through our platform.",
    },
    {
      icon: Building2,
      title: "Extensive Provider Network",
      description: "Access to 1,000+ hospitals, clinics, and specialists across Nigeria.",
    },
    {
      icon: DollarSign,
      title: "Transparent Pricing",
      description: "No hidden fees, clear premium calculations, and upfront cost breakdowns.",
    },
    {
      icon: Zap,
      title: "Instant Enrollment",
      description: "Get approved and start using your coverage within hours, not weeks.",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Key Features That Set Us Apart</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-white hover:shadow-lg transition-shadow border border-gray-200">
              <CardContent className="p-6">
                <div
                  className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
