import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Database, Settings } from "lucide-react"

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8 text-center">Dictionary Manager for ONLYOFFICE</h1>
      <p className="text-lg text-center mb-10 text-muted-foreground">
        Manage .dic and .aff files for Uzbek language dictionaries
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Dictionary Viewer
            </CardTitle>
            <CardDescription>View and explore the contents of .dic and .aff files</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Load and display dictionary files for Uzbek (Latin and Cyrillic) from the ONLYOFFICE repository.</p>
          </CardContent>
          <CardFooter>
            <Link href="/dictionaries" className="w-full">
              <Button className="w-full">View Dictionaries</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Word Database
            </CardTitle>
            <CardDescription>Manage words, prefixes, and suffixes in the database</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Add, edit, and delete dictionary entries. Manage unique words and their properties.</p>
          </CardContent>
          <CardFooter>
            <Link href="/words" className="w-full">
              <Button className="w-full">Manage Words</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Settings
            </CardTitle>
            <CardDescription>Configure application settings</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Set up database connections, file paths, and other configuration options for the application.</p>
          </CardContent>
          <CardFooter>
            <Link href="/settings" className="w-full">
              <Button className="w-full">Open Settings</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

