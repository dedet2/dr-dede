import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { LinkedinLogo, InstagramLogo, YoutubeLogo, CalendarBlank, Heart, ChatCircle, Share, Repeat, ArrowSquareOut, TrendUp } from "@phosphor-icons/react"
import { useKV } from '@github/spark/hooks'
import professionalHeadshot from '@/assets/images/professional-headshot-1.jpg'
import professionalHeadshot2 from '@/assets/images/professional-headshot-2.jpg'
import consultingPhoto from '@/assets/images/consulting-photo-1.jpg'
import speakingPhoto from '@/assets/images/speaking-photo-1.jpg'

interface SocialPost {
  id: string
  platform: 'linkedin' | 'instagram' | 'youtube'
  content: string
  author: string
  authorImage: string
  timestamp: string
  likes: number
  comments: number
  shares: number
  url: string
  mediaUrl?: string
  mediaType?: 'image' | 'video'
}

interface SocialMediaStats {
  linkedin: {
    followers: number
    posts: number
    engagement: string
    lastUpdate: string
  }
  instagram: {
    followers: number
    posts: number
    engagement: string
    lastUpdate: string
  }
  youtube: {
    subscribers: number
    videos: number
    views: string
    lastUpdate: string
  }
}

// Social media API integration functions (placeholder for real API calls)
const fetchLinkedInPosts = async (): Promise<SocialPost[]> => {
  // In production, this would use LinkedIn's API
  // For now, return realistic mock data
  return [
    {
      id: 'li-1',
      platform: 'linkedin',
      content: 'Just wrapped up a fascinating board meeting discussing AI governance frameworks. The conversation around equitable technology design continues to evolve, and I\'m encouraged by the progress we\'re making. When we center disability perspectives from day one, we create better solutions for everyone. #AIGovernance #DisabilityInclusion #TechEquity',
      author: 'Dr. Dédé Tetsubayashi',
      authorImage: professionalHeadshot,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      likes: 287,
      comments: 34,
      shares: 56,
      url: 'https://linkedin.com/in/dr-dede-tetsubayashi',
      mediaUrl: consultingPhoto,
      mediaType: 'image'
    },
    {
      id: 'li-2', 
      platform: 'linkedin',
      content: 'Excited to announce that our AI governance framework helped another Fortune 500 client avoid $125M in regulatory penalties while expanding their market reach. True equity isn\'t just morally right—it\'s profitable. Looking forward to sharing more insights at next week\'s tech conference.',
      author: 'Dr. Dédé Tetsubayashi',
      authorImage: professionalHeadshot2,
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
      likes: 445,
      comments: 67,
      shares: 89,
      url: 'https://linkedin.com/in/dr-dede-tetsubayashi'
    }
  ]
}

const fetchInstagramPosts = async (): Promise<SocialPost[]> => {
  return [
    {
      id: 'ig-1',
      platform: 'instagram',
      content: 'Behind the scenes at today\'s AI ethics workshop! 🤖✨ Teaching teams how to build inclusive technology from the ground up. When we design for accessibility first, everyone wins. #AIEthics #TechInclusion #DisabilityAdvocate',
      author: 'Dr. Dédé Tetsubayashi',
      authorImage: professionalHeadshot,
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      likes: 156,
      comments: 23,
      shares: 0,
      url: 'https://instagram.com/dr.dede.tetsubayashi',
      mediaUrl: speakingPhoto,
      mediaType: 'image'
    }
  ]
}

const fetchYouTubePosts = async (): Promise<SocialPost[]> => {
  return [
    {
      id: 'yt-1',
      platform: 'youtube',
      content: 'New video: "The Hidden Costs of Biased AI - How Fortune 500 Companies Are Losing Billions" - Breaking down real case studies and actionable solutions for building equitable AI systems.',
      author: 'Dr. Dédé Tetsubayashi',
      authorImage: professionalHeadshot,
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      likes: 89,
      comments: 12,
      shares: 0,
      url: 'https://youtube.com/@the_drdede',
      mediaType: 'video'
    }
  ]
}

const fetchSocialMediaStats = async (): Promise<SocialMediaStats> => {
  // In production, these would be real API calls
  const now = new Date().toISOString()
  
  return {
    linkedin: {
      followers: 12450 + Math.floor(Math.random() * 50), // Simulate growth
      posts: 142,
      engagement: "8.7%",
      lastUpdate: now
    },
    instagram: {
      followers: 8920 + Math.floor(Math.random() * 30),
      posts: 267,
      engagement: "12.3%",
      lastUpdate: now
    },
    youtube: {
      subscribers: 7420 + Math.floor(Math.random() * 20),
      videos: 24,
      views: "156K",
      lastUpdate: now
    }
  }
}

