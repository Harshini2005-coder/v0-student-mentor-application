"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, Bell, Lock, Download, Trash2, Save, Users } from "lucide-react"

export default function MentorSettings({ mentorId }: { mentorId: string }) {
  const [profile, setProfile] = useState({
    name: "Dr. Sarah Johnson",
    email: "sarah@example.com",
    phone: "+91-9876543210",
    department: "Computer Science",
    specialization: "Software Engineering",
    experience: "10 years",
  })

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    studentUpdates: true,
    meetingReminders: true,
    reportNotifications: true,
    weeklyDigest: true,
  })

  const [classSettings, setClassSettings] = useState({
    maxStudents: "50",
    attendanceThreshold: "75",
    feeStructure: "Standard",
  })

  const [saved, setSaved] = useState(false)

  const handleProfileChange = (field: string, value: string) => {
    setProfile({ ...profile, [field]: value })
    setSaved(false)
  }

  const handlePreferenceChange = (field: string) => {
    setPreferences({ ...preferences, [field]: !preferences[field as keyof typeof preferences] })
  }

  const handleClassSettingChange = (field: string, value: string) => {
    setClassSettings({ ...classSettings, [field]: value })
  }

  const handleSaveProfile = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleDownloadData = () => {
    const data = {
      profile,
      classSettings,
      mentorId,
      downloadDate: new Date().toISOString(),
    }
    const element = document.createElement("a")
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2)))
    element.setAttribute("download", `mentor_data_${mentorId}.json`)
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="class">Class</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="data">Data</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card className="border-2 border-secondary/20">
            <CardHeader className="bg-gradient-to-r from-secondary/10 to-secondary/5">
              <CardTitle className="text-secondary flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Profile Information
              </CardTitle>
              <CardDescription>Update your professional information</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => handleProfileChange("name", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => handleProfileChange("email", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => handleProfileChange("phone", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      value={profile.department}
                      onChange={(e) => handleProfileChange("department", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="specialization">Specialization</Label>
                    <Input
                      id="specialization"
                      value={profile.specialization}
                      onChange={(e) => handleProfileChange("specialization", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="experience">Experience</Label>
                    <Input
                      id="experience"
                      value={profile.experience}
                      onChange={(e) => handleProfileChange("experience", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>

                {saved && <p className="text-green-600 text-sm">Profile saved successfully!</p>}

                <Button onClick={handleSaveProfile} className="w-full bg-secondary hover:bg-secondary/90">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Class Settings Tab */}
        <TabsContent value="class">
          <Card className="border-2 border-secondary/20">
            <CardHeader className="bg-gradient-to-r from-secondary/10 to-secondary/5">
              <CardTitle className="text-secondary flex items-center gap-2">
                <Users className="w-5 h-5" />
                Class Settings
              </CardTitle>
              <CardDescription>Configure your class parameters</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="maxStudents">Maximum Students</Label>
                  <Input
                    id="maxStudents"
                    type="number"
                    value={classSettings.maxStudents}
                    onChange={(e) => handleClassSettingChange("maxStudents", e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="attendanceThreshold">Attendance Threshold (%)</Label>
                  <Input
                    id="attendanceThreshold"
                    type="number"
                    value={classSettings.attendanceThreshold}
                    onChange={(e) => handleClassSettingChange("attendanceThreshold", e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="feeStructure">Fee Structure</Label>
                  <select
                    id="feeStructure"
                    value={classSettings.feeStructure}
                    onChange={(e) => handleClassSettingChange("feeStructure", e.target.value)}
                    className="w-full mt-1 px-3 py-2 border border-border rounded-md"
                  >
                    <option>Standard</option>
                    <option>Premium</option>
                    <option>Economy</option>
                  </select>
                </div>

                <Button className="w-full bg-secondary hover:bg-secondary/90">
                  <Save className="w-4 h-4 mr-2" />
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences">
          <Card className="border-2 border-secondary/20">
            <CardHeader className="bg-gradient-to-r from-secondary/10 to-secondary/5">
              <CardTitle className="text-secondary flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {[
                  { key: "emailNotifications", label: "Email Notifications", desc: "Receive updates via email" },
                  { key: "studentUpdates", label: "Student Updates", desc: "Get notified about student activities" },
                  {
                    key: "meetingReminders",
                    label: "Meeting Reminders",
                    desc: "Get reminded about scheduled meetings",
                  },
                  {
                    key: "reportNotifications",
                    label: "Report Notifications",
                    desc: "Get notified about generated reports",
                  },
                  { key: "weeklyDigest", label: "Weekly Digest", desc: "Receive weekly summary of activities" },
                ].map((pref) => (
                  <div key={pref.key} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <p className="font-semibold">{pref.label}</p>
                      <p className="text-sm text-muted-foreground">{pref.desc}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferences[pref.key as keyof typeof preferences]}
                      onChange={() => handlePreferenceChange(pref.key)}
                      className="w-5 h-5"
                    />
                  </div>
                ))}

                <Button className="w-full bg-secondary hover:bg-secondary/90">
                  <Save className="w-4 h-4 mr-2" />
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <Card className="border-2 border-secondary/20">
            <CardHeader className="bg-gradient-to-r from-secondary/10 to-secondary/5">
              <CardTitle className="text-secondary flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Security Settings
              </CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input id="confirm-password" type="password" className="mt-1" />
                </div>

                <Button className="w-full bg-secondary hover:bg-secondary/90">
                  <Lock className="w-4 h-4 mr-2" />
                  Update Password
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Data Tab */}
        <TabsContent value="data">
          <div className="space-y-4">
            <Card className="border-2 border-secondary/20">
              <CardHeader className="bg-gradient-to-r from-secondary/10 to-secondary/5">
                <CardTitle className="text-secondary flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Data Management
                </CardTitle>
                <CardDescription>Download or delete your data</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="p-4 border border-border rounded-lg">
                    <h4 className="font-semibold mb-2">Download Your Data</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Download a copy of your profile and class data in JSON format
                    </p>
                    <Button onClick={handleDownloadData} className="w-full bg-secondary hover:bg-secondary/90">
                      <Download className="w-4 h-4 mr-2" />
                      Download Data
                    </Button>
                  </div>

                  <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
                    <h4 className="font-semibold mb-2 text-red-700">Delete Account</h4>
                    <p className="text-sm text-red-600 mb-4">
                      Permanently delete your account and all associated data. This action cannot be undone.
                    </p>
                    <Button variant="destructive" className="w-full">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
