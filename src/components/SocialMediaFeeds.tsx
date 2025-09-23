import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { LinkedinLogo, InstagramLogo, YoutubeLogo, Heart, ChatCircle, Share, Eye, ArrowSquareOut } from "@phosphor-icons/react"
import { useKV } from '@github/spark/hooks'

interface SocialPost {
  id: string
  platform: 'linkedin' | 'instagram' | 'youtube'
  content: string
  author: string
  timestamp: string
  engagement: {
    likes?: number
    comments?: number
    shares?: number
    views?: number
  }
  media?: {
    type: 'image' | 'video'
    url: string
    thumbnail?: string
  }
  url: string
}

// Mock data for demonstration - in a real app, this would come from APIs
const mockSocialPosts: SocialPost[] = [
  {
    id: 'li-1',
    platform: 'linkedin',
    content: 'Excited to share insights on AI governance frameworks at the upcoming Tech Leadership Summit. The intersection of ethics and innovation continues to shape how we build responsible AI systems. #AIGovernance #TechLeadership #EthicalAI',
    author: 'Dr. Dédé Tetsubayashi',
    timestamp: '2024-12-20T10:30:00Z',
    engagement: {
      likes: 247,
      comments: 32,
      shares: 18
    },
    url: 'https://linkedin.com/posts/dr-dede-tetsubayashi'
  },
  {
    id: 'ig-1',
    platform: 'instagram',
    content: 'Behind the scenes at the AI Ethics Workshop. Building more inclusive technology starts with diverse voices at every table. 🤖✨ #InclusiveAI #TechForGood #AIEthics',
    author: 'Dr. Dédé Tetsubayashi',
    timestamp: '2024-12-19T16:45:00Z',
    engagement: {
      likes: 892,
      comments: 67
    },
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop&crop=faces'
    },
    url: 'https://instagram.com/p/dr_dede_post'
  },
  {
    id: 'yt-1',
    platform: 'youtube',
    content: 'New Video: "5 Critical Mistakes in AI Governance (And How to Fix Them)" - A deep dive into common pitfalls organizations face when implementing AI governance frameworks.',
    author: 'Dr. Dédé Tetsubayashi',
    timestamp: '2024-12-18T12:00:00Z',
    engagement: {
      views: 12450,
      likes: 456,
      comments: 89
    },
    media: {
      type: 'video',
      url: 'https://youtube.com/watch?v=example',
      thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop'
    },
    url: 'https://youtube.com/watch?v=example'
  },
  {
    id: 'li-2',
    platform: 'linkedin',
    content: 'Just published: "Beyond Compliance: Building Truly Equitable AI Systems" - exploring how organizations can move from checkbox solutions to meaningful inclusion in AI development.',
    author: 'Dr. Dédé Tetsubayashi',
    timestamp: '2024-12-17T09:15:00Z',
    engagement: {
      likes: 189,
      comments: 24,
      shares: 31
    },
    url: 'https://linkedin.com/posts/dr-dede-tetsubayashi'
  },
  {
    id: 'ig-2',
    platform: 'instagram',
    content: 'Speaking at TEDx about reimagining AI for equitable innovation. The future of technology must center accessibility and inclusion from day one. 🎤 #TEDx #AIInnovation #AccessibilityFirst',
    author: 'Dr. Dédé Tetsubayashi',
    timestamp: '2024-12-16T14:20:00Z',
    engagement: {
      likes: 1247,
      comments: 95
    },
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=400&fit=crop'
    },
    url: 'https://instagram.com/p/dr_dede_tedx'
  },
  {
    id: 'yt-2',
    platform: 'youtube',
    content: 'Live Q&A: "AI Governance in Healthcare" - Discussing the unique challenges and opportunities for implementing responsible AI in healthcare settings.',
    author: 'Dr. Dédé Tetsubayashi',
    timestamp: '2024-12-15T19:00:00Z',
    engagement: {
      views: 8950,
      likes: 312,
      comments: 56
    },
    media: {
      type: 'video',
      url: 'https://youtube.com/watch?v=example2',
      thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop'
    },
    url: 'https://youtube.com/watch?v=example2'
  }
]

