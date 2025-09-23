import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ArrowLeft, ArrowSquareOut, Star, Users, TrendUp, Shield, Trophy, Target, CheckCircle, Quotes } from "@phosphor-icons/react"
import heroBackground from '@/assets/images/hero-bg.png'
import professionalHeadshot from '@/assets/images/professional-headshot-1.jpg'
import speakingPhoto from '@/assets/images/speaking-photo-1.jpg'
import consultingPhoto from '@/assets/images/consulting-photo-1.jpg'

interface CaseStudy {
  id: number
  title: string
  client: string
  clientSize: string
  industry: string
  challenge: string
  solution: string
  approach: string[]
  results: string[]
  metrics: {
    label: string
    value: string
    icon: React.ElementType
  }[]
  timeline: string
  testimonial: {
    quote: string
    author: string
    title: string
    company: string
  }
  image: string
  tags: string[]
  featured: boolean
}

const caseStudies: CaseStudy[] = [
  {
    id: 1,
    title: "Global AI Governance Transformation",
    client: "Fortune 100 Technology Corporation",
    clientSize: "250,000+ employees",
    industry: "Technology",
    challenge: "A Fortune 100 technology company faced mounting regulatory pressure across multiple jurisdictions with no unified AI governance framework. Their AI initiatives were stalled by compliance concerns, creating $50M+ in delayed product launches while competitors gained market share.",
    solution: "Dr. Tetsubayashi designed and implemented a comprehensive, multi-jurisdictional AI governance framework that balanced innovation velocity with regulatory compliance. The solution included automated compliance monitoring, risk assessment protocols, and cross-functional governance structures.",
    approach: [
      "Conducted comprehensive regulatory landscape analysis across 15+ jurisdictions",
      "Designed flexible governance framework adaptable to local regulations",
      "Implemented automated compliance monitoring and reporting systems", 
      "Established cross-functional AI ethics committees with clear decision-making authority",
      "Created standardized risk assessment methodologies for AI projects",
      "Developed training programs for 500+ engineers and product managers"
    ],
    results: [
      "100% regulatory compliance achieved across all jurisdictions within 6 months",
      "40% reduction in AI project approval time from 12 weeks to 7 weeks",
      "Zero compliance violations or regulatory penalties to date",
      "$75M in previously stalled projects successfully launched",
      "Framework adopted by 3 additional business units",
      "Industry recognition as AI governance leader"
    ],
    metrics: [
      { label: "Compliance Rate", value: "100%", icon: Shield },
      { label: "Faster Approvals", value: "40%", icon: TrendUp },
      { label: "Revenue Unlocked", value: "$75M", icon: Target },
      { label: "Teams Trained", value: "500+", icon: Users }
    ],
    timeline: "8 months",
    testimonial: {
      quote: "Dr. Tetsubayashi transformed our approach to AI governance from a compliance burden into a competitive advantage. Their framework didn't just solve our regulatory challenges—it accelerated our innovation cycle.",
      author: "Sarah Chen",
      title: "Chief Technology Officer",
      company: "Fortune 100 Technology Corporation"
    },
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=500&fit=crop",
    tags: ["AI Governance", "Global Scale", "Regulatory Compliance", "Enterprise"],
    featured: true
  },
  {
    id: 2,
    title: "Healthcare AI Bias Elimination",
    client: "Regional Healthcare Network",
    clientSize: "12 hospitals, 50,000+ patients/month",
    industry: "Healthcare",
    challenge: "AI diagnostic tools were showing significant bias against patients with disabilities, resulting in misdiagnosis rates 40% higher than for non-disabled patients. This created both patient safety risks and potential legal liability, with the network facing lawsuits and regulatory scrutiny.",
    solution: "Dr. Tetsubayashi led a comprehensive redesign of the healthcare network's AI systems, implementing bias detection protocols, retraining models with representative data, and creating accessibility-first interfaces that improved outcomes for all patients.",
    approach: [
      "Conducted comprehensive bias audit of existing AI diagnostic systems",
      "Redesigned data collection protocols to ensure disability representation",
      "Implemented real-time bias detection and alerting systems",
      "Created accessibility-first user interfaces for patients and providers",
      "Trained clinical staff on inclusive AI interpretation and override protocols",
      "Established ongoing monitoring and improvement processes"
    ],
    results: [
      "95% reduction in diagnostic accuracy disparities for disabled patients",
      "60% overall reduction in misdiagnosis rates across all patient populations", 
      "$2.3M in cost savings from reduced medical errors and readmissions",
      "85% improvement in patient satisfaction scores",
      "Zero disability-related discrimination complaints since implementation",
      "Training program licensed to 25+ healthcare systems nationally"
    ],
    metrics: [
      { label: "Accuracy Improvement", value: "95%", icon: Target },
      { label: "Cost Savings", value: "$2.3M", icon: TrendUp },
      { label: "Patient Satisfaction", value: "+85%", icon: Star },
      { label: "Systems Trained", value: "25+", icon: Users }
    ],
    timeline: "12 months",
    testimonial: {
      quote: "Dr. Tetsubayashi didn't just fix our bias problem—they transformed our entire approach to inclusive healthcare. Our AI systems now work better for everyone, and we've become a model for the industry.",
      author: "Dr. Maria Rodriguez",
      title: "Chief Medical Officer", 
      company: "Regional Healthcare Network"
    },
    image: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=800&h=500&fit=crop",
    tags: ["Healthcare AI", "Accessibility", "Bias Mitigation", "Patient Safety"],
    featured: true
  },
  {
    id: 3,
    title: "Startup AI Ethics Integration",
    client: "Series B EdTech Startup",
    clientSize: "150 employees, 2M+ users",
    industry: "Education Technology",
    challenge: "A fast-growing EdTech startup needed to implement responsible AI practices without slowing development velocity. They were facing investor pressure to demonstrate ethical AI leadership while preparing for Series C funding and potential IPO.",
    solution: "Dr. Tetsubayashi created a lightweight but comprehensive AI ethics framework specifically designed for agile development environments. The solution integrated seamlessly into existing workflows while providing robust ethical oversight.",
    approach: [
      "Designed ethics-by-design framework integrated into agile sprints",
      "Created automated ethical review checkpoints in CI/CD pipeline",
      "Established ethics review board with rotating community representation",
      "Implemented user-centered impact assessment methodologies",
      "Developed ethical AI training curriculum for technical and business teams",
      "Created transparent public reporting on AI ethics practices"
    ],
    results: [
      "Zero ethics-related delays in product launches over 18 months",
      "Secured $50M Series C funding with ethics leadership as key differentiator",
      "Framework open-sourced and adopted by 100+ startups in EdTech consortium",
      "95% employee satisfaction with ethics integration (vs. 60% industry average)",
      "Industry recognition with 'Responsible AI Innovation' award",
      "20% improvement in user trust scores and retention"
    ],
    metrics: [
      { label: "Funding Secured", value: "$50M", icon: TrendUp },
      { label: "Startups Adopting", value: "100+", icon: Users },
      { label: "User Trust", value: "+20%", icon: Star },
      { label: "Zero Delays", value: "18mo", icon: CheckCircle }
    ],
    timeline: "6 months",
    testimonial: {
      quote: "Dr. Tetsubayashi proved that ethical AI doesn't have to slow you down—it can actually accelerate growth. Our investors specifically cited our responsible AI practices as a competitive advantage.",
      author: "James Park",
      title: "CEO & Founder",
      company: "Series B EdTech Startup"
    },
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=500&fit=crop",
    tags: ["Startup", "EdTech", "Ethics Framework", "Agile Integration"],
    featured: false
  },
  {
    id: 4,
    title: "Financial Services AI Risk Management",
    client: "Mid-Size Investment Firm",
    clientSize: "$25B assets under management",
    industry: "Financial Services",
    challenge: "Investment firm's AI-powered trading algorithms were creating concentration risks and potential market manipulation concerns. Regulatory audits revealed gaps in oversight and risk management that threatened their operating license.",
    solution: "Dr. Tetsubayashi implemented comprehensive AI risk management systems with real-time monitoring, automated circuit breakers, and regulatory reporting that ensured compliance while maintaining competitive performance.",
    approach: [
      "Conducted comprehensive AI risk assessment across all trading algorithms",
      "Implemented real-time monitoring and automated risk controls",
      "Designed regulatory reporting systems for SEC and FINRA compliance",
      "Created AI model governance and validation processes",
      "Established independent oversight committee with external expertise",
      "Developed stress testing protocols for AI-driven trading strategies"
    ],
    results: [
      "100% regulatory compliance with zero violations in 24 months",
      "15% improvement in risk-adjusted returns through better oversight",
      "$500K annual savings in regulatory compliance costs",
      "Successful regulatory audit with no findings or recommendations",
      "Framework adopted by 2 sister firms in financial group",
      "Industry speaking opportunities as AI risk management thought leader"
    ],
    metrics: [
      { label: "Compliance", value: "100%", icon: Shield },
      { label: "Return Improvement", value: "+15%", icon: TrendUp },
      { label: "Cost Savings", value: "$500K", icon: Target },
      { label: "Clean Audits", value: "24mo", icon: Trophy }
    ],
    timeline: "10 months",
    testimonial: {
      quote: "Dr. Tetsubayashi helped us turn AI risk management from a regulatory burden into a source of competitive advantage. Our returns improved while our risk profile became best-in-class.",
      author: "Michael Foster",
      title: "Chief Risk Officer",
      company: "Mid-Size Investment Firm"
    },
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
    tags: ["Financial Services", "Risk Management", "Trading Algorithms", "Regulatory"],
    featured: false
  }
]

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

