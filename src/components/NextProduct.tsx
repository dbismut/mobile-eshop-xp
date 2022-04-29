import { useDrag } from '@use-gesture/react'
import { useContext, useRef } from 'react'
import { RiHeart3Fill } from 'react-icons/ri'
import { InView } from 'react-intersection-observer'
import { Link, useLocation } from 'wouter'
import { BuyButtonContext } from '../state'
import { lerp } from '../utils/math'
import { Flex, Box } from './Atoms'

type Props = { slug: string }

export const NextProduct = ({ slug }: Props) => {
  const [, toggleBuyButton] = useContext(BuyButtonContext)
  const rafRef = useRef(0)

  const clipRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<HTMLDivElement>(null)
  const clipPathBottomRef = useRef(100)
  const [, setLocation] = useLocation()

  const leftToScroll = useRef(0)
  const elHeight = useRef(0)

  function animateClipPath(value: number) {
    function animate() {
      let v = clipPathBottomRef.current
      if (!clipRef.current || v === value) return
      v = lerp(v, value)
      if (Math.abs(v - value) < 1) v = value
      clipPathBottomRef.current = v
      clipRef.current.style.clipPath = `inset(0% 0px ${clipPathBottomRef.current}% 0px)`
      rafRef.current = requestAnimationFrame(animate)
    }
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(animate)
  }

  const bind = useDrag(
    ({ tap, active, first, movement: [, y], cancel }) => {
      if (tap || !clipRef.current || !dragRef.current) return
      if (first) {
        const { bottom, height } = dragRef.current.getBoundingClientRect()
        elHeight.current = height
        leftToScroll.current = bottom - window.innerHeight
      }
      const overflowScroll = -(leftToScroll.current + y)
      if (!active) animateClipPath(100)
      else if (overflowScroll >= 0) {
        animateClipPath(
          (1 - Math.min(1, overflowScroll / elHeight.current)) * 100
        )
        if (overflowScroll > 200) {
          setLocation(`/p/${slug}`)
          cancel()
        }
      }
    },
    { pointer: { touch: true }, filterTaps: true, triggerAllEvents: true }
  )

  return (
    <Box ref={dragRef} css={{ zIndex: 10 }}>
      <Flex
        as={InView}
        threshold={0.5}
        initialInView={false}
        {...bind()}
        // @ts-ignore
        onChange={(inView, entry) => {
          // @ts-ignore
          toggleBuyButton(inView && entry.intersectionRatio > 0)
        }}
        css={{
          justifyContent: 'center',
          paddingTop: '$7',
          fontSize: '1.7rem',
          paddingBottom: 'calc($sizes$button + $space$2 * 3)',
          backgroundColor: '$white'
        }}
      >
        <Box
          css={{
            position: 'absolute',
            height: '100vh',
            zIndex: 10,
            bottom: 0,
            left: 0,
            right: 0
            // background: '#F0000088'
          }}
        />
        <Box css={{ zIndex: 100 }}>
          <Link href={`/p/${slug}`}>
            You'll love what's next&nbsp;
            <RiHeart3Fill />
          </Link>
        </Box>
      </Flex>
      <Flex
        ref={clipRef}
        css={{
          position: 'absolute',
          zIndex: 101,
          bottom: 0,
          left: 0,
          right: 0,
          clipPath: 'inset(0px 0px 100% 0px)',
          justifyContent: 'center',
          paddingTop: '$7',
          fontSize: '1.7rem',
          paddingBottom: 'calc($sizes$button + $space$2 * 3)',
          $invert: ''
        }}
      >
        You'll love what's next&nbsp;
        <RiHeart3Fill />
      </Flex>
    </Box>
  )
}
