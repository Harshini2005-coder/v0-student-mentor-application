"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Users, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react"

const MENTOR_STUDENTS = {
  M001: [
    { id: "205631", name: "Aisha Khan", cgpa: 7.5894, attendance: 85, status: "Active" },
    { id: "201788", name: "Ahmed Hassan", cgpa: 5.1519, attendance: 72, status: "At Risk" },
  ],
  M002: [{ id: "217123", name: "Priya Sharma", cgpa: 6.3717, attendance: 92, status: "Active" }],
  M003: [{ id: "206206", name: "Raj Patel", cgpa: 6.9673, attendance: 78, status: "Active" }],
  M004: [{ id: "216037", name: "Emma Wilson", cgpa: 4.1262, attendance: 65, status: "At Risk" }],
}

const MENTOR_INFO = {
  M001: { name: "Dr. Rajesh Kumar", department: "CIVIL", experience: "12 years" },
  M002: { name: "Prof. Anita Singh", department: "ME", experience: "8 years" },
  M003: { name: "Dr. Vikram Patel", department: "BIO", experience: "10 years" },
  M004: { name: "Prof. Sarah Johnson", department: "ECE", experience: "6 years" },
}

export default function MentorDashboardOverview({ mentorId }: { mentorId: string }) {
  const students = MENTOR_STUDENTS[mentorId as keyof typeof MENTOR_STUDENTS] || []
  const mentor = MENTOR_INFO[mentorId as keyof typeof MENTOR_INFO]

  if (!mentor) return null

  const activeStudents = students.filter((s) => s.status === "Active").length
  const atRiskStudents = students.filter((s) => s.status === "At Risk").length
  const avgCGPA = students.length > 0 ? (students.reduce((sum, s) => sum + s.cgpa, 0) / students.length).toFixed(2) : 0
  const avgAttendance =
    students.length > 0 ? Math.round(students.reduce((sum, s) => sum + s.attendance, 0) / students.length) : 0

  return (
    <div className="space-y-6">
      {/* Mentor Info Card */}
      <Card className="border-2 border-secondary/20 bg-gradient-to-r from-secondary/5 to-secondary/10">
        <CardContent className="pt-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-secondary mb-1">{mentor.name}</h2>
              <p className="text-muted-foreground">{mentor.department} Department</p>
              <p className="text-sm text-muted-foreground mt-1">{mentor.experience} of mentoring experience</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-secondary">{students.length}</p>
              <p className="text-sm text-muted-foreground">Students Mentoring</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-4">
        {/* Total Students */}
        <Card className="border-2 border-secondary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Total Students</p>
              <Users className="w-4 h-4 text-secondary" />
            </div>
            <p className="text-3xl font-bold text-secondary">{students.length}</p>
            <p className="text-xs text-muted-foreground mt-1">Under your guidance</p>
          </CardContent>
        </Card>

        {/* Active Students */}
        <Card className="border-2 border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Active</p>
              <CheckCircle2 className="w-4 h-4 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-600">{activeStudents}</p>
            <p className="text-xs text-muted-foreground mt-1">Performing well</p>
          </CardContent>
        </Card>

        {/* At Risk Students */}
        <Card className="border-2 border-red-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">At Risk</p>
              <AlertCircle className="w-4 h-4 text-red-600" />
            </div>
            <p className="text-3xl font-bold text-red-600">{atRiskStudents}</p>
            <p className="text-xs text-muted-foreground mt-1">Need attention</p>
          </CardContent>
        </Card>

        {/* Average Performance */}
        <Card className="border-2 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Avg CGPA</p>
              <TrendingUp className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-blue-600">{avgCGPA}</p>
            <p className="text-xs text-muted-foreground mt-1">Class average</p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Overview */}
      <Card className="border-2 border-secondary/20">
        <CardHeader className="bg-gradient-to-r from-secondary/10 to-secondary/5">
          <CardTitle className="text-secondary">Class Performance Overview</CardTitle>
          <CardDescription>Aggregate metrics for your mentees</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Average CGPA</span>
              <span className="text-sm text-muted-foreground">{avgCGPA}/10</span>
            </div>
            <Progress value={(Number(avgCGPA) / 10) * 100} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Average Attendance</span>
              <span className="text-sm text-muted-foreground">{avgAttendance}%</span>
            </div>
            <Progress value={avgAttendance} className="h-2" />
          </div>

          <div className="grid md:grid-cols-3 gap-4 pt-4 border-t">
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Excellent Performers</p>
              <p className="text-lg font-semibold text-green-600">{students.filter((s) => s.cgpa >= 8.0).length}</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Average Performers</p>
              <p className="text-lg font-semibold text-yellow-600">
                {students.filter((s) => s.cgpa >= 6.0 && s.cgpa < 8.0).length}
              </p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Needs Improvement</p>
              <p className="text-lg font-semibold text-red-600">{students.filter((s) => s.cgpa < 6.0).length}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
