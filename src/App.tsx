import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
import professionalHeadshot from '@/assets/images/professional-headshot-1.jpg'
import professionalHeadshot2 from '@/assets/images/professional-headshot-2.jpg'
import professionalHeadshot3 from '@/assets/images/professional-headshot-3.jpg'
import professionalHeadshot4 from '@/assets/images/professional-headshot-4.jpg'
import professionalHeadshot5 from '@/assets/images/professional-headshot-5.jpg'
import speakingPhoto from '@/assets/images/speaking-photo-1.jpg'
import speakingPhoto2 from '@/assets/images/speaking-photo-2.jpg'
import speakingPhoto3 from '@/assets/images/speaking-photo-3.jpg'
import consultingPhoto from '@/assets/images/consulting-photo-1.jpg'
import consultingPhoto2 from '@/assets/images/consulting-photo-2.jpg'
import personalPhoto from '@/assets/images/personal-photo-1.jpg'
import personalPhoto2 from '@/assets/images/personal-photo-2.jpg'
import boardroomPhoto from '@/assets/images/boardroom-photo-1.jpg'
import startupPhoto from '@/assets/images/startup-photo-1.jpg'
import fortune500CaseStudy from '@/assets/images/fortune500-case-study.jpg'
import startupCaseStudy from '@/assets/images/startup-case-study.jpg'
import healthcareCaseStudy from '@/assets/images/healthcare-case-study.jpg'
import ResourcesPage from './ResourcesPage'
import CaseStudiesPage from './CaseStudiesPage'
import SocialMediaFeeds from './components/SocialMediaFeeds'
import RealTimeSocialFeeds from './components/RealTimeSocialFeeds'
import AIGovernanceAssessment from './components/AIGovernanceAssessment'
import VideoTestimonialRecorder from './components/VideoTestimonialRecorder'
import AIContentRecommendations from './components/AIContentRecommendations'
import EnhancedCaseStudies from './components/EnhancedCaseStudies'
import InteractiveTestimonialGallery from './components/InteractiveTestimonialGallery'
import { ScrollReveal, ParallaxContainer, StaggerContainer, StaggerItem, FloatingElement, ScaleOnHover, GlowOnHover } from './components/ScrollAnimations'

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
        src="https://www.youtube.com/embed/ZnqUquGeUzI?rel=0&modestbranding=1"
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

