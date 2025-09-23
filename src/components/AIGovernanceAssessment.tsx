import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, XCircle, Minus, TrendUp, ChartBar, Shield, Users, Lightbulb, Target, ArrowRight } from "@phosphor-icons/react"
import { useKV } from '@github/spark/hooks'

interface AssessmentQuestion {
  id: string
  category: 'governance' | 'ethics' | 'risk' | 'implementation' | 'monitoring'
  question: string
  options: {
    text: string
    score: number
    description: string
  }[]
  weight: number
}

interface AssessmentResult {
  totalScore: number
  categoryScores: Record<string, number>
  maturityLevel: 'Beginning' | 'Developing' | 'Advancing' | 'Leading'
  recommendations: string[]
  completedAt: string
}

const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: 'gov-1',
    category: 'governance',
    question: 'How would you describe your organization\'s AI governance structure?',
    options: [
      { text: 'No formal structure exists', score: 0, description: 'AI decisions are made ad-hoc without oversight' },
      { text: 'Informal oversight by existing teams', score: 1, description: 'Some teams review AI projects but no formal process' },
      { text: 'Dedicated AI committee or working group', score: 2, description: 'Formal group meets regularly to discuss AI initiatives' },
      { text: 'Comprehensive governance with board oversight', score: 3, description: 'Full governance structure with executive and board involvement' }
    ],
    weight: 1.2
  },
  {
    id: 'eth-1',
    category: 'ethics',
    question: 'How does your organization address ethical considerations in AI development?',
    options: [
      { text: 'Ethics are not formally considered', score: 0, description: 'No systematic approach to AI ethics' },
      { text: 'Basic ethical guidelines exist', score: 1, description: 'Some written guidelines but limited implementation' },
      { text: 'Ethics reviews for high-risk projects', score: 2, description: 'Formal ethics review process for sensitive applications' },
      { text: 'Ethics embedded throughout AI lifecycle', score: 3, description: 'Comprehensive ethics framework integrated at every stage' }
    ],
    weight: 1.3
  },
  {
    id: 'risk-1',
    category: 'risk',
    question: 'How does your organization identify and assess AI-related risks?',
    options: [
      { text: 'No formal risk assessment', score: 0, description: 'Risks are not systematically identified or assessed' },
      { text: 'Basic risk identification', score: 1, description: 'Some risks are identified but assessment is informal' },
      { text: 'Systematic risk assessment process', score: 2, description: 'Formal process for identifying and evaluating AI risks' },
      { text: 'Continuous risk monitoring and mitigation', score: 3, description: 'Real-time risk monitoring with automated alerts' }
    ],
    weight: 1.1
  },
  {
    id: 'impl-1',
    category: 'implementation',
    question: 'How are AI governance policies implemented in practice?',
    options: [
      { text: 'No implementation mechanism', score: 0, description: 'Policies exist but no enforcement or implementation' },
      { text: 'Manual compliance checks', score: 1, description: 'Periodic manual reviews of compliance' },
      { text: 'Systematic implementation with training', score: 2, description: 'Structured rollout with staff training and support' },
      { text: 'Automated compliance monitoring', score: 3, description: 'Integrated systems automatically monitor compliance' }
    ],
    weight: 1.0
  },
  {
    id: 'mon-1',
    category: 'monitoring',
    question: 'How does your organization monitor AI system performance and impact?',
    options: [
      { text: 'No systematic monitoring', score: 0, description: 'AI systems run without ongoing oversight' },
      { text: 'Basic performance metrics', score: 1, description: 'Technical metrics are tracked but limited analysis' },
      { text: 'Comprehensive monitoring dashboard', score: 2, description: 'Multiple metrics tracked with regular reporting' },
      { text: 'Real-time monitoring with impact assessment', score: 3, description: 'Continuous monitoring of both performance and societal impact' }
    ],
    weight: 1.1
  },
  {
    id: 'gov-2',
    category: 'governance',
    question: 'How diverse and inclusive are your AI decision-making processes?',
    options: [
      { text: 'Limited diversity in AI teams', score: 0, description: 'Homogeneous teams with similar backgrounds' },
      { text: 'Some attention to team diversity', score: 1, description: 'Basic efforts to include different perspectives' },
      { text: 'Diverse teams with community input', score: 2, description: 'Actively diverse teams with external stakeholder input' },
      { text: 'Community-centered design processes', score: 3, description: 'Affected communities directly involved in design decisions' }
    ],
    weight: 1.4
  },
  {
    id: 'eth-2',
    category: 'ethics',
    question: 'How does your organization address bias and fairness in AI systems?',
    options: [
      { text: 'Bias is not systematically addressed', score: 0, description: 'No formal bias detection or mitigation' },
      { text: 'Basic bias testing', score: 1, description: 'Some bias testing but limited scope' },
      { text: 'Comprehensive bias auditing', score: 2, description: 'Regular bias audits with corrective actions' },
      { text: 'Proactive fairness by design', score: 3, description: 'Fairness principles embedded from initial design' }
    ],
    weight: 1.3
  },
  {
    id: 'risk-2',
    category: 'risk',
    question: 'How prepared is your organization for AI-related incidents?',
    options: [
      { text: 'No incident response plan', score: 0, description: 'No preparation for AI system failures or issues' },
      { text: 'Basic incident procedures', score: 1, description: 'General incident response that covers AI' },
      { text: 'AI-specific incident response plan', score: 2, description: 'Detailed plan for AI-related incidents' },
      { text: 'Tested incident response with rapid recovery', score: 3, description: 'Regularly tested plan with fast recovery capabilities' }
    ],
    weight: 1.0
  }
]

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'governance':
      return <Shield size={20} className="text-blue-600" />
    case 'ethics':
      return <Users size={20} className="text-green-600" />
    case 'risk':
      return <ChartBar size={20} className="text-red-600" />
    case 'implementation':
      return <Target size={20} className="text-purple-600" />
    case 'monitoring':
      return <TrendUp size={20} className="text-orange-600" />
    default:
      return <Lightbulb size={20} className="text-gray-600" />
  }
}

