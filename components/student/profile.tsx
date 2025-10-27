"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

const STUDENT_PROFILES = {
  "205631": {
    name: "Aisha Khan",
    email: "aisha@student.edu",
    department: "CIVIL",
    year: 3,
    cgpa: 7.5894,
    attendance: 85,
    phone: "+91-9876543210",
    address: "Mumbai, India",
  },
  "217123": {
    name: "Priya Sharma",
    email: "priya@student.edu",
    department: "ME",
    year: 2,
    cgpa: 6.3717,
    attendance: 92,
    phone: "+91-9876543211",
    address: "Delhi, India",
  },
}

export default function StudentProfile({ studentId }: { studentId: string }) {
  const profile = STUDENT_PROFILES[studentId as keyof typeof STUDENT_PROFILES]

  return (
    <div className="space-y-6">
      <Card className="border-2 border-primary/20">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
          <CardTitle className="text-primary">Student Profile</CardTitle>
          <CardDescription>View and manage your profile information</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {profile && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-muted-foreground">Full Name</Label>
                  <p className="text-lg font-semibold mt-1">{profile.name}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Student ID</Label>
                  <p className="text-lg font-semibold mt-1">{studentId}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Email</Label>
                  <p className="text-lg font-semibold mt-1">{profile.email}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Phone</Label>
                  <p className="text-lg font-semibold mt-1">{profile.phone}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Department</Label>
                  <p className="text-lg font-semibold mt-1">{profile.department}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Year</Label>
                  <p className="text-lg font-semibold mt-1">Year {profile.year}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">CGPA</Label>
                  <p className="text-lg font-semibold mt-1 text-primary">{profile.cgpa.toFixed(2)}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Attendance</Label>
                  <p className="text-lg font-semibold mt-1 text-green-600">{profile.attendance}%</p>
                </div>
              </div>

              <div>
                <Label className="text-muted-foreground">Address</Label>
                <p className="text-lg font-semibold mt-1">{profile.address}</p>
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90">Edit Profile</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
