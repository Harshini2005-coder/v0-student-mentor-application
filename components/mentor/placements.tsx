"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Trash2, Users } from "lucide-react"

interface StudentApplication {
  studentId: string
  studentName: string
  status: "Applied" | "Shortlisted" | "Rejected" | "Accepted"
  appliedDate: string
}

interface Opportunity {
  id: number
  company: string
  position: string
  salary: string
  deadline: string
  description: string
  location: string
  type: "Internship" | "Placement"
  applications: StudentApplication[]
}

export default function MentorPlacements({ mentorId }: { mentorId: string }) {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([
    {
      id: 1,
      company: "Tech Corp",
      position: "Software Engineer",
      salary: "₹8,00,000",
      deadline: "2025-11-30",
      description: "Exciting opportunity for fresh graduates",
      location: "Bangalore",
      type: "Placement",
      applications: [
        { studentId: "205631", studentName: "Raj Kumar", status: "Applied", appliedDate: "2025-10-20" },
        { studentId: "206547", studentName: "Priya Singh", status: "Shortlisted", appliedDate: "2025-10-19" },
      ],
    },
    {
      id: 2,
      company: "Data Systems",
      position: "Data Analyst",
      salary: "₹6,50,000",
      deadline: "2025-12-05",
      description: "Work with cutting-edge analytics tools",
      location: "Mumbai",
      type: "Placement",
      applications: [{ studentId: "215709", studentName: "Amit Patel", status: "Applied", appliedDate: "2025-10-18" }],
    },
  ])

  const [newOpportunity, setNewOpportunity] = useState({
    company: "",
    position: "",
    salary: "",
    deadline: "",
    description: "",
    location: "",
    type: "Placement" as "Internship" | "Placement",
  })

  const [expandedOpp, setExpandedOpp] = useState<number | null>(null)

  const handleAddOpportunity = () => {
    if (newOpportunity.company && newOpportunity.position && newOpportunity.salary && newOpportunity.deadline) {
      setOpportunities([
        ...opportunities,
        {
          id: Math.max(...opportunities.map((o) => o.id), 0) + 1,
          company: newOpportunity.company,
          position: newOpportunity.position,
          salary: newOpportunity.salary,
          deadline: newOpportunity.deadline,
          description: newOpportunity.description,
          location: newOpportunity.location,
          type: newOpportunity.type,
          applications: [],
        },
      ])
      setNewOpportunity({
        company: "",
        position: "",
        salary: "",
        deadline: "",
        description: "",
        location: "",
        type: "Placement",
      })
    }
  }

  const handleDeleteOpportunity = (id: number) => {
    setOpportunities(opportunities.filter((opp) => opp.id !== id))
  }

  const handleUpdateApplicationStatus = (oppId: number, studentId: string, newStatus: string) => {
    setOpportunities(
      opportunities.map((opp) =>
        opp.id === oppId
          ? {
              ...opp,
              applications: opp.applications.map((app) =>
                app.studentId === studentId ? { ...app, status: newStatus as any } : app,
              ),
            }
          : opp,
      ),
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Applied":
        return "bg-blue-100 text-blue-700"
      case "Shortlisted":
        return "bg-yellow-100 text-yellow-700"
      case "Accepted":
        return "bg-green-100 text-green-700"
      case "Rejected":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-2 border-secondary/20">
        <CardHeader className="bg-gradient-to-r from-secondary/10 to-secondary/5">
          <CardTitle className="text-secondary">Internship & Placement Opportunities</CardTitle>
          <CardDescription>Post and manage job opportunities for your students</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="mb-6">
            <h3 className="font-semibold mb-4">Post New Opportunity</h3>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company">Company Name</Label>
                  <Input
                    id="company"
                    placeholder="Company name"
                    value={newOpportunity.company}
                    onChange={(e) => setNewOpportunity({ ...newOpportunity, company: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    placeholder="Job position"
                    value={newOpportunity.position}
                    onChange={(e) => setNewOpportunity({ ...newOpportunity, position: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="salary">Salary</Label>
                  <Input
                    id="salary"
                    placeholder="e.g., ₹8,00,000"
                    value={newOpportunity.salary}
                    onChange={(e) => setNewOpportunity({ ...newOpportunity, salary: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Bangalore"
                    value={newOpportunity.location}
                    onChange={(e) => setNewOpportunity({ ...newOpportunity, location: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <select
                    id="type"
                    value={newOpportunity.type}
                    onChange={(e) => setNewOpportunity({ ...newOpportunity, type: e.target.value as any })}
                    className="w-full mt-1 px-3 py-2 border border-border rounded-md"
                  >
                    <option>Internship</option>
                    <option>Placement</option>
                  </select>
                </div>
              </div>
              <div>
                <Label htmlFor="deadline">Application Deadline</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={newOpportunity.deadline}
                  onChange={(e) => setNewOpportunity({ ...newOpportunity, deadline: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Job description and requirements"
                  value={newOpportunity.description}
                  onChange={(e) => setNewOpportunity({ ...newOpportunity, description: e.target.value })}
                  className="mt-1"
                  rows={3}
                />
              </div>
              <Button onClick={handleAddOpportunity} className="w-full bg-secondary hover:bg-secondary/90">
                Post Opportunity
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Available Opportunities</h3>
            <div className="space-y-3">
              {opportunities.map((opp) => (
                <div key={opp.id} className="p-4 border border-border rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{opp.position}</h4>
                        <Badge variant="outline">{opp.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {opp.company} • {opp.location}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteOpportunity(opp.id)}
                      className="text-muted-foreground hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-sm text-muted-foreground mb-2">{opp.description}</p>
                  <div className="flex justify-between text-sm text-muted-foreground mb-3">
                    <span>{opp.salary}</span>
                    <span>Deadline: {opp.deadline}</span>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setExpandedOpp(expandedOpp === opp.id ? null : opp.id)}
                    className="w-full"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Applications ({opp.applications.length})
                  </Button>

                  {expandedOpp === opp.id && opp.applications.length > 0 && (
                    <div className="mt-4 space-y-2 border-t pt-4">
                      {opp.applications.map((app) => (
                        <div key={app.studentId} className="flex justify-between items-center p-2 bg-muted rounded">
                          <div>
                            <p className="font-sm font-semibold">{app.studentName}</p>
                            <p className="text-xs text-muted-foreground">Applied: {app.appliedDate}</p>
                          </div>
                          <select
                            value={app.status}
                            onChange={(e) => handleUpdateApplicationStatus(opp.id, app.studentId, e.target.value)}
                            className={`px-2 py-1 rounded text-sm ${getStatusColor(app.status)}`}
                          >
                            <option>Applied</option>
                            <option>Shortlisted</option>
                            <option>Accepted</option>
                            <option>Rejected</option>
                          </select>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
