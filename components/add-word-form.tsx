"use client"

import type React from "react"
import {useState} from "react"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Card, CardContent} from "@/components/ui/card"
import {toast} from "@/components/ui/use-toast"

interface AddWordFormProps {
    type: "word" | "prefix" | "suffix"
}

export default function AddWordForm({type}: AddWordFormProps) {
    const [value, setValue] = useState("")
    const [script, setScript] = useState<"latin" | "cyrillic">("latin")
    const [flags, setFlags] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!value.trim()) {
            toast({
                title: "Validation Error",
                description: `Please enter a ${type} value.`,
                variant: "destructive",
            })
            return
        }

        setIsSubmitting(true)

        try {
            // In a real app, this would submit to your API
            const response = await fetch('/api/dictionary-entries', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({type, value, script, flags}),
            })

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // if (!response.ok) throw new Error('Failed to add entry')

            toast({
                title: "Success",
                description: `${type.charAt(0).toUpperCase() + type.slice(1)} added successfully.`,
            })

            // Reset form
            setValue("")
            setFlags("")
        } catch (error) {
            toast({
                title: "Error",
                description: `Failed to add ${type}. Please try again.`,
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Card>
            <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor={`${type}-value`}>{type.charAt(0).toUpperCase() + type.slice(1)} Value</Label>
                        <Input
                            id={`${type}-value`}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder={`Enter ${type} value...`}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Script</Label>
                        <RadioGroup
                            value={script}
                            onValueChange={(value) => setScript(value as "latin" | "cyrillic")}
                            className="flex space-x-4"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="latin" id="latin"/>
                                <Label htmlFor="latin">Latin</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="cyrillic" id="cyrillic"/>
                                <Label htmlFor="cyrillic">Cyrillic</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {type === "word" && (
                        <div className="space-y-2">
                            <Label htmlFor="flags">Flags (optional)</Label>
                            <Select value={flags} onValueChange={setFlags}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select flag"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="N">N (Noun)</SelectItem>
                                    <SelectItem value="V">V (Verb)</SelectItem>
                                    <SelectItem value="A">A (Adjective)</SelectItem>
                                    <SelectItem value="D">D (Adverb)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Adding..." : `Add ${type.charAt(0).toUpperCase() + type.slice(1)}`}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}

