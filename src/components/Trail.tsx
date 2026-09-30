import { motion } from 'framer-motion'

const labels = ['Tinder', 'Instagram', 'Phone', 'Date']

/** Bottom progress line: Tinder → Instagram → Phone → Date. `reached` is how many are done. */
export default function Trail({ reached }: { reached: number }) {
  return (
    <div
      aria-label={`Progress: ${labels[Math.min(reached, 3)]}`}
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-6 pt-2"
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 12px)' }}
    >
      <div className="flex w-full max-w-md items-center">
        {labels.map((label, i) => {
          const done = i < reached
          const current = i === reached
          return (
            <div key={label} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center">
                <motion.span
                  animate={{ scale: current ? [1, 1.25, 1] : 1, backgroundColor: done ? '#d6336f' : current ? '#f5c6d3' : '#ffffff' }}
                  transition={current ? { scale: { duration: 1.8, repeat: Infinity } } : { duration: 0.5 }}
                  className="h-3 w-3 rounded-full border-2 border-pink/70"
                />
                <span className={`mt-1 text-[10px] font-semibold tracking-wide ${done || current ? 'text-berry' : 'text-plum-soft/50'}`}>{label}</span>
              </div>
              {i < labels.length - 1 && (
                <div className="relative mx-2 mb-4 h-0.5 flex-1 rounded-full bg-rose/70">
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full bg-pink"
                    initial={false}
                    animate={{ width: i < reached - 1 ? '100%' : i === reached - 1 ? '100%' : '0%' }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
