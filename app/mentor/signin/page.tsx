"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

// Sample mentor data
const MENTORS = {
  M001: { name: "Dr. Rajesh Kumar", email: "rajesh@mentor.edu", department: "CIVIL" },
  M002: { name: "Prof. Anita Singh", email: "anita@mentor.edu", department: "ME" },
  M003: { name: "Dr. Vikram Patel", email: "vikram@mentor.edu", department: "BIO" },
  M004: { name: "Prof. Sarah Johnson", email: "sarah@mentor.edu", department: "ECE" },
}

export default function MentorSignIn() {
  const [mentorId, setMentorId] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!mentorId.trim()) {
      setError("Please enter your mentor ID")
      return
    }

    if (MENTORS[mentorId as keyof typeof MENTORS]) {
      localStorage.setItem("mentorId", mentorId)
      localStorage.setItem("userType", "mentor")
      router.push("/mentor/dashboard")
    } else {
      setError("Invalid mentor ID. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="border-2 border-secondary/30">
          <CardHeader className="bg-gradient-to-r from-secondary/10 to-secondary/5">
            <CardTitle className="text-secondary">Mentor Sign In</CardTitle>
            <CardDescription>Enter your mentor ID to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mentorId" className="text-foreground">
                  Mentor ID
                </Label>
                <Input
                  id="mentorId"
                  placeholder="e.g., M001"
                  value={mentorId}
                  onChange={(e) => setMentorId(e.target.value)}
                  className="border-2 border-border focus:border-secondary"
                />
              </div>

              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-md text-destructive text-sm">
                  {error}
                </div>
              )}

              <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                Sign In
              </Button>
            </form>

            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Demo Mentor IDs:</p>
              <div className="space-y-1 text-xs font-mono">
                {Object.entries(MENTORS)
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