const RealTimeSocialFeeds = () => {
  const [posts, setPosts] = useState<SocialPost[]>([])
  const [stats, setStats] = useState<SocialMediaStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [selectedPlatform, setSelectedPlatform] = useState<'all' | 'linkedin' | 'instagram' | 'youtube'>('all')
  const [refreshKey, setRefreshKey] = useState(0)

  // Load social media data
  useEffect(() => {
    const loadSocialData = async () => {
      setIsLoading(true)
      
      try {
        const [linkedinPosts, instagramPosts, youtubePosts, socialStats] = await Promise.all([
          fetchLinkedInPosts(),
          fetchInstagramPosts(), 
          fetchYouTubePosts(),
          fetchSocialMediaStats()
        ])

        const allPosts = [...linkedinPosts, ...instagramPosts, ...youtubePosts]
        allPosts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        
        setPosts(allPosts)
        setStats(socialStats)
        setLastUpdated(new Date())
      } catch (error) {
        console.error('Failed to load social media data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadSocialData()
  }, [refreshKey])

  const refreshFeed = () => {
    setRefreshKey(prev => prev + 1)
  }

  const filteredPosts = selectedPlatform === 'all' 
    ? posts 
    : posts.filter(post => post.platform === selectedPlatform)

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`
    }
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'linkedin':
        return <LinkedinLogo size={20} className="text-blue-600" weight="fill" />
      case 'instagram':
        return <InstagramLogo size={20} className="text-pink-600" weight="fill" />
      case 'youtube':
        return <YoutubeLogo size={20} className="text-red-600" weight="fill" />
      default:
        return null
    }
  }

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">Latest Social Updates</h2>
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="h-32 bg-muted/50" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header with stats */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-6">Latest Social Updates</h2>
        
        {/* Social Media Stats */}
        {stats && (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-6 text-center">
                <LinkedinLogo size={32} className="text-blue-600 mx-auto mb-3" weight="fill" />
                <div className="text-2xl font-bold text-blue-700">{stats.linkedin.followers.toLocaleString()}</div>
                <div className="text-sm text-blue-600 mb-2">LinkedIn Followers</div>
                <Badge variant="secondary" className="text-xs bg-blue-100">
                  <TrendUp size={12} className="mr-1" />
                  {stats.linkedin.engagement} engagement
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200">
              <CardContent className="p-6 text-center">
                <InstagramLogo size={32} className="text-pink-600 mx-auto mb-3" weight="fill" />
                <div className="text-2xl font-bold text-pink-700">{stats.instagram.followers.toLocaleString()}</div>
                <div className="text-sm text-pink-600 mb-2">Instagram Followers</div>
                <Badge variant="secondary" className="text-xs bg-pink-100">
                  <TrendUp size={12} className="mr-1" />
                  {stats.instagram.engagement} engagement
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
              <CardContent className="p-6 text-center">
                <YoutubeLogo size={32} className="text-red-600 mx-auto mb-3" weight="fill" />
                <div className="text-2xl font-bold text-red-700">{stats.youtube.subscribers.toLocaleString()}</div>
                <div className="text-sm text-red-600 mb-2">YouTube Subscribers</div>
                <Badge variant="secondary" className="text-xs bg-red-100">
                  <TrendUp size={12} className="mr-1" />
                  {stats.youtube.views} total views
                </Badge>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Platform filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {['all', 'linkedin', 'instagram', 'youtube'].map((platform) => (
            <Button
              key={platform}
              variant={selectedPlatform === platform ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPlatform(platform as any)}
              className="capitalize"
            >
              {platform === 'all' ? 'All Platforms' : platform}
            </Button>
          ))}
        </div>

        {lastUpdated && (
          <p className="text-sm text-muted-foreground mb-4">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        )}
      </div>

      {/* Social media feed */}
      <div className="space-y-6 mb-8">
        <AnimatePresence>
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300 bg-card/90 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Author avatar */}
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={post.authorImage} alt={post.author} />
                      <AvatarFallback>DT</AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-sm">{post.author}</p>
                          {getPlatformIcon(post.platform)}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span>{formatTimestamp(post.timestamp)}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(post.url, '_blank')}
                          >
                            <ArrowSquareOut size={16} />
                          </Button>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="space-y-4">
                        <p className="text-sm leading-relaxed">{post.content}</p>

                        {/* Media */}
                        {post.mediaUrl && (
                          <div className="rounded-lg overflow-hidden bg-muted">
                            {post.mediaType === 'image' ? (
                              <img
                                src={post.mediaUrl}
                                alt="Post media"
                                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                <YoutubeLogo size={48} className="text-red-600" />
                              </div>
                            )}
                          </div>
                        )}

                        {/* Engagement metrics */}
                        <div className="flex items-center justify-between pt-3 border-t border-border">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Heart size={16} />
                              <span>{post.likes}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <ChatCircle size={16} />
                              <span>{post.comments}</span>
                            </div>
                            {post.shares > 0 && (
                              <div className="flex items-center gap-1">
                                <Share size={16} />
                                <span>{post.shares}</span>
                              </div>
                            )}
                          </div>
                          <Badge variant="outline" className="text-xs capitalize">
                            {post.platform}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Refresh button */}
      <div className="text-center">
        <Button
          onClick={refreshFeed}
          disabled={isLoading}
          variant="outline"
        >
          Refresh Feed
        </Button>
      </div>
    </div>
  )
}

export default RealTimeSocialFeeds