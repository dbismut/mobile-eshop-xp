import { motion } from 'framer-motion'
import { useState } from 'react'
import { RiHeart3Fill, RiHeart3Line } from 'react-icons/ri'
import { Link } from 'wouter'
import { Box, ButtonBox, thumbnailStyle } from '../components/Atoms'
import { Button, BuyButton } from '../components/BuyButton'
import { FixedMenuTitle } from '../components/MenuTitle'
import { NextProduct } from '../components/NextProduct'
import { ZoomableImage } from '../components/ZoomableImage'
import { BuyButtonContext, useProductFromSlug, useStore } from '../state'
import { motionSpring } from '../utils/math'

const Title = ({ text, hidden }: { text: string; hidden: boolean }) => (
  <FixedMenuTitle
    css={{
      opacity: hidden ? 0 : 1,
      transition: 'opacity 250ms $smooth'
    }}
  >
    <Link href="/">Dresses</Link>&nbsp;/&nbsp;{text}
  </FixedMenuTitle>
)

const Heart = ({ fav }: { fav: boolean }) => (
  <Box>
    <Box
      as={motion.div}
      initial={false}
      animate={fav ? { opacity: 1, scale: 1.2 } : { opacity: 0, scale: 0 }}
      transition={motionSpring}
    >
      <ButtonBox as="div" icon>
        <RiHeart3Fill />
      </ButtonBox>
    </Box>
    <Box
      as={motion.div}
      initial={false}
      animate={!fav ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
      transition={motionSpring}
      css={{ position: 'absolute', left: 0, top: 0 }}
    >
      <ButtonBox as="div" icon>
        <RiHeart3Line />
      </ButtonBox>
    </Box>
  </Box>
)

export const ProductPage = (props: any) => {
  const toggleProductFav = useStore((state) => state.toggleProductFav)
  const productObject = useProductFromSlug(props.params.slug)
  const buyButtonHidden = useState(false)

  if (!productObject) return <>Not Found</>

  const { id, name, model, product, nextSlug, price, fav } = productObject

  return (
    <BuyButtonContext.Provider value={buyButtonHidden}>
      <Box
        css={{
          top: 0,
          width: '100%',
          backgroundColor: '$white',
          '&.pp-enter': {
            position: 'fixed',
            zIndex: 10,
            transform: 'translateY(100vh)'
          },
          '&.pp-enter-active': {
            transform: 'translateY(0)',
            transition: 'transform 1s $smooth'
          },
          '&.pp-exit': {
            zIndex: 9,
            transform: 'translateY(0)'
          },
          '&.pp-exit-active': {
            transform: 'translateY(-100vh)',
            transition: 'transform 1s $smooth'
          },
          '&.hp-enter': { position: 'fixed', zIndex: 10, opacity: 0 },
          '&.hp-enter-active': {
            opacity: 1,
            transition: 'opacity 1s $smooth 1s'
          },
          '&.hp-exit': { opacity: 1, position: 'fixed', top: 0 },
          '&.hp-exit-active': { opacity: 0, transition: 'opacity 1s $smooth' }
        }}
      >
        <Title text={name} hidden={buyButtonHidden[0]} />
        <ZoomableImage
          alt={name}
          src={model}
          css={{
            height: 'calc($100dvh - 2 * $button - $space$2 * 3)',
            '.hp-enter &': { transform: 'translateY(100%)', opacity: 0 },
            '.hp-enter-active &': {
              transform: 'translateY(0)',
              opacity: 1,
              transition: 'all 1s $smooth 0.5s'
            }
          }}
        />
        <Button onClick={() => toggleProductFav(id)}>
          <Heart fav={fav} />
          {fav ? 'Remove from' : 'Add to'} favorites
          <Heart fav={fav} />
        </Button>
        <BuyButton>Buy — {price}</BuyButton>
        <Box css={{ aspectRatio: '5/8' }}>
          <img src={product} alt={name} className={thumbnailStyle()} />
        </Box>
        <NextProduct slug={nextSlug} />
      </Box>
    </BuyButtonContext.Provider>
  )
}
