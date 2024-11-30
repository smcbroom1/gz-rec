"use client"

import { useState } from 'react'
import { godzillaMovies, GodzillaMovie } from './data/godzillaMovies'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

export default function GodzillaRecommender() {
  const [preferences, setPreferences] = useState({
    era: '',
    tone: '',
    humanFocus: 3,
    specialEffects: '',
    otherMonsters: ''
  })
  const [recommendations, setRecommendations] = useState<GodzillaMovie[]>([])

  const handlePreferenceChange = (name: string, value: string | number) => {
    setPreferences(prev => ({ ...prev, [name]: value }))
  }

  const getRecommendations = () => {
    const filteredMovies = godzillaMovies.filter(movie => {
      if (preferences.era && movie.era !== preferences.era) return false
      if (preferences.tone && movie.tone !== preferences.tone) return false
      if (preferences.specialEffects && movie.specialEffects !== preferences.specialEffects) return false
      if (preferences.otherMonsters && !movie.otherMonsters.includes(preferences.otherMonsters)) return false
      return true
    })

    const scoredMovies = filteredMovies.map(movie => ({
      ...movie,
      score: Math.abs(movie.humanFocus - preferences.humanFocus)
    }))

    scoredMovies.sort((a, b) => a.score - b.score)
    setRecommendations(scoredMovies.slice(0, 3))
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Godzilla Movie Recommender</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Your Preferences</CardTitle>
          <CardDescription>Tell us what you like in a Godzilla movie</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="era">Preferred Era</Label>
            <Select onValueChange={(value) => handlePreferenceChange('era', value)}>
              <SelectTrigger id="era">
                <SelectValue placeholder="Select an era" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Showa">Showa (1954-1975)</SelectItem>
                <SelectItem value="Heisei">Heisei (1984-1995)</SelectItem>
                <SelectItem value="Millennium">Millennium (1999-2004)</SelectItem>
                <SelectItem value="MonsterVerse">MonsterVerse (2014-present)</SelectItem>
                <SelectItem value="Reiwa">Reiwa (2016-present)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Preferred Tone</Label>
            <RadioGroup onValueChange={(value) => handlePreferenceChange('tone', value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Serious" id="serious" />
                <Label htmlFor="serious">Serious</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Campy" id="campy" />
                <Label htmlFor="campy">Campy</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Balanced" id="balanced" />
                <Label htmlFor="balanced">Balanced</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label>Human Focus (1: Monster-focused, 5: Human-focused)</Label>
            <Slider
              min={1}
              max={5}
              step={1}
              value={[preferences.humanFocus]}
              onValueChange={(value) => handlePreferenceChange('humanFocus', value[0])}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="specialEffects">Preferred Special Effects</Label>
            <Select onValueChange={(value) => handlePreferenceChange('specialEffects', value)}>
              <SelectTrigger id="specialEffects">
                <SelectValue placeholder="Select special effects type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Practical">Practical</SelectItem>
                <SelectItem value="CGI">CGI</SelectItem>
                <SelectItem value="Mixed">Mixed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="otherMonsters">Other Monsters</Label>
            <Input
              id="otherMonsters"
              placeholder="e.g., Mothra, King Ghidorah"
              onChange={(e) => handlePreferenceChange('otherMonsters', e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={getRecommendations}>Get Recommendations</Button>
        </CardFooter>
      </Card>
      {recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recommended Godzilla Movies</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {recommendations.map((movie, index) => (
                <li key={index} className="border-b pb-4 last:border-b-0">
                  <h3 className="text-xl font-semibold">{movie.title} ({movie.year})</h3>
                  <p>Era: {movie.era}</p>
                  <p>Tone: {movie.tone}</p>
                  <p>Human Focus: {movie.humanFocus}/5</p>
                  <p>Special Effects: {movie.specialEffects}</p>
                  <p>Other Monsters: {movie.otherMonsters.join(', ') || 'None'}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

