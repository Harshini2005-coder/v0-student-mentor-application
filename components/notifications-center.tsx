"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, X, CheckCircle2, AlertCircle, Info, Clock } from "lucide-react"

interface Notification {
  id: number
  type: "success" | "warning" | "info" | "reminder"
  title: string
  message: string
  timestamp: string
  read: boolean
}

export default function NotificationsCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "success",
      title: "Fee Payment Received",
      message: "Your fee payment of $5000 has been successfully processed",
      timestamp: "2025-10-27 10:30 AM",
      read: false,
    },
    {
      id: 2,
      type: "reminder",
      title: "Upcoming Meeting",
      message: "You have a meeting with your mentor tomorrow at 2:00 PM",
      timestamp: "2025-10-27 09:15 AM",
      read: false,
    },
    {
      id: 3,
      type: "warning",
      title: "Low Attendance",
      message: "Your attendance is below 75%. Please attend more classes",
      timestamp: "2025-10-26 03:45 PM",
      read: true,
    },
    {
      id: 4,
      type: "info",
      title: "New Assignment Posted",
      message: "Your mentor has posted a new assignment for you",
      timestamp: "2025-10-26 11:20 AM",
      read: true,
    },
  ])

  const [showAll, setShowAll] = useState(false)

  const handleMarkAsRead = (id: number) => {
    setNotifications(notifications.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const handleDelete = (id: number) => {
    setNotifications(notifications.filter((notif) => notif.id !== id))
  }

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })))
  }

  const unreadCount = notifications.filter((n) => !n.read).length
  const displayedNotifications = showAll ? notifications : notifications.slice(0, 5)

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-600" />
      case "reminder":
        return <Clock className="w-5 h-5 text-blue-600" />
      case "info":
        return <Info className="w-5 h-5 text-blue-600" />
      default:
        return <Bell className="w-5 h-5 text-gray-600" />
    }
  }

  const getNotificationBgColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200"
      case "warning":
        return "bg-yellow-50 border-yellow-200"
      case "reminder":
        return "bg-blue-50 border-blue-200"
      case "info":
        return "bg-blue-50 border-blue-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-primary flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </CardTitle>
            <CardDescription>
              {unreadCount > 0 ? `You have ${unreadCount} unread notification(s)` : "All caught up!"}
            </CardDescription>
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-3">
          {displayedNotifications.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No notifications</p>
          ) : (
            displayedNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border rounded-lg flex gap-4 ${
                  notification.read ? "opacity-60" : ""
                } ${getNotificationBgColor(notification.type)}`}
              >
                <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">{notification.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                  <p className="text-xs text-muted-foreground mt-2">{notification.timestamp}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  {!notification.read && (
                    <Button variant="ghost" size="sm" onClick={() => handleMarkAsRead(notification.id)}>
                      Mark read
                    </Button>
                  )}
                  <button
                    onClick={() => handleDelete(notification.id)}
                    className="text-muted-foreground hover:text-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        {notifications.length > 5 && (
          <Button variant="outline" className="w-full mt-4 bg-transparent" onClick={() => setShowAll(!showAll)}>
            {showAll ? "Show less" : `Show all (${notifications.length})`}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
