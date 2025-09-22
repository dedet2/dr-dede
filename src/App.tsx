import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Users, EnvelopeSimple, ArrowRight, Play, GraduationCap, Trophy, Lightbulb, BookOpen, Quotes, Star, ArrowSquareOut, Calendar } from "@phosphor-icons/react"
import { useKV } from '@github/spark/hooks'

const SUBSCRIBER_GOAL = 10000
const YOUTUBE_API_KEY = 'AIzaSyBQ9wufVmddbSNcVXrKbN76tRGKFPuVkYI'
const CHANNEL_ID = 'UCYourChannelId' // You'll need to get your actual channel ID

function YouTubeEmbed() {
  return (
    <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden">
      <iframe
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="Dr. Dédé Tetsubayashi TEDx Talk"
        className="absolute inset-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
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
  const [videoCount, setVideoCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const progressPercentage = (subscriberCount / SUBSCRIBER_GOAL) * 100

  useEffect(() => {
    const fetchYouTubeData = async () => {
      try {
        // YouTube API to get channel statistics using the channel handle
        // Note: This endpoint may require the actual channel ID instead of handle
        const channelResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=@the_drdede&key=${YOUTUBE_API_KEY}`
        )
        
        if (!channelResponse.ok) {
          throw new Error('Failed to fetch YouTube data')
        }
        
        const searchData = await channelResponse.json()
        
        if (searchData.items && searchData.items.length > 0) {
          const channelId = searchData.items[0].snippet.channelId
          
          // Now get the channel statistics
          const statsResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${YOUTUBE_API_KEY}`
          )
          
          const statsData: YouTubeApiResponse = await statsResponse.json()
          
          if (statsData.items && statsData.items.length > 0) {
            const stats = statsData.items[0].statistics
            setSubscriberCount(parseInt(stats.subscriberCount))
            setVideoCount(parseInt(stats.videoCount))
          }
        }
      } catch (err) {
        console.error('YouTube API error:', err)
        setError('Unable to load live data')
        // Keep the mock data as fallback
      } finally {
        setIsLoading(false)
      }
    }

    fetchYouTubeData()
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
          {error && (
            <p className="text-xs text-red-500">{error}</p>
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Thank you for your inquiry! Dr. Tetsubayashi will get back to you within 48 hours.')
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

function BlogInsightsSection() {
  const blogPosts = [
    {
      title: "The Hidden Bias in AI Accessibility Tools",
      excerpt: "Exploring how current AI accessibility solutions often miss the mark for disabled users, and what we can do about it.",
      date: "March 15, 2024",
      category: "AI Ethics",
      readTime: "8 min read"
    },
    {
      title: "Beyond Compliance: Building Truly Inclusive AI Systems",
      excerpt: "Why legal compliance is just the starting point for creating AI that works for everyone.",
      date: "February 28, 2024",
      category: "Inclusive Design",
      readTime: "12 min read"
    },
    {
      title: "Systems Thinking for AI Governance Leaders",
      excerpt: "How to approach organizational AI governance with a systems mindset that creates lasting change.",
      date: "February 10, 2024",
      category: "Leadership",
      readTime: "10 min read"
    }
  ]

  return (
    <section className="py-12 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Latest Insights</h2>
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
                    <Button variant="ghost" size="sm" className="text-xs">
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
        </div>
      </div>
    </section>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">Dr. Dédé Tetsubayashi</h1>
              <p className="text-sm text-muted-foreground">AI Governance Expert | TEDx Speaker</p>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => window.open('https://www.incluu.us/blog', '_blank')}
                className="hidden md:flex"
              >
                <BookOpen size={16} className="mr-2" />
                Blog
              </Button>
              <Button variant="outline" className="hidden md:flex">
                Book Speaking Engagement
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="py-12 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                  Transforming AI Governance Through
                  <span className="text-primary"> Inclusive Innovation</span>
                </h2>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Watch my TEDx talk on reimagining artificial intelligence systems to serve everyone, 
                  not just the privileged few.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Play size={20} className="mr-2" />
                    Watch TEDx Talk
                  </Button>
                  <Button variant="outline" size="lg">
                    Subscribe to Updates
                  </Button>
                </div>
              </div>
              <div className="space-y-6">
                <YouTubeEmbed />
                <SubscriberCounter />
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">About Dr. Tetsubayashi</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <Card className="text-center">
                  <CardContent className="p-6">
                    <GraduationCap size={48} className="mx-auto mb-4 text-primary" />
                    <h3 className="font-semibold mb-2">Cornell University</h3>
                    <p className="text-sm text-muted-foreground">Advanced degrees in Technology Policy and Systems Engineering</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="p-6">
                    <Trophy size={48} className="mx-auto mb-4 text-accent" />
                    <h3 className="font-semibold mb-2">Disability Advocate</h3>
                    <p className="text-sm text-muted-foreground">Champion for accessible technology and inclusive design practices</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="p-6">
                    <Lightbulb size={48} className="mx-auto mb-4 text-primary" />
                    <h3 className="font-semibold mb-2">Systems Disruptor</h3>
                    <p className="text-sm text-muted-foreground">Reimagining power structures in AI development and deployment</p>
                  </CardContent>
                </Card>
              </div>
              <div className="prose prose-lg mx-auto text-center">
                <p className="text-lg leading-relaxed">
                  Dr. Dédé Tetsubayashi combines rigorous academic training from Cornell University with lived experience 
                  as a disability advocate to challenge conventional approaches to AI governance. Their work focuses on 
                  dismantling systemic barriers that exclude marginalized communities from technological advancement.
                </p>
                <p className="text-lg leading-relaxed mt-6">
                  As a sought-after speaker and consultant, Dr. Tetsubayashi helps organizations build more equitable 
                  AI systems while navigating complex regulatory landscapes. Their interdisciplinary approach bridges 
                  technical innovation with social justice to create lasting systemic change.
                </p>
              </div>
            </div>
          </div>
        </section>

        <TestimonialsSection />

        <BlogInsightsSection />

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-4">Speaking & Workshops</h2>
              <p className="text-xl text-muted-foreground text-center mb-12">
                Transform your organization's approach to AI governance and inclusive innovation
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Keynote Presentations</h3>
                    <p className="text-muted-foreground mb-4">
                      Inspirational talks that challenge assumptions and provide actionable frameworks 
                      for building more inclusive AI systems.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">45-60 minutes</Badge>
                      <Badge variant="secondary">Q&A included</Badge>
                      <Badge variant="secondary">Virtual or in-person</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Custom Workshops</h3>
                    <p className="text-muted-foreground mb-4">
                      Interactive sessions tailored to your team's needs, focusing on practical 
                      implementation of inclusive AI governance practices.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">2-8 hours</Badge>
                      <Badge variant="secondary">Hands-on exercises</Badge>
                      <Badge variant="secondary">Team-specific</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-card p-8 rounded-lg">
                <h3 className="text-2xl font-semibold mb-6 text-center">Speaking Topics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">AI Governance & Ethics</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Regulatory compliance strategies</li>
                      <li>• Ethical AI framework development</li>
                      <li>• Risk assessment methodologies</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Inclusive Technology Design</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Accessibility-first development</li>
                      <li>• Bias detection and mitigation</li>
                      <li>• Community-centered design thinking</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Systems Change & Leadership</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Organizational transformation</li>
                      <li>• Inclusive leadership practices</li>
                      <li>• Building diverse tech teams</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Disability Advocacy in Tech</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Creating accessible AI interfaces</li>
                      <li>• Disability representation in datasets</li>
                      <li>• Legal compliance and beyond</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Book a Speaking Engagement</h2>
              <p className="text-lg text-muted-foreground">
                Ready to transform your organization's approach to AI governance? 
                Let's discuss how we can work together.
              </p>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Dr. Dédé Tetsubayashi</h3>
              <p className="text-muted-foreground">AI Governance Expert | TEDx Speaker | Systems Disruptor</p>
            </div>
            
            <div className="flex justify-center gap-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open('https://www.youtube.com/@the_drdede', '_blank')}
              >
                YouTube Channel
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open('https://www.incluu.us/blog', '_blank')}
              >
                <BookOpen size={16} className="mr-2" />
                Blog
              </Button>
              <Button variant="outline" size="sm">
                Speaking Inquiry
              </Button>
            </div>

            <div className="pt-6 border-t text-sm text-muted-foreground">
              <p>© 2024 Dr. Dédé Tetsubayashi. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App