import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import WordsTable from "@/components/words-table"
import AddWordForm from "@/components/add-word-form"

export default function WordsPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Word Database</h1>
      <p className="text-muted-foreground mb-8">Manage words, prefixes, and suffixes in the dictionary database</p>

      <Tabs defaultValue="words">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="words">Words</TabsTrigger>
          <TabsTrigger value="prefixes">Prefixes</TabsTrigger>
          <TabsTrigger value="suffixes">Suffixes</TabsTrigger>
        </TabsList>

        <TabsContent value="words">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Word List</h2>
                <div className="flex gap-2">
                  <Input placeholder="Search words..." className="max-w-xs" />
                </div>
              </div>
              <WordsTable type="word" />
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Add New Word</h2>
              <AddWordForm type="word" />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="prefixes">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Prefix List</h2>
                <div className="flex gap-2">
                  <Input placeholder="Search prefixes..." className="max-w-xs" />
                </div>
              </div>
              <WordsTable type="prefix" />
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Add New Prefix</h2>
              <AddWordForm type="prefix" />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="suffixes">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Suffix List</h2>
                <div className="flex gap-2">
                  <Input placeholder="Search suffixes..." className="max-w-xs" />
                </div>
              </div>
              <WordsTable type="suffix" />
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Add New Suffix</h2>
              <AddWordForm type="suffix" />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

