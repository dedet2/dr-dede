import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { BookOpen, VideoCamera, Calendar, ArrowRight, Star, Clock, Users, TrendUp, Target, Lightbulb, X } from "@phosphor-icons/react"
import { useKV } from '@github/spark/hooks'
import { toast } from 'sonner'

declare global {
  interface Window {
    spark: {
      llm: (prompt: string, model?: string, jsonMode?: boolean) => Promise<string>
      llmPrompt: (strings: TemplateStringsArray, ...values: any[]) => string
      user: () => Promise<{avatarUrl: string, email: string, id: string, isOwner: boolean, login: string}>
      kv: {
        get: <T>(key: string) => Promise<T | undefined>
        set: <T>(key: string, value: T) => Promise<void>
        keys: () => Promise<string[]>
        delete: (key: string) => Promise<void>
      }
    }
  }
}

interface ContentItem {
  id: string
  title: string
  type: 'article' | 'video' | 'case-study' | 'resource' | 'event'
  category: string
  description: string
  tags: string[]
  url?: string
  duration?: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  relevanceScore: number
  viewCount: number
  rating: number
  publishedAt: string
  thumbnail?: string
}

interface UserPreferences {
  interests: string[]
  experienceLevel: string
  role: string
  industryFocus: string[]
  contentTypes: string[]
  readingTime: string
  lastInteraction: string
  viewHistory: string[]
  bookmarks: string[]
}

interface RecommendationEngine {
  generateRecommendations: (preferences: UserPreferences) => Promise<ContentItem[]>
  trackInteraction: (contentId: string, interactionType: string) => void
  updatePreferences: (preferences: Partial<UserPreferences>) => void
}

