import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Star, Play, TrendUp, Calendar, CurrencyDollar, Users, CheckCircle, Clock, ArrowUp } from "@phosphor-icons/react"
import { ScrollReveal, ParallaxContainer, StaggerContainer, StaggerItem } from './ScrollAnimations'
import fortune500CaseStudy from '@/assets/images/fortune500-case-study.jpg'
import startupCaseStudy from '@/assets/images/startup-case-study.jpg'
import healthcareCaseStudy from '@/assets/images/healthcare-case-study.jpg'

interface ROIMetric {
  label: string
  value: string
  change: string
  icon: React.ComponentType<any>
  color: string
}

interface Timeline {
  phase: string
  duration: string
  milestones: string[]
  progress: number
}

interface CaseStudy {
  id: number
  title: string
  client: string
  industry: string
  challenge: string
  solution: string
  results: string[]
  image: string
  videoUrl?: string
  tags: string[]
  roi: ROIMetric[]
  timeline: Timeline[]
  testimonialVideo?: string
  implementation: {
    duration: string
    teamSize: string
    budget: string
    complexity: 'Low' | 'Medium' | 'High'
  }
}

const enhancedCaseStudies: CaseStudy[] = [
  {
    id: 1,
    title: "Fortune 500 AI Governance Transformation",
    client: "Global Technology Corporation",
    industry: "Technology",
    challenge: "Implementing comprehensive AI governance across 50+ countries with varying regulatory requirements while maintaining innovation velocity and competitive advantage.",
    solution: "Developed a flexible, multi-jurisdictional AI governance framework with automated compliance monitoring, real-time risk assessment, and stakeholder alignment protocols.",
    results: [
      "100% regulatory compliance across all jurisdictions",
      "40% reduction in AI project approval time",
      "Created reusable framework adopted by 3 other divisions",
      "$2.8M cost savings from streamlined processes",
      "Zero compliance violations in 18 months post-implementation"
    ],
    image: fortune500CaseStudy,
    videoUrl: "https://youtube.com/embed/dQw4w9WgXcQ",
    tags: ["AI Governance", "Global Scale", "Regulatory Compliance", "Enterprise"],
    roi: [
      { label: "Cost Savings", value: "$2.8M", change: "+340%", icon: CurrencyDollar, color: "text-green-600" },
      { label: "Approval Speed", value: "40%", change: "faster", icon: Clock, color: "text-blue-600" },
      { label: "Compliance Rate", value: "100%", change: "+25%", icon: CheckCircle, color: "text-green-600" },
      { label: "Team Efficiency", value: "65%", change: "improvement", icon: TrendUp, color: "text-purple-600" }
    ],
    timeline: [
      { phase: "Discovery & Assessment", duration: "4 weeks", milestones: ["Regulatory mapping", "Current state analysis", "Stakeholder interviews"], progress: 100 },
      { phase: "Framework Design", duration: "6 weeks", milestones: ["Policy development", "Process design", "Technology selection"], progress: 100 },
      { phase: "Pilot Implementation", duration: "8 weeks", milestones: ["Pilot rollout", "Testing & refinement", "Training delivery"], progress: 100 },
      { phase: "Global Rollout", duration: "16 weeks", milestones: ["Phased deployment", "Change management", "Performance monitoring"], progress: 100 }
    ],
    testimonialVideo: "https://youtube.com/embed/testimonial1",
    implementation: {
      duration: "8 months",
      teamSize: "12 experts",
      budget: "$850K",
      complexity: "High"
    }
  },
  {
    id: 2,
    title: "Equitable AI for Healthcare Accessibility",
    client: "Regional Healthcare Network",
    industry: "Healthcare",
    challenge: "AI diagnostic tools showing bias against patients with disabilities, resulting in misdiagnosis and delayed treatment for over 40% of disabled patients.",
    solution: "Redesigned data collection and model training with disability representation and equitable design principles. Implemented real-time bias detection and created accessibility-first user interfaces.",
    results: [
      "95% accuracy improvement for disabled patients",
      "Reduced diagnostic disparities by 60%",
      "Training program adopted across 12 hospitals",
      "$2.3M cost savings from reduced misdiagnoses",
      "Improved patient satisfaction scores by 85%"
    ],
    image: healthcareCaseStudy,
    videoUrl: "https://youtube.com/embed/healthcare-case",
    tags: ["Healthcare AI", "Accessibility", "Bias Mitigation", "Patient Outcomes"],
    roi: [
      { label: "Cost Savings", value: "$2.3M", change: "+290%", icon: CurrencyDollar, color: "text-green-600" },
      { label: "Diagnostic Accuracy", value: "95%", change: "+35%", icon: TrendUp, color: "text-blue-600" },
      { label: "Patient Satisfaction", value: "85%", change: "improvement", icon: Users, color: "text-purple-600" },
      { label: "Bias Reduction", value: "60%", change: "reduction", icon: CheckCircle, color: "text-green-600" }
    ],
    timeline: [
      { phase: "Bias Assessment", duration: "3 weeks", milestones: ["Data audit", "Bias identification", "Impact analysis"], progress: 100 },
      { phase: "Data Redesign", duration: "5 weeks", milestones: ["Inclusive data collection", "Model retraining", "Validation testing"], progress: 100 },
      { phase: "UI/UX Overhaul", duration: "4 weeks", milestones: ["Accessibility design", "User testing", "Interface development"], progress: 100 },
      { phase: "Rollout & Training", duration: "6 weeks", milestones: ["Staff training", "System deployment", "Monitoring setup"], progress: 100 }
    ],
    testimonialVideo: "https://youtube.com/embed/healthcare-testimonial",
    implementation: {
      duration: "4.5 months",
      teamSize: "8 specialists",
      budget: "$420K",
      complexity: "Medium"
    }
  },
  {
    id: 3,
    title: "Startup AI Ethics Framework",
    client: "Series B EdTech Startup",
    industry: "Education Technology",
    challenge: "Building responsible AI practices from the ground up while maintaining rapid development cycles and preparing for Series C funding.",
    solution: "Lightweight but comprehensive AI ethics framework integrated into agile development processes with automated compliance checks and investor-grade reporting.",
    results: [
      "Zero ethics-related delays in product launches",
      "Secured $50M Series C citing responsible AI practices",
      "Framework open-sourced and adopted by 100+ startups",
      "35% faster development cycles with built-in ethics",
      "Improved investor confidence scores by 90%"
    ],
    image: startupCaseStudy,
    videoUrl: "https://youtube.com/embed/startup-case",
    tags: ["Startup", "EdTech", "Ethics Framework", "Funding Success"],
    roi: [
      { label: "Funding Secured", value: "$50M", change: "+67%", icon: CurrencyDollar, color: "text-green-600" },
      { label: "Development Speed", value: "35%", change: "faster", icon: Clock, color: "text-blue-600" },
      { label: "Investor Confidence", value: "90%", change: "improvement", icon: TrendUp, color: "text-purple-600" },
      { label: "Market Adoption", value: "100+", change: "startups", icon: Users, color: "text-orange-600" }
    ],
    timeline: [
      { phase: "Framework Design", duration: "2 weeks", milestones: ["Ethics principles", "Process integration", "Tool selection"], progress: 100 },
      { phase: "Development Integration", duration: "3 weeks", milestones: ["Automated checks", "CI/CD integration", "Team training"], progress: 100 },
      { phase: "Pilot Testing", duration: "4 weeks", milestones: ["Product testing", "Process refinement", "Performance metrics"], progress: 100 },
      { phase: "Scaling & Open Source", duration: "6 weeks", milestones: ["Documentation", "Community building", "Investor presentation"], progress: 100 }
    ],
    testimonialVideo: "https://youtube.com/embed/startup-testimonial",
    implementation: {
      duration: "3.5 months",
      teamSize: "5 experts",
      budget: "$180K",
      complexity: "Low"
    }
  }
]

