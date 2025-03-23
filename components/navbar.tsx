import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Home, Database, FileText, Settings } from "lucide-react";

export default function Navbar() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Database className="h-5 w-5" />
            <span>Dictionary Manager</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link
              href="/dictionaries"
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <FileText className="h-4 w-4" />
              Dictionaries
            </Link>
            <Link
              href="/words"
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <Database className="h-4 w-4" />
              Words
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <Button asChild>
            <Link href="/words">Add New Word</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
