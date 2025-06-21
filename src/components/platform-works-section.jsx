import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, Zap, Shield, TrendingUp } from "lucide-react"

export default function PlatformWorksSection() {
  const benefits = [
    {
      icon: DollarSign,
      title: "Free Platform Access",
      description: "No cost to compare and explore insurance options",
    },
    {
      icon: Zap,
      title: "Direct Insurance Pricing",
      description: "Get actual rates directly from insurance providers",
    },
    {
      icon: Shield,
      title: "No Hidden Fees",
      description: "Transparent process with no markup on premiums",
    },
    {
      icon: TrendingUp,
      title: "Commission-Based Model",
      description: "We earn from insurance providers, not from you",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            Your Gateway to Nigeria's Insurance Marketplace
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access Real-Time Pricing from 50+ Insurance Providers
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="text-center hover:shadow-lg transition-shadow border border-gray-200">
              <CardContent className="p-6">
                <div
                  className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-black mb-4">How Our Platform Benefits You</h3>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-black rounded-full mt-2 mr-3"></div>
                  <span className="text-gray-700">All pricing comes directly from insurance companies via API</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-black rounded-full mt-2 mr-3"></div>
                  <span className="text-gray-700">Compare actual premiums across multiple providers</span>
                </li>
              </ul>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-black rounded-full mt-2 mr-3"></div>
                  <span className="text-gray-700">Get instant quotes based on your specific profile</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-black rounded-full mt-2 mr-3"></div>
                  <span className="text-gray-700">No price manipulation or hidden markups</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
