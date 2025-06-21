import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "MedMO AI helped me provide health insurance for my 15 employees at 40% less cost than traditional brokers. The enrollment process was seamless.",
      author: "Adebayo O.",
      role: "Tech Startup Founder, Lagos",
      rating: 5,
    },
    {
      quote:
        "When I was diagnosed with diabetes, MedMO AI's recommended plan covered everything. I saved over ₦500,000 in medical bills last year.",
      author: "Sarah M.",
      role: "Freelance Designer, Abuja",
      rating: 5,
    },
    {
      quote:
        "Finding family coverage that included maternity benefits used to be impossible. MedMO AI found us the perfect plan in 5 minutes.",
      author: "The Okafor Family",
      role: "Small Business Owners, Port Harcourt",
      rating: 5,
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Real Stories from Real Customers</h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-gray-50 border border-gray-200">
              <CardContent className="p-8">
                {/* Rating Stars */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-black fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-gray-700 mb-6 italic">"{testimonial.quote}"</blockquote>

                {/* Author */}
                <div>
                  <div className="font-semibold text-black">{testimonial.author}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
