import { motion } from 'framer-motion'

export type Tint = 'default' | 'phone' | 'beach' | 'coffee'

// Soft color fields behind every screen. The tint shifts when a choice card is hovered.
const tints: Record<Tint, [string, string, string]> = {
  default: ['#f7c3d3', '#e9c6e6', '#ffd9d4'],
  phone: ['#f4a9c4', '#e3b5e2', '#ffd3dc'],
  beach: ['#ffc2b0', '#f7b6cf', '#ffe0c2'],
  coffee: ['#e9c2b8', '#dcb2cf', '#f6d8cc'],
}

export default function Background({ tint = 'default', night = false }: { tint?: Tint; night?: boolean }) {
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
      {/* Dark cinematic backdrop for the intro; fades out as the pink world takes over. */}
      <motion.div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 80% 55% at 85% 45%, #3a2a1c 0%, #1a1310 45%, #0d0a09 100%)' }}
        initial={false}
        animate={{ opacity: night ? 1 : 0 }}
        transition={{ duration: 0.9 }}
      />
    </div>
  )
}
