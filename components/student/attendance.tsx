"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const ATTENDANCE_DATA = [
  { week: "Week 1", attended: 4, total: 5, percentage: 80 },
  { week: "Week 2", attended: 5, total: 5, percentage: 100 },
  { week: "Week 3", attended: 3, total: 5, percentage: 60 },
  { week: "Week 4", attended: 4, total: 5, percentage: 80 },
  { week: "Week 5", attended: 5, total: 5, percentage: 100 },
]

export default function StudentAttendance({ studentId }: { studentId: string }) {
  const [attendanceData, setAttendanceData] = useState(ATTENDANCE_DATA)
  const [newAttendance, setNewAttendance] = useState({ attended: "", total: "" })

  const currentPercentage = (
    (attendanceData.reduce((sum, d) => sum + d.attended, 0) / attendanceData.reduce((sum, d) => sum + d.total, 0)) *
    100
  ).toFixed(1)

  const getConsistency = (percentage: number) => {
    if (percentage >= 85) return { level: "High", color: "text-green-600", bg: "bg-green-50" }
    if (percentage >= 70) return { level: "Medium", color: "text-yellow-600", bg: "bg-yellow-50" }
    return { level: "Low", color: "text-red-600", bg: "bg-red-50" }
  }

  const consistency = getConsistency(Number.parseFloat(currentPercentage))

  const handleAddAttendance = () => {
    if (newAttendance.attended && newAttendance.total) {
      const attended = Number.parseInt(newAttendance.attended)
      const total = Number.parseInt(newAttendance.total)
      const percentage = (attended / total) * 100

      setAttendanceData([
        ...attendanceData,
        {
          week: `Week ${attendanceData.length + 1}`,
          attended,
          total,
          percentage: Math.round(percentage),
        },
      ])
      setNewAttendance({ attended: "", total: "" })
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-2 border-primary/20">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
          <CardTitle className="text-primary">Attendance Tracking</CardTitle>
          <CardDescription>Monitor your attendance consistency and performance</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className={`p-4 rounded-lg ${consistency.bg}`}>
              <p className="text-sm text-muted-foreground mb-1">Current Attendance</p>
              <p className={`text-3xl font-bold ${consistency.color}`}>{currentPercentage}%</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Consistency Level</p>
              <p className={`text-3xl font-bold ${consistency.color}`}>{consistency.level}</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Classes Attended</p>
              <p className="text-3xl font-bold text-primary">
                {attendanceData.reduce((sum, d) => sum + d.attended, 0)}/
                {attendanceData.reduce((sum, d) => sum + d.total, 0)}
              </p>
            </div>
          </div>

          <div className="mb-6 p-4 bg-muted/50 rounded-lg">
            <h3 className="font-semibold mb-4">Add Attendance Record</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="attended">Classes Attended</Label>
                <Input
                  id="attended"
                  type="number"
                  placeholder="e.g., 4"
                  value={newAttendance.attended}
                  onChange={(e) => setNewAttendance({ ...newAttendance, attended: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="total">Total Classes</Label>
                <Input
                  id="total"
                  type="number"
                  placeholder="e.g., 5"
                  value={newAttendance.total}
                  onChange={(e) => setNewAttendance({ ...newAttendance, total: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div className="flex items-end">
                <Button onClick={handleAddAttendance} className="w-full bg-primary hover:bg-primary/90">
                  Add Record
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold mb-2">Why Your Attendance Matters</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Minimum 75% attendance required for eligibility</li>
              <li>• You can take up to 5 leaves and still maintain 75%</li>
              <li>• High attendance improves your academic performance</li>
              <li>• Consistent attendance qualifies you for fee discounts</li>
            </ul>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="percentage" stroke="#7c3aed" strokeWidth={2} name="Attendance %" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
