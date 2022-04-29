import { useEffect, useRef } from 'react'
import { useDrag } from '@use-gesture/react'
// @ts-ignore
import { useAnimini, spring } from '@animini/dom'
import { Box, Css, thumbnailStyle } from './Atoms'

type Props = {
  src: string
  alt?: string
  css?: Css
}

const INITIAL_SCALE = 0.4

export const ZoomableImage = ({ src, alt, css }: Props) => {
  const boxRef = useRef<HTMLDivElement>(null)
  const [ref, api] = useAnimini()

  useDrag(
    ({ active, first, last, offset: [ox, oy], memo, _bounds }) => {
      if (first) {
        boxRef.current!.style.overflow = 'scroll'
        memo = [
          (api.get()['x'] || 0) + _bounds[0][0],
          (api.get()['y'] || 0) + _bounds[1][0]
        ]
      } else if (last) {
        boxRef.current!.style.overflow = ''
      }

      const x = (memo[0] + ox) / INITIAL_SCALE
      const y = (memo[1] + oy) / INITIAL_SCALE

      api.start(
        {
          scale: active ? 1 : INITIAL_SCALE,
          x: active ? x : 0,
          y: active ? y : 0
        },
        { factor: 0.1 }
      )
      return memo
    },
    {
      target: boxRef,
      pointer: { touch: true },
      preventScroll: true,
      from: () => [api.get()['x'] || 0, api.get()['y'] || 0],
      bounds: (state) => {
        const [ix, iy] = state!.initial
        const { width, height, x, y } = boxRef.current!.getBoundingClientRect()
        const tx = ix - (x + width / 2)
        const ty = iy - (y + height / 2)
        return {
          left: -tx * INITIAL_SCALE,
          right: (width + tx) * INITIAL_SCALE,
          top: -ty * INITIAL_SCALE,
          bottom: (height + ty) * INITIAL_SCALE
        }
      },
      rubberband: true
    }
  )

  return (
    <Box
      ref={boxRef}
      // @ts-ignore
      css={{
        touchAction: 'pan-y',
        overflow: 'hidden',
        userSelect: 'none',
        WebkitUserDrag: 'none',
        WebkitTouchCallout: 'none',
        '&::-webkit-scrollbar': { display: 'none' },
        ...css
      }}
    >
      <Box
        as="img"
        css={{
          transform: `scale(${INITIAL_SCALE})`,
          height: `${100 / INITIAL_SCALE}%`,
          width: `${100 / INITIAL_SCALE}%`,
          left: `${(1 - 1 / INITIAL_SCALE) * 50}%`,
          top: `${(1 - 1 / INITIAL_SCALE) * 50}%`,
          pointerEvents: 'none'
        }}
        ref={ref}
        src={src}
        alt={alt}
        draggable={false}
        className={thumbnailStyle()}
      />
    </Box>
  )
}
