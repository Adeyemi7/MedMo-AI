"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: "How does MedMO AI make money?",
      answer:
        "We earn commissions from insurance providers when you enroll in a plan. This doesn't affect your premium costs.",
    },
    {
      question: "How much do insurance plans cost?",
      answer:
        "Insurance pricing varies by provider, coverage type, and individual factors. Our platform shows you real-time pricing from 50+ insurance companies so you can compare actual costs and find the best value for your needs.",
    },
    {
      question: "Can I switch insurance plans later?",
      answer: "Absolutely. We help you review and switch plans during renewal periods or qualifying life events.",
    },
    {
      question: "What if I need help with claims?",
      answer: "Our customer success team assists with claim submissions and follows up with insurance providers.",
    },
    {
      question: "Do you work with all insurance companies in Nigeria?",
      answer: "We partner with 50+ licensed insurance providers, covering 90% of available health insurance options.",
    },
    {
      question: "Is my personal information secure?",
      answer:
        "Yes, we use bank-grade encryption and are fully NDPR compliant. Your data is never sold to third parties.",
    },
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card
              key={index}
              className="border-2 border-gray-200 hover:border-gray-400 transition-colors">
              <CardContent className="p-0">
                <button
                  className="w-full p-6 text-left flex justify-between items-center"
                  onClick={() => toggleFAQ(index)}>
                  <h3 className="text-lg font-semibold text-black pr-4">{faq.question}</h3>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-black flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-black flex-shrink-0" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
