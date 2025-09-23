import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ArrowLeft, ArrowSquareOut, Star, Users, TrendUp, Shield, Trophy, Target, CheckCircle, Quotes, Calendar } from "@phosphor-icons/react"
import heroBackground from '@/assets/images/hero-bg.png'
import professionalHeadshot from '@/assets/images/professional-headshot-1.jpg'
import professionalHeadshot2 from '@/assets/images/professional-headshot-2.jpg'
import professionalHeadshot3 from '@/assets/images/professional-headshot-3.jpg'
import professionalHeadshot4 from '@/assets/images/professional-headshot-4.jpg'
import speakingPhoto from '@/assets/images/speaking-photo-1.jpg'
import speakingPhoto2 from '@/assets/images/speaking-photo-2.jpg'
import speakingPhoto3 from '@/assets/images/speaking-photo-3.jpg'
import consultingPhoto from '@/assets/images/consulting-photo-1.jpg'
import consultingPhoto2 from '@/assets/images/consulting-photo-2.jpg'
import boardroomPhoto from '@/assets/images/boardroom-photo-1.jpg'
import startupPhoto from '@/assets/images/startup-photo-1.jpg'
import personalPhoto from '@/assets/images/personal-photo-1.jpg'
import personalPhoto2 from '@/assets/images/personal-photo-2.jpg'
import fortune500CaseStudy from '@/assets/images/fortune500-case-study.jpg'
import startupCaseStudy from '@/assets/images/startup-case-study.jpg'
import healthcareCaseStudy from '@/assets/images/healthcare-case-study.jpg'
import InteractiveTestimonialGallery from './components/InteractiveTestimonialGallery'

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
  // Featured case study - $500M savings
  {
    id: 1,
    title: "Fortune 500 AI Risk Prevention - $500M Savings",
    client: "Global Financial Services Corporation",
    clientSize: "300,000+ employees",
    industry: "Financial Services",
    challenge: "Massive AI system vulnerabilities across international operations threatened regulatory compliance and exposed the organization to potential $500M+ in penalties, lawsuits, and operational losses. Legacy AI models showed severe bias in lending decisions affecting 2.3M customers.",
    solution: "Implemented comprehensive AI risk management framework with real-time bias detection, automated compliance monitoring across 47 countries, and equitable lending algorithms. Created crisis prevention protocols and stakeholder communication strategies.",
    approach: [
      "Conducted comprehensive AI risk assessment across all business units",
      "Developed real-time bias detection and mitigation systems",
      "Implemented automated compliance monitoring for 47 jurisdictions",
      "Created equitable lending algorithm framework",
      "Established crisis prevention and response protocols",
      "Built stakeholder communication and transparency systems"
    ],
    results: [
      "$500M in potential losses prevented through proactive risk mitigation",
      "100% regulatory compliance achieved across all jurisdictions",
      "87% reduction in biased lending decisions within 6 months",
      "Enhanced reputation leading to 23% increase in customer trust scores",
      "Framework deployed across 8 additional business units",
      "Avoided class-action lawsuit with 50,000+ affected customers"
    ],
    metrics: [
      { label: "Savings", value: "$500M", icon: Trophy },
      { label: "Countries", value: "47", icon: Target },
      { label: "Customers Protected", value: "2.3M", icon: Shield }
    ],
    timeline: "18 months",
    testimonial: {
      quote: "Dr. Tetsubayashi's framework didn't just save us half a billion dollars - it transformed our entire approach to responsible AI. We went from crisis mode to industry leadership.",
      author: "Sarah Chen",
      title: "Chief Risk Officer", 
      company: "Global Financial Services Corporation"
    },
    image: fortune500CaseStudy,
    tags: ["Risk Prevention", "$500M Savings", "Financial Services", "Global Compliance"],
    featured: true
  },
  // Featured case study - $300M emerging markets
  {
    id: 2,
    title: "Emerging Markets AI Discovery - $300M Opportunity",
    client: "Multinational Consumer Goods Company",
    clientSize: "180,000+ employees",
    industry: "Consumer Goods",
    challenge: "Traditional market analysis missed accessibility needs in emerging markets, leaving $300M+ in revenue untapped. AI-powered market research tools excluded disabled consumers, representing 15% of global purchasing power.",
    solution: "Redesigned AI market analysis to include disability data and accessibility preferences. Created inclusive consumer profiling algorithms and developed culturally-sensitive AI tools for emerging market research across 23 countries.",
    approach: [
      "Analyzed market gaps in accessibility-focused consumer segments",
      "Developed inclusive consumer profiling algorithms",
      "Created culturally-sensitive AI market research tools",
      "Implemented disability-inclusive data collection methods",
      "Built accessibility preference prediction models",
      "Established local partnerships for market validation"
    ],
    results: [
      "$300M in new market opportunities discovered and captured",
      "Expanded market reach to 45M previously excluded consumers", 
      "157% ROI on inclusive AI research investment within 24 months",
      "Market leadership position established in 12 new countries",
      "Product accessibility improvements benefiting 100% of user base",
      "Recognition as 'Most Inclusive Brand' in 8 emerging markets"
    ],
    metrics: [
      { label: "Opportunity", value: "$300M", icon: TrendUp },
      { label: "Markets", value: "23", icon: Target },
      { label: "Consumers", value: "45M", icon: Users }
    ],
    timeline: "24 months",
    testimonial: {
      quote: "The market opportunities Dr. Tetsubayashi helped us discover were completely invisible to our traditional research methods. It's been transformational for our global expansion strategy.",
      author: "Marcus Rodriguez",
      title: "VP of Global Markets",
      company: "Multinational Consumer Goods Company"
    },
    image: healthcareCaseStudy,
    tags: ["Market Discovery", "$300M Revenue", "Emerging Markets", "Accessibility"],
    featured: true
  },
  // Featured case study - $100M healthcare savings
  {
    id: 3,
    title: "Healthcare System Transformation - $100M Cost Reduction",
    client: "National Healthcare Network",
    clientSize: "75,000+ employees",
    industry: "Healthcare",
    challenge: "AI diagnostic systems showed persistent bias against disabled patients, resulting in $100M+ annual costs from misdiagnoses, extended treatments, and malpractice claims. Patient outcomes disparities reached crisis levels.",
    solution: "Comprehensive overhaul of AI diagnostic protocols with disability-inclusive training data, real-time bias monitoring, and accessibility-first user interfaces. Implemented continuous learning systems and provider education programs.",
    approach: [
      "Audited existing AI diagnostic systems for bias patterns",
      "Rebuilt training datasets with disability-inclusive data",
      "Implemented real-time bias monitoring and alerts",
      "Designed accessibility-first user interfaces",
      "Created continuous learning and improvement systems",
      "Developed comprehensive provider education programs"
    ],
    results: [
      "$100M annual cost savings through accurate diagnoses",
      "95% accuracy improvement for disabled patient diagnoses",
      "Reduced diagnostic disparities by 78% across all patient groups",
      "Malpractice claims decreased by 62% within 18 months", 
      "Patient satisfaction scores increased by 94% for disabled patients",
      "Model deployed across 847 healthcare facilities nationwide"
    ],
    metrics: [
      { label: "Savings", value: "$100M", icon: Trophy },
      { label: "Improvement", value: "95%", icon: TrendUp },
      { label: "Facilities", value: "847", icon: Target }
    ],
    timeline: "18 months",
    testimonial: {
      quote: "Dr. Tetsubayashi's work fundamentally changed how we deliver healthcare. Our diagnostic accuracy improvements have literally saved lives while reducing costs by $100M annually.",
      author: "Dr. Amelia Foster",
      title: "Chief Medical Officer",
      company: "National Healthcare Network"
    },
    image: startupCaseStudy,
    tags: ["Healthcare Transformation", "$100M Savings", "Patient Outcomes", "Bias Elimination"],
    featured: true
  },
  // Additional case studies
  {
    id: 4,
    title: "Global Supply Chain AI Ethics Integration",
    client: "Fortune 100 Manufacturing Corporation", 
    clientSize: "400,000+ employees",
    industry: "Manufacturing",
    challenge: "AI-powered supply chain optimization inadvertently excluded suppliers owned by disabled entrepreneurs, creating ethical risks and missing cost-saving opportunities worth $75M annually.",
    solution: "Integrated equity metrics into AI supplier selection algorithms, created inclusive vendor evaluation frameworks, and established real-time monitoring for bias in procurement decisions across global operations.",
    approach: [
      "Analyzed existing supplier selection algorithms for bias",
      "Developed equity-focused procurement metrics",
      "Created inclusive vendor evaluation frameworks",
      "Implemented real-time bias monitoring systems",
      "Established diverse supplier partnership programs",
      "Built ESG reporting and compliance systems"
    ],
    results: [
      "$75M in additional cost savings through diverse supplier network",
      "Supply chain resilience improved by 43% through vendor diversification",
      "Reduced procurement bias by 89% across 156 countries",
      "Established partnerships with 2,847 disability-owned businesses",
      "ESG rating improvement led to $200M in sustainable financing access",
      "Industry leadership recognition for equitable AI practices"
    ],
    metrics: [
      { label: "Savings", value: "$75M", icon: Trophy },
      { label: "Suppliers", value: "2,847", icon: Users },
      { label: "Countries", value: "156", icon: Target }
    ],
    timeline: "15 months",
    testimonial: {
      quote: "The supply chain transformation delivered both financial results and social impact. We're now the industry benchmark for equitable procurement practices.",
      author: "James Park",
      title: "Chief Procurement Officer",
      company: "Fortune 100 Manufacturing Corporation"
    },
    image: consultingPhoto,
    tags: ["Supply Chain", "ESG Leadership", "Procurement Equity", "Global Operations"],
    featured: false
  },
  {
    id: 5,
    title: "EdTech Accessibility Revolution",
    client: "Leading Online Education Platform",
    clientSize: "15,000+ employees",
    industry: "Education Technology",
    challenge: "AI-powered learning systems excluded 12M disabled students globally, creating accessibility lawsuits and missing $180M market opportunity while facing regulatory pressure in 34 countries.",
    solution: "Rebuilt learning AI with Universal Design principles, implemented real-time accessibility testing, and created adaptive learning paths for diverse cognitive and physical abilities.",
    approach: [
      "Applied Universal Design for Learning principles to AI systems",
      "Implemented real-time accessibility testing and validation",
      "Created adaptive learning paths for diverse abilities",
      "Developed cognitive and physical accessibility frameworks",
      "Built automated accommodation systems",
      "Established continuous feedback loops with disabled students"
    ],
    results: [
      "$180M new market opportunity captured through accessible design",
      "12M disabled students gained full platform access",
      "Learning outcomes improved by 67% for all student populations",
      "Regulatory compliance achieved across 34 countries",
      "Platform adoption increased by 156% in special education market",
      "Winner of 'Most Accessible EdTech Platform' for 3 consecutive years"
    ],
    metrics: [
      { label: "Opportunity", value: "$180M", icon: TrendUp },
      { label: "Students", value: "12M", icon: Users },
      { label: "Countries", value: "34", icon: Target }
    ],
    timeline: "20 months",
    testimonial: {
      quote: "Dr. Tetsubayashi didn't just make our platform accessible - they made it better for everyone. Our learning outcomes have never been higher.",
      author: "Dr. Maria Santos",
      title: "Head of Product",
      company: "Leading Online Education Platform"
    },
    image: speakingPhoto,
    tags: ["EdTech", "Universal Design", "Student Accessibility", "Market Expansion"],
    featured: false
  },
  {
    id: 6,
    title: "Banking AI Bias Elimination Initiative",
    client: "Top 5 Global Investment Bank",
    clientSize: "280,000+ employees",
    industry: "Investment Banking",
    challenge: "Credit scoring AI systems showed systematic bias against disabled borrowers, threatening $350M in regulatory penalties and damaging relationships with institutional investors focused on ESG criteria.",
    solution: "Complete credit AI model overhaul with equitable risk assessment, bias detection algorithms, and inclusive financial product design. Implemented real-time fairness monitoring and stakeholder transparency reporting.",
    approach: [
      "Conducted comprehensive audit of credit scoring models",
      "Developed equitable risk assessment frameworks",
      "Implemented real-time bias detection and correction",
      "Created inclusive financial product design principles",
      "Built stakeholder transparency and reporting systems",
      "Established continuous monitoring and improvement processes"
    ],
    results: [
      "$350M in regulatory penalties avoided through proactive compliance",
      "Credit approval rates equalized across all demographic groups",
      "ESG investor confidence increased, securing $2.1B in sustainable investments",
      "Lending portfolio diversity improved by 124% while maintaining risk standards",
      "Industry benchmark established for equitable AI in financial services",
      "Customer retention increased by 89% among underserved populations"
    ],
    metrics: [
      { label: "Penalties Avoided", value: "$350M", icon: Shield },
      { label: "Investments", value: "$2.1B", icon: TrendUp },
      { label: "Improvement", value: "124%", icon: Trophy }
    ],
    timeline: "16 months",
    testimonial: {
      quote: "The transformation of our credit systems established us as the industry leader in equitable financial services. The ESG investment impact exceeded all expectations.",
      author: "David Kim",
      title: "Chief Risk Officer",
      company: "Top 5 Global Investment Bank"
    },
    image: boardroomPhoto,
    tags: ["Banking", "Credit Scoring", "Regulatory Compliance", "ESG Investment"],
    featured: false
  },
  {
    id: 7,
    title: "Retail AI Personalization Equity Transformation",
    client: "Global E-commerce Giant",
    clientSize: "120,000+ employees",
    industry: "E-commerce/Retail",
    challenge: "AI recommendation engines systematically excluded products for disabled customers, missing $95M in annual revenue and facing discrimination lawsuits in multiple jurisdictions.",
    solution: "Redesigned recommendation algorithms with inclusive personalization, implemented accessibility-first product discovery, and created adaptive shopping experiences for diverse abilities and needs.",
    approach: [
      "Analyzed recommendation algorithms for exclusion patterns",
      "Developed inclusive personalization frameworks",
      "Implemented accessibility-first product discovery",
      "Created adaptive shopping experiences for diverse needs",
      "Built bias detection and correction systems",
      "Established customer feedback and improvement loops"
    ],
    results: [
      "$95M in new revenue captured through inclusive recommendations",
      "Customer engagement increased by 203% among disabled shoppers",
      "Discrimination lawsuits settled and prevention protocols established",
      "Market share increased by 47% in accessibility-focused segments",
      "Platform usability improved by 156% for all customer segments",
      "Recognition as 'Most Inclusive Shopping Experience' globally"
    ],
    metrics: [
      { label: "Revenue", value: "$95M", icon: TrendUp },
      { label: "Engagement", value: "203%", icon: Users },
      { label: "Market Share", value: "47%", icon: Target }
    ],
    timeline: "14 months",
    testimonial: {
      quote: "The inclusive personalization system transformed our platform. We're not just serving more customers - we're serving them better.",
      author: "Lisa Chang",
      title: "VP of Product Innovation",
      company: "Global E-commerce Giant"
    },
    image: personalPhoto,
    tags: ["E-commerce", "Personalization", "Customer Experience", "Revenue Growth"],
    featured: false
  },
  {
    id: 8,
    title: "Pharmaceutical AI Drug Discovery Inclusion",
    client: "Top 10 Global Pharmaceutical Company",
    clientSize: "110,000+ employees",
    industry: "Pharmaceuticals",
    challenge: "AI-powered drug discovery models excluded disability-related conditions from research priorities, missing breakthrough treatments and $420M in market opportunities while facing advocacy group pressure.",
    solution: "Integrated disability conditions into AI research prioritization, created inclusive clinical trial algorithms, and established equitable drug development pipelines with community input protocols.",
    approach: [
      "Integrated disability conditions into research prioritization AI",
      "Developed inclusive clinical trial design algorithms",
      "Created equitable drug development pipeline frameworks",
      "Established community input and advisory protocols",
      "Built accessibility-focused outcome measurement systems",
      "Implemented patient-centered research methodologies"
    ],
    results: [
      "$420M market opportunity identified in disability-focused treatments",
      "3 breakthrough drugs for rare disability conditions entered trials",
      "Clinical trial participation by disabled patients increased by 267%",
      "Research efficiency improved by 89% through inclusive data modeling",
      "Partnership agreements established with 47 disability advocacy organizations",
      "FDA recognition for exemplary inclusive drug development practices"
    ],
    metrics: [
      { label: "Opportunity", value: "$420M", icon: TrendUp },
      { label: "Participation", value: "267%", icon: Users },
      { label: "Partnerships", value: "47", icon: Target }
    ],
    timeline: "28 months",
    testimonial: {
      quote: "Dr. Tetsubayashi opened our eyes to massive market opportunities we were completely missing. The inclusive research approach is now standard across our entire organization.",
      author: "Dr. Robert Chen",
      title: "Chief Scientific Officer",
      company: "Top 10 Global Pharmaceutical Company"
    },
    image: consultingPhoto2,
    tags: ["Pharmaceuticals", "Drug Discovery", "Clinical Trials", "Healthcare Equity"],
    featured: false
  },
  {
    id: 9,
    title: "Transportation AI Safety & Accessibility Integration",
    client: "Leading Autonomous Vehicle Developer",
    clientSize: "25,000+ employees",
    industry: "Transportation/Automotive",
    challenge: "Autonomous vehicle AI systems failed to recognize and accommodate disabled pedestrians and passengers, creating safety risks and regulatory barriers worth $250M in delayed market entry.",
    solution: "Comprehensive AI safety overhaul with disability-aware object recognition, accessible vehicle interface design, and inclusive transportation planning algorithms integrated with real-world testing protocols.",
    approach: [
      "Developed disability-aware object recognition systems",
      "Created accessible vehicle interface designs",
      "Built inclusive transportation planning algorithms",
      "Implemented comprehensive real-world testing protocols",
      "Established safety validation frameworks",
      "Created regulatory compliance and approval strategies"
    ],
    results: [
      "$250M market entry acceleration through regulatory approval",
      "Safety incident prevention for 2.3M disabled road users",
      "First fully accessible autonomous vehicle platform launched",
      "Regulatory approval achieved in 23 countries simultaneously", 
      "Safety testing accuracy improved by 178% for edge cases",
      "Industry partnership agreements worth $1.2B in accessible transportation initiatives"
    ],
    metrics: [
      { label: "Acceleration", value: "$250M", icon: TrendUp },
      { label: "Users", value: "2.3M", icon: Users },
      { label: "Countries", value: "23", icon: Target }
    ],
    timeline: "22 months", 
    testimonial: {
      quote: "The safety and accessibility improvements didn't just get us regulatory approval - they made us the industry leader in inclusive autonomous transportation.",
      author: "Elena Rodriguez",
      title: "Chief Technology Officer",
      company: "Leading Autonomous Vehicle Developer"
    },
    image: startupPhoto,
    tags: ["Autonomous Vehicles", "Safety", "Regulatory Approval", "Transportation Equity"],
    featured: false
  }
]

