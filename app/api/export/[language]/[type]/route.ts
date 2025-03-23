import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { words, prefixes, suffixes } from "@/lib/db/schema"
import { generateDictionaryFile, generateAffixFile } from "@/lib/dictionary-parser"

export async function GET(request: NextRequest, { params }: { params: { language: string; type: string } }) {
  const { language, type } = params

  // Validate parameters
  if (!["uz_Latn_UZ", "uz_Cyrl_UZ"].includes(language) || !["dic", "aff"].includes(type)) {
    return NextResponse.json({ error: "Invalid language or file type" }, { status: 400 })
  }

  try {
    const script = language.includes("Latn") ? "latin" : "cyrillic"

    if (type === "dic") {
      // Generate dictionary file
      const wordEntries = await db.select().from(words).where({ script })

      const formattedEntries = wordEntries.map((entry) => ({
        word: entry.value,
        flags: entry.flags || undefined,
      }))

      const fileContent = generateDictionaryFile(formattedEntries)

      // Set appropriate headers for file download
      return new NextResponse(fileContent, {
        headers: {
          "Content-Type": "text/plain",
          "Content-Disposition": `attachment; filename="${language}.dic"`,
        },
      })
    } else if (type === "aff") {
      // Generate affix file
      const prefixEntries = await db.select().from(prefixes).where({ script })
      const suffixEntries = await db.select().from(suffixes).where({ script })

      const formattedPrefixes = prefixEntries.map((entry) => ({
        flag: "P",
        stripping: "0",
        addition: entry.value,
        condition: ".",
      }))

      const formattedSuffixes = suffixEntries.map((entry) => ({
        flag: "S",
        stripping: "0",
        addition: entry.value,
        condition: ".",
      }))

      const fileContent = generateAffixFile(formattedPrefixes, formattedSuffixes)

      // Set appropriate headers for file download
      return new NextResponse(fileContent, {
        headers: {
          "Content-Type": "text/plain",
          "Content-Disposition": `attachment; filename="${language}.aff"`,
        },
      })
    }
  } catch (error) {
    console.error(`Error generating ${type} file:`, error)
    return NextResponse.json({ error: `Failed to generate ${type} file` }, { status: 500 })
  }
}

