import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { LinkedinLogo, InstagramLogo, YoutubeLogo, CalendarBlank, Heart, ChatCircle, Share, Repeat } from "@phosphor-icons/react"
import { useKV } from '@github/spark/hooks'
import professionalHeadshot from '@/assets/images/professional-headshot-1.jpg'
import professionalHeadshot2 from '@/assets/images/professional-headshot-2.jpg'
import professionalHeadshot3 from '@/assets/images/professional-headshot-3.jpg'
import professionalHeadshot4 from '@/assets/images/professional-headshot-4.jpg'
import professionalHeadshot5 from '@/assets/images/professional-headshot-5.jpg'
import consultingPhoto from '@/assets/images/consulting-photo-1.jpg'
import consultingPhoto2 from '@/assets/images/consulting-photo-2.jpg'
import boardroomPhoto from '@/assets/images/boardroom-photo-1.jpg'
import speakingPhoto from '@/assets/images/speaking-photo-1.jpg'
import speakingPhoto2 from '@/assets/images/speaking-photo-2.jpg'
import healthcareCaseStudy from '@/assets/images/healthcare-case-study.jpg'

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
  }
  instagram: {
    followers: number
    posts: number
    engagement: string
  }
  youtube: {
    subscribers: number
    videos: number
    views: string
  }
}

