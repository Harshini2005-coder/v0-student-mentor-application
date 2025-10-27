"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, CheckCircle2, Clock, TrendingUp } from "lucide-react"

const STUDENT_PROFILES = {
  "205631": {
    name: "Aisha Khan",
    cgpa: 7.5894,
    attendance: 85,
    department: "CIVIL",
    year: 3,
  },
  "217123": {
    name: "Priya Sharma",
    cgpa: 6.3717,
    attendance: 92,
    department: "ME",
    year: 2,
  },
  "206206": {
    name: "Raj Patel",
    cgpa: 6.9673,
    attendance: 78,
    department: "BIO",
    year: 3,
  },
  "216037": {
    name: "Emma Wilson",
    cgpa: 4.1262,
    attendance: 65,
    department: "ME",
    year: 2,
  },
  "201788": {
    name: "Ahmed Hassan",
    cgpa: 5.1519,
    attendance: 72,
    department: "ME",
    year: 3,
  },
}

export default function StudentDashboardOverview({ studentId }: { studentId: string }) {
  const profile = STUDENT_PROFILES[studentId as keyof typeof STUDENT_PROFILES]

  if (!profile) return null

  const getAttendanceStatus = (attendance: number) => {
    if (attendance >= 85) return { label: "Excellent", color: "text-green-600", bg: "bg-green-50" }
    if (attendance >= 75) return { label: "Good", color: "text-blue-600", bg: "bg-blue-50" }
    return { label: "At Risk", color: "text-red-600", bg: "bg-red-50" }
  }

  const getGradeStatus = (cgpa: number) => {
    if (cgpa >= 8.0) return { label: "Excellent", color: "text-green-600" }
    if (cgpa >= 7.0) return { label: "Good", color: "text-blue-600" }
    if (cgpa >= 6.0) return { label: "Average", color: "text-yellow-600" }
    return { label: "Needs Improvement", color: "text-red-600" }
  }

  const attendanceStatus = getAttendanceStatus(profile.attendance)
  const gradeStatus = getGradeStatus(profile.cgpa)

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-4 gap-4">
        {/* CGPA Card */}
        <Card className="border-2 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">CGPA</p>
              <TrendingUp className="w-4 h-4 text-primary" />
            </div>
            <p className={`text-3xl font-bold ${gradeStatus.color}`}>{profile.cgpa.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground mt-1">{gradeStatus.label}</p>
          </CardContent>
        </Card>

        {/* Attendance Card */}
        <Card className={`border-2 ${attendanceStatus.bg}`}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Attendance</p>
              <CheckCircle2 className={`w-4 h-4 ${attendanceStatus.color}`} />
            </div>
            <p className={`text-3xl font-bold ${attendanceStatus.color}`}>{profile.attendance}%</p>
            <p className="text-xs text-muted-foreground mt-1">{attendanceStatus.label}</p>
          </CardContent>
        </Card>

        {/* Department Card */}
        <Card className="border-2 border-secondary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Department</p>
              <Clock className="w-4 h-4 text-secondary" />
            </div>
            <p className="text-2xl font-bold text-secondary">{profile.department}</p>
            <p className="text-xs text-muted-foreground mt-1">Year {profile.year}</p>
          </CardContent>
        </Card>

        {/* Status Card */}
        <Card className="border-2 border-accent/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Status</p>
              <AlertCircle className="w-4 h-4 text-accent" />
            </div>
            <p className="text-2xl font-bold text-accent">Active</p>
            <p className="text-xs text-muted-foreground mt-1">In Good Standing</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Indicators */}
      <Card className="border-2 border-primary/20">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
          <CardTitle className="text-primary">Academic Progress</CardTitle>
          <CardDescription>Your performance metrics at a glance</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">CGPA Progress</span>
              <span className="text-sm text-muted-foreground">{profile.cgpa.toFixed(2)}/10</span>
            </div>
            <Progress value={(profile.cgpa / 10) * 100} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Attendance Rate</span>
              <span className="text-sm text-muted-foreground">{profile.attendance}%</span>
            </div>
            <Progress value={profile.attendance} className="h-2" />
          </div>

          <div className="grid md:grid-cols-2 gap-4 pt-4 border-t">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Minimum Attendance Required</p>
              <p className="text-lg font-semibold text-blue-600">75%</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Your Current Status</p>
              <p className="text-lg font-semibold text-green-600">
                {profile.attendance >= 75 ? "✓ Eligible" : "✗ At Risk"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
