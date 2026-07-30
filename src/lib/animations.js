const standardEasing = [0.16, 1, 0.3, 1]

export const easings = {
  standard: standardEasing,
  spring: { type: "spring", stiffness: 300, damping: 25 },
  springSoft: { type: "spring", stiffness: 180, damping: 22 },
  springStiff: { type: "spring", stiffness: 350, damping: 30 },
}

const defaultViewport = { once: true }
const defaultTransition = { duration: 0.8, ease: standardEasing }

export const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: defaultViewport,
  transition: { ...defaultTransition, delay },
})

export const fadeUpSimple = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: defaultViewport,
  transition: { duration: 0.7, ease: standardEasing, delay },
})

export const fadeLeft = (delay = 0) => ({
  initial: { opacity: 0, x: 40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: defaultViewport,
  transition: { ...defaultTransition, delay },
})

export const fadeRight = (delay = 0) => ({
  initial: { opacity: 0, x: -40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: defaultViewport,
  transition: { ...defaultTransition, delay },
})

export const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.95 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: defaultViewport,
  transition: { ...defaultTransition, delay },
})

export const stagger = (index = 0, baseDelay = 0.1) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: defaultViewport,
  transition: { duration: 0.5, ease: standardEasing, delay: baseDelay + index * 0.1 },
})

export const hoverScale = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { type: "spring", stiffness: 300, damping: 20 },
}

export const floating = {
  animate: {
    y: [0, -6, 0],
  },
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  },
}

export const glow = {
  animate: {
    boxShadow: [
      "0 0 0px rgba(0,194,168,0)",
      "0 0 30px rgba(0,194,168,0.15)",
      "0 0 0px rgba(0,194,168,0)",
    ],
  },
  transition: {
    duration: 3,
    repeat: Infinity,
    repeatDelay: 2,
    ease: "easeInOut",
  },
}
