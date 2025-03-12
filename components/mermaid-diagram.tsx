"use client"

import { useEffect, useRef } from "react"
import mermaid from "mermaid"
import { Card } from "@/components/ui/card"

interface MermaidDiagramProps {
  chart: string
}

export default function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: "neutral",
      securityLevel: "loose",
    })

    if (ref.current) {
      mermaid.render("diagram", chart).then(({ svg }) => {
        if (ref.current) {
          ref.current.innerHTML = svg
        }
      })
    }
  }, [chart])

  return (
    <Card className="p-4 w-full overflow-auto">
      <div ref={ref} className="flex justify-center" />
    </Card>
  )
}

