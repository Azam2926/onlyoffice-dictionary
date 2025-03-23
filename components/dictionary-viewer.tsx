"use client";

import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { syncDicFileAction } from "@/lib/actions/syncAction";

interface DictionaryViewerProps {
  type: "dic" | "aff";
  language: "uz_Latn_UZ" | "uz_Cyrl_UZ";
}

export default function DictionaryViewer({
  type,
  language,
}: DictionaryViewerProps) {
  const [content, setContent] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchDictionaryFile = async () => {
  //     try {
  //       setLoading(true)
  //       const response = await fetch(`/api/dictionaries/${language}/${type}`)
  //
  //       if (!response.ok) {
  //         throw new Error(`Failed to fetch ${language}.${type} file`)
  //       }
  //
  //       const data = await response.json()
  //       setContent(data.content)
  //       setError(null)
  //     } catch (err) {
  //       setError(err instanceof Error ? err.message : "An unknown error occurred")
  //       setContent([])
  //     } finally {
  //       setLoading(false)
  //     }
  //   }
  //
  //   fetchDictionaryFile()
  // }, [type, language])

  const [isPending, startTransition] = useTransition();
  const [syncResult, setSyncResult] = useState<{
    success: boolean;
    count?: number;
    error?: string;
  } | null>(null);

  async function handleSync() {
    // Wrap the server action call inside a transition.
    startTransition(async () => {
      const result = await syncDicFileAction(language, type);
      setSyncResult(result);
    });
  }

  if (loading) {
    return (
      <div className="flex h-60 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading file...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md border border-red-200 bg-red-50 p-4 text-red-700">
        <p>Error: {error}</p>
        <p className="mt-2 text-sm">
          Make sure the dictionary files are available in the API route.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h1>Sync .dic File to Database</h1>
        <Button disabled={isPending} onClick={handleSync}>
          {isPending ? "Syncing..." : "Sync Dictionary"}
        </Button>

        {syncResult && (
          <div style={{ marginTop: "10px" }}>
            {syncResult.success
              ? `Successfully synced ${syncResult.count} words.`
              : `Error syncing file: ${syncResult.error}`}
          </div>
        )}
      </div>

      <ScrollArea className="h-[400px] rounded-md border p-4">
        <pre className="font-mono text-sm">
          {content.map((line, index) => (
            <div
              key={index}
              className="border-b border-gray-100 py-1 last:border-0"
            >
              {line}
            </div>
          ))}
        </pre>
      </ScrollArea>
    </div>
  );
}
