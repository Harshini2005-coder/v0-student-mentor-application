"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import StudentAttendance from "@/components/student/attendance"
import StudentFees from "@/components/student/fees"
import StudentMentor from "@/components/student/mentor"
import StudentNotes from "@/components/student/notes"
import StudentChatbot from "@/components/student/chatbot"
import StudentProfile from "@/components/student/profile"
import StudentDashboardOverview from "@/components/student/dashboard-overview"
import NotificationsCenter from "@/components/notifications-center"

export default function StudentDashboard() {
  const [studentId, setStudentId] = useState("")
  const router = useRouter()

  useEffect(() => {
    const id = localStorage.getItem("studentId")
    const userType = localStorage.getItem("userType")
    if (!id || userType !== "student") {
      router.push("/student/signin")
    } else {
      setStudentId(id)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("studentId")
    localStorage.removeItem("userType")
    router.push("/")
  }

  if (!studentId) return null

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Student Dashboard</h1>
            <p className="text-primary-foreground/80">ID: {studentId}</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          >
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <StudentDashboardOverview studentId={studentId} />

        <div className="mt-8">
          <NotificationsCenter />
        </div>

        <div className="mt-8">
          <Tabs defaultValue="attendance" className="w-full">
            <TabsList className="grid w-full grid-cols-6 mb-6">
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
              <TabsTrigger value="fees">Fees</TabsTrigger>
              <TabsTrigger value="mentor">Mentor</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="chatbot">AI Chat</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            <TabsContent value="attendance">
              <StudentAttendance studentId={studentId} />
            </TabsContent>

            <TabsContent value="fees">
              <StudentFees studentId={studentId} />
            </TabsContent>

            <TabsContent value="mentor">
              <StudentMentor studentId={studentId} />
            </TabsContent>

            <TabsContent value="notes">
              <StudentNotes studentId={studentId} />
            </TabsContent>

            <TabsContent value="chatbot">
              <StudentChatbot studentId={studentId} />
            </TabsContent>

            <TabsContent value="profile">
              <StudentProfile studentId={studentId} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
