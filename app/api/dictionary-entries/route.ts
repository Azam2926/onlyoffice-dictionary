import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { words, prefixes, suffixes } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const type = searchParams.get("type")

  try {
    let entries = []

    // Query the appropriate table based on the type
    switch (type) {
      case "word":
        entries = await db.select().from(words).orderBy(words.createdAt)
        break
      case "prefix":
        entries = await db.select().from(prefixes).orderBy(prefixes.createdAt)
        break
      case "suffix":
        entries = await db.select().from(suffixes).orderBy(suffixes.createdAt)
        break
      default:
        return NextResponse.json({ error: "Invalid entry type" }, { status: 400 })
    }

    return NextResponse.json({ entries })
  } catch (error) {
    console.error(`Error fetching ${type} entries:`, error)
    return NextResponse.json({ error: `Failed to fetch ${type} entries` }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, value, script, flags } = body

    if (!value || !type || !script) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    let result

    // Insert into the appropriate table based on the type
    switch (type) {
      case "word":
        result = await db
          .insert(words)
          .values({
            value,
            script,
            flags: flags || null,
          })
          .returning()
        break
      case "prefix":
        result = await db
          .insert(prefixes)
          .values({
            value,
            script,
          })
          .returning()
        break
      case "suffix":
        result = await db
          .insert(suffixes)
          .values({
            value,
            script,
          })
          .returning()
        break
      default:
        return NextResponse.json({ error: "Invalid entry type" }, { status: 400 })
    }

    return NextResponse.json({ entry: result[0] })
  } catch (error) {
    console.error("Error creating dictionary entry:", error)
    return NextResponse.json({ error: "Failed to create dictionary entry" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const id = searchParams.get("id")
  const type = searchParams.get("type")

  if (!id || !type) {
    return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
  }

  try {
    // Delete from the appropriate table based on the type
    switch (type) {
      case "word":
        await db.delete(words).where(eq(words.id, Number.parseInt(id)))
        break
      case "prefix":
        await db.delete(prefixes).where(eq(prefixes.id, Number.parseInt(id)))
        break
      case "suffix":
        await db.delete(suffixes).where(eq(suffixes.id, Number.parseInt(id)))
        break
      default:
        return NextResponse.json({ error: "Invalid entry type" }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`Error deleting ${type} entry:`, error)
    return NextResponse.json({ error: `Failed to delete ${type} entry` }, { status: 500 })
  }
}

