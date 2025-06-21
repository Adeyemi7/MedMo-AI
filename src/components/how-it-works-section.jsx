import { Card, CardContent } from "@/components/ui/card"
import { User, Bot, BarChart3, CheckCircle } from "lucide-react"

export default function HowItWorksSection() {
  const steps = [
    {
      icon: User,
      title: "Tell Us About Yourself",
      description: "Quick 2-minute assessment",
      details: ["Personal/business information", "Healthcare needs analysis", "Budget preferences"],
    },
    {
      icon: Bot,
      title: "AI-Powered Matching",
      description: "Our AI analyzes 200+ insurance plans",
      details: [
        "Compares coverage options",
        "Considers your specific requirements",
        "Filters by budget and preferences",
      ],
    },
    {
      icon: BarChart3,
      title: "Compare & Choose",
      description: "Side-by-side plan comparison",
      details: ["Clear breakdown of benefits", "Real customer reviews", "Expert recommendations"],
    },
    {
      icon: CheckCircle,
      title: "Instant Enrollment",
      description: "Paperless application process",
      details: ["Real-time approval status", "Digital insurance cards", "Immediate access to network"],
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">From Search to Coverage in 4 Simple Steps</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="relative bg-white hover:shadow-lg transition-shadow border border-gray-200">
              <CardContent className="p-6">
                {/* Step Number */}
                <div
                  className="absolute -top-4 left-6 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>

                {/* Icon */}
                <div
                  className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4 mt-2">
                  <step.icon className="w-6 h-6 text-black" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-black mb-2">{step.title}</h3>
                <p className="text-gray-600 mb-4">{step.description}</p>

                <ul className="space-y-1">
                  {step.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="text-sm text-gray-500 flex items-center">
                      <div className="w-1 h-1 bg-black rounded-full mr-2"></div>
                      {detail}
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
