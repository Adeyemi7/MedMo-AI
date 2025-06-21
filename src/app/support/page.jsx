"use client"

import { Mail, MessageCircle, FileText, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MainLayout } from "@/components/main-layout"

const supportChannels = [
  {
    icon: Mail,
    title: "Email Support",
    description: "Get help via email within 24 hours",
    contact: "support@curacel.co",
    action: "Send Email",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Chat with our support team in real-time",
    contact: "Available 9 AM - 6 PM WAT",
    action: "Start Chat",
  },
  {
    icon: FileText,
    title: "Documentation",
    description: "Find answers in our comprehensive docs",
    contact: "API guides, tutorials, and examples",
    action: "Browse Docs",
  },
]

const faqs = [
  {
    question: "How do I get an API key?",
    answer:
      "You can request an API key by contacting our support team. We'll provide you with authentication credentials and help you get started.",
  },
  {
    question: "What insurance products are available?",
    answer:
      "We offer a wide range of insurance products including health, auto, life, travel, gadget protection, and more. Check our Products page for the complete list.",
  },
  {
    question: "Is there a rate limit on API calls?",
    answer:
      "Yes, we have rate limiting in place to ensure fair usage. The current limit is 1000 requests per hour per API key.",
  },
  {
    question: "How do I handle API errors?",
    answer:
      "Our API returns standard HTTP status codes. Check our documentation for detailed error handling guidelines and response formats.",
  },
]

export default function SupportPage() {
  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Support Center</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get the help you need to build amazing insurance applications. Our support team is here to assist you every
            step of the way.
          </p>
        </div>

        {/* Support Channels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {supportChannels.map((channel, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <channel.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>{channel.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-muted-foreground">{channel.description}</p>
                <p className="text-sm font-medium">{channel.contact}</p>
                <Button className="w-full">{channel.action}</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">First Name</label>
                  <Input placeholder="Enter your first name" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Last Name</label>
                  <Input placeholder="Enter your last name" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Email</label>
                <Input type="email" placeholder="Enter your email address" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Subject</label>
                <Input placeholder="What's this about?" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Message</label>
                <Textarea placeholder="Describe your issue or question in detail..." rows={5} />
              </div>
              <Button className="w-full">Send Message</Button>
            </CardContent>
          </Card>

          {/* FAQ */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Response Time */}
        <Card className="bg-muted">
          <CardContent className="flex items-center gap-4 p-6">
            <Clock className="h-8 w-8 text-primary" />
            <div>
              <h3 className="font-semibold">Response Times</h3>
              <p className="text-sm text-muted-foreground">
                Email: Within 24 hours • Live Chat: Immediate • Critical Issues: Within 4 hours
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
