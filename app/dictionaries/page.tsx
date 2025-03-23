import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import DictionaryViewer from "@/components/dictionary-viewer"

export default function DictionariesPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Dictionary Viewer</h1>
      <p className="text-muted-foreground mb-8">
        View and explore the contents of Uzbek dictionary files from ONLYOFFICE
      </p>

      <Tabs defaultValue="latin">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="latin">Uzbek (Latin)</TabsTrigger>
          <TabsTrigger value="cyrillic">Uzbek (Cyrillic)</TabsTrigger>
        </TabsList>

        <TabsContent value="latin">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>uz_Latn_UZ.dic</CardTitle>
                <CardDescription>Dictionary file (Latin script)</CardDescription>
              </CardHeader>
              <CardContent>
                <DictionaryViewer type="dic" language="uz_Latn_UZ" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>uz_Latn_UZ.aff</CardTitle>
                <CardDescription>Affix file (Latin script)</CardDescription>
              </CardHeader>
              <CardContent>
                <DictionaryViewer type="aff" language="uz_Latn_UZ" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="cyrillic">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>uz_Cyrl_UZ.dic</CardTitle>
                <CardDescription>Dictionary file (Cyrillic script)</CardDescription>
              </CardHeader>
              <CardContent>
                <DictionaryViewer type="dic" language="uz_Cyrl_UZ" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>uz_Cyrl_UZ.aff</CardTitle>
                <CardDescription>Affix file (Cyrillic script)</CardDescription>
              </CardHeader>
              <CardContent>
                <DictionaryViewer type="aff" language="uz_Cyrl_UZ" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