function CaseStudyShowcase({ setCurrentPage }: { setCurrentPage: (page: 'home' | 'resources' | 'assessment' | 'case-studies') => void }) {
  const caseStudies = [
    {
      id: 1,
      title: "Fortune 500 AI Risk Prevention - $500M Savings",
      client: "Global Financial Services Corporation",
      industry: "Financial Services",
      challenge: "Massive AI system vulnerabilities across international operations threatened regulatory compliance and exposed the organization to potential $500M+ in penalties, lawsuits, and operational losses. Legacy AI models showed severe bias in lending decisions affecting 2.3M customers.",
      solution: "Implemented comprehensive AI risk management framework with real-time bias detection, automated compliance monitoring across 47 countries, and equitable lending algorithms. Created crisis prevention protocols and stakeholder communication strategies.",
      results: [
        "$500M in potential losses prevented through proactive risk mitigation",
        "100% regulatory compliance achieved across all jurisdictions",
        "87% reduction in biased lending decisions within 6 months",
        "Enhanced reputation leading to 23% increase in customer trust scores",
        "Framework deployed across 8 additional business units",
        "Avoided class-action lawsuit with 50,000+ affected customers"
      ],
      image: fortune500CaseStudy,
      tags: ["Risk Prevention", "$500M Savings", "Financial Services", "Global Compliance"],
      metrics: { savings: "$500M", timeframe: "18 months", scope: "47 countries" }
    },
    {
      id: 2,
      title: "Emerging Markets AI Discovery - $300M Opportunity",
      client: "Multinational Consumer Goods Company",
      industry: "Consumer Goods",
      challenge: "Traditional market analysis missed accessibility needs in emerging markets, leaving $300M+ in revenue untapped. AI-powered market research tools excluded disabled consumers, representing 15% of global purchasing power.",
      solution: "Redesigned AI market analysis to include disability data and accessibility preferences. Created inclusive consumer profiling algorithms and developed culturally-sensitive AI tools for emerging market research across 23 countries.",
      results: [
        "$300M in new market opportunities discovered and captured",
        "Expanded market reach to 45M previously excluded consumers",
        "157% ROI on inclusive AI research investment within 24 months",
        "Market leadership position established in 12 new countries",
        "Product accessibility improvements benefiting 100% of user base",
        "Recognition as 'Most Inclusive Brand' in 8 emerging markets"
      ],
      image: healthcareCaseStudy,
      tags: ["Market Discovery", "$300M Revenue", "Emerging Markets", "Accessibility"],
      metrics: { opportunity: "$300M", markets: "23 countries", consumers: "45M" }
    },
    {
      id: 3,
      title: "Healthcare System Transformation - $100M Cost Reduction",
      client: "National Healthcare Network",
      industry: "Healthcare",
      challenge: "AI diagnostic systems showed persistent bias against disabled patients, resulting in $100M+ annual costs from misdiagnoses, extended treatments, and malpractice claims. Patient outcomes disparities reached crisis levels.",
      solution: "Comprehensive overhaul of AI diagnostic protocols with disability-inclusive training data, real-time bias monitoring, and accessibility-first user interfaces. Implemented continuous learning systems and provider education programs.",
      results: [
        "$100M annual cost savings through accurate diagnoses",
        "95% accuracy improvement for disabled patient diagnoses",
        "Reduced diagnostic disparities by 78% across all patient groups", 
        "Malpractice claims decreased by 62% within 18 months",
        "Patient satisfaction scores increased by 94% for disabled patients",
        "Model deployed across 847 healthcare facilities nationwide"
      ],
      image: startupCaseStudy,
      tags: ["Healthcare Transformation", "$100M Savings", "Patient Outcomes", "Bias Elimination"],
      metrics: { savings: "$100M", improvement: "95%", facilities: "847" }
    },
    {
      id: 4,
      title: "Global Supply Chain AI Ethics Integration",
      client: "Fortune 100 Manufacturing Corporation",
      industry: "Manufacturing",
      challenge: "AI-powered supply chain optimization inadvertently excluded suppliers owned by disabled entrepreneurs, creating ethical risks and missing cost-saving opportunities worth $75M annually.",
      solution: "Integrated equity metrics into AI supplier selection algorithms, created inclusive vendor evaluation frameworks, and established real-time monitoring for bias in procurement decisions across global operations.",
      results: [
        "$75M in additional cost savings through diverse supplier network",
        "Supply chain resilience improved by 43% through vendor diversification", 
        "Reduced procurement bias by 89% across 156 countries",
        "Established partnerships with 2,847 disability-owned businesses",
        "ESG rating improvement led to $200M in sustainable financing access",
        "Industry leadership recognition for equitable AI practices"
      ],
      image: consultingPhoto,
      tags: ["Supply Chain", "ESG Leadership", "Procurement Equity", "Global Operations"],
      metrics: { savings: "$75M", suppliers: "2,847", countries: "156" }
    },
    {
      id: 5,
      title: "EdTech Accessibility Revolution",
      client: "Leading Online Education Platform",
      industry: "Education Technology",
      challenge: "AI-powered learning systems excluded 12M disabled students globally, creating accessibility lawsuits and missing $180M market opportunity while facing regulatory pressure in 34 countries.",
      solution: "Rebuilt learning AI with Universal Design principles, implemented real-time accessibility testing, and created adaptive learning paths for diverse cognitive and physical abilities.",
      results: [
        "$180M new market opportunity captured through accessible design",
        "12M disabled students gained full platform access",
        "Learning outcomes improved by 67% for all student populations",
        "Regulatory compliance achieved across 34 countries",
        "Platform adoption increased by 156% in special education market",
        "Winner of 'Most Accessible EdTech Platform' for 3 consecutive years"
      ],
      image: speakingPhoto,
      tags: ["EdTech", "Universal Design", "Student Accessibility", "Market Expansion"],
      metrics: { opportunity: "$180M", students: "12M", countries: "34" }
    },
    {
      id: 6,
      title: "Banking AI Bias Elimination Initiative",
      client: "Top 5 Global Investment Bank",
      industry: "Investment Banking",
      challenge: "Credit scoring AI systems showed systematic bias against disabled borrowers, threatening $350M in regulatory penalties and damaging relationships with institutional investors focused on ESG criteria.",
      solution: "Complete credit AI model overhaul with equitable risk assessment, bias detection algorithms, and inclusive financial product design. Implemented real-time fairness monitoring and stakeholder transparency reporting.",
      results: [
        "$350M in regulatory penalties avoided through proactive compliance",
        "Credit approval rates equalized across all demographic groups",
        "ESG investor confidence increased, securing $2.1B in sustainable investments",
        "Lending portfolio diversity improved by 124% while maintaining risk standards",
        "Industry benchmark established for equitable AI in financial services",
        "Customer retention increased by 89% among underserved populations"
      ],
      image: boardroomPhoto,
      tags: ["Banking", "Credit Scoring", "Regulatory Compliance", "ESG Investment"],
      metrics: { penalties_avoided: "$350M", investments: "$2.1B", improvement: "124%" }
    },
    {
      id: 7,
      title: "Retail AI Personalization Equity Transformation",
      client: "Global E-commerce Giant",
      industry: "E-commerce/Retail",
      challenge: "AI recommendation engines systematically excluded products for disabled customers, missing $95M in annual revenue and facing discrimination lawsuits in multiple jurisdictions.",
      solution: "Redesigned recommendation algorithms with inclusive personalization, implemented accessibility-first product discovery, and created adaptive shopping experiences for diverse abilities and needs.",
      results: [
        "$95M in new revenue captured through inclusive recommendations",
        "Customer engagement increased by 203% among disabled shoppers",
        "Discrimination lawsuits settled and prevention protocols established",
        "Market share increased by 47% in accessibility-focused segments",
        "Platform usability improved by 156% for all customer segments",
        "Recognition as 'Most Inclusive Shopping Experience' globally"
      ],
      image: personalPhoto,
      tags: ["E-commerce", "Personalization", "Customer Experience", "Revenue Growth"],
      metrics: { revenue: "$95M", engagement: "203%", market_share: "47%" }
    },
    {
      id: 8,
      title: "Pharmaceutical AI Drug Discovery Inclusion",
      client: "Top 10 Global Pharmaceutical Company",
      industry: "Pharmaceuticals",
      challenge: "AI-powered drug discovery models excluded disability-related conditions from research priorities, missing breakthrough treatments and $420M in market opportunities while facing advocacy group pressure.",
      solution: "Integrated disability conditions into AI research prioritization, created inclusive clinical trial algorithms, and established equitable drug development pipelines with community input protocols.",
      results: [
        "$420M market opportunity identified in disability-focused treatments",
        "3 breakthrough drugs for rare disability conditions entered trials",
        "Clinical trial participation by disabled patients increased by 267%",
        "Research efficiency improved by 89% through inclusive data modeling",
        "Partnership agreements established with 47 disability advocacy organizations",
        "FDA recognition for exemplary inclusive drug development practices"
      ],
      image: consultingPhoto2,
      tags: ["Pharmaceuticals", "Drug Discovery", "Clinical Trials", "Healthcare Equity"],
      metrics: { opportunity: "$420M", participation: "267%", partnerships: "47" }
    },
    {
      id: 9,
      title: "Transportation AI Safety & Accessibility Integration",
      client: "Leading Autonomous Vehicle Developer",
      industry: "Transportation/Automotive",
      challenge: "Autonomous vehicle AI systems failed to recognize and accommodate disabled pedestrians and passengers, creating safety risks and regulatory barriers worth $250M in delayed market entry.",
      solution: "Comprehensive AI safety overhaul with disability-aware object recognition, accessible vehicle interface design, and inclusive transportation planning algorithms integrated with real-world testing protocols.",
      results: [
        "$250M market entry acceleration through regulatory approval",
        "Safety incident prevention for 2.3M disabled road users",
        "First fully accessible autonomous vehicle platform launched",
        "Regulatory approval achieved in 23 countries simultaneously",
        "Safety testing accuracy improved by 178% for edge cases",
        "Industry partnership agreements worth $1.2B in accessible transportation initiatives"
      ],
      image: startupPhoto,
      tags: ["Autonomous Vehicles", "Safety", "Regulatory Approval", "Transportation Equity"],
      metrics: { acceleration: "$250M", users: "2.3M", countries: "23" }
    }
  ]

  const [selectedCase, setSelectedCase] = useState<null | typeof caseStudies[0]>(null)

  return (
    <motion.section 
      className="py-12 bg-secondary/20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-4">Case Study Showcase</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Real-world results from AI governance transformations that drive measurable business value and competitive advantage
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={() => setCurrentPage('case-studies')}
                className="mb-8"
              >
                <Trophy size={16} className="mr-2" />
                View All Case Studies
              </Button>
            </motion.div>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {caseStudies.map((caseStudy, index) => (
              <motion.div
                key={caseStudy.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.03, y: -10 }}
              >
                <Card className="h-full cursor-pointer hover:shadow-xl transition-all duration-300 bg-card/90 backdrop-blur-sm">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <motion.img 
                        src={caseStudy.image} 
                        alt={caseStudy.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      />
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
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
                      <p className="text-sm mb-4 line-clamp-3">{caseStudy.challenge}</p>
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
              </motion.div>
            ))}
          </div>

          <Dialog open={!!selectedCase} onOpenChange={() => setSelectedCase(null)}>
            <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto mx-4 sm:mx-6 lg:mx-8">
              <DialogHeader className="sticky top-0 bg-card z-10 pb-4 border-b">
                <DialogTitle className="text-xl sm:text-2xl lg:text-3xl pr-8">{selectedCase?.title}</DialogTitle>
              </DialogHeader>
              {selectedCase && (
                <motion.div 
                  className="space-y-6 p-1 sm:p-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Hero Image */}
                  <div className="relative w-full h-48 sm:h-64 lg:h-80 rounded-lg overflow-hidden">
                    <img 
                      src={selectedCase.image} 
                      alt={selectedCase.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {selectedCase.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="bg-white/90 text-black text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Key Metrics */}
                  {selectedCase.metrics && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-primary/5 rounded-lg">
                      {Object.entries(selectedCase.metrics).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-lg sm:text-xl lg:text-2xl font-bold text-primary">{value}</div>
                          <div className="text-xs sm:text-sm text-muted-foreground capitalize">
                            {key.replace('_', ' ')}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Client & Industry Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 bg-card/50 rounded-lg">
                    <div>
                      <h4 className="font-semibold mb-2 text-sm sm:text-base">Client & Industry</h4>
                      <p className="text-muted-foreground text-sm sm:text-base">{selectedCase.client}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">{selectedCase.industry}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-sm sm:text-base">Project Scope</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCase.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Challenge */}
                  <div className="p-4 bg-destructive/5 rounded-lg border-l-4 border-destructive/20">
                    <h4 className="font-semibold mb-3 text-destructive text-sm sm:text-base flex items-center">
                      <Shield size={16} className="mr-2" />
                      Challenge
                    </h4>
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{selectedCase.challenge}</p>
                  </div>
                  
                  {/* Solution */}
                  <div className="p-4 bg-primary/5 rounded-lg border-l-4 border-primary/20">
                    <h4 className="font-semibold mb-3 text-primary text-sm sm:text-base flex items-center">
                      <Lightbulb size={16} className="mr-2" />
                      Solution
                    </h4>
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{selectedCase.solution}</p>
                  </div>
                  
                  {/* Results */}
                  <div className="p-4 bg-accent/5 rounded-lg border-l-4 border-accent/20">
                    <h4 className="font-semibold mb-4 text-accent text-sm sm:text-base flex items-center">
                      <Trophy size={16} className="mr-2" />
                      Results & Impact
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedCase.results.map((result, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-3 p-3 bg-card rounded-lg"
                        >
                          <Star size={16} className="text-yellow-500 mt-1 flex-shrink-0" weight="fill" />
                          <span className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{result}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Call to Action */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t sticky bottom-0 bg-card pb-4">
                    <Button 
                      onClick={() => setCurrentPage('case-studies')}
                      className="flex-1"
                      size="lg"
                    >
                      <Trophy size={16} className="mr-2" />
                      View All Case Studies
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      size="lg"
                      onClick={() => window.open('https://calendly.com/dr-dede', '_blank')}
                    >
                      <Calendar size={16} className="mr-2" />
                      Get Similar Results
                    </Button>
                  </div>
                </motion.div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </motion.section>
  )
}

function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Dr. Tetsubayashi's keynote completely transformed how our engineering team approaches AI ethics. Their frameworks are practical, actionable, and deeply rooted in real-world impact.",
      author: "Sarah Chen",
      title: "CTO, TechForward Inc.",
      rating: 5,
      avatar: "SC",
      photo: professionalHeadshot5
    },
    {
      quote: "The accessibility workshop was eye-opening. We implemented Dr. Tetsubayashi's recommendations and saw immediate improvements in our product's inclusive design.",
      author: "Marcus Rodriguez",
      title: "Director of Product, InnovateLabs",
      rating: 5,
      avatar: "MR",
      photo: consultingPhoto2
    },
    {
      quote: "Brilliant, insightful, and incredibly engaging. Dr. Tetsubayashi's presentation on AI governance received the highest evaluation scores in our conference's history.",
      author: "Dr. Amelia Foster",
      title: "Conference Chair, AI Ethics Summit 2024",
      rating: 5,
      avatar: "AF",
      photo: speakingPhoto3
    },
    {
      quote: "Working with Dr. Tetsubayashi on our AI governance strategy was transformative. Their interdisciplinary approach helped us navigate complex regulatory requirements while staying true to our values.",
      author: "James Park",
      title: "VP of Legal & Compliance, DataStream Corp",
      rating: 5,
      avatar: "JP",
      photo: personalPhoto2
    }
  ]

  return (
    <ScrollReveal>
      <motion.section 
        className="py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <ParallaxContainer>
              <motion.div 
                className="text-center mb-16"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">What People Are Saying</h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Feedback from speaking engagements and consulting clients
                </p>
                {/* Professional headshot in testimonial header */}
                <FloatingElement intensity={0.2}>
                  <motion.div 
                    className="flex justify-center mb-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    <ScaleOnHover scale={1.1}>
                      <img 
                        src={professionalHeadshot4}
                        alt="Dr. Dédé Tetsubayashi with clients"
                        className="w-32 h-32 rounded-full object-cover shadow-2xl ring-4 ring-primary/20 professional-img"
                      />
                    </ScaleOnHover>
                  </motion.div>
                </FloatingElement>
              </motion.div>
            </ParallaxContainer>
            
            <StaggerContainer staggerDelay={0.15}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {testimonials.map((testimonial, index) => (
                  <StaggerItem key={index}>
                    <ParallaxContainer offset={index % 2 === 0 ? 10 : -10}>
                      <GlowOnHover>
                        <motion.div
                          whileHover={{ scale: 1.02, y: -5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Card className="h-full bg-card/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 testimonial-card">
                            <CardContent className="p-8">
                              <div className="flex items-start gap-6">
                                <motion.div
                                  animate={{ rotate: [0, 10, 0] }}
                                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                  className="flex-shrink-0"
                                >
                                  <Quotes size={32} className="text-accent" />
                                </motion.div>
                                <div className="space-y-6">
                                  <p className="text-muted-foreground leading-relaxed text-lg">
                                    "{testimonial.quote}"
                                  </p>
                                  
                                  <div className="flex items-center gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                      <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.1 }}
                                        whileHover={{ scale: 1.2, rotate: 15 }}
                                      >
                                        <Star size={18} weight="fill" className="text-yellow-500" />
                                      </motion.div>
                                    ))}
                                  </div>
                                  
                                  <div className="flex items-center gap-4">
                                    <motion.div
                                      whileHover={{ scale: 1.1 }}
                                      transition={{ duration: 0.2 }}
                                    >
                                      <img 
                                        src={testimonial.photo}
                                        alt={testimonial.author}
                                        className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/20 photo-hover"
                                      />
                                    </motion.div>
                                    <div>
                                      <p className="font-semibold text-lg">{testimonial.author}</p>
                                      <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </GlowOnHover>
                    </ParallaxContainer>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
          </div>
        </div>
      </motion.section>
    </ScrollReveal>
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
  const [currentPage, setCurrentPage] = useState<'home' | 'resources' | 'assessment' | 'case-studies'>('home')

  if (currentPage === 'resources') {
    return <ResourcesPage onBack={() => setCurrentPage('home')} />
  }

  if (currentPage === 'case-studies') {
    return <CaseStudiesPage onBack={() => setCurrentPage('home')} />
  }

  if (currentPage === 'assessment') {
    return (
      <div className="min-h-screen relative">
        {/* Fixed background image */}
        <div 
          className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: `url(${heroBackground})`,
          }}
        />
        <div className="fixed inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/85 z-0" />
        
        {/* Content over background */}
        <div className="relative z-10">
          <Toaster position="top-right" />
          <AdminPanel />
          <header className="border-b bg-card/80 backdrop-blur-md sticky top-0 z-40">
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
      </div>
    )
  }
  return (
    <div className="min-h-screen relative">
      {/* Fixed background image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: `url(${heroBackground})`,
        }}
      />
      <div className="fixed inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/85 z-0" />
      
      {/* Content over background */}
      <div className="relative z-10">
        <Toaster position="top-right" />
        <AdminPanel />
        <header className="border-b bg-card/80 backdrop-blur-md sticky top-0 z-40">
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
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setCurrentPage('case-studies')}
                  className="hidden lg:flex text-xs px-2 py-1"
                >
                  <Trophy size={14} className="mr-1" />
                  Case Studies
                </Button>
                <div className="flex-shrink-0">
                  <CalendlyIntegration />
                </div>
              </div>
            </div>
          </div>
        </header>

        <main>
        <ScrollReveal>
        <section className="py-12 lg:py-32 min-h-[80vh] flex items-center relative overflow-hidden">
          {/* Animated background elements */}
          <motion.div 
            className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl"
            animate={{ 
              x: [0, 30, 0], 
              y: [0, -20, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-20 right-10 w-32 h-32 bg-accent/10 rounded-full blur-xl"
            animate={{ 
              x: [0, -40, 0], 
              y: [0, 20, 0],
              scale: [1, 0.8, 1]
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
              <ParallaxContainer offset={15}>
                <motion.div 
                  className="order-2 lg:order-1 space-y-8"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <div>
                    <motion.h1 
                      className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.8 }}
                    >
                      Transforming AI Through
                      <motion.span 
                        className="text-primary block"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                      > Equitable Innovation</motion.span>
                    </motion.h1>
                    <motion.p 
                      className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.8 }}
                    >
                      Watch my TEDx talk on reimagining artificial intelligence systems to serve everyone, 
                      not just the privileged few.
                    </motion.p>
                  </div>
                  <motion.div 
                    className="flex flex-col sm:flex-row gap-4"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                  >
                    <ScaleOnHover scale={1.08}>
                      <GlowOnHover>
                        <Button 
                          size="lg" 
                          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg btn-enhanced"
                          onClick={() => window.open('https://www.youtube.com/@the_drdede', '_blank')}
                        >
                          <Play size={24} className="mr-3" />
                          Watch TEDx Talk
                        </Button>
                      </GlowOnHover>
                    </ScaleOnHover>
                    <Dialog>
                      <DialogTrigger asChild>
                        <ScaleOnHover scale={1.05}>
                          <Button variant="outline" size="lg" className="px-8 py-4 text-lg btn-enhanced">
                            Get AI Insights
                          </Button>
                        </ScaleOnHover>
                      </DialogTrigger>
                      <DialogContent className="mx-4 max-w-md">
                        <DialogHeader>
                          <DialogTitle>Stay Updated</DialogTitle>
                        </DialogHeader>
                        <NewsletterSignup />
                      </DialogContent>
                    </Dialog>
                  </motion.div>
                </motion.div>
              </ParallaxContainer>
              <ParallaxContainer offset={-15}>
                <motion.div 
                  className="order-1 lg:order-2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                    >
                      <FloatingElement intensity={0.3}>
                        <YouTubeEmbed />
                      </FloatingElement>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.8 }}
                    >
                      <ScaleOnHover scale={1.03}>
                        <SubscriberCounter />
                      </ScaleOnHover>
                    </motion.div>
                  </div>
                </motion.div>
              </ParallaxContainer>
            </div>
          </div>
        </section>
        </ScrollReveal>

        <ScrollReveal>
        <section className="py-16 bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <ParallaxContainer>
              <motion.div 
                className="max-w-4xl mx-auto text-center mb-16"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">About Dr. Dédé</h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Combining rigorous academic training with lived experience as a disability advocate 
                  to challenge conventional approaches to AI governance and create lasting systemic change.
                </p>
              </motion.div>
            </ParallaxContainer>
            
            {/* Multiple professional headshots with floating animation */}
            <motion.div 
              className="flex justify-center gap-8 mb-12"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <FloatingElement intensity={0.2}>
                <ScaleOnHover scale={1.15}>
                  <div className="relative">
                    <img 
                      src={professionalHeadshot}
                      alt="Dr. Dédé Tetsubayashi - Primary Professional Headshot"
                      className="w-48 h-48 rounded-full object-cover shadow-2xl ring-4 ring-primary/20 professional-img"
                    />
                    <motion.div 
                      className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/20"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                </ScaleOnHover>
              </FloatingElement>
              <FloatingElement intensity={0.2}>
                <ScaleOnHover scale={1.1}>
                  <img 
                    src={speakingPhoto}
                    alt="Dr. Dédé speaking at a conference"
                    className="w-32 h-32 rounded-full object-cover shadow-xl ring-2 ring-accent/20 professional-img"
                    style={{ marginTop: '3rem' }}
                  />
                </ScaleOnHover>
              </FloatingElement>
              <FloatingElement intensity={0.2}>
                <ScaleOnHover scale={1.1}>
                  <img 
                    src={consultingPhoto}
                    alt="Dr. Dédé in consultation setting"
                    className="w-32 h-32 rounded-full object-cover shadow-xl ring-2 ring-primary/20 professional-img"
                    style={{ marginTop: '-1rem' }}
                  />
                </ScaleOnHover>
              </FloatingElement>
            </motion.div>
            
            <StaggerContainer>
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {[
                  {
                    icon: GraduationCap,
                    title: "AI GRC Executive & Board Member",
                    description: "Advanced expertise in Technology Policy and AI Governance Risk & Compliance",
                    color: "text-primary",
                    photo: boardroomPhoto
                  },
                  {
                    icon: Trophy,
                    title: "Disability Advocate & Systems Disruptor",
                    description: "Champion for accessible technology and equitable design practices",
                    color: "text-accent",
                    photo: personalPhoto
                  },
                  {
                    icon: VideoCamera,
                    title: "TEDx Speaker",
                    description: "Inspiring global audiences on inclusive AI and systems transformation",
                    color: "text-primary",
                    photo: speakingPhoto2
                  },
                  {
                    icon: Lightbulb,
                    title: "Innovation Leader",
                    description: "Reimagining power structures in AI development and deployment",
                    color: "text-accent",
                    photo: consultingPhoto2
                  }
                ].map((item, index) => (
                  <StaggerItem key={index}>
                    <ParallaxContainer offset={index % 2 === 0 ? 10 : -10}>
                      <GlowOnHover>
                        <motion.div
                          whileHover={{ scale: 1.05, y: -10 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Card className="text-center bg-card/80 backdrop-blur-sm border-0 shadow-lg h-full overflow-hidden">
                            <div className="relative h-32 mb-4">
                              <img 
                                src={item.photo}
                                alt={item.title}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                            </div>
                            <CardContent className="p-8 pt-0">
                              <FloatingElement intensity={0.2}>
                                <item.icon size={48} className={`mx-auto mb-4 ${item.color}`} />
                              </FloatingElement>
                              <h3 className="font-semibold mb-3 text-lg leading-tight">{item.title}</h3>
                              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </GlowOnHover>
                    </ParallaxContainer>
                  </StaggerItem>
                ))
              }
              </motion.div>
            </StaggerContainer>
            
            <ParallaxContainer>
              <motion.div 
                className="max-w-4xl mx-auto text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <p className="text-lg leading-relaxed mb-6">
                  Dr. Dédé Tetsubayashi dismantles systemic barriers that exclude marginalized communities 
                  from technological advancement. Their interdisciplinary approach bridges technical innovation 
                  with social justice to create lasting systemic change.
                </p>
                <p className="text-lg leading-relaxed">
                  As a sought-after speaker and consultant, Dr. Tetsubayashi helps organizations build more equitable 
                  AI systems while navigating complex regulatory landscapes.
                </p>
              </motion.div>
            </ParallaxContainer>
          </div>
        </section>
        </ScrollReveal>

        <TestimonialsSection />

        <InteractiveTestimonialGallery />

        <EnhancedCaseStudies />

        <section className="py-16 bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Organizations Choose Dr. Dédé</h2>
                <p className="text-xl text-muted-foreground">
                  Measurable results that drive competitive advantage and sustainable growth
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                <Card className="text-center bg-card/90 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className="text-4xl font-bold text-primary mb-3">$50M+</div>
                    <p className="text-sm text-muted-foreground">In funding secured by clients citing responsible AI practices</p>
                  </CardContent>
                </Card>
                <Card className="text-center bg-card/90 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className="text-4xl font-bold text-accent mb-3">85%</div>
                    <p className="text-sm text-muted-foreground">Reduction in compliance review time for regulated industries</p>
                  </CardContent>
                </Card>
                <Card className="text-center bg-card/90 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className="text-4xl font-bold text-primary mb-3">100%</div>
                    <p className="text-sm text-muted-foreground">Regulatory compliance success rate across all jurisdictions</p>
                  </CardContent>
                </Card>
                <Card className="text-center bg-card/90 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className="text-4xl font-bold text-accent mb-3">40%</div>
                    <p className="text-sm text-muted-foreground">Faster AI project approval times with comprehensive governance</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="bg-card/90 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <Shield size={40} className="text-primary mb-3" />
                    <CardTitle className="text-2xl">Risk Mitigation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      Proactive identification and mitigation of AI-related risks before they impact your business. 
                      Our frameworks have helped organizations avoid costly regulatory penalties and reputational damage.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-center text-sm">
                        <CheckCircle size={16} className="text-primary mr-3 flex-shrink-0" />
                        Comprehensive risk assessment methodologies
                      </li>
                      <li className="flex items-center text-sm">
                        <CheckCircle size={16} className="text-primary mr-3 flex-shrink-0" />
                        Regulatory compliance strategies
                      </li>
                      <li className="flex items-center text-sm">
                        <CheckCircle size={16} className="text-primary mr-3 flex-shrink-0" />
                        Crisis prevention and response planning
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-card/90 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <Trophy size={40} className="text-accent mb-3" />
                    <CardTitle className="text-2xl">Competitive Advantage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      Transform ethical AI from a compliance burden into a strategic differentiator. 
                      Organizations with mature AI governance attract top talent, secure funding, and win more business.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-center text-sm">
                        <CheckCircle size={16} className="text-accent mr-3 flex-shrink-0" />
                        Market differentiation through ethical leadership
                      </li>
                      <li className="flex items-center text-sm">
                        <CheckCircle size={16} className="text-accent mr-3 flex-shrink-0" />
                        Enhanced brand reputation and trust
                      </li>
                      <li className="flex items-center text-sm">
                        <CheckCircle size={16} className="text-accent mr-3 flex-shrink-0" />
                        Access to ESG-conscious investment capital
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-card/90 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <Users size={40} className="text-primary mb-3" />
                    <CardTitle className="text-2xl">Market Expansion</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      Inclusive AI design opens new markets and customer segments. 
                      The disability market alone represents over $13 trillion in annual disposable income globally.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-center text-sm">
                        <CheckCircle size={16} className="text-primary mr-3 flex-shrink-0" />
                        Access to underserved market segments
                      </li>
                      <li className="flex items-center text-sm">
                        <CheckCircle size={16} className="text-primary mr-3 flex-shrink-0" />
                        Improved product usability for all users
                      </li>
                      <li className="flex items-center text-sm">
                        <CheckCircle size={16} className="text-primary mr-3 flex-shrink-0" />
                        Innovation opportunities through inclusive design
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <ScrollReveal>
        <section className="py-16">
          <div className="container mx-auto px-4">
            <ParallaxContainer>
              <motion.div 
                className="max-w-4xl mx-auto text-center mb-16"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Speaking & Workshops</h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Transform your organization's approach to AI governance and equitable innovation
                </p>
                {/* Multiple professional speaking photos */}
                <motion.div 
                  className="flex justify-center gap-6 mb-8"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <FloatingElement intensity={0.2}>
                    <ScaleOnHover scale={1.1}>
                      <div className="relative">
                        <img 
                          src={speakingPhoto}
                          alt="Dr. Dédé speaking at a conference"
                          className="w-72 h-48 rounded-lg object-cover shadow-xl professional-img"
                        />
                        <motion.div 
                          className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium"
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.8 }}
                        >
                          Available Worldwide
                        </motion.div>
                      </div>
                    </ScaleOnHover>
                  </FloatingElement>
                  <FloatingElement intensity={0.2}>
                    <ScaleOnHover scale={1.1}>
                      <img 
                        src={speakingPhoto2}
                        alt="Dr. Dédé at TEDx event"
                        className="w-48 h-32 rounded-lg object-cover shadow-lg professional-img mt-8"
                      />
                    </ScaleOnHover>
                  </FloatingElement>
                </motion.div>
              </motion.div>
            </ParallaxContainer>
            
            <StaggerContainer>
              <motion.div 
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <StaggerItem>
                  <ParallaxContainer offset={10}>
                    <GlowOnHover>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg h-full overflow-hidden">
                          <div className="relative h-32 mb-4">
                            <img 
                              src={personalPhoto}
                              alt="Keynote speaking setup"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
                            <div className="absolute bottom-2 left-4 flex flex-wrap gap-2">
                              <Badge variant="secondary" className="text-xs bg-white/90 text-black">Virtual or in-person</Badge>
                              <Badge variant="secondary" className="text-xs bg-white/90 text-black">30-90 minutes</Badge>
                            </div>
                          </div>
                          <CardContent className="p-8">
                            <h3 className="text-2xl font-semibold mb-4">Keynote Speaking</h3>
                            <p className="text-muted-foreground mb-6 leading-relaxed">
                              Inspiring presentations on AI governance, accessibility, and systems transformation 
                              that energize audiences and drive organizational change.
                            </p>
                            <motion.div 
                              className="flex justify-center mb-4"
                              whileHover={{ scale: 1.05 }}
                            >
                              <FloatingElement intensity={0.3}>
                                <img 
                                  src={personalPhoto2}
                                  alt="Dr. Dédé during a keynote presentation"
                                  className="w-20 h-20 rounded-full object-cover ring-2 ring-primary/20 professional-img"
                                />
                              </FloatingElement>
                            </motion.div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </GlowOnHover>
                  </ParallaxContainer>
                </StaggerItem>

                <StaggerItem>
                  <ParallaxContainer offset={-10}>
                    <GlowOnHover>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-lg h-full overflow-hidden">
                          <div className="relative h-32 mb-4">
                            <img 
                              src={consultingPhoto2}
                              alt="Workshop facilitation"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
                            <div className="absolute bottom-2 left-4 flex flex-wrap gap-2">
                              <Badge variant="secondary" className="text-xs bg-white/90 text-black">2-8 hours</Badge>
                              <Badge variant="secondary" className="text-xs bg-white/90 text-black">Hands-on</Badge>
                              <Badge variant="secondary" className="text-xs bg-white/90 text-black">Customized</Badge>
                            </div>
                          </div>
                          <CardContent className="p-8">
                            <h3 className="text-2xl font-semibold mb-4">Custom Workshops</h3>
                            <p className="text-muted-foreground mb-6 leading-relaxed">
                              Interactive sessions tailored to your team's needs, focusing on practical 
                              implementation of equitable AI governance practices.
                            </p>
                            <motion.div 
                              className="flex justify-center mb-4"
                              whileHover={{ scale: 1.05 }}
                            >
                              <FloatingElement intensity={0.3}>
                                <img 
                                  src={consultingPhoto}
                                  alt="Dr. Dédé facilitating a workshop"
                                  className="w-20 h-20 rounded-full object-cover ring-2 ring-accent/20 professional-img"
                                />
                              </FloatingElement>
                            </motion.div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </GlowOnHover>
                  </ParallaxContainer>
                </StaggerItem>
              </motion.div>
            </StaggerContainer>

            <ParallaxContainer>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <GlowOnHover>
                  <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-0">
                    <CardContent className="p-12">
                      <h3 className="text-2xl font-semibold mb-8 text-center">Speaking Topics</h3>
                      <StaggerContainer>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                          {[
                            {
                              title: "AI Governance & Compliance",
                              items: [
                                "Regulatory compliance strategies",
                                "Ethical AI framework development", 
                                "Risk assessment methodologies"
                              ]
                            },
                            {
                              title: "Equitable Technology Design",
                              items: [
                                "Accessibility-first development",
                                "Bias detection and mitigation",
                                "Community-centered design thinking"
                              ]
                            },
                            {
                              title: "Systems Change & Leadership",
                              items: [
                                "Organizational transformation",
                                "Equitable leadership practices",
                                "Building diverse tech teams"
                              ]
                            }
                          ].map((topic, index) => (
                            <StaggerItem key={index}>
                              <motion.div 
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                              >
                                <div>
                                  <h4 className="font-semibold mb-4 text-lg">{topic.title}</h4>
                                  <ul className="space-y-3 text-sm text-muted-foreground">
                                    {topic.items.map((item, itemIndex) => (
                                      <motion.li 
                                        key={itemIndex}
                                        className="flex items-start"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: (index * 0.1) + (itemIndex * 0.05) }}
                                      >
                                        <CheckCircle size={14} className={`${index === 1 ? 'text-accent' : 'text-primary'} mr-2 mt-0.5 flex-shrink-0`} />
                                        {item}
                                      </motion.li>
                                    ))}
                                  </ul>
                                </div>
                              </motion.div>
                            </StaggerItem>
                          ))}
                        </div>
                      </StaggerContainer>
                    </CardContent>
                  </Card>
                </GlowOnHover>
              </motion.div>
            </ParallaxContainer>
          </div>
        </section>
        </ScrollReveal>

        <section className="py-16 bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="space-y-6">
                <AccordionItem value="latest-insights" className="border-0 bg-card/80 backdrop-blur-sm rounded-2xl px-8 shadow-lg">
                  <AccordionTrigger className="text-2xl font-semibold hover:no-underline py-8">
                    Latest Insights
                  </AccordionTrigger>
                  <AccordionContent className="pb-8">
                    <BlogInsightsContent />
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="social-updates" className="border-0 bg-card/80 backdrop-blur-sm rounded-2xl px-8 shadow-lg">
                  <AccordionTrigger className="text-2xl font-semibold hover:no-underline py-8">
                    Latest Social Updates
                  </AccordionTrigger>
                  <AccordionContent className="pb-8">
                    <RealTimeSocialFeeds />
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="ai-curated" className="border-0 bg-card/80 backdrop-blur-sm rounded-2xl px-8 shadow-lg">
                  <AccordionTrigger className="text-2xl font-semibold hover:no-underline py-8">
                    AI-Curated for You
                  </AccordionTrigger>
                  <AccordionContent className="pb-8">
                    <AIContentRecommendations />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-br from-primary/10 to-accent/10">
          <div className="container mx-auto px-4">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your AI Future?</h2>
              <p className="text-xl text-muted-foreground mb-12">
                Join the Fortune 500 companies, innovative startups, and leading healthcare networks 
                who trust Dr. Dédé to guide their AI governance transformation.
              </p>
              
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {[
                  { metric: "Global", description: "Reach and impact" },
                  { metric: "48hr", description: "Response time guaranteed" },
                  { metric: "100%", description: "Client satisfaction" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Card className="bg-card/90 backdrop-blur-sm border-0 shadow-lg">
                      <CardContent className="p-6 text-center">
                        <div className="text-3xl font-bold text-primary mb-2">{item.metric}</div>
                        <div className="text-sm text-muted-foreground">{item.description}</div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-6 justify-center mb-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg btn-enhanced pulse-glow">
                    <Calendar size={24} className="mr-3" />
                    Book Strategy Session
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="px-8 py-4 text-lg border-2 btn-enhanced"
                    onClick={() => setCurrentPage('case-studies')}
                  >
                    View Success Stories
                  </Button>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="flex flex-col items-center gap-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <VideoTestimonialRecorder />
                <p className="text-sm text-muted-foreground">
                  Share your experience working with Dr. Dédé
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-card/80 backdrop-blur-md border-t py-8 md:py-12">
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
    </div>
  )
}

export default App