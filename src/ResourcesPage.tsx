import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ArrowLeft, LinkedinLogo, InstagramLogo, YoutubeLogo, ArrowSquareOut, Calendar, PaperPlaneTilt, DownloadSimple, FileText, CheckCircle, Users as UsersIcon, EnvelopeSimple, CalendarBlank, ArrowRight } from "@phosphor-icons/react"
import { useKV } from '@github/spark/hooks'
import { toast } from 'sonner'

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
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isSubmitting}
            className="w-full px-3 py-2 border border-input rounded-md focus:ring-2 focus:ring-ring focus:border-transparent"
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
      className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-sm px-3 py-2"
      size="sm"
    >
      <CalendarBlank size={16} className="mr-1 sm:mr-2" />
      <span className="hidden xs:inline">Schedule </span>Speaking
    </Button>
  )
}

function ResourcesDownloadsSection() {
  const [downloads, setDownloads] = useKV<Record<string, number>>('resource-downloads', {})

  const resources = [
    {
      id: 'ai-governance-framework',
      title: 'Complete AI Governance Framework',
      description: 'A comprehensive 40-page framework for implementing ethical AI governance in organizations of any size. Includes step-by-step implementation guides, risk assessment templates, and stakeholder engagement strategies.',
      type: 'Framework',
      pages: 40,
      format: 'PDF',
      category: 'AI Governance',
      downloadUrl: '#',
      preview: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop'
    },
    {
      id: 'accessibility-checklist',
      title: 'AI Accessibility Assessment Checklist',
      description: 'Step-by-step checklist for evaluating and improving AI system accessibility across disabilities.',
      type: 'Checklist',
      pages: 12,
      format: 'PDF',
      category: 'Accessibility',
      downloadUrl: '#',
      preview: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop'
    },
    {
      id: 'bias-detection-whitepaper',
      title: 'Bias Detection in AI Systems: A Practical Guide',
      description: 'Research-backed methods for identifying and mitigating bias in machine learning models.',
      type: 'White Paper',
      pages: 28,
      format: 'PDF',
      category: 'AI Ethics',
      downloadUrl: '#',
      preview: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop'
    },
    {
      id: 'equitable-design-toolkit',
      title: 'Equitable AI Design Toolkit',
      description: 'Templates, worksheets, and guidelines for building AI systems that work for everyone. Features practical exercises for stakeholder engagement, accessibility auditing, and equitable design implementation.',
      type: 'Toolkit',
      pages: 35,
      format: 'PDF',
      category: 'Equitable Design',
      downloadUrl: '#',
      preview: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop'
    },
    {
      id: 'regulatory-compliance-guide',
      title: 'AI Regulatory Compliance Guide 2024',
      description: 'Navigate global AI regulations including EU AI Act, GDPR, and US state legislation.',
      type: 'Guide',
      pages: 45,
      format: 'PDF',
      category: 'Compliance',
      downloadUrl: '#',
      preview: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop'
    },
    {
      id: 'systems-thinking-workbook',
      title: 'Systems Thinking for AI Leaders Workbook',
      description: 'Interactive exercises and frameworks for applying systems thinking to AI governance challenges.',
      type: 'Workbook',
      pages: 32,
      format: 'PDF',
      category: 'Leadership',
      downloadUrl: '#',
      preview: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=300&fit=crop'
    }
  ]

  const handleDownload = async (resourceId: string) => {
    // Increment download counter
    setDownloads(current => ({
      ...(current || {}),
      [resourceId]: ((current || {})[resourceId] || 0) + 1
    }))
    
    // In a real implementation, this would trigger an actual download
    toast.success('Download started! Check your downloads folder.')
  }

  return (
    <section className="py-12 bg-secondary/10">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Resources & Downloads</h2>
            <p className="text-lg text-muted-foreground">
              Free frameworks, guides, and tools to advance your AI governance journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource) => (
              <Card key={resource.id} className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="relative">
                    <img 
                      src={resource.preview} 
                      alt={resource.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <Badge variant="secondary" className="text-xs bg-white/90 text-black">
                        {resource.category}
                      </Badge>
                      <Badge variant="outline" className="text-xs bg-white/90">
                        {resource.format}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start gap-2 mb-3">
                      <FileText size={20} className="text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-lg leading-tight mb-2">{resource.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{resource.type}</span>
                        <span>{resource.pages} pages</span>
                        {(downloads && downloads[resource.id]) && (
                          <span className="text-accent">{downloads[resource.id]} downloads</span>
                        )}
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => handleDownload(resource.id)}
                      className="w-full"
                      size="sm"
                    >
                      <DownloadSimple size={16} className="mr-2" />
                      Download Free
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-4">Want More Resources?</h3>
                <p className="text-muted-foreground mb-6">
                  Subscribe to receive new frameworks, research updates, and exclusive content directly in your inbox.
                </p>
                <NewsletterSignup />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

function AIGovernanceAssessment() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [showResults, setShowResults] = useState(false)
  const [assessmentResults, setAssessmentResults] = useKV<any>('assessment-results', null)

  const questions = [
    {
      id: 'governance-framework',
      category: 'Governance Framework',
      question: 'How would you rate your organization\'s current AI governance framework?',
      options: [
        { value: 1, text: 'No formal framework exists' },
        { value: 2, text: 'Basic policies but no enforcement' },
        { value: 3, text: 'Documented framework with some oversight' },
        { value: 4, text: 'Comprehensive framework with regular reviews' },
        { value: 5, text: 'Industry-leading governance with continuous improvement' }
      ]
    },
    {
      id: 'risk-assessment',
      category: 'Risk Management',
      question: 'How does your organization identify and assess AI-related risks?',
      options: [
        { value: 1, text: 'No formal risk assessment process' },
        { value: 2, text: 'Ad-hoc risk identification' },
        { value: 3, text: 'Regular risk assessments for major AI projects' },
        { value: 4, text: 'Systematic risk assessment across all AI initiatives' },
        { value: 5, text: 'Proactive risk management with predictive analytics' }
      ]
    },
    {
      id: 'bias-mitigation',
      category: 'Fairness & Bias',
      question: 'What measures are in place to detect and mitigate algorithmic bias?',
      options: [
        { value: 1, text: 'No bias detection or mitigation measures' },
        { value: 2, text: 'Basic awareness but no systematic approach' },
        { value: 3, text: 'Bias testing during development phase' },
        { value: 4, text: 'Ongoing bias monitoring and correction' },
        { value: 5, text: 'Advanced bias detection with automated corrective measures' }
      ]
    },
    {
      id: 'accessibility',
      category: 'Accessibility',
      question: 'How well do your AI systems serve users with disabilities?',
      options: [
        { value: 1, text: 'Accessibility is not considered' },
        { value: 2, text: 'Basic legal compliance only' },
        { value: 3, text: 'Some accessibility features included' },
        { value: 4, text: 'Accessibility integrated throughout design' },
        { value: 5, text: 'Universal design principles with continuous user feedback' }
      ]
    },
    {
      id: 'transparency',
      category: 'Transparency',
      question: 'How transparent are your AI systems to stakeholders?',
      options: [
        { value: 1, text: 'AI systems operate as black boxes' },
        { value: 2, text: 'Limited documentation available' },
        { value: 3, text: 'Basic explanations provided to users' },
        { value: 4, text: 'Comprehensive transparency measures' },
        { value: 5, text: 'Full algorithmic accountability and explainability' }
      ]
    },
    {
      id: 'data-governance',
      category: 'Data Governance',
      question: 'How well is data governance integrated with AI development?',
      options: [
        { value: 1, text: 'No formal data governance for AI' },
        { value: 2, text: 'Basic data handling procedures' },
        { value: 3, text: 'Data quality checks for AI training' },
        { value: 4, text: 'Comprehensive data lifecycle management' },
        { value: 5, text: 'Advanced data governance with automated quality assurance' }
      ]
    },
    {
      id: 'stakeholder-engagement',
      category: 'Stakeholder Engagement',
      question: 'How are diverse stakeholders involved in AI development decisions?',
      options: [
        { value: 1, text: 'No external stakeholder involvement' },
        { value: 2, text: 'Limited consultation with select groups' },
        { value: 3, text: 'Regular feedback from key stakeholders' },
        { value: 4, text: 'Systematic engagement across diverse communities' },
        { value: 5, text: 'Co-creation with affected communities and continuous dialogue' }
      ]
    },
    {
      id: 'monitoring-evaluation',
      category: 'Monitoring & Evaluation',
      question: 'How do you monitor AI system performance and impact?',
      options: [
        { value: 1, text: 'No ongoing monitoring after deployment' },
        { value: 2, text: 'Basic performance metrics tracking' },
        { value: 3, text: 'Regular performance and impact assessments' },
        { value: 4, text: 'Comprehensive monitoring with corrective actions' },
        { value: 5, text: 'Real-time monitoring with automated interventions' }
      ]
    }
  ]

  const currentQuestion = questions[currentQuestionIndex]

  const handleAnswer = (value: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }))
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      calculateResults()
    }
  }

  const calculateResults = async () => {
    const totalScore = Object.values(answers).reduce((sum, value) => sum + value, 0)
    const maxScore = questions.length * 5
    const percentage = Math.round((totalScore / maxScore) * 100)
    
    let level = 'Emerging'
    let description = 'Your organization is in the early stages of AI governance development.'
    let recommendations = [
      'Establish a formal AI governance committee',
      'Develop basic AI ethics policies',
      'Create awareness training programs'
    ]

    if (percentage >= 80) {
      level = 'Advanced'
      description = 'Your organization demonstrates mature AI governance practices.'
      recommendations = [
        'Share best practices with industry peers',
        'Explore cutting-edge governance technologies',
        'Mentor other organizations in AI governance'
      ]
    } else if (percentage >= 60) {
      level = 'Developing'
      description = 'Your organization has solid foundations with room for improvement.'
      recommendations = [
        'Expand stakeholder engagement programs',
        'Implement automated monitoring systems',
        'Develop advanced bias detection capabilities'
      ]
    } else if (percentage >= 40) {
      level = 'Growing'
      description = 'Your organization is making progress but needs systematic improvements.'
      recommendations = [
        'Formalize risk assessment processes',
        'Enhance transparency measures',
        'Invest in accessibility improvements'
      ]
    }

    const results = {
      totalScore,
      maxScore,
      percentage,
      level,
      description,
      recommendations,
      categoryScores: questions.reduce((acc, q) => {
        acc[q.category] = (acc[q.category] || 0) + (answers[q.id] || 0)
        return acc
      }, {} as Record<string, number>),
      completedAt: new Date().toISOString()
    }

    setAssessmentResults(results)
    setShowResults(true)
  }

  const resetAssessment = () => {
    setCurrentQuestionIndex(0)
    setAnswers({})
    setShowResults(false)
  }

  if (showResults && assessmentResults) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl mb-2">Your AI Governance Assessment Results</CardTitle>
                <div className="flex items-center justify-center gap-4">
                  <div className="text-4xl font-bold text-primary">{assessmentResults.percentage}%</div>
                  <Badge variant="secondary" className="text-lg px-4 py-2">
                    {assessmentResults.level}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <Progress value={assessmentResults.percentage} className="h-4 mb-4" />
                  <p className="text-lg text-muted-foreground">{assessmentResults.description}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Category Breakdown</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(assessmentResults.categoryScores).map(([category, score]) => (
                      <div key={category} className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
                        <span className="font-medium">{category}</span>
                        <span className="text-accent font-bold">{Number(score)}/5</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Next Steps</h3>
                  <ul className="space-y-2">
                    {assessmentResults.recommendations.map((rec: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle size={20} className="text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button onClick={resetAssessment} variant="outline" className="flex-1">
                    Retake Assessment
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="flex-1">
                        <EnvelopeSimple size={16} className="mr-2" />
                        Schedule Consultation
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Improve Your AI Governance</DialogTitle>
                        <p className="text-muted-foreground">
                          Let's discuss how to advance your organization's AI governance practices.
                        </p>
                      </DialogHeader>
                      <CalendlyIntegration />
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">AI Governance Maturity Assessment</h2>
            <p className="text-lg text-muted-foreground">
              Discover your organization's AI governance strengths and areas for improvement
            </p>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <Badge variant="outline">{currentQuestion?.category}</Badge>
                <span className="text-sm text-muted-foreground">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
              </div>
              <Progress value={(currentQuestionIndex / questions.length) * 100} className="h-2" />
            </CardHeader>
            <CardContent className="space-y-6">
              <h3 className="text-xl font-semibold">{currentQuestion?.question}</h3>
              
              <div className="space-y-3">
                {currentQuestion?.options.map((option) => (
                  <div
                    key={option.value}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:border-primary/50 ${
                      answers[currentQuestion.id] === option.value
                        ? 'border-primary bg-primary/5'
                        : 'border-border'
                    }`}
                    onClick={() => handleAnswer(option.value)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        answers[currentQuestion.id] === option.value
                          ? 'border-primary bg-primary'
                          : 'border-gray-300'
                      }`} />
                      <span className="flex-1">{option.text}</span>
                      <span className="text-sm text-muted-foreground">
                        {option.value}/5
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between pt-6">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                  disabled={currentQuestionIndex === 0}
                >
                  Previous
                </Button>
                <Button 
                  onClick={nextQuestion}
                  disabled={!answers[currentQuestion?.id]}
                >
                  {currentQuestionIndex === questions.length - 1 ? 'Get Results' : 'Next'}
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

function SocialMediaAndEventsSection() {
  const [selectedTab, setSelectedTab] = useState<'social' | 'events'>('events')
  const [events, setEvents] = useKV<Array<any>>('upcoming-events', [
    {
      id: 1,
      title: "AI Ethics Summit 2024",
      date: "2024-04-15",
      time: "09:00 AM - 05:00 PM",
      location: "San Francisco, CA",
      type: "Keynote",
      status: "confirmed",
      description: "Opening keynote on 'Building Equitable AI Systems for the Future'",
      attendees: 500,
      url: "https://aiethicssummit2024.com"
    },
    {
      id: 2,
      title: "Tech Leadership Workshop",
      date: "2024-04-28",
      time: "02:00 PM - 06:00 PM",
      location: "Virtual Event",
      type: "Workshop",
      status: "confirmed",
      description: "Interactive workshop on systems thinking for AI governance leaders",
      attendees: 50,
      url: "https://techleadershipworkshop.com"
    },
    {
      id: 3,
      title: "Disability in Tech Conference",
      date: "2024-05-12",
      time: "11:00 AM - 12:00 PM",
      location: "Boston, MA",
      type: "Panel Discussion",
      status: "confirmed",
      description: "Panel on 'Breaking Down Barriers in AI Development'",
      attendees: 300,
      url: "https://disabilityintechconf.org"
    },
    {
      id: 4,
      title: "Corporate AI Governance Roundtable",
      date: "2024-05-25",
      time: "10:00 AM - 03:00 PM",
      location: "New York, NY",
      type: "Roundtable",
      status: "tentative",
      description: "Invitation-only discussion with Fortune 500 executives",
      attendees: 25,
      url: "#"
    }
  ])

  const [socialPosts] = useState([
    {
      id: 1,
      platform: "LinkedIn",
      content: "Excited to announce that our AI Governance Framework has been downloaded over 10,000 times! 🎉 The response from the community has been incredible. Thank you to everyone working to make AI more equitable and ethical.",
      timestamp: "2024-03-20T10:30:00Z",
      likes: 234,
      shares: 45,
      comments: 18
    },
    {
      id: 2,
      platform: "Instagram",
      content: "Just wrapped up an amazing workshop on equitable AI design. Key takeaway: When we design for the margins, we create solutions that work better for everyone. 🧠✨ #EquitableAI #DisabilityInTech",
      timestamp: "2024-03-18T14:15:00Z",
      likes: 156,
      shares: 89,
      comments: 23
    },
    {
      id: 3,
      platform: "LinkedIn",
      content: "New blog post: 'Beyond Compliance - Building Truly Equitable AI Systems' 📝 We need to move past checkbox mentality and embrace authentic equity in AI development.",
      timestamp: "2024-03-15T09:00:00Z",
      likes: 189,
      shares: 34,
      comments: 12
    },
    {
      id: 4,
      platform: "YouTube", 
      content: "Speaking at the AI Ethics Summit next month! Looking forward to discussing how systems thinking can transform organizational AI governance. Who's joining us? 🎤",
      timestamp: "2024-03-12T16:45:00Z",
      likes: 98,
      shares: 67,
      comments: 15
    }
  ])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays}d ago`
    }
  }

  const getEventStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'tentative': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'LinkedIn': return <LinkedinLogo size={16} />
      case 'Instagram': return <InstagramLogo size={16} />
      case 'YouTube': return <YoutubeLogo size={16} />
      default: return null
    }
  }

  const upcomingEvents = (events || []).filter(event => new Date(event.date) > new Date()).sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  )

  return (
    <section className="py-12 bg-gradient-to-br from-primary/10 to-accent/10">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Stay Connected</h2>
            <p className="text-lg text-muted-foreground">
              Follow the latest insights and upcoming speaking events
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="bg-card rounded-lg p-1">
              <Button
                variant={selectedTab === 'events' ? 'default' : 'ghost'}
                onClick={() => setSelectedTab('events')}
                className="px-6"
              >
                <Calendar size={16} className="mr-2" />
                Speaking Events
              </Button>
              <Button
                variant={selectedTab === 'social' ? 'default' : 'ghost'}
                onClick={() => setSelectedTab('social')}
                className="px-6"
              >
                <UsersIcon size={16} className="mr-2" />
                Social Media
              </Button>
            </div>
          </div>

          {selectedTab === 'events' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar size={14} />
                            <span>{formatDate(event.date)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span>📍</span>
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span>👥</span>
                            <span>{event.attendees} attendees</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge variant="secondary" className={getEventStatusColor(event.status)}>
                          {event.status}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {event.type}
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4">{event.description}</p>
                    
                    <div className="flex gap-2">
                      {event.url !== '#' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => window.open(event.url, '_blank')}
                        >
                          <ArrowSquareOut size={14} className="mr-1" />
                          Event Details
                        </Button>
                      )}
                      <CalendlyIntegration />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {selectedTab === 'social' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {socialPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        {getPlatformIcon(post.platform)}
                        <span className="font-medium text-sm">{post.platform}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {formatTimestamp(post.timestamp)}
                      </span>
                    </div>
                    
                    <p className="text-sm leading-relaxed mb-4">{post.content}</p>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        ❤️ {post.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        🔄 {post.shares}
                      </span>
                      <span className="flex items-center gap-1">
                        💬 {post.comments}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <div className="flex justify-center gap-4">
              <Button 
                variant="outline"
                onClick={() => window.open('https://www.linkedin.com/in/dede-tetsubayashi/', '_blank')}
              >
                <LinkedinLogo size={16} className="mr-2" />
                LinkedIn
                <ArrowSquareOut size={16} className="ml-2" />
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.open('https://instagram.com/dr_dede_', '_blank')}
              >
                <InstagramLogo size={16} className="mr-2" />
                Instagram
                <ArrowSquareOut size={16} className="ml-2" />
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.open('https://www.youtube.com/@the_drdede', '_blank')}
              >
                <YoutubeLogo size={16} className="mr-2" />
                YouTube
                <ArrowSquareOut size={16} className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

interface ResourcesPageProps {
  onBack: () => void
}

export default function ResourcesPage({ onBack }: ResourcesPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft size={16} className="mr-2" />
              Back to Home
            </Button>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-primary">Resources & Assessment</h1>
              <p className="text-xs md:text-sm text-muted-foreground">Tools and insights for AI governance transformation</p>
            </div>
          </div>
        </div>
      </header>

      <main>
        <ResourcesDownloadsSection />
        <AIGovernanceAssessment />
        <SocialMediaAndEventsSection />
      </main>
    </div>
  )
}