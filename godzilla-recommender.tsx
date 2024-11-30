"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { godzillaMovies, GodzillaMovie } from './data/godzillaMovies'
import { getRecommendations } from './utils/recommendationAlgorithm'

const questions = [
  {
    id: 'effects',
    question: 'How important are special effects to you?',
    options: [
      { value: '1', label: 'Not important' },
      { value: '2', label: 'Somewhat important' },
      { value: '3', label: 'Important' },
      { value: '4', label: 'Very important' },
    ],
  },
  {
    id: 'story',
    question: 'How important is the story to you?',
    options: [
      { value: '1', label: 'Not important' },
      { value: '2', label: 'Somewhat important' },
      { value: '3', label: 'Important' },
      { value: '4', label: 'Very important' },
    ],
  },
  {
    id: 'action',
    question: 'How much monster action do you want?',
    options: [
      { value: '1', label: 'Minimal' },
      { value: '2', label: 'A good balance' },
      { value: '3', label: 'Lots of action' },
      { value: '4', label: 'Non-stop action' },
    ],
  },
  {
    id: 'tone',
    question: 'What tone do you prefer?',
    options: [
      { value: 'serious', label: 'Serious and dark' },
      { value: 'balanced', label: 'A mix of serious and light-hearted' },
      { value: 'light', label: 'More light-hearted and fun' },
    ],
  },
  {
    id: 'monsterTypes',
    question: 'What type of monsters do you prefer?',
    options: [
      { value: 'godzilla', label: 'Just Godzilla' },
      { value: 'flying', label: 'Flying monsters (e.g., Rodan, Mothra)' },
      { value: 'robot', label: 'Robot monsters (e.g., Mechagodzilla)' },
      { value: 'alien', label: 'Alien monsters (e.g., King Ghidorah, Gigan)' },
      { value: 'variety', label: 'A variety of different monsters' },
    ],
  },
  {
    id: 'preferredTags',
    question: 'Select your preferred themes or elements:',
    options: [
      { value: 'classic', label: 'Classic' },
      { value: 'original', label: 'Original' },
      { value: 'atomic age', label: 'Atomic Age' },
      { value: 'horror', label: 'Horror' },
      { value: 'allegory', label: 'Allegory' },
      { value: 'sequel', label: 'Sequel' },
      { value: 'monster battle', label: 'Monster Battle' },
      { value: 'black and white', label: 'Black and White' },
      { value: 'crossover', label: 'Crossover' },
      { value: 'insect monster', label: 'Insect Monster' },
      { value: 'three headed dragon', label: 'Three-Headed Dragon' },
      { value: 'space', label: 'Space' },
      { value: 'aliens', label: 'Aliens' },
      { value: 'sea monster', label: 'Sea Monster' },
      { value: 'family film', label: 'Family Film' },
      { value: 'all star', label: 'All-Star Cast' },
      { value: 'dream sequence', label: 'Dream Sequence' },
      { value: 'childhood', label: 'Childhood' },
      { value: 'pollution', label: 'Pollution' },
      { value: 'environmentalism', label: 'Environmentalism' },
      { value: 'cyborg', label: 'Cyborg' },
      { value: 'robot monster', label: 'Robot Monster' },
      { value: 'serious', label: 'Serious' },
      { value: 'dark', label: 'Dark' },
      { value: 'nuclear threat', label: 'Nuclear Threat' },
      { value: 'bio-engineered monster', label: 'Bio-Engineered Monster' },
      { value: 'time travel', label: 'Time Travel' },
      { value: 'space monster', label: 'Space Monster' },
      { value: 'climax', label: 'Climax' },
      { value: 'final battle', label: 'Final Battle' },
      { value: 'millennium series', label: 'Millennium Series' },
      { value: 'new era', label: 'New Era' },
      { value: 'reboot', label: 'Reboot' },
      { value: 'monsterVerse', label: 'MonsterVerse' },
      { value: 'political commentary', label: 'Political Commentary' },
    ],
    multiple: true,
  },
]

