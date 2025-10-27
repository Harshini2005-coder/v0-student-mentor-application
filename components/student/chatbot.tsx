"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sparkles, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react"

const STUDENT_DATA = {
  "205631": { name: "Aisha Khan", cgpa: 7.5894, attendance: 85, department: "CIVIL", year: 3 },
  "217123": { name: "Priya Sharma", cgpa: 6.3717, attendance: 92, department: "ME", year: 2 },
  "206206": { name: "Raj Patel", cgpa: 6.9673, attendance: 78, department: "BIO", year: 3 },
}

const SUGGESTED_QUESTIONS = [
  "How is my academic performance?",
  "What's my attendance status?",
  "Am I eligible for fee discount?",
  "What internships can I apply for?",
  "How can I improve my grades?",
  "When is my next meeting with mentor?",
]

export default function StudentChatbot({ studentId }: { studentId: string }) {
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string; timestamp: string }>>([
    {
      role: "assistant",
      content:
        "Hello! I'm your AI Academic Assistant. I can help you with questions about your academic performance, attendance, fees, career guidance, and more. What would you like to know?",
      timestamp: new Date().toLocaleTimeString(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const studentData = STUDENT_DATA[studentId as keyof typeof STUDENT_DATA]

  const generateResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase()

    // Performance Analysis
    if (lowerQuery.includes("performance") || lowerQuery.includes("academic")) {
      const performanceLevel =
        studentData.cgpa >= 8.0 ? "excellent" : studentData.cgpa >= 7.0 ? "good" : "needs improvement"
      return `Your academic performance is ${performanceLevel}. Your current CGPA is ${studentData.cgpa.toFixed(2)}/10. ${
        studentData.cgpa >= 8.0
          ? "Keep up the excellent work! You're performing exceptionally well."
          : studentData.cgpa >= 7.0
            ? "You're doing well! Consider focusing on challenging subjects to improve further."
            : "There's room for improvement. I recommend discussing with your mentor about study strategies."
      }`
    }

    // Attendance Analysis
    if (lowerQuery.includes("attendance")) {
      const attendanceStatus =
        studentData.attendance >= 85 ? "excellent" : studentData.attendance >= 75 ? "good" : "at risk"
      return `Your attendance is ${attendanceStatus} at ${studentData.attendance}%. ${
        studentData.attendance >= 85
          ? "Excellent! You're well above the minimum requirement."
          : studentData.attendance >= 75
            ? "You're meeting the minimum requirement. Try to maintain or improve this."
            : "Your attendance is below the minimum 75% requirement. Please attend more classes to maintain eligibility."
      }`
    }

    // Fee & Discount Analysis
    if (lowerQuery.includes("fee") || lowerQuery.includes("discount")) {
      const discountPercentage =
        studentData.cgpa >= 8.0 ? 25 : studentData.cgpa >= 7.0 ? 15 : studentData.cgpa >= 6.0 ? 10 : 5
      const baseFee = 50000
      const discount = (baseFee * discountPercentage) / 100
      const finalFee = baseFee - discount
      return `Based on your CGPA of ${studentData.cgpa.toFixed(2)}, you're eligible for a ${discountPercentage}% fee discount. Base fee: ₹${baseFee.toLocaleString()}, Discount: ₹${discount.toLocaleString()}, Final fee: ₹${finalFee.toLocaleString()}.`
    }

    // Career & Internship Analysis
    if (lowerQuery.includes("internship") || lowerQuery.includes("placement") || lowerQuery.includes("career")) {
      const eligible = studentData.cgpa >= 6.0
      return `${
        eligible
          ? `Great news! With your CGPA of ${studentData.cgpa.toFixed(2)}, you're eligible for internship opportunities. Check the Placements section for available opportunities that match your department (${studentData.department}).`
          : `Your current CGPA is ${studentData.cgpa.toFixed(2)}. Most internships require a minimum CGPA of 6.0. Focus on improving your grades to become eligible for better opportunities.`
      }`
    }

    // Mentor & Meeting
    if (lowerQuery.includes("mentor") || lowerQuery.includes("meeting")) {
      return `Your assigned mentor can provide personalized guidance. You can schedule meetings through the Mentor section of your dashboard. Regular meetings help with academic planning and career guidance.`
    }

    // Study Recommendations
    if (lowerQuery.includes("improve") || lowerQuery.includes("study") || lowerQuery.includes("help")) {
      return `Here are my recommendations: 1) Maintain consistent attendance (aim for 90%+), 2) Schedule regular meetings with your mentor, 3) Complete assignments on time, 4) Join study groups with classmates, 5) Use the notes section to track important concepts. Would you like specific advice on any of these?`
    }

    // General greeting
    if (lowerQuery.includes("hello") || lowerQuery.includes("hi") || lowerQuery.includes("hey")) {
      return `Hello ${studentData.name}! I'm here to help you with your academic journey. Feel free to ask me about your performance, attendance, fees, career opportunities, or any other academic concerns.`
    }

    // Default response
    return `I understand you're asking about "${query}". Based on your academic data, I can help with questions about your performance (CGPA: ${studentData.cgpa.toFixed(2)}/10), attendance (${studentData.attendance}%), fees, mentor guidance, projects, and career opportunities. What specific information would you like?`
  }

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage = input
    setMessages((prev) => [...prev, { role: "user", content: userMessage, timestamp: new Date().toLocaleTimeString() }])
    setInput("")
    setIsLoading(true)

    // Simulate AI processing delay
    setTimeout(() => {
      const response = generateResponse(userMessage)
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response, timestamp: new Date().toLocaleTimeString() },
      ])
      setIsLoading(false)
    }, 800)
  }

  const handleSuggestedQuestion = (question: string) => {
    setInput(question)
  }

  return (
    <div className="space-y-6">
      <Card className="border-2 border-primary/20 h-[700px] flex flex-col">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <div>
              <CardTitle className="text-primary">AI Academic Assistant</CardTitle>
              <CardDescription>Intelligent guidance powered by data analysis</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6 flex-1 flex flex-col">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs px-4 py-3 rounded-lg ${
                    msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p className="text-xs opacity-70 mt-1">{msg.timestamp}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted text-foreground px-4 py-3 rounded-lg">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Suggested Questions */}
          {messages.length <= 1 && (
            <div className="mb-4 p-3 bg-muted/50 rounded-lg">
              <p className="text-xs font-semibold text-muted-foreground mb-2">Suggested Questions:</p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_QUESTIONS.slice(0, 3).map((q, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSuggestedQuestion(q)}
                    className="text-xs h-auto py-1"
                  >
                    {q}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="flex gap-2">
            <Input
              placeholder="Ask me anything about your academics..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              disabled={isLoading}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={isLoading} className="bg-primary hover:bg-primary/90">
              Send
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="border-2 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">CGPA Status</p>
                <p className="text-2xl font-bold text-primary">{studentData.cgpa.toFixed(2)}</p>
              </div>
              <TrendingUp className={`w-8 h-8 ${studentData.cgpa >= 7.0 ? "text-green-600" : "text-yellow-600"}`} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Attendance</p>
                <p className="text-2xl font-bold text-primary">{studentData.attendance}%</p>
              </div>
              <CheckCircle2 className={`w-8 h-8 ${studentData.attendance >= 75 ? "text-green-600" : "text-red-600"}`} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Eligibility</p>
                <p className="text-2xl font-bold text-primary">
                  {studentData.cgpa >= 6.0 && studentData.attendance >= 75 ? "✓ Good" : "⚠ Check"}
                </p>
              </div>
              <AlertCircle
                className={`w-8 h-8 ${studentData.cgpa >= 6.0 && studentData.attendance >= 75 ? "text-green-600" : "text-yellow-600"}`}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
