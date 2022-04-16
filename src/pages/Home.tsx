import { Box, Container } from '../components/Atoms'
import { Filter } from '../components/Filter'
import { Card } from '../components/Card'
import { useStore } from '../state'
import { forwardRef, useMemo } from 'react'
import { AnimatePresence } from 'framer-motion'

export const Home = forwardRef<any, any>((props, handleRef) => {
  const gridLayout = useStore((state) => state.gridLayout)
  const favLayout = useStore((state) => state.favLayout)
  const products = useStore((state) => state.products)
  const favProducts = useMemo(() => products.filter((p) => p.fav), [products])

  const _products = favLayout ? favProducts : products

  return (
    <>
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
    </>
  )
})
