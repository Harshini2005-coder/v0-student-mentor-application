"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"

const MENTOR_STUDENTS = {
  M001: [
    { id: "205631", name: "Aisha Khan", cgpa: 7.5894, attendance: 85, status: "Active" },
    { id: "201788", name: "Ahmed Hassan", cgpa: 5.1519, attendance: 72, status: "At Risk" },
  ],
  M002: [{ id: "217123", name: "Priya Sharma", cgpa: 6.3717, attendance: 92, status: "Active" }],
  M003: [{ id: "206206", name: "Raj Patel", cgpa: 6.9673, attendance: 78, status: "Active" }],
  M004: [{ id: "216037", name: "Emma Wilson", cgpa: 4.1262, attendance: 65, status: "At Risk" }],
}

export default function MentorChatbotAnalytics({ mentorId }: { mentorId: string }) {
  const students = MENTOR_STUDENTS[mentorId as keyof typeof MENTOR_STUDENTS] || []

  const performanceData = students.map((s) => ({
    name: s.name.split(" ")[0],
    CGPA: s.cgpa,
    Attendance: s.attendance,
  }))

  const riskAnalysis = [
    { category: "Excellent (≥8.0)", count: students.filter((s) => s.cgpa >= 8.0).length },
    { category: "Good (7.0-7.9)", count: students.filter((s) => s.cgpa >= 7.0 && s.cgpa < 8.0).length },
    { category: "Average (6.0-6.9)", count: students.filter((s) => s.cgpa >= 6.0 && s.cgpa < 7.0).length },
    { category: "Below Avg (<6.0)", count: students.filter((s) => s.cgpa < 6.0).length },
  ]

  const avgCGPA = students.length > 0 ? (students.reduce((sum, s) => sum + s.cgpa, 0) / students.length).toFixed(2) : 0
  const avgAttendance =
    students.length > 0 ? Math.round(students.reduce((sum, s) => sum + s.attendance, 0) / students.length) : 0
  const atRiskCount = students.filter((s) => s.status === "At Risk").length

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="border-2 border-secondary/20">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">Class Average CGPA</p>
            <p className="text-3xl font-bold text-secondary">{avgCGPA}</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">Avg Attendance</p>
            <p className="text-3xl font-bold text-blue-600">{avgAttendance}%</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-200">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">Performing Well</p>
            <p className="text-3xl font-bold text-green-600">{students.filter((s) => s.status === "Active").length}</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-red-200">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">Need Attention</p>
            <p className="text-3xl font-bold text-red-600">{atRiskCount}</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics Card */}
      <Card className="border-2 border-secondary/20">
        <CardHeader className="bg-gradient-to-r from-secondary/10 to-secondary/5">
          <CardTitle className="text-secondary">AI-Powered Analytics</CardTitle>
          <CardDescription>Data-driven insights for your mentees</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {/* Performance Chart */}
          <div className="mb-8">
            <h3 className="font-semibold mb-4">Student Performance Metrics</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="CGPA" fill="#7c3aed" />
                <Bar dataKey="Attendance" fill="#06b6d4" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Risk Distribution */}
          <div className="mb-8">
            <h3 className="font-semibold mb-4">Performance Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={riskAnalysis}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#7c3aed" strokeWidth={2} name="Number of Students" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Detailed Student Analysis */}
          <div>
            <h3 className="font-semibold mb-4">Individual Student Analysis</h3>
            <div className="space-y-3">
              {students.map((student) => {
                const performanceLevel =
                  student.cgpa >= 8.0
                    ? "Excellent"
                    : student.cgpa >= 7.0
                      ? "Good"
                      : student.cgpa >= 6.0
                        ? "Average"
                        : "Below Average"
                const attendanceLevel =
                  student.attendance >= 85 ? "Excellent" : student.attendance >= 75 ? "Good" : "At Risk"

                return (
                  <div
                    key={student.id}
                    className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold">{student.name}</h4>
                        <p className="text-sm text-muted-foreground">ID: {student.id}</p>
                      </div>
                      <Badge
                        className={
                          student.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }
                      >
                        {student.status}
                      </Badge>
                    </div>

                    <div className="grid md:grid-cols-4 gap-3 text-sm">
                      <div>
                        <p className="text-muted-foreground">CGPA</p>
                        <p className="font-semibold">{student.cgpa.toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground">{performanceLevel}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Attendance</p>
                        <p className="font-semibold">{student.attendance}%</p>
                        <p className="text-xs text-muted-foreground">{attendanceLevel}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Recommendation</p>
                        <p className="text-xs font-semibold">
                          {student.cgpa < 6.0
                            ? "Intensive Support"
                            : student.attendance < 75
                              ? "Attendance Focus"
                              : "Maintain Progress"}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Next Action</p>
                        <p className="text-xs font-semibold">
                          {student.cgpa < 6.0
                            ? "Schedule Meeting"
                            : student.attendance < 75
                              ? "Follow Up"
                              : "Encourage"}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
