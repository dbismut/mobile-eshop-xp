export const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v))

export const motionEase = { ease: [0.25, 0.1, 0.25, 0.1], duration: 0.3 }
