"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2, CheckCircle2, Circle } from "lucide-react"

export default function StudentNotes({ studentId }: { studentId: string }) {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "Complete Project Report",
      dueDate: "2025-11-10",
      priority: "High",
      completed: false,
      category: "Academic",
    },
    {
      id: 2,
      title: "Study for Midterm",
      dueDate: "2025-11-15",
      priority: "High",
      completed: false,
      category: "Academic",
    },
    {
      id: 3,
      title: "Submit Assignment",
      dueDate: "2025-11-08",
      priority: "Medium",
      completed: true,
      category: "Academic",
    },
    {
      id: 4,
      title: "Prepare for Internship Interview",
      dueDate: "2025-11-20",
      priority: "High",
      completed: false,
      category: "Career",
    },
  ])

  const [notes, setNotes] = useState([
    { id: 1, title: "Mentor Feedback", content: "Focus on improving time management skills", date: "2025-10-25" },
    { id: 2, title: "Study Notes", content: "Chapter 5 concepts need more practice", date: "2025-10-24" },
  ])

  const [newTodo, setNewTodo] = useState({ title: "", dueDate: "", priority: "Medium", category: "Academic" })
  const [newNote, setNewNote] = useState({ title: "", content: "" })
  const [editingNote, setEditingNote] = useState<number | null>(null)
  const [filter, setFilter] = useState("all")

  const handleAddTodo = () => {
    if (newTodo.title && newTodo.dueDate) {
      setTodos([
        ...todos,
        {
          id: Math.max(...todos.map((t) => t.id), 0) + 1,
          title: newTodo.title,
          dueDate: newTodo.dueDate,
          priority: newTodo.priority,
          category: newTodo.category,
          completed: false,
        },
      ])
      setNewTodo({ title: "", dueDate: "", priority: "Medium", category: "Academic" })
    }
  }

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const handleAddNote = () => {
    if (newNote.title && newNote.content) {
      setNotes([
        ...notes,
        {
          id: Math.max(...notes.map((n) => n.id), 0) + 1,
          title: newNote.title,
          content: newNote.content,
          date: new Date().toISOString().split("T")[0],
        },
      ])
      setNewNote({ title: "", content: "" })
    }
  }

  const handleDeleteNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id))
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700"
      case "Medium":
        return "bg-yellow-100 text-yellow-700"
      case "Low":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const filteredTodos =
    filter === "all"
      ? todos
      : filter === "completed"
        ? todos.filter((t) => t.completed)
        : todos.filter((t) => !t.completed)
  const overdueTodos = todos.filter((t) => !t.completed && new Date(t.dueDate) < new Date())

  return (
    <div className="space-y-6">
      {overdueTodos.length > 0 && (
        <Card className="border-2 border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-700 font-semibold">You have {overdueTodos.length} overdue task(s)</p>
          </CardContent>
        </Card>
      )}

      {/* To-Do List Section */}
      <Card className="border-2 border-primary/20">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
          <CardTitle className="text-primary">To-Do List</CardTitle>
          <CardDescription>Track your tasks and deadlines</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="mb-6">
            <h3 className="font-semibold mb-4">Add New Task</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Task Title</Label>
                <Input
                  id="title"
                  placeholder="Enter task title"
                  value={newTodo.title}
                  onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newTodo.dueDate}
                    onChange={(e) => setNewTodo({ ...newTodo, dueDate: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <select
                    id="priority"
                    value={newTodo.priority}
                    onChange={(e) => setNewTodo({ ...newTodo, priority: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border border-border rounded-md"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={newTodo.category}
                    onChange={(e) => setNewTodo({ ...newTodo, category: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border border-border rounded-md"
                  >
                    <option>Academic</option>
                    <option>Career</option>
                    <option>Personal</option>
                  </select>
                </div>
              </div>
              <Button onClick={handleAddTodo} className="w-full bg-primary hover:bg-primary/90">
                Add Task
              </Button>
            </div>
          </div>

          <div className="mb-4 flex gap-2">
            <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
              All ({todos.length})
            </Button>
            <Button
              variant={filter === "pending" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("pending")}
            >
              Pending ({todos.filter((t) => !t.completed).length})
            </Button>
            <Button
              variant={filter === "completed" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("completed")}
            >
              Completed ({todos.filter((t) => t.completed).length})
            </Button>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Your Tasks</h3>
            <div className="space-y-3">
              {filteredTodos.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No tasks in this category</p>
              ) : (
                filteredTodos.map((todo) => (
                  <div
                    key={todo.id}
                    className={`p-4 border border-border rounded-lg flex items-start gap-4 hover:bg-muted/50 transition-colors ${
                      todo.completed ? "bg-muted/30" : ""
                    }`}
                  >
                    <button onClick={() => toggleTodo(todo.id)} className="mt-1 flex-shrink-0">
                      {todo.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      ) : (
                        <Circle className="w-5 h-5 text-muted-foreground" />
                      )}
                    </button>
                    <div className="flex-1">
                      <h4 className={`font-semibold ${todo.completed ? "line-through text-muted-foreground" : ""}`}>
                        {todo.title}
                      </h4>
                      <div className="flex gap-2 mt-2 text-sm text-muted-foreground">
                        <span>{todo.dueDate}</span>
                        <span>•</span>
                        <span>{todo.category}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(todo.priority)}`}>
                        {todo.priority}
                      </span>
                      <button
                        onClick={() => handleDeleteTodo(todo.id)}
                        className="text-muted-foreground hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes Section */}
      <Card className="border-2 border-primary/20">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
          <CardTitle className="text-primary">Personal Notes</CardTitle>
          <CardDescription>Keep track of important notes and feedback</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="mb-6">
            <h3 className="font-semibold mb-4">Add New Note</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="noteTitle">Note Title</Label>
                <Input
                  id="noteTitle"
                  placeholder="Enter note title"
                  value={newNote.title}
                  onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="noteContent">Note Content</Label>
                <textarea
                  id="noteContent"
                  placeholder="Enter note content"
                  value={newNote.content}
                  onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border border-border rounded-md min-h-24"
                />
              </div>
              <Button onClick={handleAddNote} className="w-full bg-primary hover:bg-primary/90">
                Add Note
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Your Notes ({notes.length})</h3>
            <div className="space-y-3">
              {notes.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No notes yet</p>
              ) : (
                notes.map((note) => (
                  <div key={note.id} className="p-4 border border-border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold">{note.title}</h4>
                        <p className="text-sm text-muted-foreground">{note.date}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteNote(note.id)}
                        className="text-muted-foreground hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-foreground">{note.content}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
