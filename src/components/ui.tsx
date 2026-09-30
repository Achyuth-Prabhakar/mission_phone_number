import { motion, type Variants } from 'framer-motion'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

const ease = [0.22, 1, 0.36, 1] as const

const screenVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease, staggerChildren: 0.14, delayChildren: 0.1 } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.3, ease } },
}

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
}

/** Full-height, centered column that fades and slides in, staggering its <Item> children. */
export function Screen({ children, wide = false }: { children: ReactNode; wide?: boolean }) {
  return (
    <motion.section
      variants={screenVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      className={`mx-auto flex min-h-dvh w-full flex-col justify-center px-6 py-14 ${wide ? 'max-w-5xl' : 'max-w-md'}`}
    >
      {children}
    </motion.section>
  )
}

export function Item({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  )
}

export function Headline({ children }: { children: ReactNode }) {
  return (
    <h1 className="font-display text-[2.6rem] leading-[1.05] font-semibold tracking-tight text-plum sm:text-6xl">
      {children}
    </h1>
  )
}

export function Body({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`text-lg leading-relaxed text-plum-soft ${className}`}>{children}</p>
}

export function Small({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`text-sm text-plum-soft/80 ${className}`}>{children}</p>
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'ghost' }

export function Button({ variant = 'primary', className = '', children, ...rest }: ButtonProps) {
  const styles =
    variant === 'primary'
      ? 'bg-pink text-white shadow-[0_10px_30px_-10px_rgba(214,51,111,0.7)] hover:bg-pink-deep disabled:bg-rose disabled:text-plum-soft disabled:shadow-none'
      : 'border border-rose bg-cream/70 text-plum hover:border-pink hover:bg-cream'
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={`inline-flex min-h-14 w-full items-center justify-center rounded-full px-7 text-[17px] font-medium transition-colors duration-200 focus-visible:ring-4 focus-visible:ring-pink/30 focus-visible:outline-none disabled:cursor-not-allowed sm:w-auto ${styles} ${className}`}
      {...(rest as object)}
    >
      {children}
    </motion.button>
  )
}

/** Glassy card surface used for inputs and panels. */
export function Glass({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-3xl border border-white/80 bg-cream/65 shadow-[0_20px_60px_-30px_rgba(139,36,86,0.35)] backdrop-blur-xl ${className}`}
    >
      {children}
    </div>
  )
}
