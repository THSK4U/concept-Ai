"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ModelSelectorProps {
  selectedModel: string
  onSelectModel: (model: string) => void
}

export default function ModelSelector({ selectedModel, onSelectModel }: ModelSelectorProps) {
  const models = [
    { id: "deepseek/deepseek-r1-zero:free", name: "DeepSeek R1 Zero (Free)" },
    { id: "qwen/qwq-32b:free", name: "Qwen QWQ 32B (Free)" },
    { id: "qwen/qwen2.5-vl-72b-instruct:free", name: "Qwen 2.5 VL 72B (Free)" },
    { id: "latitudegames/wayfarer-large-70b-llama-3.3", name: "Wayfarer Large 70B" },
    { id: "google/gemma-3-27b-it:free", name: "Gemini 2.0 Pro (Free)" },
    { id: "rekaai/reka-flash-3:free", name: "Reka AI Flash" },
  ]

  return (
    <Select value={selectedModel} onValueChange={onSelectModel}>
      <SelectTrigger className="w-full sm:w-[250px]">
        <SelectValue placeholder="Select a model" />
      </SelectTrigger>
      <SelectContent>
        {models.map((model) => (
          <SelectItem key={model.id} value={model.id}>
            {model.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

