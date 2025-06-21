import { Card, CardContent } from "@/components/ui/card"
import { Target, Lightbulb, Zap, Lock, Phone, Globe } from "lucide-react"

export default function WhyChooseUsSection() {
  const advantages = [
    {
      icon: Target,
      title: "Personalized Matching",
      description: "Our AI considers 50+ factors to find your perfect insurance match.",
    },
    {
      icon: Lightbulb,
      title: "Expert Guidance",
      description: "Licensed insurance advisors available for consultation.",
    },
    {
      icon: Zap,
      title: "Speed & Efficiency",
      description: "10x faster than traditional insurance shopping.",
    },
    {
      icon: Lock,
      title: "Data Security",
      description: "Your personal information protected with enterprise-grade security.",
    },
    {
      icon: Phone,
      title: "Ongoing Support",
      description: "Dedicated customer success team for claims and policy management.",
    },
    {
      icon: Globe,
      title: "Nigeria-Focused",
      description: "Built specifically for the Nigerian healthcare and insurance landscape.",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Why Choose MedMO AI?</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => (
            <Card
              key={index}
              className="bg-white hover:shadow-lg transition-shadow border border-gray-200">
              <CardContent className="p-6">
                <div
                  className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <advantage.icon className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-3">{advantage.title}</h3>
                <p className="text-gray-600">{advantage.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
