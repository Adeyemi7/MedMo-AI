import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight, Phone } from "lucide-react"

export default function FinalCTASection() {
  const benefits = [
    "Compare 200+ insurance plans instantly",
    "Get AI-powered personalized recommendations",
    "Access real-time pricing from 50+ providers",
    "Connect with 1,000+ healthcare providers",
    "Expert support throughout your journey",
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-black to-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Join 10,000+ Nigerians Who Found Better Health Insurance
        </h2>

        {/* Benefits Recap */}
        <div className="mb-12">
          <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center text-white">
                <CheckCircle className="w-5 h-5 text-gray-300 mr-3 flex-shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-white text-black hover:bg-gray-100 px-8 py-3">
            Get Started - It's Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-black px-8 py-3">
            <Phone className="mr-2 h-5 w-5" />
            Schedule a Consultation
          </Button>
          <Button
            size="lg"
            variant="ghost"
            className="text-white hover:bg-white/10 px-8 py-3">
            View All Products
          </Button>
        </div>

        <p className="text-gray-300 mt-6">No credit card required • Free consultation • Instant quotes</p>
      </div>
    </section>
  );
}