export default function GodzillaRecommender() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})
  const [recommendations, setRecommendations] = useState<GodzillaMovie[]>([])
  const [currentRecommendationIndex, setCurrentRecommendationIndex] = useState(0)
  const [alreadySeenCount, setAlreadySeenCount] = useState(0)

  const handleAnswer = (value: string) => {
    if (questions[currentQuestion].multiple) {
      setAnswers(prev => {
        const currentAnswers = prev[questions[currentQuestion].id] as string[] || []
        if (currentAnswers.includes(value)) {
          return {
            ...prev,
            [questions[currentQuestion].id]: currentAnswers.filter(v => v !== value)
          }
        } else {
          return {
            ...prev,
            [questions[currentQuestion].id]: [...currentAnswers, value]
          }
        }
      })
    } else {
      setAnswers(prev => ({ ...prev, [questions[currentQuestion].id]: value }))
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      generateRecommendations()
    }
  }

  const generateRecommendations = () => {
    const userPreferences = {
      effects: parseInt(answers.effects as string),
      story: parseInt(answers.story as string),
      action: parseInt(answers.action as string),
      tone: answers.tone as 'serious' | 'balanced' | 'light',
      monsterTypes: answers.monsterTypes as string,
      preferredTags: answers.preferredTags as string[],
    }
    const recommendedMovies = getRecommendations(godzillaMovies, userPreferences)
    setRecommendations(recommendedMovies)
    setCurrentRecommendationIndex(0)
  }

  const handleAlreadySeen = () => {
    if (currentRecommendationIndex < recommendations.length - 1 && alreadySeenCount < 4) {
      setCurrentRecommendationIndex(currentRecommendationIndex + 1)
      setAlreadySeenCount(alreadySeenCount + 1)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setRecommendations([])
    setCurrentRecommendationIndex(0)
    setAlreadySeenCount(0)
  }

  const currentRecommendation = recommendations[currentRecommendationIndex]

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Godzilla Movie Recommender</CardTitle>
        <CardDescription>Answer a few questions to get your perfect Godzilla movie recommendation!</CardDescription>
      </CardHeader>
      <CardContent>
        {recommendations.length === 0 ? (
          <div>
            <h3 className="text-lg font-semibold mb-4">{questions[currentQuestion].question}</h3>
            {questions[currentQuestion].multiple ? (
              <div className="space-y-2">
                {questions[currentQuestion].options.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={option.value}
                      checked={(answers[questions[currentQuestion].id] as string[] || []).includes(option.value)}
                      onCheckedChange={() => handleAnswer(option.value)}
                    />
                    <Label htmlFor={option.value}>{option.label}</Label>
                  </div>
                ))}
              </div>
            ) : (
              <RadioGroup
                value={answers[questions[currentQuestion].id] as string}
                onValueChange={handleAnswer}
              >
                {questions[currentQuestion].options.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value}>{option.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            )}
            <Button
              onClick={handleNext}
              className="mt-4"
              disabled={!answers[questions[currentQuestion].id] || 
                (questions[currentQuestion].multiple && (answers[questions[currentQuestion].id] as string[]).length === 0)}
            >
              {currentQuestion === questions.length - 1 ? "Get Recommendation" : "Next"}
            </Button>
          </div>
        ) : (
          <div>
            <h3 className="text-lg font-semibold mb-4">Your Recommended Godzilla Movie:</h3>
            <p className="text-2xl font-bold mb-2">{currentRecommendation.title}</p>
            <div className="w-full">
              <p>Year: {currentRecommendation.year}</p>
              <p>Era: {currentRecommendation.era}</p>
              <p>Match Score: {(currentRecommendation.score * 100).toFixed(2)}%</p>
              <p>Tags: {currentRecommendation.tags.join(', ')}</p>
            </div>
            <div className="mt-4 space-x-2">
              <Button 
                onClick={handleAlreadySeen} 
                disabled={currentRecommendationIndex === recommendations.length - 1 || alreadySeenCount >= 4}
              >
                I've already seen this one ({4 - alreadySeenCount} skips left)
              </Button>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {recommendations.length > 0 && (
          <Button onClick={resetQuiz}>Start Over</Button>
        )}
      </CardFooter>
    </Card>
  )
}

