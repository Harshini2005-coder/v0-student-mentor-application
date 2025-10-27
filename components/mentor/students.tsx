"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const MENTOR_STUDENTS = {
  M001: [
    { id: "205631", name: "Aisha Khan", cgpa: 7.5894, attendance: 85, status: "Active" },
    { id: "201788", name: "Ahmed Hassan", cgpa: 5.1519, attendance: 72, status: "At Risk" },
  ],
  M002: [{ id: "217123", name: "Priya Sharma", cgpa: 6.3717, attendance: 92, status: "Active" }],
  M003: [{ id: "206206", name: "Raj Patel", cgpa: 6.9673, attendance: 78, status: "Active" }],
  M004: [{ id: "216037", name: "Emma Wilson", cgpa: 4.1262, attendance: 65, status: "At Risk" }],
}

export default function MentorStudents({ mentorId }: { mentorId: string }) {
  const students = MENTOR_STUDENTS[mentorId as keyof typeof MENTOR_STUDENTS] || []
  const [selectedStudent, setSelectedStudent] = useState<(typeof students)[0] | null>(null)
  const [guidance, setGuidance] = useState("")
  const [guidanceHistory, setGuidanceHistory] = useState<Array<{ studentId: string; message: string; date: string }>>(
    [],
  )

  const handleSendGuidance = () => {
    if (guidance.trim() && selectedStudent) {
      setGuidanceHistory([
        ...guidanceHistory,
        {
          studentId: selectedStudent.id,
          message: guidance,
          date: new Date().toLocaleDateString(),
        },
      ])
      setGuidance("")
    }
  }

  const getStatusColor = (status: string) => {
    return status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
  }

  const getPerformanceColor = (cgpa: number) => {
    if (cgpa >= 8.0) return "text-green-600"
    if (cgpa >= 7.0) return "text-blue-600"
    if (cgpa >= 6.0) return "text-yellow-600"
    return "text-red-600"
  }

  const chartData = students.map((s) => ({
    name: s.name.split(" ")[0],
    CGPA: s.cgpa,
    Attendance: s.attendance,
  }))

  return (
    <div className="space-y-6">
      <Card className="border-2 border-secondary/20">
        <CardHeader className="bg-gradient-to-r from-secondary/10 to-secondary/5">
          <CardTitle className="text-secondary">My Students</CardTitle>
          <CardDescription>Track and guide your assigned students</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-4">Students List ({students.length})</h3>
              <div className="space-y-3">
                {students.map((student) => (
                  <div
                    key={student.id}
                    onClick={() => setSelectedStudent(student)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      selectedStudent?.id === student.id
                        ? "border-secondary bg-secondary/10"
                        : "border-border hover:border-secondary/50"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">{student.name}</h4>
                      <Badge className={getStatusColor(student.status)}>{student.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">ID: {student.id}</p>
                    <div className="flex justify-between text-sm">
                      <span className={`font-semibold ${getPerformanceColor(student.cgpa)}`}>
                        CGPA: {student.cgpa.toFixed(2)}
                      </span>
                      <span className="text-muted-foreground">Attendance: {student.attendance}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              {selectedStudent ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-4">Send Guidance to {selectedStudent.name}</h3>
                    <div className="p-4 bg-muted rounded-lg mb-4">
                      <p className="text-sm text-muted-foreground mb-3">Student Details</p>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Name:</span>
                          <span className="font-semibold">{selectedStudent.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">CGPA:</span>
                          <span className={`font-semibold ${getPerformanceColor(selectedStudent.cgpa)}`}>
                            {selectedStudent.cgpa.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Attendance:</span>
                          <span className="font-semibold">{selectedStudent.attendance}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Status:</span>
                          <Badge className={getStatusColor(selectedStudent.status)}>{selectedStudent.status}</Badge>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="guidance">Guidance & Suggestions</Label>
                      <Textarea
                        id="guidance"
                        placeholder="Provide guidance, suggestions, or feedback..."
                        value={guidance}
                        onChange={(e) => setGuidance(e.target.value)}
                        className="mt-1"
                        rows={5}
                      />
                    </div>
                    <Button onClick={handleSendGuidance} className="w-full mt-4 bg-secondary hover:bg-secondary/90">
                      Send Guidance
                    </Button>
                  </div>

                  {/* Guidance History */}
                  {guidanceHistory.filter((g) => g.studentId === selectedStudent.id).length > 0 && (
                    <div className="mt-6 pt-6 border-t">
                      <h4 className="font-semibold mb-3">Guidance History</h4>
                      <div className="space-y-3 max-h-48 overflow-y-auto">
                        {guidanceHistory
                          .filter((g) => g.studentId === selectedStudent.id)
                          .map((item, idx) => (
                            <div key={idx} className="p-3 bg-muted rounded-lg text-sm">
                              <p className="text-muted-foreground mb-1">{item.date}</p>
                              <p className="text-foreground">{item.message}</p>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-4 bg-muted rounded-lg text-center text-muted-foreground h-full flex items-center justify-center">
                  Select a student to send guidance
                </div>
              )}
            </div>
          </div>

          {/* Performance Chart */}
          {students.length > 0 && (
            <div className="mt-8 pt-8 border-t">
              <h3 className="font-semibold mb-4">Student Performance Comparison</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
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
          )}
        </CardContent>
      </Card>
    </div>
  )
}
