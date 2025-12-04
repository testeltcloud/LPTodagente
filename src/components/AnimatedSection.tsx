import { Box } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'

interface AnimatedSectionProps {
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  duration?: number
}

export default function AnimatedSection({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6
}: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  const getTransform = () => {
    if (isVisible) return 'translate(0, 0)'

    switch (direction) {
      case 'up':
        return 'translate(0, 50px)'
      case 'down':
        return 'translate(0, -50px)'
      case 'left':
        return 'translate(50px, 0)'
      case 'right':
        return 'translate(-50px, 0)'
      default:
        return 'translate(0, 50px)'
    }
  }

  return (
    <Box
      ref={ref}
      opacity={isVisible ? 1 : 0}
      transform={getTransform()}
      transition={`all ${duration}s ease-out ${delay}s`}
    >
      {children}
    </Box>
  )
}
