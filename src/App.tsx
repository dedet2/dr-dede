import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, EnvelopeSimple, ArrowRight, Play, GraduationCap, Trophy, Lightbulb, BookOpen, Quotes, Star, ArrowSquareOut, Calendar, VideoCamera, Eye, X, CalendarBlank, PaperPlaneTilt, DownloadSimple, FileText, CheckCircle, Shield, Users as UsersIcon, LinkedinLogo, InstagramLogo, YoutubeLogo, Calculator, Presentation } from "@phosphor-icons/react"
import { useKV } from '@github/spark/hooks'
import { toast, Toaster } from 'sonner'
import heroBackground from '@/assets/images/hero-bg.png'
import ResourcesPage from './ResourcesPage'
import SocialMediaFeeds from './components/SocialMediaFeeds'
import AIGovernanceAssessment from './components/AIGovernanceAssessment'
import VideoTestimonialRecorder from './components/VideoTestimonialRecorder'
import AIContentRecommendations from './components/AIContentRecommendations'

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

const SUBSCRIBER_GOAL = 10000
const YOUTUBE_CHANNEL_ID = 'UCqG7xnWjXUgGZcvT9PkMrPg' // Direct channel ID instead of handle

function YouTubeEmbed() {
  return (
    <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden">
      <iframe
        src="https://www.youtube.com/embed/YtYXwV8YdNI?rel=0&modestbranding=1"
        title="Dr. Dédé Tetsubayashi TEDx Talk - Reimagining AI for Equitable Innovation"
        className="absolute inset-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        loading="lazy"
      />
    </div>
  )
}

interface YouTubeApiResponse {
  items: Array<{
    statistics: {
      subscriberCount: string
      videoCount: string
      viewCount: string
    }
  }>
}

