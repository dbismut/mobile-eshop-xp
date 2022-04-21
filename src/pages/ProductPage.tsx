import { motion } from 'framer-motion'
import { Box, thumbnailStyle } from '../components/Atoms'
import { Button, BuyButton } from '../components/BuyButton'
import { NextProduct } from '../components/NextProduct'
import { useProductFromSlug } from '../state'
import { motionEase } from '../utils/math'

const pageVariants = {
  initial: { y: '100vh', position: 'fixed' },
  enter: {
    y: 0,
    position: 'fixed',
    transition: { duration: 1 },
    transitionEnd: { position: 'relative' }
  },
  exit: { y: '-100vh', transition: { duration: 1 } }
}

const thumbnailVariants = {
  initial: { opacity: 0, y: 100 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0 }
}

const empty = {}

export const ProductPage = (props: any) => {
  const productObject = useProductFromSlug(props.params.slug)
  if (!productObject) return <>Not Found</>

  const { id, name, model, product, nextSlug, price } = productObject

  return (
    <Box
      as={motion.div}
      variants={props.isProductTransition.current ? pageVariants : empty}
      initial="initial"
      animate="enter"
      exit="exit"
      css={{
        top: 0,
        width: '100%',
        backgroundColor: '$white',
        transform: 'translateY(0)'
      }}
    >
      <Box
        as={motion.div}
        variants={
          !props.isProductTransition.current ? thumbnailVariants : empty
        }
        initial="initial"
        animate="enter"
        exit="exit"
        transition={motionEase}
        css={{ height: 'calc($100dvh - 2 * $button - $space$2 * 3)' }}
      >
        <img src={model} alt={name} className={thumbnailStyle()} />
      </Box>
      <Button>Book in store</Button>
      <BuyButton>Buy — {price}</BuyButton>
      <Box css={{ aspectRatio: '5/8' }}>
        <img src={product} alt={name} className={thumbnailStyle()} />
      </Box>
      <NextProduct slug={nextSlug} />
    </Box>
  )
}
