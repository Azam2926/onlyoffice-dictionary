import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <p className="text-muted-foreground mb-8">Configure application settings and database connections</p>

      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
          <TabsTrigger value="dictionaries">Dictionaries</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure general application settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="app-name">Application Name</Label>
                <Input id="app-name" defaultValue="Dictionary Manager" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="default-language">Default Language</Label>
                <select
                  id="default-language"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
                  defaultValue="uz_Latn_UZ"
                >
                  <option value="uz_Latn_UZ">Uzbek (Latin)</option>
                  <option value="uz_Cyrl_UZ">Uzbek (Cyrillic)</option>
                </select>
              </div>

              <Button>Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database">
          <Card>
            <CardHeader>
              <CardTitle>Database Configuration</CardTitle>
              <CardDescription>Configure PostgreSQL database connection settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="db-host">Database Host</Label>
                <Input id="db-host" placeholder="localhost" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="db-port">Database Port</Label>
                <Input id="db-port" placeholder="5432" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="db-name">Database Name</Label>
                <Input id="db-name" placeholder="dictionary_db" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="db-user">Database User</Label>
                <Input id="db-user" placeholder="postgres" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="db-password">Database Password</Label>
                <Input id="db-password" type="password" />
              </div>

              <div className="flex gap-4">
                <Button>Test Connection</Button>
                <Button>Save Configuration</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dictionaries">
          <Card>
            <CardHeader>
              <CardTitle>Dictionary Files</CardTitle>
              <CardDescription>Configure paths to dictionary files</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="dic-path">Dictionary Files Path</Label>
                <Input id="dic-path" placeholder="/path/to/dictionaries" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="repo-url">Repository URL</Label>
                <Input id="repo-url" defaultValue="https://github.com/ONLYOFFICE/dictionaries" />
              </div>

              <div className="flex gap-4">
                <Button>Fetch Dictionary Files</Button>
                <Button>Save Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

