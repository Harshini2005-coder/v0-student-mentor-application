"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const MENTOR_STUDENTS = {
  M001: [
    { id: "205631", name: "Aisha Khan", cgpa: 7.5894, baseFee: 50000, paid: 25000, status: "Partially Paid" },
    { id: "201788", name: "Ahmed Hassan", cgpa: 5.1519, baseFee: 50000, paid: 50000, status: "Paid" },
  ],
  M002: [{ id: "217123", name: "Priya Sharma", cgpa: 6.3717, baseFee: 50000, paid: 0, status: "Pending" }],
  M003: [{ id: "206206", name: "Raj Patel", cgpa: 6.9673, baseFee: 50000, paid: 25000, status: "Partially Paid" }],
  M004: [{ id: "216037", name: "Emma Wilson", cgpa: 4.1262, baseFee: 50000, paid: 0, status: "Pending" }],
}

export default function MentorFeeManagement({ mentorId }: { mentorId: string }) {
  const students = MENTOR_STUDENTS[mentorId as keyof typeof MENTOR_STUDENTS] || []

  const calculateDiscount = (cgpa: number) => {
    if (cgpa >= 8.0) return 0.25
    if (cgpa >= 7.0) return 0.15
    if (cgpa >= 6.0) return 0.1
    if (cgpa >= 5.0) return 0.05
    return 0
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800"
      case "Partially Paid":
        return "bg-yellow-100 text-yellow-800"
      case "Pending":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const chartData = students.map((s) => {
    const discount = calculateDiscount(s.cgpa)
    const finalFee = s.baseFee * (1 - discount)
    return {
      name: s.name.split(" ")[0],
      "Final Fee": finalFee,
      Paid: s.paid,
      Remaining: finalFee - s.paid,
    }
  })

  const totalFees = students.reduce((sum, s) => {
    const discount = calculateDiscount(s.cgpa)
    return sum + s.baseFee * (1 - discount)
  }, 0)

  const totalPaid = students.reduce((sum, s) => sum + s.paid, 0)
  const totalRemaining = totalFees - totalPaid

  const paidCount = students.filter((s) => s.status === "Paid").length
  const partialCount = students.filter((s) => s.status === "Partially Paid").length
  const pendingCount = students.filter((s) => s.status === "Pending").length

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="border-2 border-secondary/20">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">Total Fees</p>
            <p className="text-2xl font-bold text-secondary">₹{totalFees.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-200">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">Total Paid</p>
            <p className="text-2xl font-bold text-green-600">₹{totalPaid.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-red-200">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">Remaining</p>
            <p className="text-2xl font-bold text-red-600">₹{totalRemaining.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">Collection Rate</p>
            <p className="text-2xl font-bold text-blue-600">{((totalPaid / totalFees) * 100).toFixed(0)}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Fee Management Card */}
      <Card className="border-2 border-secondary/20">
        <CardHeader className="bg-gradient-to-r from-secondary/10 to-secondary/5">
          <CardTitle className="text-secondary">Fee Management</CardTitle>
          <CardDescription>Track student fee payments and discounts</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {/* Status Overview */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Fully Paid</p>
              <p className="text-3xl font-bold text-green-600">{paidCount}</p>
              <p className="text-xs text-muted-foreground mt-1">students</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Partially Paid</p>
              <p className="text-3xl font-bold text-yellow-600">{partialCount}</p>
              <p className="text-xs text-muted-foreground mt-1">students</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Pending</p>
              <p className="text-3xl font-bold text-red-600">{pendingCount}</p>
              <p className="text-xs text-muted-foreground mt-1">students</p>
            </div>
          </div>

          {/* Fee Chart */}
          <div className="mb-6">
            <h3 className="font-semibold mb-4">Student Fee Status</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                <Legend />
                <Bar dataKey="Final Fee" fill="#7c3aed" />
                <Bar dataKey="Paid" fill="#10b981" />
                <Bar dataKey="Remaining" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Student Fee Details */}
          <div>
            <h3 className="font-semibold mb-4">Student Fee Details</h3>
            <div className="space-y-3">
              {students.map((student) => {
                const discount = calculateDiscount(student.cgpa)
                const finalFee = student.baseFee * (1 - discount)
                const remaining = finalFee - student.paid

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
                      <Badge className={getStatusColor(student.status)}>{student.status}</Badge>
                    </div>

                    <div className="grid md:grid-cols-5 gap-3 text-sm">
                      <div>
                        <p className="text-muted-foreground">Base Fee</p>
                        <p className="font-semibold">₹{student.baseFee.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Discount</p>
                        <p className="font-semibold text-green-600">{(discount * 100).toFixed(0)}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Final Fee</p>
                        <p className="font-semibold">₹{finalFee.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Paid</p>
                        <p className="font-semibold text-green-600">₹{student.paid.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Remaining</p>
                        <p className={`font-semibold ${remaining > 0 ? "text-red-600" : "text-green-600"}`}>
                          ₹{remaining.toLocaleString()}
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
