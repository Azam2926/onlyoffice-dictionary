import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText, Database, Settings } from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-8 text-center text-4xl font-bold">
        Dictionary Manager for ONLYOFFICE
      </h1>
      <p className="mb-10 text-center text-lg text-muted-foreground">
        Manage .dic and .aff files for Uzbek language dictionaries
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Dictionary Viewer
            </CardTitle>
            <CardDescription>
              View and explore the contents of .dic and .aff files
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Load and display dictionary files for Uzbek (Latin and Cyrillic)
              from the ONLYOFFICE repository.
            </p>
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
            <CardDescription>
              Manage words, prefixes, and suffixes in the database
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Add, edit, and delete dictionary entries. Manage unique words and
              their properties.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/words" className="w-full">
              <Button className="w-full">Manage Words</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
