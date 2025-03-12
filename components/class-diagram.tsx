"use client"

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DownloadIcon } from "lucide-react"
import { useRef, useEffect } from "react"

interface ClassDiagramProps {
  diagram: string
}

export default function ClassDiagram({ diagram }: ClassDiagramProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    // This is a placeholder for rendering the diagram
    // In a real implementation, you might use a library like mermaid.js
    // to render the diagram on the client side
  }, [diagram])

  const downloadDiagram = () => {
    if (!svgRef.current) return

    const svgData = new XMLSerializer().serializeToString(svgRef.current)
    const blob = new Blob([svgData], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = "class_diagram.svg"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Class Diagram</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full overflow-auto">
          <div className="mermaid-diagram">
            {/* We'll render the mermaid diagram here using client-side JavaScript */}
            <pre className="hidden">{diagram}</pre>

            {/* Render the diagram */}
            <div className="w-full h-full min-h-[400px] flex items-center justify-center">
              <div dangerouslySetInnerHTML={{ __html: diagram }} />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="outline" size="sm" onClick={downloadDiagram}>
          <DownloadIcon className="mr-2 h-4 w-4" />
          Download SVG
        </Button>
      </CardFooter>
    </Card>
  )
}