const getCategoryName = (category: string) => {
  switch (category) {
    case 'governance':
      return 'Governance Structure'
    case 'ethics':
      return 'Ethics & Fairness'
    case 'risk':
      return 'Risk Management'
    case 'implementation':
      return 'Implementation'
    case 'monitoring':
      return 'Monitoring & Oversight'
    default:
      return category
  }
}

const getMaturityLevel = (score: number): AssessmentResult['maturityLevel'] => {
  if (score < 25) return 'Beginning'
  if (score < 50) return 'Developing'
  if (score < 75) return 'Advancing'
  return 'Leading'
}

const getMaturityColor = (level: AssessmentResult['maturityLevel']) => {
  switch (level) {
    case 'Beginning':
      return 'text-red-600 bg-red-50'
    case 'Developing':
      return 'text-orange-600 bg-orange-50'
    case 'Advancing':
      return 'text-blue-600 bg-blue-50'
    case 'Leading':
      return 'text-green-600 bg-green-50'
  }
}

const generateRecommendations = (categoryScores: Record<string, number>): string[] => {
  const recommendations: string[] = []
  
  // Find lowest scoring categories for targeted recommendations
  const sortedCategories = Object.entries(categoryScores).sort(([,a], [,b]) => a - b)
  
  sortedCategories.slice(0, 3).forEach(([category, score]) => {
    switch (category) {
      case 'governance':
        if (score < 50) {
          recommendations.push('Establish a formal AI governance committee with executive sponsorship and clear decision-making authority')
        }
        break
      case 'ethics':
        if (score < 50) {
          recommendations.push('Develop comprehensive AI ethics guidelines with regular training for all team members')
        }
        break
      case 'risk':
        if (score < 50) {
          recommendations.push('Implement systematic AI risk assessment processes with continuous monitoring capabilities')
        }
        break
      case 'implementation':
        if (score < 50) {
          recommendations.push('Create structured implementation processes with automated compliance checks and staff training')
        }
        break
      case 'monitoring':
        if (score < 50) {
          recommendations.push('Deploy comprehensive monitoring systems that track both technical performance and societal impact')
        }
        break
    }
  })
  
  return recommendations
}

