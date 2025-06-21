import { Card, CardContent } from "@/components/ui/card"

export default function ProblemSolutionSection() {
  const stats = [
    { value: "70%", label: "of small businesses can't afford group insurance" },
    { value: "₦2.5M", label: "average cost of major medical treatment" },
    { value: "85%", label: "of Nigerians lack adequate health coverage" },
    { value: "45 days", label: "average time to process manual insurance applications" },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Problem Statement */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            Healthcare Costs Are Rising, But Access to Quality Insurance Remains Limited
          </h2>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="text-center p-6 border-2 border-gray-200 hover:border-gray-400 transition-colors">
              <CardContent className="p-0">
                <div className="text-3xl md:text-4xl font-bold text-black mb-2">{stat.value}</div>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Solution Statement */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            MedMO AI Bridges the Gap Between You and <span className="text-gray-800">Quality Healthcare Coverage</span>
          </h2>
        </div>
      </div>
    </section>
  );
}
