"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Calendar, DollarSign, MapPin, CheckCircle2, Clock, XCircle } from "lucide-react"

interface Opportunity {
  id: number
  company: string
  position: string
  salary: string
  deadline: string
  description: string
  location: string
  type: "Internship" | "Placement"
}

interface Application {
  opportunityId: number
  status: "Applied" | "Shortlisted" | "Rejected" | "Accepted"
  appliedDate: string
}

export default function StudentInternships({ studentId }: { studentId: string }) {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([
    {
      id: 1,
      company: "Tech Corp",
      position: "Software Engineer",
      salary: "₹8,00,000",
      deadline: "2025-11-30",
      description: "Exciting opportunity for fresh graduates to work on cutting-edge technologies",
      location: "Bangalore",
      type: "Placement",
    },
    {
      id: 2,
      company: "Data Systems",
      position: "Data Analyst",
      salary: "₹6,50,000",
      deadline: "2025-12-05",
      description: "Work with cutting-edge analytics tools and real-world datasets",
      location: "Mumbai",
      type: "Placement",
    },
    {
      id: 3,
      company: "StartUp Labs",
      position: "Frontend Developer Intern",
      salary: "₹20,000/month",
      deadline: "2025-11-15",
      description: "3-month internship to build modern web applications",
      location: "Remote",
      type: "Internship",
    },
    {
      id: 4,
      company: "Cloud Solutions",
      position: "DevOps Engineer",
      salary: "₹7,50,000",
      deadline: "2025-12-10",
      description: "Join our team to manage cloud infrastructure and deployment pipelines",
      location: "Hyderabad",
      type: "Placement",
    },
  ])

  const [applications, setApplications] = useState<Application[]>([
    { opportunityId: 1, status: "Applied", appliedDate: "2025-10-20" },
    { opportunityId: 3, status: "Shortlisted", appliedDate: "2025-10-18" },
  ])

  const [filter, setFilter] = useState<"all" | "internship" | "placement">("all")

  const handleApply = (opportunityId: number) => {
    if (!applications.find((app) => app.opportunityId === opportunityId)) {
      setApplications([
        ...applications,
        {
          opportunityId,
          status: "Applied",
          appliedDate: new Date().toISOString().split("T")[0],
        },
      ])
    }
  }

  const getApplicationStatus = (opportunityId: number) => {
    return applications.find((app) => app.opportunityId === opportunityId)
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Applied":
        return <Clock className="w-4 h-4" />
      case "Shortlisted":
        return <CheckCircle2 className="w-4 h-4" />
      case "Accepted":
        return <CheckCircle2 className="w-4 h-4" />
      case "Rejected":
        return <XCircle className="w-4 h-4" />
      default:
        return null
    }
  }

  const filteredOpportunities =
    filter === "all" ? opportunities : opportunities.filter((opp) => opp.type.toLowerCase() === filter)

  const appliedCount = applications.length
  const acceptedCount = applications.filter((app) => app.status === "Accepted").length

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">{appliedCount}</p>
              <p className="text-sm text-muted-foreground">Applications Sent</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">{acceptedCount}</p>
              <p className="text-sm text-muted-foreground">Offers Received</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">{opportunities.length}</p>
              <p className="text-sm text-muted-foreground">Opportunities Available</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Opportunities Section */}
      <Card className="border-2 border-primary/20">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
          <CardTitle className="text-primary flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            Internship & Placement Opportunities
          </CardTitle>
          <CardDescription>Browse and apply to opportunities posted by your mentor</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="mb-6 flex gap-2">
            <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
              All ({opportunities.length})
            </Button>
            <Button
              variant={filter === "internship" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("internship")}
            >
              Internships ({opportunities.filter((o) => o.type === "Internship").length})
            </Button>
            <Button
              variant={filter === "placement" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("placement")}
            >
              Placements ({opportunities.filter((o) => o.type === "Placement").length})
            </Button>
          </div>

          <div className="space-y-4">
            {filteredOpportunities.map((opp) => {
              const appStatus = getApplicationStatus(opp.id)
              return (
                <div key={opp.id} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-lg">{opp.position}</h4>
                        <Badge variant="outline">{opp.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{opp.company}</p>
                    </div>
                    {appStatus && (
                      <div
                        className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${getStatusColor(appStatus.status)}`}
                      >
                        {getStatusIcon(appStatus.status)}
                        {appStatus.status}
                      </div>
                    )}
                  </div>

                  <p className="text-sm text-foreground mb-3">{opp.description}</p>

                  <div className="grid md:grid-cols-4 gap-3 mb-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <DollarSign className="w-4 h-4" />
                      <span>{opp.salary}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{opp.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Deadline: {opp.deadline}</span>
                    </div>
                  </div>

                  {!appStatus ? (
                    <Button onClick={() => handleApply(opp.id)} className="w-full bg-primary hover:bg-primary/90">
                      Apply Now
                    </Button>
                  ) : (
                    <Button disabled className="w-full">
                      Already Applied
                    </Button>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Applications Tracking */}
      {applications.length > 0 && (
        <Card className="border-2 border-primary/20">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
            <CardTitle className="text-primary">Your Applications</CardTitle>
            <CardDescription>Track the status of your applications</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {applications.map((app) => {
                const opp = opportunities.find((o) => o.id === app.opportunityId)
                return (
                  <div key={app.opportunityId} className="p-4 border border-border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{opp?.position}</h4>
                        <p className="text-sm text-muted-foreground">{opp?.company}</p>
                        <p className="text-xs text-muted-foreground mt-1">Applied: {app.appliedDate}</p>
                      </div>
                      <div
                        className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${getStatusColor(app.status)}`}
                      >
                        {getStatusIcon(app.status)}
                        {app.status}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
