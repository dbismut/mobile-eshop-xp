import { motion } from 'framer-motion'
import { Link } from 'wouter'
//@ts-ignore
import { useAnimini } from '@animini/dom'
import { RiHeart3Line, RiHeart3Fill } from 'react-icons/ri'
import { Product, useStore } from '../state'
import { Box, ButtonBox, Flex, thumbnailStyle } from './Atoms'
import { clamp, motionEase } from '../utils/math'
import interpolate from 'color-interpolate'
import { rubberbandIfOutOfBounds } from '@use-gesture/react'

const variants = {
  shown: { opacity: 1 },
  hidden: { opacity: 0 }
}

const motionSpring = { type: 'spring', damping: 10, stiffness: 100 }

const colormap = interpolate(['white', 'black'])

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
    className={thumbnailStyle()}
    {...props}
  />
)

export const Card = ({ id, name, model, product, slug, fav }: Product) => {
  const gridLayout = useStore((state) => state.gridLayout)
  const toggleProductFav = useStore((state) => state.toggleProductFav)
  const [scrollBoxRef, scrollBoxApi] = useAnimini()
  const [likeIconRef, likeIconApi] = useAnimini()
  const [likeIconOpacityRef, likeIconOpacityApi] = useAnimini()

  const scrollLimit = gridLayout === 'model' ? 150 : 75

  const onScroll = () => {
    const s = scrollBoxRef.current.scrollLeft
    if (s < 0) return
    const x = rubberbandIfOutOfBounds(s, 0, scrollLimit)
    const p = clamp(x - scrollLimit / 4, 0, scrollLimit / 2) / (scrollLimit / 2)
    likeIconApi.start(
      { x: -Math.max(x - scrollLimit / 2, 0) / 5 },
      { immediate: true }
    )
    likeIconOpacityApi.start({ opacity: fav ? 1 - p : p }, { immediate: true })
    scrollBoxApi.start({ backgroundColor: colormap(p) }, { immediate: true })
  }

  const onTouchEnd = () => {
    if (scrollBoxRef.current.scrollLeft > scrollLimit) toggleProductFav(id)
  }

  return (
    <Box
      as={motion.div}
      ref={scrollBoxRef}
      onTouchEnd={onTouchEnd}
      onScroll={onScroll}
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      css={{
        aspectRatio: '5/8',
        backgroundColor: '$white',
        width: '100%',
        display: 'flex',
        overflow: 'scroll auto',
        scrollSnapType: 'x mandatory',
        '&::-webkit-scrollbar': {
          display: 'none'
        }
      }}
    >
      <Box
        css={{ aspectRatio: '5/8', height: '100%', scrollSnapAlign: 'start' }}
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
        <Link href={`/p/${slug}`}>
          <Img src={model} alt={name} shown={gridLayout === 'model'} />
          <Img src={product} alt={name} shown={gridLayout === 'product'} />
        </Link>
      </Box>
      <Flex
        css={{
          minWidth: '100%',
          justifyContent: 'flex-end',
          pointerEvents: 'none',
          fontSize: gridLayout === 'model' ? '2.5rem' : '1.5rem'
        }}
      >
        <Box
          ref={likeIconRef}
          css={{
            position: 'sticky',
            paddingLeft: '$4',
            right: '$4',
            color: '$white',
            mixBlendMode: 'difference'
          }}
        >
          <RiHeart3Line />
          <Box
            ref={likeIconOpacityRef}
            css={{
              position: 'absolute',
              inset: 0,
              paddingLeft: '$4',
              opacity: fav ? 1 : 0
            }}
          >
            <RiHeart3Fill />
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}
