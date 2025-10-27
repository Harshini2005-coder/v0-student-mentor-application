"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Download, AlertCircle, CheckCircle2, Clock, Plus, Trash2 } from "lucide-react"

const STUDENT_GRADES = {
  "205631": 7.5894,
  "217123": 6.3717,
  "206206": 6.9673,
  "216037": 4.1262,
  "201788": 5.1519,
}

export default function StudentFees({ studentId }: { studentId: string }) {
  const [feeData, setFeeData] = useState({
    baseFee: 50000,
    grade: STUDENT_GRADES[studentId as keyof typeof STUDENT_GRADES] || 6.5,
  })

  const [paymentHistory, setPaymentHistory] = useState([
    { id: 1, amount: 25000, date: "2025-09-15", status: "Completed", method: "Online Transfer" },
    { id: 2, amount: 25000, date: "2025-10-15", status: "Pending", method: "Credit Card" },
  ])

  const [newPayment, setNewPayment] = useState({ amount: "", date: "", method: "Online Transfer", status: "Pending" })
  const [showAddPayment, setShowAddPayment] = useState(false)

  const calculateDiscount = (grade: number) => {
    if (grade >= 8.0) return 0.25
    if (grade >= 7.0) return 0.15
    if (grade >= 6.0) return 0.1
    if (grade >= 5.0) return 0.05
    return 0
  }

  const discount = calculateDiscount(feeData.grade)
  const discountAmount = feeData.baseFee * discount
  const finalFee = feeData.baseFee - discountAmount
  const paidAmount = paymentHistory.filter((p) => p.status === "Completed").reduce((sum, p) => sum + p.amount, 0)
  const remainingAmount = finalFee - paidAmount

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPaymentStatus = () => {
    if (remainingAmount <= 0) return { label: "Paid", color: "text-green-600", icon: CheckCircle2 }
    if (remainingAmount > 0 && remainingAmount <= finalFee / 2)
      return { label: "Partially Paid", color: "text-yellow-600", icon: Clock }
    return { label: "Pending", color: "text-red-600", icon: AlertCircle }
  }

  const handleAddPayment = () => {
    if (newPayment.amount && newPayment.date) {
      const payment = {
        id: Math.max(...paymentHistory.map((p) => p.id), 0) + 1,
        amount: Number.parseInt(newPayment.amount),
        date: newPayment.date,
        status: newPayment.status,
        method: newPayment.method,
      }
      setPaymentHistory([...paymentHistory, payment])
      setNewPayment({ amount: "", date: "", method: "Online Transfer", status: "Pending" })
      setShowAddPayment(false)
    }
  }

  const handleDeletePayment = (id: number) => {
    setPaymentHistory(paymentHistory.filter((p) => p.id !== id))
  }

  const handleUpdatePaymentStatus = (id: number, newStatus: string) => {
    setPaymentHistory(paymentHistory.map((p) => (p.id === id ? { ...p, status: newStatus } : p)))
  }

  const paymentStatus = getPaymentStatus()
  const StatusIcon = paymentStatus.icon

  const discountBreakdown = [
    { name: "Base Fee", value: feeData.baseFee },
    { name: "Discount", value: discountAmount },
  ]

  const COLORS = ["#7c3aed", "#10b981"]

  return (
    <div className="space-y-6">
      {/* Fee Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="border-2 border-primary/20">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">Base Fee</p>
            <p className="text-2xl font-bold text-primary">₹{feeData.baseFee.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-200">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">Your Discount</p>
            <p className="text-2xl font-bold text-green-600">{(discount * 100).toFixed(0)}%</p>
            <p className="text-xs text-muted-foreground mt-1">-₹{discountAmount.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground mb-1">Final Fee</p>
            <p className="text-2xl font-bold text-blue-600">₹{finalFee.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className={`border-2 ${remainingAmount <= 0 ? "border-green-200" : "border-red-200"}`}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm text-muted-foreground">Status</p>
              <StatusIcon className={`w-4 h-4 ${paymentStatus.color}`} />
            </div>
            <p className={`text-2xl font-bold ${paymentStatus.color}`}>{paymentStatus.label}</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Fee Card */}
      <Card className="border-2 border-primary/20">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
          <CardTitle className="text-primary">Fee Management</CardTitle>
          <CardDescription>View your fees and grade-based discounts</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Fee Breakdown */}
            <div>
              <h3 className="font-semibold mb-4">Fee Breakdown</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span className="text-muted-foreground">Base Fee</span>
                  <span className="font-semibold">₹{feeData.baseFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-muted-foreground">Discount ({(discount * 100).toFixed(0)}%)</span>
                  <span className="font-semibold text-green-600">-₹{discountAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg border-2 border-primary">
                  <span className="font-semibold">Final Fee</span>
                  <span className="text-2xl font-bold text-primary">₹{finalFee.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold mb-3">Payment Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total Fee:</span>
                    <span className="font-semibold">₹{finalFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Paid Amount:</span>
                    <span className="font-semibold">₹{paidAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 text-red-600">
                    <span>Remaining:</span>
                    <span className="font-semibold">₹{remainingAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Discount Chart */}
            <div>
              <h3 className="font-semibold mb-4">Discount Visualization</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={discountBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ₹${value.toLocaleString()}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {COLORS.map((color, index) => (
                      <Cell key={`cell-${index}`} fill={color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Discount Tiers */}
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold mb-3">Discount Tiers</h3>
            <div className="grid md:grid-cols-4 gap-3 text-sm">
              <div className={`p-2 rounded ${feeData.grade >= 8.0 ? "bg-green-100" : "bg-gray-100"}`}>
                <p className="font-semibold">CGPA ≥ 8.0</p>
                <p className="text-xs">25% Discount</p>
              </div>
              <div
                className={`p-2 rounded ${feeData.grade >= 7.0 && feeData.grade < 8.0 ? "bg-green-100" : "bg-gray-100"}`}
              >
                <p className="font-semibold">CGPA ≥ 7.0</p>
                <p className="text-xs">15% Discount</p>
              </div>
              <div
                className={`p-2 rounded ${feeData.grade >= 6.0 && feeData.grade < 7.0 ? "bg-green-100" : "bg-gray-100"}`}
              >
                <p className="font-semibold">CGPA ≥ 6.0</p>
                <p className="text-xs">10% Discount</p>
              </div>
              <div
                className={`p-2 rounded ${feeData.grade >= 5.0 && feeData.grade < 6.0 ? "bg-green-100" : "bg-gray-100"}`}
              >
                <p className="font-semibold">CGPA ≥ 5.0</p>
                <p className="text-xs">5% Discount</p>
              </div>
            </div>
          </div>

          {/* Payment History */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Payment History</h3>
              <Button size="sm" variant="outline" onClick={() => setShowAddPayment(!showAddPayment)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Payment
              </Button>
            </div>

            {showAddPayment && (
              <div className="p-4 bg-muted rounded-lg mb-4 space-y-3">
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="amount" className="text-sm">
                      Amount (₹)
                    </Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter amount"
                      value={newPayment.amount}
                      onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="date" className="text-sm">
                      Date
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={newPayment.date}
                      onChange={(e) => setNewPayment({ ...newPayment, date: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="method" className="text-sm">
                      Payment Method
                    </Label>
                    <select
                      id="method"
                      className="w-full px-3 py-2 border border-border rounded-md bg-background"
                      value={newPayment.method}
                      onChange={(e) => setNewPayment({ ...newPayment, method: e.target.value })}
                    >
                      <option>Online Transfer</option>
                      <option>Credit Card</option>
                      <option>Debit Card</option>
                      <option>Cash</option>
                      <option>Cheque</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="status" className="text-sm">
                      Status
                    </Label>
                    <select
                      id="status"
                      className="w-full px-3 py-2 border border-border rounded-md bg-background"
                      value={newPayment.status}
                      onChange={(e) => setNewPayment({ ...newPayment, status: e.target.value })}
                    >
                      <option>Pending</option>
                      <option>Completed</option>
                      <option>Overdue</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90" onClick={handleAddPayment}>
                    Add Payment
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => setShowAddPayment(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {paymentHistory.map((payment) => (
                <div
                  key={payment.id}
                  className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors flex justify-between items-start"
                >
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold">₹{payment.amount.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">{payment.method}</p>
                      </div>
                      <Badge className={getStatusColor(payment.status)}>{payment.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{payment.date}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    {payment.status !== "Completed" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleUpdatePaymentStatus(payment.id, "Completed")}
                      >
                        Mark Done
                      </Button>
                    )}
                    <Button size="sm" variant="ghost" onClick={() => handleDeletePayment(payment.id)}>
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button className="flex-1 bg-primary hover:bg-primary/90">
              {remainingAmount > 0 ? "Pay Now" : "Download Receipt"}
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Download Invoice
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
