import { Card, CardContent, CardFooter } from "@documenso/ui/primitives/card"
import { Badge } from "@documenso/ui/primitives/badge"
import type { ReactNode } from "react"

interface RecommendationCardProps {
  title: string
  description: string
  icon: ReactNode
  priority: "High" | "Medium" | "Low"
}

export default function RecommendationCard({ title, description, icon, priority }: RecommendationCardProps) {
  // Updated with rose, cyan, and lime colors
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-rose-100 text-rose-800"
      case "Medium":
        return "bg-cyan-100 text-cyan-800"
      case "Low":
        return "bg-lime-100 text-lime-800"
      default:
        return "bg-zinc-100 text-zinc-800"
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-rose-600">
            {icon}
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-zinc-800">{title}</h3>
            <p className="text-sm text-zinc-500">{description}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t bg-zinc-50 px-6 py-3">
        <div className="flex items-center justify-between w-full">
          <span className="text-xs text-zinc-500">Priority</span>
          <Badge className={getPriorityColor(priority)}>{priority}</Badge>
        </div>
      </CardFooter>
    </Card>
  )
}

