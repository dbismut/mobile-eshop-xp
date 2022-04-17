import { motion } from 'framer-motion'
import { Box, Container } from '../components/Atoms'
import { useProductFromSlug } from '../state'
import { motionEase } from '../utils/math'

const variants = {
  initial: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 }
}

export const ProductPage = (props: any) => {
  const product = useProductFromSlug(props.params.slug)
  if (!product) return <>Not Found</>

  const { id, name, model, price } = product

  return (
    <>
      <Box
        as={motion.div}
        variants={variants}
        initial="initial"
        animate="enter"
        exit="exit"
        transition={motionEase}
        css={{
          aspectRatio: '5/8',
          width: '100%',
          '> img': {
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }
        }}
      >
        <img src={model} alt={name} />
      </Box>
    </>
  )
}