export default function AIGovernanceAssessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [showResults, setShowResults] = useState(false)
  const [assessmentResults, setAssessmentResults] = useKV<AssessmentResult[]>('assessment-results', [])

  const progress = (currentQuestion / assessmentQuestions.length) * 100
  const isComplete = Object.keys(answers).length === assessmentQuestions.length

  const handleAnswer = (questionId: string, score: number) => {
    const newAnswers = { ...answers, [questionId]: score }
    setAnswers(newAnswers)
    
    if (currentQuestion < assessmentQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1)
      }, 300)
    } else {
      // Calculate results
      setTimeout(() => {
        calculateResults(newAnswers)
      }, 300)
    }
  }

  const calculateResults = (finalAnswers: Record<string, number>) => {
    let totalWeightedScore = 0
    let totalWeight = 0
    const categoryScores: Record<string, number> = {}
    const categoryWeights: Record<string, number> = {}

    assessmentQuestions.forEach(question => {
      const answer = finalAnswers[question.id] || 0
      const weightedScore = answer * question.weight
      
      totalWeightedScore += weightedScore
      totalWeight += question.weight * 3 // Max score per question is 3
      
      if (!categoryScores[question.category]) {
        categoryScores[question.category] = 0
        categoryWeights[question.category] = 0
      }
      
      categoryScores[question.category] += weightedScore
      categoryWeights[question.category] += question.weight * 3
    })

    // Convert to percentages
    const totalScore = (totalWeightedScore / totalWeight) * 100
    
    Object.keys(categoryScores).forEach(category => {
      categoryScores[category] = (categoryScores[category] / categoryWeights[category]) * 100
    })

    const result: AssessmentResult = {
      totalScore: Math.round(totalScore),
      categoryScores: Object.fromEntries(
        Object.entries(categoryScores).map(([k, v]) => [k, Math.round(v)])
      ),
      maturityLevel: getMaturityLevel(totalScore),
      recommendations: generateRecommendations(categoryScores),
      completedAt: new Date().toISOString()
    }

    // Save results
    setAssessmentResults(prev => [...(prev || []), result])
    setShowResults(true)
  }

  const resetAssessment = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
  }

  const currentQ = assessmentQuestions[currentQuestion]
  const latestResult = assessmentResults && assessmentResults.length > 0 
    ? assessmentResults[assessmentResults.length - 1] 
    : null

  if (showResults && latestResult) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <ChartBar size={28} className="text-primary" />
            Your AI Governance Maturity Assessment Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">
              {latestResult.totalScore}%
            </div>
            <Badge className={`text-lg px-4 py-2 ${getMaturityColor(latestResult.maturityLevel)}`}>
              {latestResult.maturityLevel} Maturity Level
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(latestResult.categoryScores).map(([category, score]) => (
              <Card key={category} className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  {getCategoryIcon(category)}
                  <span className="font-medium text-sm">{getCategoryName(category)}</span>
                </div>
                <div className="text-2xl font-bold mb-2">{score}%</div>
                <Progress value={score} className="h-2" />
              </Card>
            ))}
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Target size={20} />
              Priority Recommendations
            </h3>
            <div className="space-y-3">
              {latestResult.recommendations.map((rec, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-sm">{rec}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button onClick={resetAssessment} variant="outline" className="flex-1">
              Retake Assessment
            </Button>
            <Button 
              onClick={() => window.open('https://calendly.com/dr-dede', '_blank')}
              className="flex-1"
            >
              <ArrowRight size={16} className="mr-2" />
              Discuss Results with Dr. Dédé
            </Button>
          </div>

          <div className="text-xs text-muted-foreground text-center">
            Assessment completed on {new Date(latestResult.completedAt).toLocaleDateString()}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!currentQ) return null

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <CardTitle className="flex items-center gap-2">
            <ChartBar size={24} className="text-primary" />
            AI Governance Maturity Assessment
          </CardTitle>
          <Badge variant="secondary">
            {currentQuestion + 1} of {assessmentQuestions.length}
          </Badge>
        </div>
        <Progress value={progress} className="h-2" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            {getCategoryIcon(currentQ.category)}
            <span className="text-sm text-muted-foreground">{getCategoryName(currentQ.category)}</span>
          </div>
          <h3 className="text-lg font-medium mb-4">{currentQ.question}</h3>
        </div>

        <div className="space-y-3">
          {currentQ.options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full p-4 h-auto text-left justify-start hover:bg-primary/5 hover:border-primary/50"
              onClick={() => handleAnswer(currentQ.id, option.score)}
            >
              <div className="flex items-start gap-3 w-full">
                <div className="bg-secondary rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                  {index + 1}
                </div>
                <div className="text-left">
                  <div className="font-medium mb-1">{option.text}</div>
                  <div className="text-sm text-muted-foreground">{option.description}</div>
                </div>
              </div>
            </Button>
          ))}
        </div>

        {currentQuestion > 0 && (
          <Button 
            variant="ghost" 
            onClick={() => setCurrentQuestion(currentQuestion - 1)}
            className="w-full"
          >
            ← Previous Question
          </Button>
        )}
      </CardContent>
    </Card>
  )
}