"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface WordsTableProps {
  type: "word" | "prefix" | "suffix"
}

interface WordEntry {
  id: string
  value: string
  script: "latin" | "cyrillic"
  flags?: string
  createdAt: string
}

export default function WordsTable({ type }: WordsTableProps) {
  const [entries, setEntries] = useState<WordEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        setLoading(true)
        // In a real app, this would fetch from your API
        const response = await fetch(`/api/dictionary-entries?type=${type}`)

        if (!response.ok) {
          throw new Error(`Failed to fetch ${type} entries`)
        }

        const data = await response.json()
        setEntries(data.entries)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred")
        setEntries([])
      } finally {
        setLoading(false)
      }
    }

    fetchEntries()
  }, [type])
  //
  // // Mock data for demonstration
  // useEffect(() => {
  //   // This simulates API data for demonstration purposes
  //   const mockData: Record<string, WordEntry[]> = {
  //     word: [
  //       { id: "1", value: "kitob", script: "latin", flags: "N", createdAt: "2023-05-15" },
  //       { id: "2", value: "maktab", script: "latin", flags: "N", createdAt: "2023-05-16" },
  //       { id: "3", value: "компьютер", script: "cyrillic", flags: "N", createdAt: "2023-05-17" },
  //       { id: "4", value: "телефон", script: "cyrillic", flags: "N", createdAt: "2023-05-18" },
  //     ],
  //     prefix: [
  //       { id: "1", value: "be-", script: "latin", createdAt: "2023-05-15" },
  //       { id: "2", value: "bo-", script: "latin", createdAt: "2023-05-16" },
  //       { id: "3", value: "бе-", script: "cyrillic", createdAt: "2023-05-17" },
  //     ],
  //     suffix: [
  //       { id: "1", value: "-lar", script: "latin", createdAt: "2023-05-15" },
  //       { id: "2", value: "-лар", script: "cyrillic", createdAt: "2023-05-16" },
  //     ],
  //   }
  //
  //   // Simulate API delay
  //   setTimeout(() => {
  //     setEntries(mockData[type] || [])
  //     setLoading(false)
  //   }, 800)
  // }, [type])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading entries...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 border border-red-200 bg-red-50 text-red-700 rounded-md">
        <p>Error: {error}</p>
      </div>
    )
  }

  if (entries.length === 0) {
    return (
      <div className="text-center p-8 border rounded-md">
        <p className="text-muted-foreground">No {type} entries found.</p>
      </div>
    )
  }

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{type.charAt(0).toUpperCase() + type.slice(1)}</TableHead>
            <TableHead>Script</TableHead>
            {type === "word" && <TableHead>Flags</TableHead>}
            <TableHead>Added</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell className="font-medium">{entry.value}</TableCell>
              <TableCell>
                <Badge variant={entry.script === "latin" ? "default" : "secondary"}>{entry.script}</Badge>
              </TableCell>
              {type === "word" && <TableCell>{entry.flags || "-"}</TableCell>}
              <TableCell>{entry.createdAt}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

