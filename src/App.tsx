import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, EnvelopeSimple, ArrowRight, Play, GraduationCap, Trophy, Lightbulb } from "@phosphor-icons/react"
import { useKV } from '@github/spark/hooks'

const SUBSCRIBER_GOAL = 10000

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

function SubscriberCounter() {
  const [subscriberCount, setSubscriberCount] = useState(7420)
  const progressPercentage = (subscriberCount / SUBSCRIBER_GOAL) * 100

  useEffect(() => {
    const interval = setInterval(() => {
      setSubscriberCount(prev => prev + Math.floor(Math.random() * 3))
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-accent">
            <Users size={24} weight="bold" />
            <span className="text-2xl font-bold">{subscriberCount.toLocaleString()}</span>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Progress to 10K subscribers</p>
            <Progress value={progressPercentage} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">{Math.round(progressPercentage)}% complete</p>
          </div>
          <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
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
            <Button variant="outline" className="hidden md:flex">
              Book Speaking Engagement
            </Button>
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
              <Button variant="outline" size="sm">
                YouTube Channel
              </Button>
              <Button variant="outline" size="sm">
                LinkedIn Profile
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