export default function AIContentRecommendations() {
  const [userPreferences, setUserPreferences] = useKV<UserPreferences>('user-content-preferences', {
    interests: [],
    experienceLevel: 'intermediate',
    role: '',
    industryFocus: [],
    contentTypes: ['article', 'video', 'case-study'],
    readingTime: '10',
    lastInteraction: '',
    viewHistory: [],
    bookmarks: []
  })

  const [recommendations, setRecommendations] = useState<ContentItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null)
  const [showPreferences, setShowPreferences] = useState(false)

  // Sample content database (in production, this would come from a CMS/API)
  const contentDatabase: ContentItem[] = [
    {
      id: '1',
      title: 'AI Governance Framework Implementation Guide',
      type: 'article',
      category: 'AI Governance',
      description: 'Comprehensive guide to implementing AI governance frameworks in enterprise environments with practical examples and templates.',
      tags: ['governance', 'framework', 'implementation', 'enterprise'],
      url: 'https://www.incluu.us/blog/ai-governance-framework',
      difficulty: 'intermediate',
      relevanceScore: 0.95,
      viewCount: 2847,
      rating: 4.8,
      publishedAt: '2024-03-15',
      duration: '15 min read'
    },
    {
      id: '2',
      title: 'Building Accessible AI Interfaces: A Case Study',
      type: 'case-study',
      category: 'Accessibility',
      description: 'How a Fortune 500 company redesigned their AI tools to be accessible, resulting in 40% broader user adoption.',
      tags: ['accessibility', 'UI/UX', 'case-study', 'inclusive-design'],
      url: 'https://www.incluu.us/case-studies/accessible-ai-interfaces',
      difficulty: 'advanced',
      relevanceScore: 0.92,
      viewCount: 1653,
      rating: 4.9,
      publishedAt: '2024-02-28',
      duration: '12 min read'
    },
    {
      id: '3',
      title: 'TEDx Talk: Reimagining AI for Equitable Innovation',
      type: 'video',
      category: 'Systems Change',
      description: 'Dr. Dédé\'s powerful TEDx presentation on transforming AI systems to serve everyone, not just the privileged few.',
      tags: ['tedx', 'systems-change', 'equity', 'innovation'],
      url: 'https://www.youtube.com/watch?v=YtYXwV8YdNI',
      difficulty: 'beginner',
      relevanceScore: 0.98,
      viewCount: 15420,
      rating: 4.9,
      publishedAt: '2024-01-20',
      duration: '18 min'
    },
    {
      id: '4',
      title: 'Bias Detection in Healthcare AI Systems',
      type: 'article',
      category: 'Healthcare AI',
      description: 'Methods and tools for identifying and mitigating bias in AI diagnostic tools to ensure equitable patient outcomes.',
      tags: ['healthcare', 'bias-detection', 'diagnostics', 'equity'],
      url: 'https://www.incluu.us/blog/bias-detection-healthcare',
      difficulty: 'advanced',
      relevanceScore: 0.89,
      viewCount: 987,
      rating: 4.7,
      publishedAt: '2024-03-08',
      duration: '20 min read'
    },
    {
      id: '5',
      title: 'AI Ethics Workshop Materials',
      type: 'resource',
      category: 'AI Ethics',
      description: 'Complete workshop kit including slides, exercises, and facilitator guides for conducting AI ethics training sessions.',
      tags: ['workshop', 'ethics', 'training', 'materials'],
      url: 'https://www.incluu.us/resources/ai-ethics-workshop',
      difficulty: 'intermediate',
      relevanceScore: 0.85,
      viewCount: 1234,
      rating: 4.6,
      publishedAt: '2024-02-15',
      duration: '2 hours'
    },
    {
      id: '6',
      title: 'AI Governance Maturity Assessment Tool',
      type: 'resource',
      category: 'Assessment',
      description: 'Interactive tool to evaluate your organization\'s AI governance maturity and identify improvement opportunities.',
      tags: ['assessment', 'maturity', 'governance', 'tool'],
      difficulty: 'beginner',
      relevanceScore: 0.91,
      viewCount: 3421,
      rating: 4.8,
      publishedAt: '2024-03-01',
      duration: '30 min'
    }
  ]

  // AI-powered recommendation engine
  const generateRecommendations = async (preferences: UserPreferences): Promise<ContentItem[]> => {
    setIsLoading(true)
    
    try {
      // Create AI prompt for content recommendations
      const prompt = window.spark.llmPrompt`
        You are an AI content recommendation system for Dr. Dédé Tetsubayashi's professional website. 
        
        User Profile:
        - Interests: ${preferences.interests.join(', ') || 'AI governance, accessibility'}
        - Experience Level: ${preferences.experienceLevel}
        - Role: ${preferences.role || 'professional'}
        - Industry Focus: ${preferences.industryFocus.join(', ') || 'technology'}
        - Preferred Content Types: ${preferences.contentTypes.join(', ')}
        - Available Reading Time: ${preferences.readingTime} minutes
        - Previous Views: ${preferences.viewHistory.slice(-5).join(', ') || 'none'}
        
        Available Content: ${JSON.stringify(contentDatabase.map(c => ({
          id: c.id,
          title: c.title,
          type: c.type,
          category: c.category,
          tags: c.tags,
          difficulty: c.difficulty,
          duration: c.duration
        })))}
        
        Rank the content items by relevance to this user's profile and return the top 6 content IDs in order of recommendation priority. Consider:
        1. Alignment with stated interests
        2. Appropriate difficulty level
        3. Preferred content types
        4. Available time constraints
        5. Diversity of content types and topics
        6. Avoid recently viewed items
        
        Return only a JSON array of content IDs: ["1", "3", "2", ...]
      `
      
      const aiResponse = await window.spark.llm(prompt, 'gpt-4o-mini', true)
      const recommendedIds = JSON.parse(aiResponse) as string[]
      
      // Get recommended content items and sort by AI ranking
      const recommendedContent = recommendedIds.map(id => {
        const content = contentDatabase.find(c => c.id === id)
        return content
      }).filter(Boolean) as ContentItem[]
      
      // Update relevance scores based on AI ranking
      recommendedContent.forEach((content, index) => {
        content.relevanceScore = (recommendedContent.length - index) / recommendedContent.length
      })
      
      setIsLoading(false)
      return recommendedContent
      
    } catch (error) {
      console.error('AI recommendation error:', error)
      
      // Fallback to rule-based recommendations
      const fallbackRecommendations = contentDatabase
        .filter(content => {
          // Filter by user preferences
          const matchesInterests = preferences.interests.length === 0 || 
            preferences.interests.some(interest => 
              content.tags.some(tag => tag.toLowerCase().includes(interest.toLowerCase())) ||
              content.category.toLowerCase().includes(interest.toLowerCase())
            )
          
          const matchesContentType = preferences.contentTypes.includes(content.type)
          const matchesDifficulty = content.difficulty === preferences.experienceLevel || 
            preferences.experienceLevel === 'intermediate'
          
          return matchesInterests && matchesContentType && matchesDifficulty
        })
        .sort((a, b) => b.relevanceScore - a.relevanceScore)
        .slice(0, 6)
      
      setIsLoading(false)
      return fallbackRecommendations
    }
  }

  // Track user interaction
  const trackInteraction = (contentId: string, interactionType: 'view' | 'bookmark' | 'share') => {
    setUserPreferences(currentPrefs => {
      if (!currentPrefs) return {
        interests: [],
        experienceLevel: 'intermediate',
        role: '',
        industryFocus: [],
        contentTypes: ['article', 'video', 'case-study'],
        readingTime: '10',
        lastInteraction: new Date().toISOString(),
        viewHistory: interactionType === 'view' ? [contentId] : [],
        bookmarks: interactionType === 'bookmark' ? [contentId] : []
      }
      
      const updatedPrefs = { ...currentPrefs }
      
      if (interactionType === 'view') {
        updatedPrefs.viewHistory = [...(updatedPrefs.viewHistory || []), contentId].slice(-20)
      } else if (interactionType === 'bookmark') {
        updatedPrefs.bookmarks = updatedPrefs.bookmarks?.includes(contentId) 
          ? updatedPrefs.bookmarks.filter(id => id !== contentId)
          : [...(updatedPrefs.bookmarks || []), contentId]
      }
      
      updatedPrefs.lastInteraction = new Date().toISOString()
      return updatedPrefs
    })
  }

  // Load recommendations on component mount and preference changes
  useEffect(() => {
    if (userPreferences) {
      generateRecommendations(userPreferences).then(setRecommendations)
    }
  }, [userPreferences?.interests, userPreferences?.experienceLevel, userPreferences?.contentTypes])

  // Handle content click
  const handleContentClick = (content: ContentItem) => {
    trackInteraction(content.id, 'view')
    if (content.url) {
      window.open(content.url, '_blank')
    } else {
      setSelectedContent(content)
    }
  }

  // Handle bookmark toggle
  const handleBookmark = (contentId: string) => {
    trackInteraction(contentId, 'bookmark')
    toast.success(
      userPreferences?.bookmarks?.includes(contentId) 
        ? 'Removed from bookmarks' 
        : 'Added to bookmarks'
    )
  }

  // Get content type icon
  const getContentIcon = (type: string) => {
    switch (type) {
      case 'video': return <VideoCamera size={16} />
      case 'event': return <Calendar size={16} />
      case 'resource': return <Target size={16} />
      case 'case-study': return <TrendUp size={16} />
      default: return <BookOpen size={16} />
    }
  }

  // Get difficulty color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800'
      case 'advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-blue-100 text-blue-800'
    }
  }

  if (isLoading) {
    return (
      <Card className="w-full max-w-6xl mx-auto">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <Lightbulb size={48} className="mx-auto text-accent animate-pulse" />
            <h3 className="text-lg font-semibold">Generating Personalized Recommendations</h3>
            <p className="text-muted-foreground">AI is analyzing your interests to find the most relevant content...</p>
            <Progress value={75} className="w-48 mx-auto" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <section className="py-12 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
                <Lightbulb size={32} className="text-accent" />
                AI-Curated for You
              </h2>
              <p className="text-lg text-muted-foreground">
                Personalized content recommendations based on your interests and goals
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setShowPreferences(true)}
              className="flex items-center gap-2"
            >
              <Target size={16} />
              Customize
            </Button>
          </div>

          {recommendations.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Target size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Set Your Preferences</h3>
                <p className="text-muted-foreground mb-4">
                  Tell us about your interests to get personalized content recommendations.
                </p>
                <Button onClick={() => setShowPreferences(true)}>
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((content, index) => (
                <Card 
                  key={content.id} 
                  className="h-full cursor-pointer hover:shadow-lg transition-all duration-200 relative"
                  onClick={() => handleContentClick(content)}
                >
                  <CardContent className="p-0">
                    {content.thumbnail && (
                      <img 
                        src={content.thumbnail} 
                        alt={content.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                    )}
                    
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {getContentIcon(content.type)}
                          <Badge variant="secondary" className="text-xs">
                            {content.type}
                          </Badge>
                          <Badge className={`text-xs ${getDifficultyColor(content.difficulty)}`}>
                            {content.difficulty}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleBookmark(content.id)
                          }}
                          className="p-1 h-auto"
                        >
                          <Star 
                            size={16} 
                            weight={userPreferences?.bookmarks?.includes(content.id) ? 'fill' : 'regular'}
                            className={userPreferences?.bookmarks?.includes(content.id) ? 'text-yellow-500' : ''}
                          />
                        </Button>
                      </div>

                      <h3 className="font-semibold mb-2 line-clamp-2 leading-tight">
                        {content.title}
                      </h3>
                      
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                        {content.description}
                      </p>

                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {content.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users size={12} />
                          {content.viewCount.toLocaleString()}
                        </span>
                        <div className="flex items-center gap-1">
                          <Star size={12} weight="fill" className="text-yellow-500" />
                          {content.rating}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {content.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-xs text-muted-foreground">
                          {content.category}
                        </div>
                        <div className="flex items-center gap-1 text-accent">
                          <span className="text-xs font-medium">
                            {Math.round(content.relevanceScore * 100)}% match
                          </span>
                        </div>
                      </div>
                    </div>

                    {index === 0 && (
                      <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-medium px-2 py-1 rounded-full">
                        Top Pick
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="mt-8 text-center">
            <Button 
              onClick={() => generateRecommendations(userPreferences || {} as UserPreferences).then(setRecommendations)}
              variant="outline"
            >
              <ArrowRight size={16} className="mr-2" />
              Refresh Recommendations
            </Button>
          </div>
        </div>
      </div>

      {/* Preferences Dialog */}
      <Dialog open={showPreferences} onOpenChange={setShowPreferences}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Customize Your Content Preferences</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Areas of Interest</label>
              <div className="grid grid-cols-2 gap-2">
                {['AI Governance', 'Accessibility', 'Ethics', 'Healthcare AI', 'Systems Change', 'Leadership', 'Policy', 'Innovation'].map((interest) => (
                  <label key={interest} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={userPreferences?.interests?.includes(interest) || false}
                      onChange={(e) => {
                        const updatedInterests = e.target.checked
                          ? [...(userPreferences?.interests || []), interest]
                          : (userPreferences?.interests || []).filter(i => i !== interest)
                        setUserPreferences(prev => ({ 
                          ...prev, 
                          interests: updatedInterests,
                          experienceLevel: prev?.experienceLevel || 'intermediate',
                          role: prev?.role || '',
                          industryFocus: prev?.industryFocus || [],
                          contentTypes: prev?.contentTypes || ['article', 'video', 'case-study'],
                          readingTime: prev?.readingTime || '10',
                          lastInteraction: prev?.lastInteraction || '',
                          viewHistory: prev?.viewHistory || [],
                          bookmarks: prev?.bookmarks || []
                        }))
                      }}
                      className="rounded"
                    />
                    <span className="text-sm">{interest}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Experience Level</label>
              <div className="flex gap-4">
                {['beginner', 'intermediate', 'advanced'].map((level) => (
                  <label key={level} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="experienceLevel"
                      value={level}
                      checked={userPreferences?.experienceLevel === level}
                      onChange={(e) => setUserPreferences(prev => ({ 
                        interests: prev?.interests || [],
                        role: prev?.role || '',
                        industryFocus: prev?.industryFocus || [],
                        contentTypes: prev?.contentTypes || ['article', 'video', 'case-study'],
                        readingTime: prev?.readingTime || '10',
                        lastInteraction: prev?.lastInteraction || '',
                        viewHistory: prev?.viewHistory || [],
                        bookmarks: prev?.bookmarks || [],
                        experienceLevel: e.target.value 
                      }))}
                    />
                    <span className="text-sm capitalize">{level}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Preferred Content Types</label>
              <div className="grid grid-cols-2 gap-2">
                {['article', 'video', 'case-study', 'resource', 'event'].map((type) => (
                  <label key={type} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={userPreferences?.contentTypes?.includes(type) || false}
                      onChange={(e) => {
                        const updatedTypes = e.target.checked
                          ? [...(userPreferences?.contentTypes || []), type]
                          : (userPreferences?.contentTypes || []).filter(t => t !== type)
                        setUserPreferences(prev => ({ 
                          interests: prev?.interests || [],
                          experienceLevel: prev?.experienceLevel || 'intermediate',
                          role: prev?.role || '',
                          industryFocus: prev?.industryFocus || [],
                          readingTime: prev?.readingTime || '10',
                          lastInteraction: prev?.lastInteraction || '',
                          viewHistory: prev?.viewHistory || [],
                          bookmarks: prev?.bookmarks || [],
                          contentTypes: updatedTypes
                        }))
                      }}
                      className="rounded"
                    />
                    <span className="text-sm capitalize">{type.replace('-', ' ')}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowPreferences(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                setShowPreferences(false)
                toast.success('Preferences updated! Refreshing recommendations...')
                generateRecommendations(userPreferences || {} as UserPreferences).then(setRecommendations)
              }}>
                Save Preferences
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}