function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp)
  const now = new Date()
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
  
  if (diffInHours < 1) return 'Just now'
  if (diffInHours < 24) return `${diffInHours}h ago`
  if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`
  return `${Math.floor(diffInHours / 168)}w ago`
}

function formatEngagement(num: number): string {
  if (num < 1000) return num.toString()
  if (num < 1000000) return `${(num / 1000).toFixed(1)}K`
  return `${(num / 1000000).toFixed(1)}M`
}

function getPlatformIcon(platform: SocialPost['platform']) {
  switch (platform) {
    case 'linkedin':
      return <LinkedinLogo size={20} className="text-blue-600" weight="bold" />
    case 'instagram':
      return <InstagramLogo size={20} className="text-pink-600" weight="bold" />
    case 'youtube':
      return <YoutubeLogo size={20} className="text-red-600" weight="bold" />
  }
}

function getPlatformColor(platform: SocialPost['platform']) {
  switch (platform) {
    case 'linkedin':
      return 'border-blue-200 bg-blue-50'
    case 'instagram':
      return 'border-pink-200 bg-pink-50'
    case 'youtube':
      return 'border-red-200 bg-red-50'
  }
}

function SocialPost({ post }: { post: SocialPost }) {
  return (
    <Card className={`h-full ${getPlatformColor(post.platform)}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3 mb-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/api/placeholder/40/40" alt={post.author} />
            <AvatarFallback>DD</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {getPlatformIcon(post.platform)}
              <span className="font-medium text-sm truncate">{post.author}</span>
            </div>
            <span className="text-xs text-muted-foreground">{formatTimestamp(post.timestamp)}</span>
          </div>
        </div>
        
        {post.media && (
          <div className="mb-3 rounded-lg overflow-hidden">
            {post.media.type === 'image' ? (
              <img 
                src={post.media.url} 
                alt="Social media post" 
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="relative">
                <img 
                  src={post.media.thumbnail} 
                  alt="Video thumbnail" 
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="bg-black/60 rounded-full p-2">
                    <YoutubeLogo size={24} className="text-white" weight="fill" />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        
        <p className="text-sm mb-4 leading-relaxed">{post.content}</p>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            {post.engagement.likes && (
              <div className="flex items-center gap-1">
                <Heart size={16} />
                <span>{formatEngagement(post.engagement.likes)}</span>
              </div>
            )}
            {post.engagement.comments && (
              <div className="flex items-center gap-1">
                <ChatCircle size={16} />
                <span>{formatEngagement(post.engagement.comments)}</span>
              </div>
            )}
            {post.engagement.shares && (
              <div className="flex items-center gap-1">
                <Share size={16} />
                <span>{formatEngagement(post.engagement.shares)}</span>
              </div>
            )}
            {post.engagement.views && (
              <div className="flex items-center gap-1">
                <Eye size={16} />
                <span>{formatEngagement(post.engagement.views)}</span>
              </div>
            )}
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => window.open(post.url, '_blank')}
            className="text-xs"
          >
            <ArrowSquareOut size={14} className="mr-1" />
            View
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function SocialMediaFeeds() {
  const [posts, setPosts] = useKV<SocialPost[]>('social-media-posts', mockSocialPosts)
  const [selectedPlatform, setSelectedPlatform] = useState<'all' | 'linkedin' | 'instagram' | 'youtube'>('all')
  const [isLoading, setIsLoading] = useState(false)

  const filteredPosts = selectedPlatform === 'all' 
    ? (posts || [])
    : (posts || []).filter(post => post.platform === selectedPlatform)

  const refreshFeeds = async () => {
    setIsLoading(true)
    // Simulate API call - in production, this would fetch from social media APIs
    setTimeout(() => {
      // For demo, just shuffle the existing posts
      const shuffled = [...mockSocialPosts].sort(() => Math.random() - 0.5)
      setPosts(shuffled)
      setIsLoading(false)
    }, 2000)
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">Latest Social Updates</h2>
              <p className="text-lg text-muted-foreground">
                Follow Dr. Dédé's insights across LinkedIn, Instagram, and YouTube
              </p>
            </div>
            <Button 
              onClick={refreshFeeds}
              disabled={isLoading}
              variant="outline"
              size="sm"
            >
              {isLoading ? 'Refreshing...' : 'Refresh Feeds'}
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            <Button
              variant={selectedPlatform === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedPlatform('all')}
            >
              All Platforms
            </Button>
            <Button
              variant={selectedPlatform === 'linkedin' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedPlatform('linkedin')}
              className="flex items-center gap-2"
            >
              <LinkedinLogo size={16} />
              LinkedIn
            </Button>
            <Button
              variant={selectedPlatform === 'instagram' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedPlatform('instagram')}
              className="flex items-center gap-2"
            >
              <InstagramLogo size={16} />
              Instagram
            </Button>
            <Button
              variant={selectedPlatform === 'youtube' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedPlatform('youtube')}
              className="flex items-center gap-2"
            >
              <YoutubeLogo size={16} />
              YouTube
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <SocialPost key={post.id} post={post} />
            ))}
          </div>

          <div className="mt-8 text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => window.open('https://www.linkedin.com/in/dr-dede-tetsubayashi', '_blank')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <LinkedinLogo size={20} className="mr-2" />
                Follow on LinkedIn
              </Button>
              <Button 
                onClick={() => window.open('https://www.instagram.com/the_drdede', '_blank')}
                className="bg-pink-600 hover:bg-pink-700 text-white"
              >
                <InstagramLogo size={20} className="mr-2" />
                Follow on Instagram
              </Button>
              <Button 
                onClick={() => window.open('https://www.youtube.com/@the_drdede', '_blank')}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <YoutubeLogo size={20} className="mr-2" />
                Subscribe on YouTube
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}