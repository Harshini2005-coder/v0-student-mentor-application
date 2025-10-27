"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function MentorProjects({ mentorId }: { mentorId: string }) {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Web Development Project",
      description: "Build a responsive website",
      assignedTo: "Aisha Khan",
      dueDate: "2025-11-20",
      status: "In Progress",
    },
    {
      id: 2,
      title: "Data Analysis Project",
      description: "Analyze student performance data",
      assignedTo: "Ahmed Hassan",
      dueDate: "2025-11-25",
      status: "Not Started",
    },
  ])
  const [newProject, setNewProject] = useState({ title: "", description: "", assignedTo: "", dueDate: "" })

  const handleAddProject = () => {
    if (newProject.title && newProject.description && newProject.assignedTo && newProject.dueDate) {
      setProjects([
        ...projects,
        {
          id: projects.length + 1,
          title: newProject.title,
          description: newProject.description,
          assignedTo: newProject.assignedTo,
          dueDate: newProject.dueDate,
          status: "Not Started",
        },
      ])
      setNewProject({ title: "", description: "", assignedTo: "", dueDate: "" })
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-2 border-secondary/20">
        <CardHeader className="bg-gradient-to-r from-secondary/10 to-secondary/5">
          <CardTitle className="text-secondary">Project Management</CardTitle>
          <CardDescription>Assign and track student projects</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="mb-6">
            <h3 className="font-semibold mb-4">Assign New Project</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Project Title</Label>
                <Input
                  id="title"
                  placeholder="Project title"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Project description"
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  className="mt-1"
                  rows={3}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="assignedTo">Assign To</Label>
                  <Input
                    id="assignedTo"
                    placeholder="Student name"
                    value={newProject.assignedTo}
                    onChange={(e) => setNewProject({ ...newProject, assignedTo: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newProject.dueDate}
                    onChange={(e) => setNewProject({ ...newProject, dueDate: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>
              <Button onClick={handleAddProject} className="w-full bg-secondary hover:bg-secondary/90">
                Assign Project
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Active Projects</h3>
            <div className="space-y-3">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold">{project.title}</h4>
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        project.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : project.status === "In Progress"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Assigned to: {project.assignedTo}</span>
                    <span>Due: {project.dueDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
