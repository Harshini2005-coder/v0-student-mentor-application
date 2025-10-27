"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-primary mb-4">LearnAxis</h1>
          <p className="text-xl text-muted-foreground">Empowering academic excellence through mentorship</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-2 border-primary/20 hover:border-primary/50 transition-colors">
            <CardHeader>
              <CardTitle className="text-primary">Student Portal</CardTitle>
              <CardDescription>Track your progress and connect with mentors</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-6">
                Access your attendance, fees, assignments, and communicate with your mentor in one place.
              </p>
              <Link href="/student/signin">
                <Button className="w-full bg-primary hover:bg-primary/90">Sign In as Student</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-2 border-secondary/20 hover:border-secondary/50 transition-colors">
            <CardHeader>
              <CardTitle className="text-secondary">Mentor Portal</CardTitle>
              <CardDescription>Guide and support your mentees</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-6">
                Manage your students, schedule meetings, assign projects, and track their progress.
              </p>
              <Link href="/mentor/signin">
                <Button className="w-full bg-secondary hover:bg-secondary/90">Sign In as Mentor</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
