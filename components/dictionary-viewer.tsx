"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface DictionaryViewerProps {
  type: "dic" | "aff"
  language: "uz_Latn_UZ" | "uz_Cyrl_UZ"
}

export default function DictionaryViewer({ type, language }: DictionaryViewerProps) {
  const [content, setContent] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDictionaryFile = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/dictionaries/${language}/${type}`)

        if (!response.ok) {
          throw new Error(`Failed to fetch ${language}.${type} file`)
        }

        const data = await response.json()
        setContent(data.content)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred")
        setContent([])
      } finally {
        setLoading(false)
      }
    }

    fetchDictionaryFile()
  }, [type, language])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading file...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 border border-red-200 bg-red-50 text-red-700 rounded-md">
        <p>Error: {error}</p>
        <p className="text-sm mt-2">Make sure the dictionary files are available in the API route.</p>
      </div>
    )
  }

  return (
    <ScrollArea className="h-[400px] rounded-md border p-4">
      <pre className="text-sm font-mono">
        {content.map((line, index) => (
          <div key={index} className="py-1 border-b border-gray-100 last:border-0">
            {line}
          </div>
        ))}
      </pre>
    </ScrollArea>
  )
}

