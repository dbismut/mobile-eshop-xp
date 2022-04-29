export const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v))

export const motionSpring = { type: 'spring', damping: 8, stiffness: 200 }

export function lerp(v0: number, v1: number, t = 0.1) {
  return v0 * (1 - t) + v1 * t
}
