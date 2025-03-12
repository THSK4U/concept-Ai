"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DownloadIcon, CopyIcon, CheckIcon } from "lucide-react"

interface SpecificationDocumentProps {
  specification: string
}

export default function SpecificationDocument({ specification }: SpecificationDocumentProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(specification)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadSpecification = () => {
    const blob = new Blob([specification], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "cahier_des_charges.md"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cahier des Charges</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <div className="whitespace-pre-wrap">{specification}</div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline" size="sm" onClick={copyToClipboard}>
          {copied ? (
            <>
              <CheckIcon className="mr-2 h-4 w-4" />
              Copied
            </>
          ) : (
            <>
              <CopyIcon className="mr-2 h-4 w-4" />
              Copy
            </>
          )}
        </Button>
        <Button variant="outline" size="sm" onClick={downloadSpecification}>
          <DownloadIcon className="mr-2 h-4 w-4" />
          Download
        </Button>
      </CardFooter>
    </Card>
  )
}

