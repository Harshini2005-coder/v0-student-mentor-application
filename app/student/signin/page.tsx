"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

// Sample student data from the provided dataset
const STUDENTS = {
  "205631": { name: "Aisha Khan", email: "aisha@student.edu", department: "CIVIL" },
  "217123": { name: "Priya Sharma", email: "priya@student.edu", department: "ME" },
  "206206": { name: "Raj Patel", email: "raj@student.edu", department: "BIO" },
  "216037": { name: "Emma Wilson", email: "emma@student.edu", department: "ME" },
  "201788": { name: "Ahmed Hassan", email: "ahmed@student.edu", department: "ME" },
}

export default function StudentSignIn() {
  const [studentId, setStudentId] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!studentId.trim()) {
      setError("Please enter your student ID")
      return
    }

    if (STUDENTS[studentId as keyof typeof STUDENTS]) {
      localStorage.setItem("studentId", studentId)
      localStorage.setItem("userType", "student")
      router.push("/student/dashboard")
    } else {
      setError("Invalid student ID. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="border-2 border-primary/30">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
            <CardTitle className="text-primary">Student Sign In</CardTitle>
            <CardDescription>Enter your student ID to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="studentId" className="text-foreground">
                  Student ID
                </Label>
                <Input
                  id="studentId"
                  placeholder="e.g., 205631"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="border-2 border-border focus:border-primary"
                />
              </div>

              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-md text-destructive text-sm">
                  {error}
                </div>
              )}

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Sign In
              </Button>
            </form>

            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Demo Student IDs:</p>
              <div className="space-y-1 text-xs font-mono">
                {Object.entries(STUDENTS)
                  .slice(0, 3)
                  .map(([id, data]) => (
                    <div key={id} className="text-foreground">
                      {id} - {data.name}
                    </div>
                  ))}
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link href="/">
                <Button variant="outline" className="w-full bg-transparent">
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
