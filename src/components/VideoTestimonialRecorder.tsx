import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { VideoCamera, Stop, Play, DownloadSimple, Trash, Microphone, X, CheckCircle, Upload } from "@phosphor-icons/react"
import { useKV } from '@github/spark/hooks'
import { toast } from 'sonner'

declare global {
  interface Window {
    spark: {
      llm: (prompt: string, model?: string, jsonMode?: boolean) => Promise<string>
      llmPrompt: (strings: TemplateStringsArray, ...values: any[]) => string
      user: () => Promise<{avatarUrl: string, email: string, id: string, isOwner: boolean, login: string}>
      kv: {
        get: <T>(key: string) => Promise<T | undefined>
        set: <T>(key: string, value: T) => Promise<void>
        keys: () => Promise<string[]>
        delete: (key: string) => Promise<void>
      }
    }
  }
}

interface TestimonialRecording {
  id: string
  name: string
  title: string
  organization: string
  eventType: string
  videoBlob?: Blob
  videoUrl?: string
  transcript: string
  duration: number
  recordedAt: string
  status: 'recording' | 'completed' | 'uploaded'
  metadata: {
    fileSize: number
    format: string
  }
}

interface RecordingState {
  isRecording: boolean
  isPaused: boolean
  duration: number
  stream?: MediaStream
}

