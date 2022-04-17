import { Box, Container } from '../components/Atoms'
import { motion } from 'framer-motion'
import { Filter } from '../components/Filter'
import { Card } from '../components/Card'
import { useStore } from '../state'
import { useMemo } from 'react'
import { AnimatePresence } from 'framer-motion'
import { motionEase } from '../utils/math'

const variants = {
  initial: { opacity: 0 },
  enter: { opacity: 1 },
  exit: { opacity: 0 }
}

export const Home = () => {
  const gridLayout = useStore((state) => state.gridLayout)
  const favLayout = useStore((state) => state.favLayout)
  const products = useStore((state) => state.products)
  const favProducts = useMemo(() => products.filter((p) => p.fav), [products])

  const _products = favLayout ? favProducts : products

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="enter"
      exit="exit"
      transition={motionEase}
    >
      <Container css={{ marginTop: '$9' }}>
        <Box as="h1" css={{ marginBottom: 0 }}>
          Dresses
        </Box>
      </Container>
      <Filter />
      <Box
        css={{
          display: 'grid',
          padding: gridLayout === 'product' ? '$2 $1' : '$2 0',
          gap: gridLayout === 'product' ? '$1' : '$2',
          gridTemplateColumns:
            gridLayout === 'product' ? 'repeat(2, 1fr)' : '1fr'
        }}
      >
        <AnimatePresence initial={false}>
          {_products.map((p) => (
            <Card key={p.id} {...p} />
          ))}
        </AnimatePresence>
      </Box>
    </motion.div>
  )
}
