import { motion } from 'framer-motion'
import { useDrag } from '@use-gesture/react'
//@ts-ignore
import { useAnimini, spring } from '@animini/dom'
import { RiHeart3Line, RiHeart3Fill } from 'react-icons/ri'
import { Product, useStore } from '../state'
import { Box, ButtonBox, Flex } from './Atoms'
import { clamp } from '../utils/math'
import interpolate from 'color-interpolate'

const variants = {
  shown: { opacity: 1 },
  hidden: { opacity: 0 }
}

const motionSpring = { type: 'spring', damping: 10, stiffness: 100 }

const colormap = interpolate(['white', 'black'])
const LIKE_ANCHOR = 30

const Img = ({
  shown,
  ...props
}: React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
> & { shown: boolean }) => (
  //@ts-ignore
  <motion.img
    draggable={false}
    variants={variants}
    animate={shown ? 'shown' : 'hidden'}
    initial={false}
    {...props}
  />
)

export const Card = ({ id, name, model, product, fav }: Product) => {
  const gridLayout = useStore((state) => state.gridLayout)
  const toggleProductFav = useStore((state) => state.toggleProductFav)
  const [dragRef, api] = useAnimini(spring)
  const [likeBoxRef, likeBoxColorApi] = useAnimini()
  const [likeIconRef, likeIconApi] = useAnimini()
  const [likeIconOpacityRef, likeIconOpacityApi] = useAnimini()

  const bind = useDrag(
    ({ active, last, movement: [x] }) => {
      if (x > 0) return
      const p = clamp(-x - LIKE_ANCHOR * 4, 0, LIKE_ANCHOR) / LIKE_ANCHOR
      api.start({ x: active ? x : 0 }, { immediate: active })
      likeIconApi.start(
        { x: active ? -Math.max(0, -x - LIKE_ANCHOR * 3) / 3 : 0 },
        { immediate: active }
      )
      likeIconOpacityApi.start(
        { opacity: active ? (fav ? 1 - p : p) : fav ? p : 1 - p },
        { immediate: active }
      )
      likeBoxColorApi.start(
        { backgroundColor: active ? colormap(p) : colormap(0) },
        { immediate: active }
      )
      if (last && p === 1) toggleProductFav(id)
    },
    {
      from: () => [0, 0],
      axis: 'x',
      bounds: { left: -150, right: 0 },
      rubberband: 0.8,
      filterTaps: true,
      enabled: gridLayout === 'model'
    }
  )

  return (
    <Box
      as={motion.div}
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      css={{ touchAction: 'pan-y', overflow: 'hidden' }}
    >
      <Box
        ref={dragRef}
        {...bind()}
        css={{
          aspectRatio: '5/8',
          touchAction: 'pan-y',
          '> img': {
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }
        }}
      >
        <Box
          as={motion.div}
          initial={false}
          animate={fav ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={motionSpring}
          css={{
            position: 'absolute',
            right: '$1',
            top: '$1',
            fontSize: '1.2rem',
            zIndex: 10
          }}
        >
          <ButtonBox icon onClick={() => toggleProductFav(id)}>
            <RiHeart3Fill />
          </ButtonBox>
        </Box>
        <Img src={model} alt={name} shown={gridLayout === 'model'} />
        <Img src={product} alt={name} shown={gridLayout === 'product'} />
      </Box>
      <Box
        ref={likeBoxRef}
        css={{
          position: 'absolute',
          pointerEvents: 'none',
          inset: 0,
          zIndex: -1,
          fontSize: '2.5rem',
          backgroundColor: '$white'
        }}
      >
        <Flex
          ref={likeIconRef}
          css={{
            position: 'absolute',
            top: 0,
            right: 30,
            bottom: 0,
            color: '$white',
            mixBlendMode: 'difference'
          }}
        >
          <Box>
            <RiHeart3Line />
            <Box
              ref={likeIconOpacityRef}
              css={{ position: 'absolute', inset: 0, opacity: fav ? 1 : 0 }}
            >
              <RiHeart3Fill />
            </Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}