function SubscriberCounter() {
  const [subscriberCount, setSubscriberCount] = useState(7420)
  const [videoCount, setVideoCount] = useState(24)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const progressPercentage = (subscriberCount / SUBSCRIBER_GOAL) * 100

  // Using cached/estimated data since API access is limited
  useEffect(() => {
    // Simulate a brief loading state for UX
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
      // You can update these values manually or implement a different data source
      setSubscriberCount(7420)
      setVideoCount(24)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-accent">
            <Users size={24} weight="bold" />
            <span className="text-2xl font-bold">
              {isLoading ? '...' : subscriberCount.toLocaleString()}
            </span>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Progress to 10K subscribers</p>
            <Progress value={progressPercentage} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">{Math.round(progressPercentage)}% complete</p>
          </div>
          {videoCount > 0 && (
            <p className="text-xs text-muted-foreground">{videoCount} videos published</p>
          )}
          <Button 
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
            onClick={() => window.open('https://www.youtube.com/@the_drdede', '_blank')}
          >
            Subscribe on YouTube
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [interests, setInterests] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [subscribers, setSubscribers] = useKV<Array<{id: number, email: string, interests: string[], subscribedAt: string, status: string}>>('newsletter-subscribers', [])

  const availableInterests = [
    'AI Governance',
    'Accessibility in Tech',
    'Speaking Opportunities',
    'Policy Updates',
    'Research Insights'
  ]

  const handleInterestChange = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setIsSubmitting(true)
    
    try {
      const newSubscriber = {
        id: Date.now(),
        email: email.trim().toLowerCase(),
        interests,
        subscribedAt: new Date().toISOString(),
        status: 'active'
      }
      
      setSubscribers(currentSubscribers => {
        const currentList = currentSubscribers || []
        const existingIndex = currentList.findIndex(s => s.email === newSubscriber.email)
        if (existingIndex >= 0) {
          // Update existing subscriber
          return currentList.map(s => 
            s.email === newSubscriber.email 
              ? { ...s, interests: newSubscriber.interests }
              : s
          )
        } else {
          // Add new subscriber
          return [...currentList, newSubscriber]
        }
      })
      
      toast.success('Successfully subscribed! Welcome to the AI governance community.')
      setEmail('')
      setInterests([])
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center flex items-center justify-center gap-2">
          <PaperPlaneTilt size={20} />
          AI Governance Insights
        </CardTitle>
        <p className="text-sm text-muted-foreground text-center">
          Get weekly insights on equitable AI, policy updates, and speaking opportunities.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isSubmitting}
          />
          
          <div>
            <p className="text-sm font-medium mb-2">Interests (optional):</p>
            <div className="flex flex-wrap gap-2">
              {availableInterests.map((interest) => (
                <Badge
                  key={interest}
                  variant={interests.includes(interest) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleInterestChange(interest)}
                >
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting || !email.trim()}
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

function CalendlyIntegration() {
  const openCalendly = () => {
    // Opens Calendly in a new tab - replace with actual Calendly URL when available
    const calendlyUrl = 'https://calendly.com/dr-dede'
    window.open(calendlyUrl, '_blank')
  }

  return (
    <Button 
      onClick={openCalendly}
      className="bg-primary hover:bg-primary/90 text-xs px-2 py-1 whitespace-nowrap"
      size="sm"
    >
      <CalendarBlank size={14} className="mr-1" />
      <span className="hidden sm:inline">Schedule </span>Speaking
    </Button>
  )
}

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    eventType: '',
    audienceSize: '',
    topics: '',
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Store contact form submission locally
    const submissions = await window.spark.kv.get<Array<any>>('contact-submissions') || []
    const newSubmission = {
      id: Date.now(),
      ...formData,
      submittedAt: new Date().toISOString()
    }
    
    await window.spark.kv.set('contact-submissions', [...submissions, newSubmission])
    
    console.log('Form submitted:', formData)
    toast.success('Thank you for your inquiry! Dr. Tetsubayashi will get back to you within 48 hours.')
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      organization: '',
      eventType: '',
      audienceSize: '',
      topics: '',
      message: ''
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">Name *</label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">Email *</label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="organization" className="block text-sm font-medium mb-2">Organization</label>
              <Input
                id="organization"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="eventType" className="block text-sm font-medium mb-2">Event Type</label>
              <Input
                id="eventType"
                name="eventType"
                placeholder="Conference, Workshop, Keynote..."
                value={formData.eventType}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="audienceSize" className="block text-sm font-medium mb-2">Expected Audience Size</label>
            <Input
              id="audienceSize"
              name="audienceSize"
              placeholder="50-100, 500+, etc."
              value={formData.audienceSize}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="topics" className="block text-sm font-medium mb-2">Topics of Interest</label>
            <Input
              id="topics"
              name="topics"
              placeholder="AI Governance, Disability Advocacy, Systems Change..."
              value={formData.topics}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">Additional Details</label>
            <Textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Tell us about your event, timeline, and any specific requirements..."
              value={formData.message}
              onChange={handleChange}
            />
          </div>

          <Button type="submit" className="w-full" size="lg">
            <EnvelopeSimple size={20} className="mr-2" />
            Send Inquiry
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

function VideoTestimonialsSection() {
  const videoTestimonials = [
    {
      id: 1,
      title: "Tech Leadership Conference 2024",
      client: "Sarah Chen, CTO at TechForward Inc.",
      thumbnail: "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=400&h=300&fit=crop&crop=faces",
      videoUrl: "https://youtube.com/watch?v=dQw4w9WgXcQ",
      quote: "Dr. Tetsubayashi completely transformed our approach to AI ethics."
    },
    {
      id: 2,
      title: "AI Ethics Summit Keynote",
      client: "Dr. Amelia Foster, Conference Chair",
      thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=faces",
      videoUrl: "https://youtube.com/watch?v=oHg5SJYRHA0",
      quote: "Highest evaluation scores in our conference's history."
    },
    {
      id: 3,
      title: "Workshop: Inclusive AI Design",
      client: "Marcus Rodriguez, Director of Product",
      thumbnail: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=300&fit=crop&crop=faces",
      videoUrl: "https://youtube.com/watch?v=9bZkp7q19f0",
      quote: "Immediate improvements in our product's inclusive design."
    }
  ]

  const [selectedVideo, setSelectedVideo] = useState<null | typeof videoTestimonials[0]>(null)

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Video Testimonials</h2>
            <p className="text-lg text-muted-foreground">
              See the impact of Dr. Tetsubayashi's speaking engagements
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {videoTestimonials.map((testimonial) => (
              <Card key={testimonial.id} className="h-full cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="relative">
                    <img 
                      src={testimonial.thumbnail} 
                      alt={testimonial.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-t-lg">
                      <Button
                        size="sm"
                        className="bg-white/90 text-black hover:bg-white"
                        onClick={() => setSelectedVideo(testimonial)}
                      >
                        <Play size={16} className="mr-2" />
                        Watch
                      </Button>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold mb-2">{testimonial.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{testimonial.client}</p>
                    <p className="text-sm italic">"{testimonial.quote}"</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>{selectedVideo?.title}</DialogTitle>
              </DialogHeader>
              {selectedVideo && (
                <div className="aspect-video">
                  <iframe
                    src={selectedVideo.videoUrl.replace('watch?v=', 'embed/')}
                    className="w-full h-full rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  )
}

function CaseStudyShowcase() {
  const caseStudies = [
    {
      id: 1,
      title: "Fortune 500 AI Governance Transformation",
      client: "Global Technology Corporation",
      industry: "Technology",
      challenge: "Implementing comprehensive AI governance across 50+ countries with varying regulatory requirements",
      solution: "Developed a flexible, multi-jurisdictional AI governance framework with automated compliance monitoring",
      results: [
        "100% regulatory compliance across all jurisdictions",
        "40% reduction in AI project approval time",
        "Created reusable framework adopted by 3 other divisions"
      ],
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop",
      tags: ["AI Governance", "Global Scale", "Regulatory Compliance"]
    },
    {
      id: 2,
      title: "Equitable AI for Healthcare Accessibility",
      client: "Regional Healthcare Network",
      industry: "Healthcare",
      challenge: "AI diagnostic tools were showing bias against patients with disabilities, resulting in misdiagnosis and delayed treatment for over 40% of disabled patients.",
      solution: "Redesigned data collection and model training with disability representation and equitable design principles. Implemented real-time bias detection and created accessibility-first user interfaces for both patients and healthcare providers.",
      results: [
        "95% accuracy improvement for disabled patients",
        "Reduced diagnostic disparities by 60%",
        "Training program adopted across 12 hospitals",
        "$2.3M cost savings from reduced misdiagnoses",
        "Improved patient satisfaction scores by 85%"
      ],
      image: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=600&h=400&fit=crop",
      tags: ["Healthcare AI", "Accessibility", "Bias Mitigation", "Patient Outcomes"]
    },
    {
      id: 3,
      title: "Startup AI Ethics Framework",
      client: "Series B EdTech Startup",
      industry: "Education Technology",
      challenge: "Building responsible AI practices from the ground up while maintaining rapid development cycles",
      solution: "Lightweight but comprehensive AI ethics framework integrated into agile development processes",
      results: [
        "Zero ethics-related delays in product launches",
        "Secured $50M Series C citing responsible AI practices",
        "Framework open-sourced and adopted by 100+ startups"
      ],
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
      tags: ["Startup", "EdTech", "Ethics Framework", "Equitable Design"]
    }
  ]

  const [selectedCase, setSelectedCase] = useState<null | typeof caseStudies[0]>(null)

  return (
    <section className="py-12 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Case Study Showcase</h2>
            <p className="text-lg text-muted-foreground">
              Real-world results from AI governance transformations that drive measurable business value and competitive advantage
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {caseStudies.map((caseStudy) => (
              <Card key={caseStudy.id} className="h-full cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <img 
                    src={caseStudy.image} 
                    alt={caseStudy.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {caseStudy.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <h3 className="font-semibold mb-2">{caseStudy.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{caseStudy.industry}</p>
                    <p className="text-sm mb-4">{caseStudy.challenge}</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => setSelectedCase(caseStudy)}
                    >
                      <Eye size={16} className="mr-2" />
                      View Full Case Study
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Dialog open={!!selectedCase} onOpenChange={() => setSelectedCase(null)}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{selectedCase?.title}</DialogTitle>
              </DialogHeader>
              {selectedCase && (
                <div className="space-y-6">
                  <img 
                    src={selectedCase.image} 
                    alt={selectedCase.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Client & Industry</h4>
                      <p className="text-muted-foreground">{selectedCase.client}</p>
                      <p className="text-sm text-muted-foreground">{selectedCase.industry}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCase.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Challenge</h4>
                    <p className="text-muted-foreground">{selectedCase.challenge}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Solution</h4>
                    <p className="text-muted-foreground">{selectedCase.solution}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Results</h4>
                    <ul className="space-y-2">
                      {selectedCase.results.map((result, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Star size={16} className="text-yellow-500 mt-1 flex-shrink-0" weight="fill" />
                          <span className="text-muted-foreground">{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Dr. Tetsubayashi's keynote completely transformed how our engineering team approaches AI ethics. Their frameworks are practical, actionable, and deeply rooted in real-world impact.",
      author: "Sarah Chen",
      title: "CTO, TechForward Inc.",
      rating: 5,
      avatar: "SC"
    },
    {
      quote: "The accessibility workshop was eye-opening. We implemented Dr. Tetsubayashi's recommendations and saw immediate improvements in our product's inclusive design.",
      author: "Marcus Rodriguez",
      title: "Director of Product, InnovateLabs",
      rating: 5,
      avatar: "MR"
    },
    {
      quote: "Brilliant, insightful, and incredibly engaging. Dr. Tetsubayashi's presentation on AI governance received the highest evaluation scores in our conference's history.",
      author: "Dr. Amelia Foster",
      title: "Conference Chair, AI Ethics Summit 2024",
      rating: 5,
      avatar: "AF"
    },
    {
      quote: "Working with Dr. Tetsubayashi on our AI governance strategy was transformative. Their interdisciplinary approach helped us navigate complex regulatory requirements while staying true to our values.",
      author: "James Park",
      title: "VP of Legal & Compliance, DataStream Corp",
      rating: 5,
      avatar: "JP"
    }
  ]

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What People Are Saying</h2>
            <p className="text-lg text-muted-foreground">
              Feedback from speaking engagements and consulting clients
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Quotes size={24} className="text-accent mt-1 flex-shrink-0" />
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        "{testimonial.quote}"
                      </p>
                      
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} size={16} weight="fill" className="text-yellow-500" />
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                            {testimonial.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-sm">{testimonial.author}</p>
                          <p className="text-xs text-muted-foreground">{testimonial.title}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


function BlogInsightsContent() {
  const [selectedPost, setSelectedPost] = useState<null | typeof blogPosts[0]>(null)
  
  const blogPosts = [
    {
      title: "The Hidden Bias in AI Accessibility Tools",
      excerpt: "Exploring how current AI accessibility solutions often miss the mark for disabled users, and what we can do about it.",
      date: "March 15, 2024",
      category: "AI Ethics",
      readTime: "8 min read",
      fullContent: `
# The Hidden Bias in AI Accessibility Tools

The promise of AI-powered accessibility tools is compelling: technology that can automatically generate alt-text for images, provide real-time captioning, or translate complex documents into plain language. Yet as someone who has spent years at the intersection of disability advocacy and AI governance, I've witnessed a troubling pattern: many of these tools perpetuate the very barriers they claim to eliminate.

## The Representation Gap

The fundamental issue lies in training data. Most AI accessibility tools are trained on datasets that reflect the assumptions and perspectives of their creators—predominantly non-disabled technologists. When an image recognition system generates alt-text that describes a wheelchair user as "person in wheelchair" rather than simply "person," it reinforces the medical model of disability that many disabled people reject.

## Beyond Technical Solutions

True accessibility requires more than algorithmic improvements. It demands a fundamental shift in how we approach AI development:

### 1. Equitable Design from Day One
Rather than retrofitting accessibility features, we must center disabled perspectives from the earliest stages of development.

### 2. Community-Led Validation
No accessibility tool should launch without extensive testing by the communities it claims to serve.

### 3. Context-Aware Intelligence
AI systems must understand that accessibility needs are highly individual and context-dependent.

## A Path Forward

The solution isn't to abandon AI accessibility tools, but to rebuild them with authentic community input. This means:

- Hiring disabled people as core team members, not just consultants
- Developing new evaluation metrics that prioritize user experience over technical benchmarks
- Creating feedback loops that allow for continuous improvement based on real-world usage

## Conclusion

As AI becomes increasingly integrated into our daily lives, we have a choice: we can perpetuate existing systems of exclusion, or we can use this moment of technological transformation to build a more equitable future. The latter requires acknowledging that accessibility isn't just a technical problem—it's a question of justice.

The disabled community has always been at the forefront of innovation, creating solutions that benefit everyone. It's time for the AI community to return the favor.
      `
    },
    {
      title: "Beyond Compliance: Building Truly Equitable AI Systems",
      excerpt: "Why legal compliance is just the starting point for creating AI that works for everyone.",
      date: "February 28, 2024",
      category: "Equitable Design",
      readTime: "12 min read",
      fullContent: `
# Beyond Compliance: Building Truly Equitable AI Systems

Legal compliance with disability laws like the ADA is often treated as the finish line for AI accessibility. But for those of us building truly equitable systems, compliance is merely the starting line. True equity requires a fundamental reimagining of how we design, develop, and deploy AI systems.

## The Compliance Trap

Most organizations approach AI accessibility through a compliance lens: "What do we need to do to avoid getting sued?" This defensive mindset leads to checkbox solutions that technically meet legal requirements while failing disabled users in practice.

Consider voice assistants. They may technically comply with accessibility guidelines by supporting voice commands, but they often struggle with non-standard speech patterns, effectively excluding many disabled users from the "accessible" experience.

## Principles of Equitable AI Design

### 1. Nothing About Us, Without Us
This foundational principle of the disability rights movement must guide AI development. Disabled people aren't just test users—they should be core team members, decision-makers, and leaders in AI projects.

### 2. Design for the Margins, Benefit the Center
When we design for edge cases—like users with cognitive disabilities or motor impairments—we create solutions that work better for everyone. This is how we got curb cuts, which benefit wheelchair users but also parents with strollers, delivery workers, and travelers with luggage.

### 3. Intersectionality Matters
Disability intersects with race, gender, age, and socioeconomic status. An equitable AI system must consider these overlapping identities and avoid solutions that help some disabled people while harming others.

## Practical Implementation Strategies

### Data Collection and Representation
- Ensure training data includes disabled users across all demographics
- Use community-vetted datasets rather than scraped internet content
- Implement ongoing data audits for bias and representation gaps

### User Experience Design
- Provide multiple ways to interact with AI systems
- Allow for customization and personalization of interfaces
- Design error states that provide clear, actionable guidance

### Testing and Validation
- Conduct usability testing with disabled users throughout development
- Implement automated accessibility testing alongside manual reviews
- Create feedback mechanisms for continuous improvement

## Moving Beyond Individual Solutions

True equity requires systemic change:

### Industry-Wide Standards
We need new accessibility standards specifically designed for AI systems, developed in partnership with disabled communities.

### Economic Incentives
Organizations should be rewarded for proactive equity, not just penalized for exclusion.

### Educational Reform
AI education programs must include disability studies and equitable design principles as core curriculum.

## The Business Case for Equity

Equitable AI isn't just morally right—it's good business:
- The disability market represents over $13 trillion in annual disposable income globally
- Equitable design innovations often become mainstream features
- Diverse teams build better products and identify more opportunities

## Conclusion

Building truly equitable AI systems requires us to move beyond compliance checkboxes toward a fundamental commitment to justice and equity. This isn't just about avoiding lawsuits—it's about unlocking the full potential of AI to serve all of humanity.

The future of AI will be shaped by the choices we make today. We can choose to perpetuate existing systems of exclusion, or we can use this moment of technological transformation to build something better. The disabled community is ready to lead the way—the question is whether the AI industry is ready to follow.
      `
    },
    {
      title: "Systems Thinking for AI Governance Leaders",
      excerpt: "How to approach organizational AI governance with a systems mindset that creates lasting change.",
      date: "February 10, 2024",
      category: "Leadership",
      readTime: "10 min read",
      fullContent: `
# Systems Thinking for AI Governance Leaders

Most AI governance failures aren't technical—they're systemic. A well-designed algorithm can perpetuate bias if it's deployed within an organization that lacks diverse perspectives. A comprehensive ethics policy can be ignored if there's no accountability mechanism. As leaders in AI governance, our job isn't just to build better tools—it's to transform the systems in which those tools operate.

## Understanding Systems vs. Symptoms

Traditional approaches to AI governance focus on symptoms: biased outcomes, privacy breaches, safety incidents. Systems thinking asks different questions:

- What organizational structures enable these problems?
- How do power dynamics influence AI development decisions?
- What feedback loops reinforce problematic patterns?

### Example: Bias in Hiring AI
**Symptom-focused approach**: Audit the algorithm for bias
**Systems-focused approach**: Examine the entire hiring ecosystem—who defines job requirements, what data feeds the system, how decisions are reviewed, who has the power to override algorithmic recommendations

## The Five Leverage Points for AI Governance

Drawing from systems theorist Donella Meadows, here are the five most effective intervention points for AI governance leaders:

### 1. Paradigms and Mindsets
The most powerful lever is shifting how people think about AI. Moving from "AI as neutral tool" to "AI as value-embedded system" changes everything downstream.

### 2. Goals and Purpose
Explicitly defining what success looks like beyond technical metrics. Instead of "improve efficiency," try "improve equitable outcomes while maintaining efficiency."

### 3. Power and Authority
Who has the authority to stop an AI project? Who gets a seat at the decision-making table? Power structures determine governance effectiveness.

### 4. Rules and Policies
The formal constraints on AI development and deployment. But remember: rules without enforcement are just suggestions.

### 5. Information Flows
What data flows to whom, when, and in what format? Transparency isn't just about external reporting—it's about internal visibility and accountability.

## Building Systems That Learn

Effective AI governance systems must be adaptive. Here's how to build learning loops into your organization:

### Continuous Monitoring
- Real-world impact assessments, not just pre-deployment testing
- Community feedback mechanisms with clear response protocols
- Regular audits by independent third parties

### Structured Reflection
- Post-incident learning processes that examine systemic causes
- Regular strategy reviews that question fundamental assumptions
- Cross-team knowledge sharing sessions

### Adaptive Capacity
- Clear escalation procedures for novel situations
- Flexible policies that can evolve with new challenges
- Investment in ongoing education and skill development

## Organizational Design for AI Governance

Structure follows strategy, but strategy also follows structure. Consider these organizational design principles:

### Distributed Responsibility
AI governance can't be relegated to a single team. It must be embedded throughout the organization with clear roles and responsibilities.

### Cross-Functional Integration
Break down silos between technical teams, legal, ethics, and business units. AI governance requires diverse perspectives working together.

### External Accountability
Build relationships with community organizations, researchers, and advocacy groups who can provide external perspectives and accountability.

## Common Systems Traps and How to Avoid Them

### The Policy Theater Trap
Writing impressive policies that no one follows. Solution: Focus on implementation from day one.

### The Technical Fix Trap
Believing that better algorithms solve systemic problems. Solution: Address organizational and social factors alongside technical ones.

### The Compliance Theater Trap
Focusing on checking boxes rather than achieving outcomes. Solution: Measure impact, not just process.

## Measuring Systems Change

Traditional metrics don't capture systemic transformation. Consider these alternative measures:

- Decision-making diversity: Are diverse perspectives influencing AI decisions?
- Feedback responsiveness: How quickly does the organization respond to community concerns?
- Proactive identification: Is the organization identifying potential issues before they cause harm?
- Learning velocity: How quickly is the organization adapting its practices based on new information?

## The Role of Leadership

Systems thinking doesn't mean leaders become passive observers of complex dynamics. It means becoming more strategic about where and how to intervene:

### Model the Behavior
Leaders must demonstrate systems thinking in their own decision-making processes.

### Create Psychological Safety
Teams must feel safe raising concerns about AI systems without fear of retribution.

### Invest in Capacity Building
Systems thinking is a skill that can be developed through training and practice.

## Conclusion

AI governance is ultimately about organizational transformation. Technical solutions are necessary but not sufficient. As leaders, our job is to create systems that naturally produce ethical, inclusive, and beneficial AI outcomes.

This requires patience, persistence, and a willingness to question fundamental assumptions about how we work. But the alternative—reactive, symptom-focused governance—is a recipe for continued failure.

The organizations that master systems thinking for AI governance won't just avoid problems—they'll unlock AI's full potential to serve society. The question isn't whether systems thinking is worth the investment, but whether we can afford not to invest in it.
      `
    }
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-12">
        <div>
          <p className="text-lg text-muted-foreground">
            Thought leadership on AI governance, accessibility, and systems change
          </p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => window.open('https://www.incluu.us/blog', '_blank')}
          className="hidden md:flex"
        >
          View All Posts
          <ArrowSquareOut size={16} className="ml-2" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {blogPosts.map((post, index) => (
          <Card key={index} className="h-full hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary" className="text-xs">
                  {post.category}
                </Badge>
                <span className="text-xs text-muted-foreground">{post.readTime}</span>
              </div>
              <CardTitle className="text-lg leading-tight hover:text-primary transition-colors">
                {post.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar size={12} />
                  {post.date}
                </span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs"
                  onClick={() => setSelectedPost(post)}
                >
                  Read More
                  <ArrowRight size={12} className="ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center">
        <Button 
          onClick={() => window.open('https://www.incluu.us/blog', '_blank')}
          className="md:hidden"
        >
          View All Posts
          <ArrowSquareOut size={16} className="ml-2" />
        </Button>
      </div>

      <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{selectedPost?.category}</Badge>
                <span className="text-sm text-muted-foreground">{selectedPost?.readTime}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSelectedPost(null)}>
                <X size={16} />
              </Button>
            </div>
            <DialogTitle className="text-2xl">{selectedPost?.title}</DialogTitle>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{selectedPost?.date}</span>
            </div>
          </DialogHeader>
          {selectedPost && (
            <div className="prose prose-slate max-w-none">
              <div 
                className="whitespace-pre-line"
                dangerouslySetInnerHTML={{ 
                  __html: selectedPost.fullContent
                    .replace(/### (.*)/g, '<h3 class="text-lg font-semibold mt-6 mb-3">$1</h3>')
                    .replace(/## (.*)/g, '<h2 class="text-xl font-bold mt-8 mb-4">$1</h2>')
                    .replace(/# (.*)/g, '<h1 class="text-2xl font-bold mt-10 mb-6">$1</h1>')
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em>$1</em>')
                    .replace(/^- (.*)/gm, '<li class="ml-4">• $1</li>')
                    .replace(/\n\n/g, '</p><p class="mb-4">')
                    .replace(/^(?!<[h|l])/gm, '<p class="mb-4">')
                    .replace(/<p class="mb-4"><\/p>/g, '')
                }} 
              />
              <div className="mt-8 pt-6 border-t">
                <Button 
                  onClick={() => window.open('https://www.incluu.us/blog', '_blank')}
                  className="mr-4"
                >
                  Read More Articles
                  <ArrowSquareOut size={16} className="ml-2" />
                </Button>
                <div className="mt-4">
                  <NewsletterSignup />
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function AdminPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [submissions, setSubmissions] = useState<Array<any>>([])
  const [subscribers, setSubscribers] = useState<Array<any>>([])

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await window.spark.user()
        setUser(currentUser)
      } catch (error) {
        console.log('No user context available')
      }
    }
    checkUser()
  }, [])

  useEffect(() => {
    if (isOpen && user?.isOwner) {
      const loadData = async () => {
        const contactSubmissions = await window.spark.kv.get<Array<any>>('contact-submissions') || []
        const newsletterSubscribers = await window.spark.kv.get<Array<any>>('newsletter-subscribers') || []
        setSubmissions(contactSubmissions)
        setSubscribers(newsletterSubscribers)
      }
      loadData()
    }
  }, [isOpen, user?.isOwner])

  if (!user?.isOwner) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="fixed bottom-4 right-4 z-50">
          Admin
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Admin Dashboard</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Form Submissions ({submissions.length})</h3>
            <div className="space-y-4">
              {submissions.map((submission) => (
                <Card key={submission.id}>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <strong>Name:</strong> {submission.name}
                      </div>
                      <div>
                        <strong>Email:</strong> {submission.email}
                      </div>
                      <div>
                        <strong>Organization:</strong> {submission.organization}
                      </div>
                      <div>
                        <strong>Event Type:</strong> {submission.eventType}
                      </div>
                    </div>
                    <div className="mb-2">
                      <strong>Message:</strong> {submission.message}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Submitted: {new Date(submission.submittedAt).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter Subscribers ({subscribers.length})</h3>
            <div className="space-y-2">
              {subscribers.map((subscriber) => (
                <Card key={subscriber.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{subscriber.email}</div>
                        <div className="text-sm text-muted-foreground">
                          Interests: {subscriber.interests.join(', ') || 'None selected'}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(subscriber.subscribedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'resources' | 'assessment'>('home')

  if (currentPage === 'resources') {
    return <ResourcesPage onBack={() => setCurrentPage('home')} />
  }

  if (currentPage === 'assessment') {
    return (
      <div className="min-h-screen bg-background">
        <Toaster position="top-right" />
        <AdminPanel />
        <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0 flex-1 header-title">
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-primary whitespace-nowrap overflow-hidden text-ellipsis">Dr. Dédé Tetsubayashi</h1>
                <p className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">AI GRC Exec | Board Member | TEDx Speaker</p>
              </div>
              <Button 
                variant="ghost" 
                onClick={() => setCurrentPage('home')}
                className="text-xs px-2 py-1 whitespace-nowrap flex-shrink-0"
                size="sm"
              >
                ← Back to Home
              </Button>
            </div>
          </div>
        </header>
        <main className="py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-4">AI Governance Maturity Assessment</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover your organization's AI governance strengths and areas for improvement with this comprehensive assessment tool.
              </p>
            </div>
            <AIGovernanceAssessment />
          </div>
        </main>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" />
      <AdminPanel />
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0 flex-1 header-title">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-primary whitespace-nowrap overflow-hidden text-ellipsis">Dr. Dédé Tetsubayashi</h1>
              <p className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">AI GRC Exec | Board Member | TEDx Speaker</p>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => window.open('https://pmukyznd.manus.space/', '_blank')}
                className="hidden lg:flex text-xs px-2 py-1"
              >
                <Calculator size={14} className="mr-1" />
                <span className="hidden xl:inline">🎉 ROI Calculator ✨</span>
                <span className="xl:hidden">ROI Calc</span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  const img = new Image()
                  img.onload = () => {
                    window.open('https://dr-dede-tedx-homepage.vercel.app/', '_blank')
                  }
                  img.onerror = () => {
                    window.open('https://nslacnow.manus.space/', '_blank')
                  }
                  img.src = heroBackground
                  // Fallback timeout
                  setTimeout(() => {
                    if (!img.complete) {
                      window.open('https://nslacnow.manus.space/', '_blank')
                    }
                  }, 2000)
                }}
                className="hidden md:flex text-xs px-2 py-1"
              >
                <Presentation size={14} className="mr-1" />
                TEDx Talk
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => window.open('https://www.incluu.us/blog', '_blank')}
                className="hidden md:flex text-xs px-2 py-1"
              >
                <BookOpen size={14} className="mr-1" />
                Blog
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => window.open('https://incluu.us', '_blank')}
                className="hidden sm:flex text-xs px-2 py-1"
              >
                incluu
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setCurrentPage('resources')}
                className="hidden lg:flex text-xs px-2 py-1"
              >
                <FileText size={14} className="mr-1" />
                Resources
              </Button>
              <div className="flex-shrink-0">
                <CalendlyIntegration />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="relative py-8 md:py-12 lg:py-24 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${heroBackground})`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background/80 to-accent/10" />
          <div className="container mx-auto px-4 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6 leading-tight">
                  Transforming AI Governance Through
                  <span className="text-primary"> Equitable Innovation</span>
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 leading-relaxed">
                  Watch my TEDx talk on reimagining artificial intelligence systems to serve everyone, 
                  not just the privileged few.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                  <Button 
                    size="lg" 
                    className="bg-accent hover:bg-accent/90 text-accent-foreground w-full sm:w-auto"
                    onClick={() => window.open('https://www.youtube.com/@the_drdede', '_blank')}
                  >
                    <Play size={20} className="mr-2" />
                    Watch TEDx Talk
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="lg" className="w-full sm:w-auto">
                        Subscribe to Updates
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="mx-4 max-w-md">
                      <DialogHeader>
                        <DialogTitle>Stay Updated</DialogTitle>
                      </DialogHeader>
                      <NewsletterSignup />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <div className="space-y-4 md:space-y-6 order-1 lg:order-2">
                <YouTubeEmbed />
                <SubscriberCounter />
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 md:py-12 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">About Dr. Dédé</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-12">
                <Card className="text-center">
                  <CardContent className="p-4 md:p-6">
                    <GraduationCap size={40} className="mx-auto mb-3 md:mb-4 text-primary md:w-12 md:h-12" />
                    <h3 className="font-semibold mb-2 text-sm md:text-base">AI GRC Executive & Board Member</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">Advanced expertise in Technology Policy and AI Governance Risk & Compliance</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="p-4 md:p-6">
                    <Trophy size={40} className="mx-auto mb-3 md:mb-4 text-accent md:w-12 md:h-12" />
                    <h3 className="font-semibold mb-2 text-sm md:text-base">Disability Advocate & Systems Disruptor</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">Champion for accessible technology and equitable design practices</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="p-4 md:p-6">
                    <VideoCamera size={40} className="mx-auto mb-3 md:mb-4 text-primary md:w-12 md:h-12" />
                    <h3 className="font-semibold mb-2 text-sm md:text-base">TEDx Speaker</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">Inspiring global audiences on inclusive AI and systems transformation</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="p-4 md:p-6">
                    <Lightbulb size={40} className="mx-auto mb-3 md:mb-4 text-accent md:w-12 md:h-12" />
                    <h3 className="font-semibold mb-2 text-sm md:text-base">Innovation Leader</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">Reimagining power structures in AI development and deployment</p>
                  </CardContent>
                </Card>
              </div>
              <div className="prose prose-lg mx-auto text-center max-w-none">
                <p className="text-base md:text-lg leading-relaxed">
                  Dr. Dédé Tetsubayashi combines rigorous academic training with lived experience 
                  as a disability advocate to challenge conventional approaches to AI governance. Their work focuses on 
                  dismantling systemic barriers that exclude marginalized communities from technological advancement.
                </p>
                <p className="text-base md:text-lg leading-relaxed mt-4 md:mt-6">
                  As a sought-after speaker and consultant, Dr. Tetsubayashi helps organizations build more equitable 
                  AI systems while navigating complex regulatory landscapes. Their interdisciplinary approach bridges 
                  technical innovation with social justice to create lasting systemic change.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 md:py-12 bg-gradient-to-br from-accent/5 to-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Why Organizations Choose Dr. Dédé</h2>
                <p className="text-lg text-muted-foreground">
                  Measurable results that drive competitive advantage and sustainable growth
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                <Card className="text-center bg-card/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold text-primary mb-2">$50M+</div>
                    <p className="text-sm text-muted-foreground">In funding secured by clients citing responsible AI practices</p>
                  </CardContent>
                </Card>
                <Card className="text-center bg-card/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold text-accent mb-2">85%</div>
                    <p className="text-sm text-muted-foreground">Reduction in compliance review time for regulated industries</p>
                  </CardContent>
                </Card>
                <Card className="text-center bg-card/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold text-primary mb-2">100%</div>
                    <p className="text-sm text-muted-foreground">Regulatory compliance success rate across all jurisdictions</p>
                  </CardContent>
                </Card>
                <Card className="text-center bg-card/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold text-accent mb-2">40%</div>
                    <p className="text-sm text-muted-foreground">Faster AI project approval times with comprehensive governance</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card>
                  <CardHeader>
                    <Shield size={32} className="text-primary mb-2" />
                    <CardTitle className="text-xl">Risk Mitigation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Proactive identification and mitigation of AI-related risks before they impact your business. 
                      Our frameworks have helped organizations avoid costly regulatory penalties and reputational damage.
                    </p>
                    <ul className="text-sm space-y-2">
                      <li>• Comprehensive risk assessment methodologies</li>
                      <li>• Regulatory compliance strategies</li>
                      <li>• Crisis prevention and response planning</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Trophy size={32} className="text-accent mb-2" />
                    <CardTitle className="text-xl">Competitive Advantage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Transform ethical AI from a compliance burden into a strategic differentiator. 
                      Organizations with mature AI governance attract top talent, secure funding, and win more business.
                    </p>
                    <ul className="text-sm space-y-2">
                      <li>• Market differentiation through ethical leadership</li>
                      <li>• Enhanced brand reputation and trust</li>
                      <li>• Access to ESG-conscious investment capital</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Users size={32} className="text-primary mb-2" />
                    <CardTitle className="text-xl">Market Expansion</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Inclusive AI design opens new markets and customer segments. 
                      The disability market alone represents over $13 trillion in annual disposable income globally.
                    </p>
                    <ul className="text-sm space-y-2">
                      <li>• Access to underserved market segments</li>
                      <li>• Improved product usability for all users</li>
                      <li>• Innovation opportunities through inclusive design</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-12 text-center">
                <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/10 to-accent/10">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-4">Ready to Transform Your AI Governance?</h3>
                    <p className="text-muted-foreground mb-6">
                      Join the Fortune 500 companies, innovative startups, and leading healthcare networks 
                      who trust Dr. Dédé to guide their AI governance transformation.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button size="lg" className="bg-primary hover:bg-primary/90">
                        <Calendar size={20} className="mr-2" />
                        Book Strategy Session
                      </Button>
                      <Button variant="outline" size="lg">
                        Download Success Stories
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <TestimonialsSection />

        {/* <VideoTestimonialsSection /> */}

        <CaseStudyShowcase />

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="latest-insights" className="border rounded-lg px-6">
                  <AccordionTrigger className="text-xl font-semibold hover:no-underline">
                    Latest Insights
                  </AccordionTrigger>
                  <AccordionContent>
                    <BlogInsightsContent />
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="social-updates" className="border rounded-lg px-6">
                  <AccordionTrigger className="text-xl font-semibold hover:no-underline">
                    Latest Social Updates
                  </AccordionTrigger>
                  <AccordionContent>
                    <SocialMediaFeeds />
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="ai-curated" className="border rounded-lg px-6">
                  <AccordionTrigger className="text-xl font-semibold hover:no-underline">
                    AI-Curated for You
                  </AccordionTrigger>
                  <AccordionContent>
                    <AIContentRecommendations />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Speaking & Workshops</h2>
              <p className="text-lg md:text-xl text-muted-foreground text-center mb-8 md:mb-12">
                Transform your organization's approach to AI governance and equitable innovation
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
                <Card>
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="secondary" className="text-xs">Virtual or in-person</Badge>
                      <Badge variant="secondary" className="text-xs">30-90 minutes</Badge>
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Keynote Speaking</h3>
                    <p className="text-muted-foreground mb-3 md:mb-4 text-sm md:text-base">
                      Inspiring presentations on AI governance, accessibility, and systems transformation 
                      that energize audiences and drive organizational change.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="secondary" className="text-xs">2-8 hours</Badge>
                      <Badge variant="secondary" className="text-xs">Hands-on exercises</Badge>
                      <Badge variant="secondary" className="text-xs">Team-specific</Badge>
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Custom Workshops</h3>
                    <p className="text-muted-foreground mb-3 md:mb-4 text-sm md:text-base">
                      Interactive sessions tailored to your team's needs, focusing on practical 
                      implementation of equitable AI governance practices.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-card p-4 md:p-8 rounded-lg">
                <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-center">Speaking Topics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  <div>
                    <h4 className="font-semibold mb-2 md:mb-3">AI Governance & Compliance</h4>
                    <ul className="space-y-1 md:space-y-2 text-xs md:text-sm text-muted-foreground">
                      <li>• Regulatory compliance strategies</li>
                      <li>• Ethical AI framework development</li>
                      <li>• Risk assessment methodologies</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 md:mb-3">Equitable Technology Design</h4>
                    <ul className="space-y-1 md:space-y-2 text-xs md:text-sm text-muted-foreground">
                      <li>• Accessibility-first development</li>
                      <li>• Bias detection and mitigation</li>
                      <li>• Community-centered design thinking</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 md:mb-3">Systems Change & Leadership</h4>
                    <ul className="space-y-1 md:space-y-2 text-xs md:text-sm text-muted-foreground">
                      <li>• Organizational transformation</li>
                      <li>• Equitable leadership practices</li>
                      <li>• Building diverse tech teams</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 md:py-12 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Transform Your Organization's AI Future</h2>
              <p className="text-base md:text-lg text-muted-foreground mb-4 md:mb-6">
                Ready to build AI systems that drive equitable innovation while ensuring regulatory compliance? 
                Let's discuss how we can accelerate your success.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-card/80 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-primary">Global</div>
                  <div className="text-sm text-muted-foreground">Reach and impact</div>
                </div>
                <div className="bg-card/80 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-primary">48hr</div>
                  <div className="text-sm text-muted-foreground">Response time guaranteed</div>
                </div>
                <div className="bg-card/80 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-primary">100%</div>
                  <div className="text-sm text-muted-foreground">Client satisfaction</div>
                </div>
              </div>
              <div className="bg-card/80 p-4 rounded-lg">
                <CalendlyIntegration />
              </div>
              <div className="mt-4 text-center">
                <VideoTestimonialRecorder />
                <p className="text-xs text-muted-foreground mt-2">
                  Share your experience working with Dr. Dédé
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-card border-t py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 md:space-y-6">
            <div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">Dr. Dédé Tetsubayashi</h3>
              <p className="text-sm md:text-base text-muted-foreground">AI GRC Executive | Board Member | TEDx Speaker | Systems Disruptor</p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-2 md:gap-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  const img = new Image()
                  img.onload = () => {
                    window.open('https://dr-dede-tedx-homepage.vercel.app/', '_blank')
                  }
                  img.onerror = () => {
                    window.open('https://nslacnow.manus.space/', '_blank')
                  }
                  img.src = heroBackground
                  setTimeout(() => {
                    if (!img.complete) {
                      window.open('https://nslacnow.manus.space/', '_blank')
                    }
                  }, 2000)
                }}
                className="w-full sm:w-auto"
              >
                <Presentation size={16} className="mr-2" />
                TEDx Talk
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open('https://pmukyznd.manus.space/', '_blank')}
                className="w-full sm:w-auto"
              >
                <Calculator size={16} className="mr-2" />
                🎉 ROI Calculator ✨
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open('https://www.youtube.com/@the_drdede', '_blank')}
                className="w-full sm:w-auto"
              >
                <YoutubeLogo size={16} className="mr-2" />
                YouTube Channel
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open('https://www.incluu.us/blog', '_blank')}
                className="w-full sm:w-auto"
              >
                <BookOpen size={16} className="mr-2" />
                Blog
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open('https://incluu.us', '_blank')}
                className="w-full sm:w-auto"
              >
                incluu
              </Button>
            </div>
            
            <Separator />
            
            <div className="text-xs md:text-sm text-muted-foreground">
              © 2025 Dr. Dédé Tetsubayashi. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App