import { motion } from 'framer-motion'

export type Tint = 'default' | 'phone' | 'beach' | 'coffee'

// Soft color fields behind every screen. The tint shifts when a choice card is hovered.
const tints: Record<Tint, [string, string, string]> = {
  default: ['#f8c8d8', '#f3d3e6', '#fde3ec'],
  phone: ['#f5b5cc', '#efc4de', '#fddce8'],
  beach: ['#f7bfd3', '#f1cbe0', '#fee6ee'],
  coffee: ['#f4c3d3', '#eccbe0', '#fde4ec'],
}

export default function Background({ tint = 'default' }: { tint?: Tint }) {
  const [a, b, c] = tints[tint]
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-blush">
      <motion.div
        className="absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full blur-3xl"
        animate={{ backgroundColor: a, x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ backgroundColor: { duration: 0.8 }, x: { duration: 18, repeat: Infinity, ease: 'easeInOut' }, y: { duration: 14, repeat: Infinity, ease: 'easeInOut' } }}
        style={{ opacity: 0.55 }}
      />
      <motion.div
        className="absolute top-1/3 -right-32 h-[26rem] w-[26rem] rounded-full blur-3xl"
        animate={{ backgroundColor: b, x: [0, -25, 0], y: [0, 30, 0] }}
        transition={{ backgroundColor: { duration: 0.8 }, x: { duration: 20, repeat: Infinity, ease: 'easeInOut' }, y: { duration: 16, repeat: Infinity, ease: 'easeInOut' } }}
        style={{ opacity: 0.45 }}
      />
      <motion.div
        className="absolute -bottom-40 left-1/4 h-[24rem] w-[24rem] rounded-full blur-3xl"
        animate={{ backgroundColor: c, x: [0, 20, 0] }}
        transition={{ backgroundColor: { duration: 0.8 }, x: { duration: 22, repeat: Infinity, ease: 'easeInOut' } }}
        style={{ opacity: 0.5 }}
      />
    </div>
  )
}
