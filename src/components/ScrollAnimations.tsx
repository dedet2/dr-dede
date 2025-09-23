import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface ParallaxProps {
  children: ReactNode
  offset?: number
  className?: string
}

export function ParallaxContainer({ children, offset = 50, className = "" }: ParallaxProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset])
  const smoothY = useSpring(y, { stiffness: 400, damping: 90 })

  return (
    <motion.div ref={ref} style={{ y: smoothY }} className={className}>
      {children}
    </motion.div>
  )
}

interface RevealProps {
  children: ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  duration?: number
  className?: string
}

export function ScrollReveal({ 
  children, 
  direction = 'up', 
  delay = 0, 
  duration = 0.8, 
  className = "" 
}: RevealProps) {
  const directionOffset = {
    up: { y: 50 },
    down: { y: -50 },
    left: { x: 50 },
    right: { x: -50 }
  }

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        ...directionOffset[direction] 
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0 
      }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ 
        duration, 
        delay,
        ease: [0.25, 0.25, 0.25, 0.75]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerContainer({ children, staggerDelay = 0.1 }: { children: ReactNode, staggerDelay?: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = "" }: { children: ReactNode, className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 0.6,
            ease: [0.25, 0.25, 0.25, 0.75]
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function FloatingElement({ children, intensity = 1 }: { children: ReactNode, intensity?: number }) {
  return (
    <motion.div
      animate={{
        y: [-5 * intensity, 5 * intensity, -5 * intensity],
        rotate: [-1 * intensity, 1 * intensity, -1 * intensity]
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  )
}

export function ScaleOnHover({ children, scale = 1.05 }: { children: ReactNode, scale?: number }) {
  return (
    <motion.div
      whileHover={{ 
        scale,
        transition: { duration: 0.3, ease: [0.25, 0.25, 0.25, 0.75] }
      }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.div>
  )
}

export function GlowOnHover({ children, className = "" }: { children: ReactNode, className?: string }) {
  return (
    <motion.div
      whileHover={{
        boxShadow: "0 0 25px rgba(139, 92, 246, 0.3), 0 0 50px rgba(139, 92, 246, 0.15)",
        transition: { duration: 0.3 }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}