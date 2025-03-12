"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, MinusCircle } from "lucide-react"

interface RelatedIdeasProps {
  ideas: string[]
}

export default function RelatedIdeas({ ideas }: RelatedIdeasProps) {
  const [selectedIdeas, setSelectedIdeas] = useState<string[]>(ideas)

  const toggleIdea = (idea: string) => {
    setSelectedIdeas((prev) => (prev.includes(idea) ? prev.filter((i) => i !== idea) : [...prev, idea]))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Related Ideas & Concepts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {ideas.map((idea, index) => (
              <Badge
                key={index}
                variant={selectedIdeas.includes(idea) ? "default" : "outline"}
                className="px-3 py-1 cursor-pointer"
                onClick={() => toggleIdea(idea)}
              >
                {selectedIdeas.includes(idea) ? (
                  <MinusCircle className="mr-1 h-3 w-3" />
                ) : (
                  <PlusCircle className="mr-1 h-3 w-3" />
                )}
                {idea}
              </Badge>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            Click on ideas to include/exclude them from your specification.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