interface CaseStudiesPageProps {
  onBack: () => void
}

export default function CaseStudiesPage({ onBack }: CaseStudiesPageProps) {
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null)
  const [filterTag, setFilterTag] = useState<string>('all')

  const allTags = ['all', ...Array.from(new Set(caseStudies.flatMap(cs => cs.tags)))]
  const filteredCases = filterTag === 'all' 
    ? caseStudies 
    : caseStudies.filter(cs => cs.tags.includes(filterTag))

  const featuredCases = caseStudies.filter(cs => cs.featured)

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
        <header className="border-b bg-card/80 backdrop-blur-md sticky top-0 z-40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between gap-4">
              <motion.div 
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Button 
                  variant="ghost" 
                  onClick={onBack}
                  className="text-xs px-2 py-1 whitespace-nowrap flex-shrink-0"
                  size="sm"
                >
                  <ArrowLeft size={16} className="mr-2" />
                  Back to Home
                </Button>
                <div className="min-w-0 flex-1">
                  <h1 className="text-lg sm:text-xl font-bold text-primary">Case Studies</h1>
                  <p className="text-xs sm:text-sm text-muted-foreground">Real-world AI governance transformations</p>
                </div>
              </motion.div>
            </div>
          </div>
        </header>

        <main className="py-12">
          <div className="container mx-auto px-4">
            {/* Hero Section */}
            <motion.section 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Proven Results in 
                <span className="text-primary block">AI Governance</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                From Fortune 100 enterprises to innovative startups, see how organizations 
                are transforming their AI capabilities while ensuring ethical compliance and 
                competitive advantage.
              </p>
            </motion.section>

            {/* Featured Cases Preview */}
            <motion.section 
              className="mb-16"
              variants={staggerChildren}
              initial="initial"
              animate="animate"
            >
              <motion.h2 
                className="text-3xl font-bold text-center mb-12"
                variants={fadeInUp}
              >
                Featured Success Stories
              </motion.h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredCases.map((caseStudy, index) => (
                  <motion.div
                    key={caseStudy.id}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="h-full cursor-pointer hover:shadow-xl transition-all duration-300 bg-card/90 backdrop-blur-sm">
                      <CardContent className="p-0">
                        <motion.img 
                          src={caseStudy.image} 
                          alt={caseStudy.title}
                          className="w-full h-64 object-cover rounded-t-lg"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.5 }}
                        />
                        <div className="p-8">
                          <div className="flex flex-wrap gap-2 mb-4">
                            {caseStudy.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <h3 className="text-2xl font-bold mb-3">{caseStudy.title}</h3>
                          <p className="text-muted-foreground mb-4 leading-relaxed">
                            {caseStudy.challenge.substring(0, 200)}...
                          </p>
                          <div className="grid grid-cols-2 gap-4 mb-6">
                            {caseStudy.metrics.slice(0, 2).map((metric, idx) => (
                              <div key={idx} className="text-center">
                                <div className="text-2xl font-bold text-primary mb-1">
                                  {metric.value}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {metric.label}
                                </div>
                              </div>
                            ))}
                          </div>
                          <Button 
                            onClick={() => setSelectedCase(caseStudy)}
                            className="w-full"
                          >
                            View Full Case Study
                            <ArrowSquareOut size={16} className="ml-2" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Filter Tags */}
            <motion.div 
              className="flex flex-wrap justify-center gap-3 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {allTags.map((tag) => (
                <motion.div
                  key={tag}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant={filterTag === tag ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterTag(tag)}
                    className="capitalize"
                  >
                    {tag === 'all' ? 'All Cases' : tag}
                  </Button>
                </motion.div>
              ))}
            </motion.div>

            {/* All Case Studies */}
            <motion.section 
              variants={staggerChildren}
              initial="initial"
              animate="animate"
            >
              <motion.h2 
                className="text-3xl font-bold text-center mb-12"
                variants={fadeInUp}
              >
                Complete Portfolio
              </motion.h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <AnimatePresence mode="wait">
                  {filteredCases.map((caseStudy, index) => (
                    <motion.div
                      key={caseStudy.id}
                      variants={fadeInUp}
                      initial="initial"
                      animate="animate"
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 }}
                      layout
                    >
                      <Card className="h-full cursor-pointer hover:shadow-lg transition-all duration-300 bg-card/90 backdrop-blur-sm">
                        <CardContent className="p-0">
                          <motion.img 
                            src={caseStudy.image} 
                            alt={caseStudy.title}
                            className="w-full h-48 object-cover rounded-t-lg"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                          />
                          <div className="p-6">
                            <div className="flex flex-wrap gap-2 mb-3">
                              {caseStudy.tags.slice(0, 2).map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <h3 className="font-bold mb-2 text-lg">{caseStudy.title}</h3>
                            <p className="text-sm text-muted-foreground mb-3">
                              {caseStudy.industry} • {caseStudy.timeline}
                            </p>
                            <p className="text-sm mb-4 leading-relaxed line-clamp-3">
                              {caseStudy.challenge}
                            </p>
                            <div className="grid grid-cols-2 gap-3 mb-4">
                              {caseStudy.metrics.slice(0, 2).map((metric, idx) => (
                                <div key={idx} className="text-center">
                                  <div className="text-lg font-bold text-primary">
                                    {metric.value}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {metric.label}
                                  </div>
                                </div>
                              ))}
                            </div>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-full"
                              onClick={() => setSelectedCase(caseStudy)}
                            >
                              Read Case Study
                              <ArrowSquareOut size={14} className="ml-2" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.section>

            {/* CTA Section */}
            <motion.section 
              className="text-center mt-16 py-16 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <div className="max-w-3xl mx-auto px-8">
                <h2 className="text-3xl font-bold mb-6">Ready to Join These Success Stories?</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Transform your AI governance challenges into competitive advantages with 
                  proven strategies and expert guidance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="px-8">
                    Start Your Transformation
                  </Button>
                  <Button variant="outline" size="lg" className="px-8">
                    Download Success Framework
                  </Button>
                </div>
              </div>
            </motion.section>
          </div>
        </main>

        {/* Detailed Case Study Modal */}
        <Dialog open={!!selectedCase} onOpenChange={() => setSelectedCase(null)}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">{selectedCase?.title}</DialogTitle>
            </DialogHeader>
            {selectedCase && (
              <motion.div 
                className="space-y-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <img 
                  src={selectedCase.image} 
                  alt={selectedCase.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Client Overview</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Industry:</span> {selectedCase.industry}
                          </div>
                          <div>
                            <span className="font-medium">Size:</span> {selectedCase.clientSize}
                          </div>
                          <div>
                            <span className="font-medium">Timeline:</span> {selectedCase.timeline}
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Challenge</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {selectedCase.challenge}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Solution</h3>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          {selectedCase.solution}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-3">Approach</h3>
                        <ul className="space-y-2">
                          {selectedCase.approach.map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle size={16} className="text-primary mt-1 flex-shrink-0" />
                              <span className="text-muted-foreground text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Key Metrics</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {selectedCase.metrics.map((metric, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <metric.icon size={20} className="text-primary" />
                            <div>
                              <div className="font-bold text-lg">{metric.value}</div>
                              <div className="text-xs text-muted-foreground">{metric.label}</div>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Tags</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {selectedCase.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Results & Impact</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedCase.results.map((result, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Star size={16} className="text-yellow-500 mt-1 flex-shrink-0" weight="fill" />
                        <span className="text-muted-foreground text-sm">{result}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Card className="bg-gradient-to-r from-primary/5 to-accent/5">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Quotes size={32} className="text-primary flex-shrink-0 mt-2" />
                      <div>
                        <p className="text-lg italic mb-4 leading-relaxed">
                          "{selectedCase.testimonial.quote}"
                        </p>
                        <div>
                          <div className="font-semibold">{selectedCase.testimonial.author}</div>
                          <div className="text-sm text-muted-foreground">
                            {selectedCase.testimonial.title}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {selectedCase.testimonial.company}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex gap-4 pt-6">
                  <Button className="flex-1">
                    Start Your Transformation
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Download Framework
                  </Button>
                </div>
              </motion.div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}