export default function EnhancedCaseStudies() {
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null)
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="py-16 bg-gradient-to-br from-background/50 to-secondary/20">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Enhanced Case Study Showcase</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Deep dive into real-world AI governance transformations with detailed ROI analysis, 
              implementation timelines, and video testimonials from satisfied clients.
            </p>
          </div>
        </ScrollReveal>

        <StaggerContainer>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {enhancedCaseStudies.map((caseStudy, index) => (
              <StaggerItem key={caseStudy.id}>
                <ParallaxContainer offset={10}>
                  <motion.div
                    whileHover={{ y: -10, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="h-full cursor-pointer hover:shadow-2xl transition-all duration-500 bg-card/90 backdrop-blur-sm border-0 overflow-hidden">
                      <CardContent className="p-0">
                        <div className="relative overflow-hidden">
                          <motion.img 
                            src={caseStudy.image}
                            alt={caseStudy.title}
                            className="w-full h-48 object-cover"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                          />
                          <motion.div 
                            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                          {caseStudy.videoUrl && (
                            <motion.div 
                              className="absolute inset-0 flex items-center justify-center"
                              initial={{ opacity: 0 }}
                              whileHover={{ opacity: 1 }}
                            >
                              <Button size="sm" className="bg-white/90 text-black hover:bg-white">
                                <Play size={16} className="mr-2" />
                                Watch Case Study
                              </Button>
                            </motion.div>
                          )}
                        </div>
                        
                        <div className="p-6">
                          <div className="flex flex-wrap gap-2 mb-4">
                            {caseStudy.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          
                          <h3 className="font-semibold text-lg mb-3 leading-tight">{caseStudy.title}</h3>
                          <p className="text-sm text-muted-foreground mb-4">{caseStudy.industry}</p>
                          
                          <div className="grid grid-cols-2 gap-4 mb-6">
                            {caseStudy.roi.slice(0, 2).map((metric, idx) => (
                              <div key={idx} className="text-center">
                                <div className={`text-2xl font-bold ${metric.color}`}>
                                  {metric.value}
                                </div>
                                <div className="text-xs text-muted-foreground">{metric.label}</div>
                              </div>
                            ))}
                          </div>
                          
                          <Button 
                            className="w-full"
                            onClick={() => setSelectedCase(caseStudy)}
                          >
                            View Full Analysis
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </ParallaxContainer>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>

        <AnimatePresence>
          {selectedCase && (
            <Dialog open={!!selectedCase} onOpenChange={() => setSelectedCase(null)}>
              <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl">{selectedCase.title}</DialogTitle>
                </DialogHeader>
                
                <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="roi">ROI Analysis</TabsTrigger>
                    <TabsTrigger value="timeline">Timeline</TabsTrigger>
                    <TabsTrigger value="testimonial">Testimonial</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="mt-6">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-6"
                    >
                      <img 
                        src={selectedCase.image}
                        alt={selectedCase.title}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle>Challenge</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground">{selectedCase.challenge}</p>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardHeader>
                            <CardTitle>Solution</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground">{selectedCase.solution}</p>
                          </CardContent>
                        </Card>
                      </div>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle>Results Achieved</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-3">
                            {selectedCase.results.map((result, index) => (
                              <li key={index} className="flex items-start gap-3">
                                <Star size={16} className="text-yellow-500 mt-1 flex-shrink-0" weight="fill" />
                                <span className="text-muted-foreground">{result}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </TabsContent>
                  
                  <TabsContent value="roi" className="mt-6">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {selectedCase.roi.map((metric, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Card className="text-center">
                              <CardContent className="p-6">
                                <metric.icon size={32} className={`mx-auto mb-3 ${metric.color}`} />
                                <div className={`text-3xl font-bold mb-2 ${metric.color}`}>
                                  {metric.value}
                                </div>
                                <div className="text-sm font-medium mb-1">{metric.label}</div>
                                <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                                  <ArrowUp size={12} className="text-green-500" />
                                  {metric.change}
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle>Implementation Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-primary">{selectedCase.implementation.duration}</div>
                              <div className="text-sm text-muted-foreground">Project Duration</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-accent">{selectedCase.implementation.teamSize}</div>
                              <div className="text-sm text-muted-foreground">Team Size</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-primary">{selectedCase.implementation.budget}</div>
                              <div className="text-sm text-muted-foreground">Investment</div>
                            </div>
                            <div className="text-center">
                              <Badge variant={selectedCase.implementation.complexity === 'High' ? 'destructive' : 
                                              selectedCase.implementation.complexity === 'Medium' ? 'default' : 'secondary'}>
                                {selectedCase.implementation.complexity}
                              </Badge>
                              <div className="text-sm text-muted-foreground mt-1">Complexity</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </TabsContent>
                  
                  <TabsContent value="timeline" className="mt-6">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-6"
                    >
                      {selectedCase.timeline.map((phase, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card>
                            <CardContent className="p-6">
                              <div className="flex items-start justify-between mb-4">
                                <div>
                                  <h4 className="text-lg font-semibold">{phase.phase}</h4>
                                  <p className="text-sm text-muted-foreground">{phase.duration}</p>
                                </div>
                                <Badge variant="secondary">
                                  {phase.progress}% Complete
                                </Badge>
                              </div>
                              
                              <Progress value={phase.progress} className="mb-4" />
                              
                              <div>
                                <h5 className="font-medium mb-2">Key Milestones:</h5>
                                <ul className="space-y-1">
                                  {phase.milestones.map((milestone, idx) => (
                                    <li key={idx} className="flex items-center gap-2 text-sm">
                                      <CheckCircle size={16} className="text-green-500" />
                                      {milestone}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </motion.div>
                  </TabsContent>
                  
                  <TabsContent value="testimonial" className="mt-6">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-6"
                    >
                      {selectedCase.testimonialVideo && (
                        <div className="aspect-video">
                          <iframe
                            src={selectedCase.testimonialVideo}
                            className="w-full h-full rounded-lg"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      )}
                      
                      <Card>
                        <CardHeader>
                          <CardTitle>Client Testimonial</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-lg italic mb-4">
                            "Working with Dr. Dédé transformed our entire approach to AI governance. 
                            The results exceeded our expectations and the framework continues to drive value."
                          </p>
                          <div className="text-sm text-muted-foreground">
                            — {selectedCase.client}, {selectedCase.industry}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}