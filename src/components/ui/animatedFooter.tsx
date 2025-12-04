// import { motion, useInView } from 'framer-motion'
// import { useRef, ReactNode } from 'react'

// interface AnimatedSectionProps {
//   children: ReactNode
//   delay?: number
//   direction?: 'up' | 'down' | 'left' | 'right' | 'none'
//   duration?: number
// }

// export default function AnimatedSection({
//   children,
//   delay = 0,
//   direction = 'up',
//   duration = 0.6
// }: AnimatedSectionProps) {
//   const ref = useRef(null)
//   const isInView = useInView(ref, { once: false, margin: '-100px' })

//   const directions = {
//     up: { y: 60, x: 0 },
//     down: { y: -60, x: 0 },
//     left: { x: 60, y: 0 },
//     right: { x: -60, y: 0 },
//     none: { x: 0, y: 0 }
//   }

//   return (
//     <motion.div
//       ref={ref}
//       initial={{
//         opacity: 0,
//         ...directions[direction]
//       }}
//       animate={
//         isInView
//           ? {
//               opacity: 1,
//               x: 0,
//               y: 0
//             }
//           : {
//               opacity: 0,
//               ...directions[direction]
//             }
//       }
//       transition={{
//         duration,
//         delay,
//         ease: [0.25, 0.4, 0.25, 1]
//       }}
//     >
//       {children}
//     </motion.div>
//   )
// }
'use client'

import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Box } from '@chakra-ui/react'

interface AnimatedSectionProps {
  children: ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  duration?: number
}

export default function AnimatedSection({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
}: AnimatedSectionProps) {
  const variants: Record<string, any> = {
    up: { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 } },
    down: { initial: { opacity: 0, y: -40 }, animate: { opacity: 1, y: 0 } },
    left: { initial: { opacity: 0, x: -40 }, animate: { opacity: 1, x: 0 } },
    right: { initial: { opacity: 0, x: 40 }, animate: { opacity: 1, x: 0 } },
  }

  const { initial, animate } = variants[direction] || variants.up

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, delay, ease: 'easeOut' }}
      style={{ height: '100%' }}
    >
      <Box as="div" h="100%">{children}</Box>
    </motion.div>
  )
}