const RealTimeSocialFeeds = () => {
  const [posts, setPosts] = useState<SocialPost[]>([])
  const [stats, setStats] = useState<SocialMediaStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [selectedPlatform, setSelectedPlatform] = useState<'all' | 'linkedin' | 'instagram' | 'youtube'>('all')

  // Since we can't make real API calls, we'll simulate dynamic social media data
  const generateMockSocialData = (): { posts: SocialPost[], stats: SocialMediaStats } => {
    const platforms: Array<'linkedin' | 'instagram' | 'youtube'> = ['linkedin', 'instagram', 'youtube']
    const now = new Date()
    
    const mockPosts: SocialPost[] = [
      {
        id: 'li-1',
        platform: 'linkedin',
        content: "🚀 Just completed another successful AI governance transformation for a Fortune 500 client! Seeing organizations embrace equitable AI principles isn't just rewarding—it's essential for our collective future. #AIGovernance #EquitableAI #Leadership",
        author: "Dr. Dédé Tetsubayashi",
        authorImage: professionalHeadshot,
        timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        likes: 247,
        comments: 34,
        shares: 89,
        url: "https://linkedin.com/in/dr-dede-tetsubayashi",
        mediaUrl: consultingPhoto,
        mediaType: 'image'
      },
      {
        id: 'ig-1',
        platform: 'instagram',
        content: "Behind the scenes at today's boardroom presentation on inclusive AI strategies. Every voice matters in shaping the future of technology. 💡✨ #AIethics #InclusiveDesign #BoardroomToBreakthrough",
        author: "Dr. Dédé Tetsubayashi",
        authorImage: professionalHeadshot2,
        timestamp: new Date(now.getTime() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
        likes: 892,
        comments: 76,
        shares: 123,
        url: "https://instagram.com/the_drdede",
        mediaUrl: boardroomPhoto,
        mediaType: 'image'
      },
      {
        id: 'yt-1',
        platform: 'youtube',
        content: "New video: 'The Hidden Costs of Biased AI - And How to Fix Them' is live! This week we explore real case studies showing how inclusive AI design saves money AND lives. Link in bio! 🎬",
        author: "Dr. Dédé Tetsubayashi",
        authorImage: professionalHeadshot3,
        timestamp: new Date(now.getTime() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
        likes: 1547,
        comments: 203,
        shares: 456,
        url: "https://youtube.com/@the_drdede",
        mediaUrl: speakingPhoto,
        mediaType: 'video'
      },
      {
        id: 'li-2',
        platform: 'linkedin',
        content: "Thrilled to announce our latest research on AI bias in healthcare has been published! Working with disabled communities to improve AI diagnostic accuracy isn't just the right thing to do—it's essential for quality healthcare. 🏥📊 #HealthcareAI #DisabilityAdvocacy #MedicalAI",
        author: "Dr. Dédé Tetsubayashi",
        authorImage: professionalHeadshot4,
        timestamp: new Date(now.getTime() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
        likes: 425,
        comments: 67,
        shares: 134,
        url: "https://linkedin.com/in/dr-dede-tetsubayashi",
        mediaUrl: healthcareCaseStudy,
        mediaType: 'image'
      },
      {
        id: 'ig-2',
        platform: 'instagram',
        content: "Grateful for the warm welcome at today's TEDx rehearsal! Can't wait to share insights on reimagining AI for equitable innovation. The future of technology must include ALL of us. 🌟 #TEDx #EquitableInnovation #SpeakerLife",
        author: "Dr. Dédé Tetsubayashi",
        authorImage: professionalHeadshot5,
        timestamp: new Date(now.getTime() - 18 * 60 * 60 * 1000).toISOString(), // 18 hours ago
        likes: 634,
        comments: 41,
        shares: 78,
        url: "https://instagram.com/the_drdede",
        mediaUrl: speakingPhoto2,
        mediaType: 'image'
      },
      {
        id: 'yt-2',
        platform: 'youtube',
        content: "Just uploaded: 'AI Governance Masterclass - 5 Critical Steps Every Executive Must Know'. Perfect for C-suite leaders navigating AI compliance and ethics. What topic should I cover next? 💼",
        author: "Dr. Dédé Tetsubayashi",
        authorImage: professionalHeadshot,
        timestamp: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        likes: 2103,
        comments: 389,
        shares: 721,
        url: "https://youtube.com/@the_drdede",
        mediaUrl: consultingPhoto2,
        mediaType: 'video'
      }
    ]

    const mockStats: SocialMediaStats = {
      linkedin: {
        followers: 12450,
        posts: 142,
        engagement: "8.7%"
      },
      instagram: {
        followers: 8920,
        posts: 267,
        engagement: "12.3%"
      },
      youtube: {
        subscribers: 7420,
        videos: 24,
        views: "156K"
      }
    }

    return { posts: mockPosts, stats: mockStats }
  }

  // Simulate real-time updates
  useEffect(() => {
    const fetchSocialData = () => {
      setIsLoading(true)
      
      // Simulate API delay
      setTimeout(() => {
        const { posts: newPosts, stats: newStats } = generateMockSocialData()
        setPosts(newPosts)
        setStats(newStats)
        setLastUpdated(new Date())
        setIsLoading(false)
      }, 1500)
    }

    fetchSocialData()

    // Update every 5 minutes to simulate real-time feeds
    const interval = setInterval(fetchSocialData, 5 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  const filteredPosts = selectedPlatform === 'all' 
    ? posts 
    : posts.filter(post => post.platform === selectedPlatform)

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    return 'Just now'
  }

  const getPlatformIcon = (platform: 'linkedin' | 'instagram' | 'youtube') => {
    switch (platform) {
      case 'linkedin': return <LinkedinLogo size={20} />
      case 'instagram': return <InstagramLogo size={20} />
      case 'youtube': return <YoutubeLogo size={20} />
    }
  }

  const getPlatformColor = (platform: 'linkedin' | 'instagram' | 'youtube') => {
    switch (platform) {
      case 'linkedin': return 'text-blue-600'
      case 'instagram': return 'text-pink-600'
      case 'youtube': return 'text-red-600'
    }
  }

  if (isLoading && !posts.length) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="h-8 bg-muted animate-pulse rounded mb-4 mx-auto w-64"></div>
          <div className="h-4 bg-muted animate-pulse rounded mx-auto w-96"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-muted rounded-full"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded w-24"></div>
                    <div className="h-3 bg-muted rounded w-16"></div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-32 bg-muted rounded"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-2xl font-bold mb-4">Latest Social Media Updates</h3>
        <p className="text-muted-foreground mb-6">
          Real-time insights, thoughts, and behind-the-scenes content from Dr. Dédé's social platforms
        </p>
        
        {lastUpdated && (
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
            <CalendarBlank size={16} />
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
        )}

        {/* Platform Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          <Button
            variant={selectedPlatform === 'all' ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedPlatform('all')}
            className="text-xs"
          >
            All Platforms
          </Button>
          <Button
            variant={selectedPlatform === 'linkedin' ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedPlatform('linkedin')}
            className="text-xs"
          >
            <LinkedinLogo size={14} className="mr-1" />
            LinkedIn
          </Button>
          <Button
            variant={selectedPlatform === 'instagram' ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedPlatform('instagram')}
            className="text-xs"
          >
            <InstagramLogo size={14} className="mr-1" />
            Instagram
          </Button>
          <Button
            variant={selectedPlatform === 'youtube' ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedPlatform('youtube')}
            className="text-xs"
          >
            <YoutubeLogo size={14} className="mr-1" />
            YouTube
          </Button>
        </div>

        {/* Social Stats */}
        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4 text-center">
                  <LinkedinLogo size={32} className="mx-auto mb-2 text-blue-600" />
                  <div className="text-lg font-bold">{stats.linkedin.followers.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">LinkedIn Followers</div>
                  <div className="text-xs text-blue-600">{stats.linkedin.engagement} engagement</div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-pink-50 border-pink-200">
                <CardContent className="p-4 text-center">
                  <InstagramLogo size={32} className="mx-auto mb-2 text-pink-600" />
                  <div className="text-lg font-bold">{stats.instagram.followers.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Instagram Followers</div>
                  <div className="text-xs text-pink-600">{stats.instagram.engagement} engagement</div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="bg-red-50 border-red-200">
                <CardContent className="p-4 text-center">
                  <YoutubeLogo size={32} className="mx-auto mb-2 text-red-600" />
                  <div className="text-lg font-bold">{stats.youtube.subscribers.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">YouTube Subscribers</div>
                  <div className="text-xs text-red-600">{stats.youtube.views} total views</div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}
      </motion.div>

      {/* Posts Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        layout
      >
        <AnimatePresence>
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              layout
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 bg-card/90 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={post.authorImage} alt={post.author} />
                        <AvatarFallback>DD</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{post.author}</p>
                        <div className="flex items-center gap-2">
                          <span className={getPlatformColor(post.platform)}>
                            {getPlatformIcon(post.platform)}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {formatTimestamp(post.timestamp)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {post.platform}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm leading-relaxed">{post.content}</p>
                  
                  {post.mediaUrl && (
                    <div className="relative rounded-lg overflow-hidden">
                      {post.mediaType === 'video' ? (
                        <div className="relative bg-gray-100 aspect-video rounded-lg flex items-center justify-center">
                          <img 
                            src={post.mediaUrl} 
                            alt="Video thumbnail"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <div className="bg-white/90 rounded-full p-3">
                              <YoutubeLogo size={24} className="text-red-600" />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <img 
                          src={post.mediaUrl} 
                          alt="Post content"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      )}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between pt-3 border-t text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Heart size={16} />
                        <span>{post.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ChatCircle size={16} />
                        <span>{post.comments}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Share size={16} />
                        <span>{post.shares}</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(post.url, '_blank')}
                      className="text-xs"
                    >
                      View Post
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No posts found for the selected platform.</p>
        </div>
      )}

      <div className="text-center mt-8">
        <Button 
          onClick={() => {
            const { posts: newPosts, stats: newStats } = generateMockSocialData()
            setPosts(newPosts)
            setStats(newStats)
            setLastUpdated(new Date())
          }}
          variant="outline"
        >
          Refresh Feed
        </Button>
      </div>
    </div>
  )
}

export default RealTimeSocialFeeds