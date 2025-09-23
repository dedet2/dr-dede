import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Play, Pause, X, SpeakerHigh, SpeakerX, Star, Quotes } from "@phosphor-icons/react"

interface TestimonialVideo {
  id: number
  title: string
  client: string
  company: string
  role: string
  industry: string
  videoUrl: string
  thumbnail: string
  duration: string
  quote: string
  rating: number
  tags: string[]
  transcript?: string
}

const InteractiveTestimonialGallery = () => {
  const [selectedVideo, setSelectedVideo] = useState<TestimonialVideo | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [filter, setFilter] = useState<string>('all')
  const videoRef = useRef<HTMLVideoElement>(null)

  const testimonialVideos: TestimonialVideo[] = [
    {
      id: 1,
      title: "AI Governance Transformation Success",
      client: "Sarah Chen",
      company: "TechForward Inc.",
      role: "Chief Technology Officer",
      industry: "Technology",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      thumbnail: "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=400&h=300&fit=crop&crop=faces",
      duration: "2:34",
      quote: "Dr. Tetsubayashi completely transformed our approach to AI ethics. The ROI was immediate and substantial.",
      rating: 5,
      tags: ["AI Ethics", "Technology", "Fortune 500"],
      transcript: "Working with Dr. Tetsubayashi was a game-changer for our organization. Their comprehensive approach to AI governance not only ensured compliance but actually accelerated our innovation timeline."
    },
    {
      id: 2,
      title: "Healthcare AI Bias Elimination",
      client: "Dr. Marcus Rodriguez",
      company: "Regional Medical Center",
      role: "Chief Medical Officer",
      industry: "Healthcare",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
      thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=faces",
      duration: "3:12",
      quote: "The accessibility improvements Dr. Tetsubayashi implemented saved us millions and countless lives.",
      rating: 5,
      tags: ["Healthcare", "Bias Mitigation", "Patient Care"],
      transcript: "Dr. Tetsubayashi's expertise in healthcare AI bias elimination was exactly what our system needed. Patient outcomes improved dramatically."
    },
    {
      id: 3,
      title: "Startup Ethics Framework Implementation",
      client: "Amelia Foster",
      company: "InnovateLabs",
      role: "CEO & Founder",
      industry: "EdTech Startup",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4",
      thumbnail: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=300&fit=crop&crop=faces",
      duration: "1:58",
      quote: "Dr. Tetsubayashi helped us secure $50M Series C by demonstrating our responsible AI practices.",
      rating: 5,
      tags: ["Startup", "EdTech", "Series C", "Ethics Framework"],
      transcript: "As a startup, we thought AI ethics would slow us down. Dr. Tetsubayashi showed us how it could be our competitive advantage."
    },
    {
      id: 4,
      title: "Financial Services Compliance Success",
      client: "James Park",
      company: "DataStream Corp",
      role: "VP Legal & Compliance",
      industry: "Financial Services",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=faces",
      duration: "4:21",
      quote: "Dr. Tetsubayashi saved us from a $500M regulatory penalty while improving our AI systems.",
      rating: 5,
      tags: ["Financial Services", "Regulatory", "Risk Management"],
      transcript: "The comprehensive risk assessment Dr. Tetsubayashi provided prevented what could have been a catastrophic regulatory failure."
    },
    {
      id: 5,
      title: "Global Manufacturing Transformation",
      client: "Dr. Lisa Kumar",
      company: "Global Manufacturing Solutions",
      role: "Chief Innovation Officer",
      industry: "Manufacturing",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
      thumbnail: "https://images.unsplash.com/photo-1494790108755-2616b612b632?w=400&h=300&fit=crop&crop=faces",
      duration: "3:45",
      quote: "The supply chain AI improvements delivered $75M in savings while advancing our ESG goals.",
      rating: 5,
      tags: ["Manufacturing", "Supply Chain", "ESG", "Global Operations"],
      transcript: "Dr. Tetsubayashi's approach to inclusive AI transformed not just our technology, but our entire business model."
    },
    {
      id: 6,
      title: "E-commerce Personalization Revolution",
      client: "Michael Zhang",
      company: "ShopSmart Global",
      role: "Head of Product",
      industry: "E-commerce",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4",
      thumbnail: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop&crop=faces",
      duration: "2:17",
      quote: "Inclusive AI personalization increased our revenue by $95M while improving customer satisfaction.",
      rating: 5,
      tags: ["E-commerce", "Personalization", "Customer Experience"],
      transcript: "The personalization improvements Dr. Tetsubayashi implemented didn't just increase revenue - they created a more equitable shopping experience."
    }
  ]

  const industries = ['all', ...Array.from(new Set(testimonialVideos.map(v => v.industry)))]
  const filteredVideos = filter === 'all' 
    ? testimonialVideos 
    : testimonialVideos.filter(v => v.industry === filter)

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
      setDuration(videoRef.current.duration)
    }
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current && duration) {
      const rect = e.currentTarget.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const newTime = (clickX / rect.width) * duration
      videoRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  useEffect(() => {
    if (selectedVideo && videoRef.current) {
      videoRef.current.addEventListener('timeupdate', handleTimeUpdate)
      videoRef.current.addEventListener('loadedmetadata', handleTimeUpdate)
      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener('timeupdate', handleTimeUpdate)
          videoRef.current.removeEventListener('loadedmetadata', handleTimeUpdate)
        }
      }
    }
  }, [selectedVideo])

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Client Video Testimonials</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Hear directly from executives who've transformed their organizations with Dr. Dédé's expertise
            </p>
            
            {/* Industry Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {industries.map((industry) => (
                <Button
                  key={industry}
                  variant={filter === industry ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(industry)}
                  className="text-xs"
                >
                  {industry === 'all' ? 'All Industries' : industry}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Video Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <AnimatePresence>
              {filteredVideos.map((video, index) => (
                <motion.div
                  key={video.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                >
                  <Card className="h-full cursor-pointer hover:shadow-xl transition-all duration-300 bg-card/90 backdrop-blur-sm overflow-hidden">
                    <div className="relative">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <Button
                          size="lg"
                          className="bg-white/90 text-black hover:bg-white"
                          onClick={() => setSelectedVideo(video)}
                        >
                          <Play size={24} className="mr-2" />
                          Watch Testimonial
                        </Button>
                      </div>
                      <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs">
                        {video.duration}
                      </div>
                      <div className="absolute bottom-3 left-3">
                        <div className="flex">
                          {[...Array(video.rating)].map((_, i) => (
                            <Star key={i} size={16} weight="fill" className="text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {video.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <h3 className="font-semibold mb-2 line-clamp-2">{video.title}</h3>
                      
                        <div className="flex items-start gap-2 mb-3">
                        <Quotes size={16} className="text-primary mt-1 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground line-clamp-3 italic">
                          "{video.quote}"
                        </p>
                      </div>
                      
                      <div className="border-t pt-3">
                        <p className="font-medium text-sm">{video.client}</p>
                        <p className="text-xs text-muted-foreground">{video.role}</p>
                        <p className="text-xs text-muted-foreground">{video.company}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Video Dialog */}
          <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  {selectedVideo?.title}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedVideo(null)}
                  >
                    <X size={16} />
                  </Button>
                </DialogTitle>
              </DialogHeader>
              
              {selectedVideo && (
                <div className="space-y-4">
                  <div className="relative bg-black rounded-lg overflow-hidden">
                    <video
                      ref={videoRef}
                      src={selectedVideo.videoUrl}
                      className="w-full aspect-video"
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      poster={selectedVideo.thumbnail}
                    />
                    
                    {/* Video Controls */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <div className="flex items-center gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handlePlayPause}
                          className="text-white hover:bg-white/20"
                        >
                          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleMuteToggle}
                          className="text-white hover:bg-white/20"
                        >
                          {isMuted ? <SpeakerX size={20} /> : <SpeakerHigh size={20} />}
                        </Button>
                        
                        <div className="flex-1">
                          <div 
                            className="h-1 bg-white/30 rounded-full cursor-pointer"
                            onClick={handleSeek}
                          >
                            <div 
                              className="h-full bg-white rounded-full transition-all duration-200"
                              style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                            />
                          </div>
                        </div>
                        
                        <span className="text-white text-sm font-mono">
                          {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Video Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Client Details</h4>
                      <div className="space-y-1 text-sm">
                        <p><strong>Name:</strong> {selectedVideo.client}</p>
                        <p><strong>Role:</strong> {selectedVideo.role}</p>
                        <p><strong>Company:</strong> {selectedVideo.company}</p>
                        <p><strong>Industry:</strong> {selectedVideo.industry}</p>
                      </div>
                      
                      <div className="flex gap-1 mt-3">
                        {[...Array(selectedVideo.rating)].map((_, i) => (
                          <Star key={i} size={16} weight="fill" className="text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Project Tags</h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {selectedVideo.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="p-3 bg-muted rounded-lg">
                        <Quotes size={16} className="text-primary mb-2" />
                        <p className="text-sm italic">"{selectedVideo.quote}"</p>
                      </div>
                    </div>
                  </div>
                  
                  {selectedVideo.transcript && (
                    <div>
                      <h4 className="font-semibold mb-2">Transcript</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed bg-muted p-4 rounded-lg">
                        {selectedVideo.transcript}
                      </p>
                    </div>
                  )}
                  
                  <div className="flex gap-4 pt-4 border-t">
                    <Button className="flex-1">
                      Contact Dr. Dédé for Similar Results
                    </Button>
                    <Button variant="outline" className="flex-1">
                      View All Case Studies
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  )
}

export default InteractiveTestimonialGallery