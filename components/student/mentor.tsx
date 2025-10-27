"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, MessageSquare } from "lucide-react"

const MENTOR_ASSIGNMENTS = {
  "205631": { id: "M001", name: "Dr. Rajesh Kumar", email: "rajesh@mentor.edu", phone: "+91-9876543200" },
  "217123": { id: "M002", name: "Prof. Anita Singh", email: "anita@mentor.edu", phone: "+91-9876543201" },
  "206206": { id: "M003", name: "Dr. Vikram Patel", email: "vikram@mentor.edu", phone: "+91-9876543202" },
  "216037": { id: "M004", name: "Prof. Sarah Johnson", email: "sarah@mentor.edu", phone: "+91-9876543203" },
  "201788": { id: "M001", name: "Dr. Rajesh Kumar", email: "rajesh@mentor.edu", phone: "+91-9876543200" },
}

export default function StudentMentor({ studentId }: { studentId: string }) {
  const mentor = MENTOR_ASSIGNMENTS[studentId as keyof typeof MENTOR_ASSIGNMENTS]
  const [meetings, setMeetings] = useState([
    {
      id: 1,
      date: "2025-11-05",
      time: "10:00 AM",
      topic: "Project Discussion",
      status: "Completed",
      location: "Office Room 101",
      notes: "Discussed project timeline and deliverables",
    },
    {
      id: 2,
      date: "2025-11-12",
      time: "2:00 PM",
      topic: "Career Guidance",
      status: "Scheduled",
      location: "Virtual - Zoom",
      notes: "",
    },
  ])
  const [newMeeting, setNewMeeting] = useState({ date: "", time: "", topic: "", location: "" })
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Array<{ role: "student" | "mentor"; content: string; date: string }>>([
    { role: "mentor", content: "Hi! Looking forward to our meeting next week.", date: "2025-11-01" },
  ])

  const handleScheduleMeeting = () => {
    if (newMeeting.date && newMeeting.time && newMeeting.topic && newMeeting.location) {
      setMeetings([
        ...meetings,
        {
          id: meetings.length + 1,
          date: newMeeting.date,
          time: newMeeting.time,
          topic: newMeeting.topic,
          status: "Scheduled",
          location: newMeeting.location,
          notes: "",
        },
      ])
      setNewMeeting({ date: "", time: "", topic: "", location: "" })
    }
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { role: "student", content: message, date: new Date().toLocaleDateString() }])
      setMessage("")
    }
  }

  const upcomingMeetings = meetings.filter((m) => m.status === "Scheduled")
  const completedMeetings = meetings.filter((m) => m.status === "Completed")

  return (
    <div className="space-y-6">
      {/* Mentor Info Card */}
      <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
        <CardContent className="pt-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold text-primary mb-1">{mentor?.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">Your Assigned Mentor</p>
              <div className="space-y-1 text-sm">
                <p>Email: {mentor?.email}</p>
                <p>Phone: {mentor?.phone}</p>
              </div>
            </div>
            <Button className="bg-primary hover:bg-primary/90">Contact Mentor</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Schedule Meeting */}
        <Card className="border-2 border-primary/20">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
            <CardTitle className="text-primary">Schedule a Meeting</CardTitle>
            <CardDescription>Request a meeting with your mentor</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="date">Preferred Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newMeeting.date}
                  onChange={(e) => setNewMeeting({ ...newMeeting, date: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="time">Preferred Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={newMeeting.time}
                  onChange={(e) => setNewMeeting({ ...newMeeting, time: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="topic">Meeting Topic</Label>
                <Input
                  id="topic"
                  placeholder="e.g., Project Discussion"
                  value={newMeeting.topic}
                  onChange={(e) => setNewMeeting({ ...newMeeting, topic: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="e.g., Office Room 101 or Virtual - Zoom"
                  value={newMeeting.location}
                  onChange={(e) => setNewMeeting({ ...newMeeting, location: e.target.value })}
                  className="mt-1"
                />
              </div>
              <Button onClick={handleScheduleMeeting} className="w-full bg-primary hover:bg-primary/90">
                Request Meeting
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Messages */}
        <Card className="border-2 border-primary/20">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
            <CardTitle className="text-primary">Messages</CardTitle>
            <CardDescription>Communicate with your mentor</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 flex flex-col h-96">
            <div className="flex-1 overflow-y-auto mb-4 space-y-3 pr-2">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === "student" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.role === "student" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p className="text-xs opacity-70 mt-1">{msg.date}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button onClick={handleSendMessage} className="bg-primary hover:bg-primary/90">
                Send
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Meetings */}
      <Card className="border-2 border-primary/20">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
          <CardTitle className="text-primary">Your Meetings</CardTitle>
          <CardDescription>View scheduled and completed meetings</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {upcomingMeetings.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Upcoming Meetings</h3>
              <div className="space-y-3">
                {upcomingMeetings.map((meeting) => (
                  <div
                    key={meeting.id}
                    className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">{meeting.topic}</h4>
                      <Badge className="bg-blue-100 text-blue-800">{meeting.status}</Badge>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{meeting.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{meeting.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{meeting.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {completedMeetings.length > 0 && (
            <div className="pt-6 border-t">
              <h3 className="font-semibold mb-3">Completed Meetings</h3>
              <div className="space-y-3">
                {completedMeetings.map((meeting) => (
                  <div
                    key={meeting.id}
                    className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">{meeting.topic}</h4>
                      <Badge className="bg-green-100 text-green-800">{meeting.status}</Badge>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{meeting.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{meeting.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{meeting.location}</span>
                      </div>
                    </div>
                    {meeting.notes && (
                      <div className="mt-2 p-2 bg-muted rounded text-sm">
                        <div className="flex items-start gap-2">
                          <MessageSquare className="w-4 h-4 mt-0.5" />
                          <p>{meeting.notes}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