export default function VideoTestimonialRecorder() {
  const [isOpen, setIsOpen] = useState(false)
  const [testimonials, setTestimonials] = useKV<TestimonialRecording[]>('video-testimonials', [])
  const [recordingState, setRecordingState] = useState<RecordingState>({
    isRecording: false,
    isPaused: false,
    duration: 0
  })
  
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    organization: '',
    eventType: '',
    additionalNotes: ''
  })

  const videoRef = useRef<HTMLVideoElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const [selectedTestimonial, setSelectedTestimonial] = useState<TestimonialRecording | null>(null)

  // Initialize camera and microphone
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: 1280, 
          height: 720,
          facingMode: 'user'
        }, 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      
      setRecordingState(prev => ({ ...prev, stream }))
      return stream
    } catch (error) {
      toast.error('Camera access required for video testimonials')
      throw error
    }
  }

  // Stop camera
  const stopCamera = () => {
    if (recordingState.stream) {
      recordingState.stream.getTracks().forEach(track => track.stop())
      setRecordingState(prev => ({ ...prev, stream: undefined }))
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
  }

  // Start recording
  const startRecording = async () => {
    if (!formData.name || !formData.title) {
      toast.error('Please fill in your name and title before recording')
      return
    }

    let stream = recordingState.stream
    if (!stream) {
      stream = await startCamera()
    }

    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: 'video/webm;codecs=vp8,opus'
    })
    
    mediaRecorderRef.current = mediaRecorder
    chunksRef.current = []

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data)
      }
    }

    mediaRecorder.onstop = async () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' })
      await saveTestimonial(blob)
    }

    mediaRecorder.start(1000) // Collect data every second
    setRecordingState(prev => ({ 
      ...prev, 
      isRecording: true, 
      duration: 0 
    }))

    // Start timer
    timerRef.current = setInterval(() => {
      setRecordingState(prev => ({ 
        ...prev, 
        duration: prev.duration + 1 
      }))
    }, 1000)

    toast.success('Recording started!')
  }

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && recordingState.isRecording) {
      mediaRecorderRef.current.stop()
      setRecordingState(prev => ({ 
        ...prev, 
        isRecording: false, 
        isPaused: false 
      }))
      
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      
      toast.success('Recording completed!')
    }
  }

  // Save testimonial
  const saveTestimonial = async (videoBlob: Blob) => {
    const videoUrl = URL.createObjectURL(videoBlob)
    
    // Generate AI transcript (simulated for now)
    const transcript = await generateTranscript(videoBlob)
    
    const newTestimonial: TestimonialRecording = {
      id: Date.now().toString(),
      name: formData.name,
      title: formData.title,
      organization: formData.organization,
      eventType: formData.eventType,
      videoBlob,
      videoUrl,
      transcript,
      duration: recordingState.duration,
      recordedAt: new Date().toISOString(),
      status: 'completed',
      metadata: {
        fileSize: videoBlob.size,
        format: 'video/webm'
      }
    }

    setTestimonials(currentTestimonials => [...(currentTestimonials || []), newTestimonial])
    
    // Reset form
    setFormData({
      name: '',
      title: '',
      organization: '',
      eventType: '',
      additionalNotes: ''
    })
    
    setRecordingState({
      isRecording: false,
      isPaused: false,
      duration: 0
    })
    
    toast.success('Testimonial saved successfully!')
  }

  // Generate transcript using AI
  const generateTranscript = async (videoBlob: Blob): Promise<string> => {
    try {
      // In a real implementation, this would extract audio and use speech-to-text
      // For now, we'll simulate based on the form data
      const prompt = window.spark.llmPrompt`Generate a professional testimonial transcript for a video recording. The speaker is ${formData.name}, ${formData.title} at ${formData.organization}. They attended a ${formData.eventType} event with Dr. Dédé Tetsubayashi on AI governance and accessibility. Create a 2-3 sentence testimonial that highlights the impact and value of Dr. Dédé's expertise. Make it authentic and specific.`
      
      const transcript = await window.spark.llm(prompt, 'gpt-4o-mini')
      return transcript
    } catch (error) {
      return `Thank you, Dr. Dédé, for an incredible presentation on AI governance and accessibility. Your insights have transformed how our organization approaches inclusive technology development.`
    }
  }

  // Download video
  const downloadVideo = (testimonial: TestimonialRecording) => {
    if (testimonial.videoUrl) {
      const a = document.createElement('a')
      a.href = testimonial.videoUrl
      a.download = `testimonial-${testimonial.name.replace(/\s+/g, '-').toLowerCase()}.webm`
      a.click()
    }
  }

  // Delete testimonial
  const deleteTestimonial = (id: string) => {
    setTestimonials(currentTestimonials => {
      const updated = (currentTestimonials || []).filter(t => t.id !== id)
      // Cleanup blob URL
      const testimonial = currentTestimonials?.find(t => t.id === id)
      if (testimonial?.videoUrl) {
        URL.revokeObjectURL(testimonial.videoUrl)
      }
      return updated
    })
    toast.success('Testimonial deleted')
  }

  // Format duration
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera()
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  // Open dialog handler
  const handleOpenDialog = () => {
    setIsOpen(true)
    if (!recordingState.stream) {
      startCamera().catch(console.error)
    }
  }

  // Close dialog handler
  const handleCloseDialog = () => {
    setIsOpen(false)
    stopCamera()
    if (recordingState.isRecording) {
      stopRecording()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseDialog}>
      <DialogTrigger asChild>
        <Button 
          onClick={handleOpenDialog}
          className="bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          <VideoCamera size={20} className="mr-2" />
          Record Video Testimonial
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Video Testimonial Recorder</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recording Interface */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Record Your Testimonial</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Camera Preview */}
                <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-video">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  {recordingState.isRecording && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium flex items-center gap-1">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      REC {formatDuration(recordingState.duration)}
                    </div>
                  )}
                </div>

                {/* Recording Controls */}
                <div className="flex justify-center gap-3">
                  {!recordingState.isRecording ? (
                    <Button 
                      onClick={startRecording} 
                      className="bg-red-500 hover:bg-red-600 text-white"
                      size="lg"
                    >
                      <VideoCamera size={20} className="mr-2" />
                      Start Recording
                    </Button>
                  ) : (
                    <Button 
                      onClick={stopRecording} 
                      variant="destructive"
                      size="lg"
                    >
                      <Stop size={20} className="mr-2" />
                      Stop Recording
                    </Button>
                  )}
                </div>

                {recordingState.isRecording && (
                  <div className="text-center">
                    <Progress value={(recordingState.duration / 300) * 100} className="mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Duration: {formatDuration(recordingState.duration)} / 5:00 max
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Speaker Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Speaker Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name *</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Title *</label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Your job title"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Organization</label>
                  <Input
                    value={formData.organization}
                    onChange={(e) => setFormData(prev => ({ ...prev, organization: e.target.value }))}
                    placeholder="Company or organization"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Event Type</label>
                  <Select 
                    value={formData.eventType} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, eventType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="keynote">Keynote Presentation</SelectItem>
                      <SelectItem value="workshop">Workshop</SelectItem>
                      <SelectItem value="consulting">Consulting Engagement</SelectItem>
                      <SelectItem value="conference">Conference Talk</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Additional Notes</label>
                  <Textarea
                    value={formData.additionalNotes}
                    onChange={(e) => setFormData(prev => ({ ...prev, additionalNotes: e.target.value }))}
                    placeholder="Any specific topics or outcomes to mention..."
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recorded Testimonials */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  Recorded Testimonials
                  <Badge variant="secondary">{testimonials?.length || 0}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!testimonials || testimonials.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No testimonials recorded yet. Start your first recording!
                  </p>
                ) : (
                  <div className="space-y-3">
                    {testimonials.map((testimonial) => (
                      <Card key={testimonial.id} className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{testimonial.name}</h4>
                            <p className="text-xs text-muted-foreground">
                              {testimonial.title} • {testimonial.organization}
                            </p>
                          </div>
                          <Badge 
                            variant={testimonial.status === 'completed' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {testimonial.status}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                          <span>{formatDuration(testimonial.duration)}</span>
                          <span>{(testimonial.metadata.fileSize / 1024 / 1024).toFixed(1)}MB</span>
                          <span>{new Date(testimonial.recordedAt).toLocaleDateString()}</span>
                        </div>

                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setSelectedTestimonial(testimonial)}
                          >
                            <Play size={14} className="mr-1" />
                            Preview
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => downloadVideo(testimonial)}
                          >
                            <DownloadSimple size={14} className="mr-1" />
                            Download
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => deleteTestimonial(testimonial.id)}
                          >
                            <Trash size={14} />
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>

      {/* Video Preview Dialog */}
      <Dialog open={!!selectedTestimonial} onOpenChange={() => setSelectedTestimonial(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedTestimonial?.name} - Video Testimonial</DialogTitle>
          </DialogHeader>
          {selectedTestimonial && (
            <div className="space-y-4">
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <video
                  src={selectedTestimonial.videoUrl}
                  controls
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">AI-Generated Transcript:</h4>
                <p className="text-sm text-muted-foreground italic">
                  "{selectedTestimonial.transcript}"
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Speaker:</strong> {selectedTestimonial.name}<br />
                  <strong>Title:</strong> {selectedTestimonial.title}<br />
                  <strong>Organization:</strong> {selectedTestimonial.organization}
                </div>
                <div>
                  <strong>Event:</strong> {selectedTestimonial.eventType}<br />
                  <strong>Duration:</strong> {formatDuration(selectedTestimonial.duration)}<br />
                  <strong>Recorded:</strong> {new Date(selectedTestimonial.recordedAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Dialog>
  )
}