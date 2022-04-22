import { useDrag } from '@use-gesture/react'
import { useContext, useRef } from 'react'
import { RiHeart3Fill } from 'react-icons/ri'
import InView from 'react-intersection-observer'
import { Link, useLocation } from 'wouter'
import { BuyButtonContext } from '../state'
import { Flex, Box } from './Atoms'

type Props = { slug: string }

export const NextProduct = ({ slug }: Props) => {
  const [, toggleBuyButton] = useContext(BuyButtonContext)

  const clipRef = useRef<HTMLDivElement>(null)
  const [, setLocation] = useLocation()

  const leftToScroll = useRef(0)
  const elHeight = useRef(0)

  const bind = useDrag(
    ({ event, active, first, movement: [, y], cancel }) => {
      if (!clipRef.current) return
      if (first) {
        // @ts-ignore
        const { bottom, height } = event.currentTarget.getBoundingClientRect()
        elHeight.current = height
        leftToScroll.current = bottom - window.innerHeight
      }
      const overflowScroll = -(leftToScroll.current + y)
      if (!active) {
        clipRef.current.style.transition = ''
        clipRef.current.style.clipPath = 'inset(0% 0px 100% 0px)'
      } else if (overflowScroll >= 0) {
        clipRef.current.style.transition = 'none'
        clipRef.current.style.clipPath = `inset(0% 0px ${
          (1 - Math.min(1, overflowScroll / elHeight.current)) * 100
        }% 0px)`
        if (overflowScroll > 200) {
          setLocation(`/p/${slug}`)
          cancel()
        }
      }
    },
    { pointer: { touch: true } }
  )

  return (
    <Link href={`/p/${slug}`}>
      <Box {...bind()} css={{ zIndex: 10 }}>
        <Box
          css={{
            position: 'absolute',
            height: '100vh',
            zIndex: 100,
            bottom: 0,
            left: 0,
            right: 0
            // background: '#F0000088'
          }}
        />
        <Flex
          as={InView}
          threshold={0.5}
          // @ts-ignore
          onChange={(inView, entry) =>
            // @ts-ignore
            toggleBuyButton(inView && entry.intersectionRatio > 0)
          }
          css={{
            justifyContent: 'center',
            paddingTop: '$7',
            fontSize: '1.7rem',
            paddingBottom: 'calc($sizes$button + $space$2 * 3)',
            backgroundColor: '$white'
          }}
        >
          You'll love what's next&nbsp;
          <RiHeart3Fill />
        </Flex>
        <Flex
          ref={clipRef}
          css={{
            position: 'absolute',
            zIndex: 1,
            bottom: 0,
            left: 0,
            right: 0,
            clipPath: 'inset(0% 0px 0px 100%)',
            justifyContent: 'center',
            paddingTop: '$7',
            fontSize: '1.7rem',
            paddingBottom: 'calc($sizes$button + $space$2 * 3)',
            $invert: '',
            transition: 'clip-path 500ms $smooth'
          }}
        >
          You'll love what's next&nbsp;
          <RiHeart3Fill />
        </Flex>
      </Box>
    </Link>
  )
}
