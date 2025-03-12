"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { processIdea } from "@/app/actions"
import ModelSelector from "@/components/model-selector"
import { Loader2 } from "lucide-react"
import RelatedIdeas from "@/components/related-ideas"
import SpecificationDocument from "@/components/specification-document"
import ClassDiagram from "@/components/class-diagram"

export default function IdeaProcessor() {
  const [concept, setConcept] = useState("")
  const [selectedModel, setSelectedModel] = useState("deepseek/deepseek-r1-zero:free")
  const [isProcessing, setIsProcessing] = useState(false)
  const [activeTab, setActiveTab] = useState("ideas")
  const [result, setResult] = useState<{
    relatedIdeas: string[]
    specification: string
    classDiagram: string
  } | null>(null)

  const handleSubmit = async () => {
    if (!concept.trim()) return

    setIsProcessing(true)

    try {
      const processed = await processIdea(concept, selectedModel)
      setResult(processed)
      setActiveTab("ideas")
    } catch (error) {
      console.error("Error processing idea:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="w-full space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <Textarea
              placeholder="Describe your core concept or idea here... (e.g., 'A mobile app for tracking personal carbon footprint')"
              className="min-h-32"
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
            />
            <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
              <ModelSelector selectedModel={selectedModel} onSelectModel={setSelectedModel} />
              <Button onClick={handleSubmit} disabled={!concept.trim() || isProcessing} className="sm:flex-1">
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Process Concept"
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="ideas">Related Ideas</TabsTrigger>
            <TabsTrigger value="spec">Cahier des Charges</TabsTrigger>
            <TabsTrigger value="diagram">Class Diagram</TabsTrigger>
          </TabsList>
          <TabsContent value="ideas" className="mt-4">
            <RelatedIdeas ideas={result.relatedIdeas} />
          </TabsContent>
          <TabsContent value="spec" className="mt-4">
            <SpecificationDocument specification={result.specification} />
          </TabsContent>
          <TabsContent value="diagram" className="mt-4">
            <ClassDiagram diagram={result.classDiagram} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}

