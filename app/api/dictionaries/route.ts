import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

const DICTIONARY_BASE_PATH = path.join(process.cwd(), "dictionaries")

export async function GET(req: Request, { params }: { params: { language: string; type: string } }) {
  const { language, type } = params;

  // Validate parameters to prevent directory traversal attacks
  if (!["uz_Latn_UZ", "uz_Cyrl_UZ"].includes(language) || !["dic", "aff"].includes(type)) {
    return NextResponse.json({ error: "Invalid language or file type" }, { status: 400 });
  }

  try {
    // Construct the file path
    const filePath = path.join(DICTIONARY_BASE_PATH, `${language}`, `${language}.${type}`);

    // Read the file
    const fileContent = await fs.readFile(filePath, "utf-8");

    // Split the content by lines
    const lines = fileContent.split("\n");

    return NextResponse.json({ content: lines });
  } catch (error) {
    console.error(`Error reading dictionary file: ${error}`);

    return NextResponse.json({ error: "Failed to read dictionary file" }, { status: 500 });
  }
}