interface CaseStudiesPageProps {
  onBack: () => void
}

export default function CaseStudiesPage({ onBack }: CaseStudiesPageProps) {
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null)
  const [filterIndustry, setFilterIndustry] = useState<string>('all')
  
  const industries = ['all', ...new Set(caseStudies.map(cs => cs.industry))]
  const filteredCaseStudies = filterIndustry === 'all' 
    ? caseStudies 
    : caseStudies.filter(cs => cs.industry === filterIndustry)

  const featuredCaseStudies = filteredCaseStudies.filter(cs => cs.featured)
  const otherCaseStudies = filteredCaseStudies.filter(cs => !cs.featured)

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
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  onClick={onBack}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft size={20} />
                  <span className="hidden sm:inline">Back to Home</span>
                </Button>
                <div>
                  <h1 className="text-2xl font-bold">Case Studies & Testimonials</h1>
                  <p className="text-sm text-muted-foreground">Real-world AI governance transformations and client success stories</p>
                </div>
              </div>
              <img 
                src={professionalHeadshot}
                alt="Dr. Dédé Tetsubayashi"
                className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
              />
            </div>
          </div>
        </header>

        <main className="py-12">
          <div className="container mx-auto px-4">
            {/* Hero section */}
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Proven Results That <span className="text-primary">Transform Industries</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Over $1.5B in measurable value delivered through equitable AI governance frameworks, 
                risk mitigation strategies, and market expansion initiatives across Fortune 500 companies and innovative startups.
              </p>
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                <Card className="bg-card/90 backdrop-blur-sm">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">$1.5B+</div>
                    <div className="text-sm text-muted-foreground">Total Client Value</div>
                  </CardContent>
                </Card>
                <Card className="bg-card/90 backdrop-blur-sm">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-accent mb-2">100%</div>
                    <div className="text-sm text-muted-foreground">Success Rate</div>
                  </CardContent>
                </Card>
                <Card className="bg-card/90 backdrop-blur-sm">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">47</div>
                    <div className="text-sm text-muted-foreground">Countries Served</div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>

            {/* Industry filter */}
            <motion.div 
              className="flex flex-wrap justify-center gap-2 mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {industries.map((industry) => (
                <Button
                  key={industry}
                  variant={filterIndustry === industry ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterIndustry(industry)}
                  className="capitalize"
                >
                  {industry === 'all' ? 'All Industries' : industry}
                </Button>
              ))}
            </motion.div>

            {/* Featured case studies */}
            <motion.section 
              className="mb-20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold text-center mb-12">Featured Transformations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredCaseStudies.map((caseStudy, index) => (
                  <motion.div
                    key={caseStudy.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <Card className="h-full cursor-pointer hover:shadow-2xl transition-all duration-500 bg-card/90 backdrop-blur-sm overflow-hidden">
                      <div className="relative h-48">
                        <img 
                          src={caseStudy.image}
                          alt={caseStudy.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex flex-wrap gap-2">
                            {caseStudy.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="secondary" className="bg-white/90 text-black text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-3 line-clamp-2">{caseStudy.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{caseStudy.industry}</p>
                        
                        <div className="grid grid-cols-3 gap-2 mb-6">
                          {caseStudy.metrics.map((metric, i) => (
                            <div key={i} className="text-center">
                              <div className="text-lg font-bold text-primary">{metric.value}</div>
                              <div className="text-xs text-muted-foreground">{metric.label}</div>
                            </div>
                          ))}
                        </div>

                        <p className="text-sm mb-4 line-clamp-3">{caseStudy.challenge}</p>
                        
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => setSelectedCase(caseStudy)}
                        >
                          View Full Case Study
                          <ArrowSquareOut size={16} className="ml-2" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* All case studies */}
            <motion.section 
              className="mb-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-center mb-12">Additional Success Stories</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {otherCaseStudies.map((caseStudy, index) => (
                  <motion.div
                    key={caseStudy.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Card className="h-full cursor-pointer hover:shadow-lg transition-all duration-300 bg-card/80 backdrop-blur-sm overflow-hidden">
                      <div className="relative h-40">
                        <img 
                          src={caseStudy.image}
                          alt={caseStudy.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      </div>
                      <CardContent className="p-6">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {caseStudy.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{caseStudy.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{caseStudy.industry}</p>
                        <p className="text-sm mb-4 line-clamp-3">{caseStudy.challenge}</p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          onClick={() => setSelectedCase(caseStudy)}
                        >
                          Learn More
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Interactive Testimonial Gallery */}
            <motion.section 
              className="mb-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <InteractiveTestimonialGallery />
            </motion.section>

            {/* CTA section */}
            <motion.section 
              className="text-center bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-12"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <h2 className="text-3xl font-bold mb-6">Ready to Transform Your AI Strategy?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join the Fortune 500 companies and innovative organizations who have achieved measurable 
                results through Dr. Tetsubayashi's AI governance expertise.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <Calendar size={20} className="mr-2" />
                  Schedule Strategy Session
                </Button>
                <Button variant="outline" size="lg" onClick={onBack}>
                  View Speaking Topics
                </Button>
              </div>
            </motion.section>
          </div>
        </main>

        {/* Case study detail modal */}
        <Dialog open={!!selectedCase} onOpenChange={() => setSelectedCase(null)}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl mb-2">{selectedCase?.title}</DialogTitle>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <span>{selectedCase?.industry}</span>
                <span>•</span>
                <span>{selectedCase?.clientSize}</span>
                <span>•</span>
                <span>{selectedCase?.timeline}</span>
              </div>
            </DialogHeader>
            
            {selectedCase && (
              <motion.div 
                className="space-y-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Hero image and metrics */}
                <div className="relative">
                  <img 
                    src={selectedCase.image}
                    alt={selectedCase.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="grid grid-cols-3 gap-4">
                      {selectedCase.metrics.map((metric, i) => (
                        <div key={i} className="text-center text-white">
                          <div className="text-2xl font-bold">{metric.value}</div>
                          <div className="text-sm opacity-90">{metric.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {selectedCase.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>

                {/* Challenge */}
                <div className="bg-destructive/5 p-6 rounded-lg border-l-4 border-destructive/20">
                  <h3 className="font-semibold mb-3 text-destructive flex items-center">
                    <Shield size={20} className="mr-2" />
                    Challenge
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{selectedCase.challenge}</p>
                </div>

                {/* Solution */}
                <div className="bg-primary/5 p-6 rounded-lg border-l-4 border-primary/20">
                  <h3 className="font-semibold mb-3 text-primary flex items-center">
                    <Target size={20} className="mr-2" />
                    Solution
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">{selectedCase.solution}</p>
                  
                  <h4 className="font-medium mb-3">Approach:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedCase.approach.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle size={16} className="text-primary mt-1 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Results */}
                <div className="bg-accent/5 p-6 rounded-lg border-l-4 border-accent/20">
                  <h3 className="font-semibold mb-4 text-accent flex items-center">
                    <Trophy size={20} className="mr-2" />
                    Results & Impact
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedCase.results.map((result, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3 p-4 bg-card rounded-lg"
                      >
                        <Star size={16} className="text-yellow-500 mt-1 flex-shrink-0" weight="fill" />
                        <span className="text-sm">{result}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Testimonial */}
                <div className="bg-card p-8 rounded-lg border-2 border-primary/20">
                  <div className="flex items-start gap-6">
                    <Quotes size={40} className="text-primary flex-shrink-0 mt-2" />
                    <div>
                      <p className="text-lg mb-4 italic leading-relaxed">"{selectedCase.testimonial.quote}"</p>
                      <div>
                        <p className="font-semibold">{selectedCase.testimonial.author}</p>
                        <p className="text-sm text-muted-foreground">{selectedCase.testimonial.title}</p>
                        <p className="text-sm text-muted-foreground">{selectedCase.testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="text-center pt-8 border-t">
                  <h4 className="text-xl font-semibold mb-4">Get Similar Results for Your Organization</h4>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg">
                      <Calendar size={20} className="mr-2" />
                      Schedule Consultation
                    </Button>
                    <Button variant="outline" size="lg" onClick={() => setSelectedCase(null)}>
                      View More Case Studies
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}