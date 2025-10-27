"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MentorStudents from "@/components/mentor/students"
import MentorMeetings from "@/components/mentor/meetings"
import MentorProjects from "@/components/mentor/projects"
import MentorPlacements from "@/components/mentor/placements"
import MentorFeeManagement from "@/components/mentor/fee-management"
import MentorChatbotAnalytics from "@/components/mentor/chatbot-analytics"
import MentorDashboardOverview from "@/components/mentor/dashboard-overview"

export default function MentorDashboard() {
  const [mentorId, setMentorId] = useState("")
  const router = useRouter()

  useEffect(() => {
    const id = localStorage.getItem("mentorId")
    const userType = localStorage.getItem("userType")
    if (!id || userType !== "mentor") {
      router.push("/mentor/signin")
    } else {
      setMentorId(id)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("mentorId")
    localStorage.removeItem("userType")
    router.push("/")
  }

  if (!mentorId) return null

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground p-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Mentor Dashboard</h1>
            <p className="text-secondary-foreground/80">ID: {mentorId}</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="bg-secondary-foreground text-secondary hover:bg-secondary-foreground/90"
          >
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <MentorDashboardOverview mentorId={mentorId} />

        <div className="mt-8">
          <Tabs defaultValue="students" className="w-full">
            <TabsList className="grid w-full grid-cols-6 mb-6">
              <TabsTrigger value="students">My Students</TabsTrigger>
              <TabsTrigger value="meetings">Meetings</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="fees">Fees</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="placements">Placements</TabsTrigger>
            </TabsList>

            <TabsContent value="students">
              <MentorStudents mentorId={mentorId} />
            </TabsContent>

            <TabsContent value="meetings">
              <MentorMeetings mentorId={mentorId} />
            </TabsContent>

            <TabsContent value="projects">
              <MentorProjects mentorId={mentorId} />
            </TabsContent>

            <TabsContent value="fees">
              <MentorFeeManagement mentorId={mentorId} />
            </TabsContent>

            <TabsContent value="analytics">
              <MentorChatbotAnalytics mentorId={mentorId} />
            </TabsContent>

            <TabsContent value="placements">
              <MentorPlacements mentorId={mentorId} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
