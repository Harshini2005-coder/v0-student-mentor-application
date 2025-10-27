"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Users } from "lucide-react"

export default function MentorMeetings({ mentorId }: { mentorId: string }) {
  const [meetings, setMeetings] = useState([
    {
      id: 1,
      studentName: "Aisha Khan",
      studentId: "205631",
      date: "2025-11-05",
      time: "10:00 AM",
      topic: "Project Discussion",
      status: "Completed",
      notes: "Discussed project timeline and deliverables",
      location: "Office Room 101",
    },
    {
      id: 2,
      studentName: "Ahmed Hassan",
      date: "2025-11-12",
      time: "2:00 PM",
      topic: "Career Guidance",
      status: "Scheduled",
      notes: "",
      location: "Virtual - Zoom",
      studentId: "201788",
    },
  ])
  const [newMeeting, setNewMeeting] = useState({
    studentName: "",
    studentId: "",
    date: "",
    time: "",
    topic: "",
    location: "",
  })
  const [selectedMeeting, setSelectedMeeting] = useState<(typeof meetings)[0] | null>(null)
  const [meetingNotes, setMeetingNotes] = useState("")

  const handleScheduleMeeting = () => {
    if (newMeeting.studentName && newMeeting.date && newMeeting.time && newMeeting.topic && newMeeting.location) {
      setMeetings([
        ...meetings,
        {
          id: meetings.length + 1,
          studentName: newMeeting.studentName,
          studentId: newMeeting.studentId,
          date: newMeeting.date,
          time: newMeeting.time,
          topic: newMeeting.topic,
          status: "Scheduled",
          notes: "",
          location: newMeeting.location,
        },
      ])
      setNewMeeting({ studentName: "", studentId: "", date: "", time: "", topic: "", location: "" })
    }
  }

  const handleUpdateNotes = () => {
    if (selectedMeeting) {
      setMeetings(
        meetings.map((m) => (m.id === selectedMeeting.id ? { ...m, notes: meetingNotes, status: "Completed" } : m)),
      )
      setMeetingNotes("")
      setSelectedMeeting(null)
    }
  }

  const getStatusColor = (status: string) => {
    return status === "Completed" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
  }

  const upcomingMeetings = meetings.filter((m) => m.status === "Scheduled")
  const completedMeetings = meetings.filter((m) => m.status === "Completed")

  return (
    <div className="space-y-6">
      <Card className="border-2 border-secondary/20">
        <CardHeader className="bg-gradient-to-r from-secondary/10 to-secondary/5">
          <CardTitle className="text-secondary">Meeting Schedule</CardTitle>
          <CardDescription>Schedule and track meetings with your students</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Schedule New Meeting */}
            <div>
              <h3 className="font-semibold mb-4">Schedule New Meeting</h3>
              <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                <div>
                  <Label htmlFor="studentName">Student Name</Label>
                  <Input
                    id="studentName"
                    placeholder="Student name"
                    value={newMeeting.studentName}
                    onChange={(e) => setNewMeeting({ ...newMeeting, studentName: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="studentId">Student ID</Label>
                  <Input
                    id="studentId"
                    placeholder="Student ID"
                    value={newMeeting.studentId}
                    onChange={(e) => setNewMeeting({ ...newMeeting, studentId: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newMeeting.date}
                      onChange={(e) => setNewMeeting({ ...newMeeting, date: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={newMeeting.time}
                      onChange={(e) => setNewMeeting({ ...newMeeting, time: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="topic">Topic</Label>
                  <Input
                    id="topic"
                    placeholder="Meeting topic"
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
                <Button onClick={handleScheduleMeeting} className="w-full bg-secondary hover:bg-secondary/90">
                  Schedule Meeting
                </Button>
              </div>
            </div>

            {/* Meeting Details */}
            <div>
              {selectedMeeting ? (
                <div>
                  <h3 className="font-semibold mb-4">Meeting Details</h3>
                  <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Users className="w-4 h-4 mt-1 text-secondary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Student</p>
                          <p className="font-semibold">{selectedMeeting.studentName}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Calendar className="w-4 h-4 mt-1 text-secondary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Date</p>
                          <p className="font-semibold">{selectedMeeting.date}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="w-4 h-4 mt-1 text-secondary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Time</p>
                          <p className="font-semibold">{selectedMeeting.time}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 mt-1 text-secondary" />
                        <div>
                          <p className="text-sm text-muted-foreground">Location</p>
                          <p className="font-semibold">{selectedMeeting.location}</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <Label htmlFor="notes">Meeting Notes</Label>
                      <Textarea
                        id="notes"
                        placeholder="Add notes about the meeting..."
                        value={meetingNotes}
                        onChange={(e) => setMeetingNotes(e.target.value)}
                        className="mt-1"
                        rows={4}
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={handleUpdateNotes} className="flex-1 bg-secondary hover:bg-secondary/90">
                        Save Notes
                      </Button>
                      <Button
                        onClick={() => {
                          setSelectedMeeting(null)
                          setMeetingNotes("")
                        }}
                        variant="outline"
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-muted rounded-lg text-center text-muted-foreground h-full flex items-center justify-center">
                  Select a meeting to view details
                </div>
              )}
            </div>
          </div>

          {/* Upcoming Meetings */}
          {upcomingMeetings.length > 0 && (
            <div className="mt-8 pt-8 border-t">
              <h3 className="font-semibold mb-4">Upcoming Meetings ({upcomingMeetings.length})</h3>
              <div className="space-y-3">
                {upcomingMeetings.map((meeting) => (
                  <div
                    key={meeting.id}
                    onClick={() => {
                      setSelectedMeeting(meeting)
                      setMeetingNotes(meeting.notes)
                    }}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      selectedMeeting?.id === meeting.id
                        ? "border-secondary bg-secondary/10"
                        : "border-border hover:border-secondary/50"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold">{meeting.topic}</h4>
                        <p className="text-sm text-muted-foreground">Student: {meeting.studentName}</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">{meeting.status}</Badge>
                    </div>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <span>
                        {meeting.date} at {meeting.time}
                      </span>
                      <span>{meeting.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Completed Meetings */}
          {completedMeetings.length > 0 && (
            <div className="mt-8 pt-8 border-t">
              <h3 className="font-semibold mb-4">Completed Meetings ({completedMeetings.length})</h3>
              <div className="space-y-3">
                {completedMeetings.map((meeting) => (
                  <div
                    key={meeting.id}
                    onClick={() => {
                      setSelectedMeeting(meeting)
                      setMeetingNotes(meeting.notes)
                    }}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      selectedMeeting?.id === meeting.id
                        ? "border-secondary bg-secondary/10"
                        : "border-border hover:border-secondary/50"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold">{meeting.topic}</h4>
                        <p className="text-sm text-muted-foreground">Student: {meeting.studentName}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">{meeting.status}</Badge>
                    </div>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <span>
                        {meeting.date} at {meeting.time}
                      </span>
                      <span>{meeting.location}</span>
                    </div>
                    {meeting.notes && (
                      <div className="mt-2 p-2 bg-muted rounded text-sm">
                        <p className="text-muted-foreground">Notes: {meeting.notes}</p>
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
