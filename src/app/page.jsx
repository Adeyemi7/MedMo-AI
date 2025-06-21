"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Bot, Building2, Zap, ArrowRight, Play } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Left Column - Content (now centered) */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight">
                Find the Perfect Health Insurance Plan in{" "}
                <span className="text-gray-800">Minutes, Not Months</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                MedMO AI connects you to Nigeria's best insurance providers and
                HMOs. Compare plans, get personalized recommendations, and
                enroll instantly - all powered by artificial intelligence.
              </p>
            </div>

            {/* Hero Features */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h3 className="font-semibold text-black">
                    AI-Powered Matching
                  </h3>
                  <p className="text-sm text-gray-600">
                    Smart recommendations based on your needs
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h3 className="font-semibold text-black">Trusted Network</h3>
                  <p className="text-sm text-gray-600">
                    50+ insurance providers and HMOs
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h3 className="font-semibold text-black">
                    Instant Enrollment
                  </h3>
                  <p className="text-sm text-gray-600">
                    Get covered in under 10 minutes
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-black hover:bg-gray-800 text-white px-8 py-3"
              >
                Get My Insurance Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-black text-black hover:bg-gray-50 px-8 py-3"
              >
                <Play className="mr-2 h-5 w-5" />
                See How It Works
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">C</span>
                </div>
                <span className="text-sm text-gray-600">
                  Curacel AI Powered
                </span>
              </div>
              <div className="text-sm text-gray-600">
                500+ Companies Trust Us
              </div>
              <div className="text-sm text-gray-600">
                NAICOM Approved Partners
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
