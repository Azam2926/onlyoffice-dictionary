"use server";

import path from "path";
import fs from "fs/promises";
import { db } from "@/lib/db";
import { words } from "@/lib/db/schema";

const DICTIONARY_BASE_PATH = path.join(process.cwd(), "dictionaries");

export async function syncDicFileAction(language: string, type: string) {
  // Validate parameters to prevent directory traversal attacks
  if (
    !["uz_Latn_UZ", "uz_Cyrl_UZ"].includes(language) ||
    !["dic", "aff"].includes(type)
  ) {
    return { success: false, error: "Invalid language or type" };
  }

  try {
    const filePath = path.join(
      DICTIONARY_BASE_PATH,
      `${language}`,
      `${language}.${type}`,
    );
    const content = await fs.readFile(filePath, "utf8");
    const lines = content
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    // The first line is the word count so skip it.
    const [countLine, ...entries] = lines;

    // Parse each dictionary entry.
    // Each line is expected in the form: word/flags (or just word)
    const wordEntries = entries.map(async (entry) => {
      const [word, flags] = entry.split("/");
      await db.insert(words).values({ value: word, script: language, flags });
    });

    // Optionally, you can add conflict handling if you have a unique constraint.
    // For example, you might use an upsert or filter out duplicates before inserting.

    return { success: true, count: wordEntries.length };
  } catch (error: any) {
    console.error("Error syncing .dic file:", error);
    return { success: false, error: error.message };
  }
}
