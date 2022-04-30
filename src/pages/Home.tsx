import { Box, Container } from '../components/Atoms'
import { Filter } from '../components/Filter'
import { Card } from '../components/Card'
import { useStore } from '../state'
import { useEffect, useMemo, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'

export const Home = () => {
  const toggleGridLayout = useStore((state) => state.toggleGridLayout)
  const gridLayout = useStore((state) => state.gridLayout)
  const favLayout = useStore((state) => state.favLayout)
  const products = useStore((state) => state.products)
  const favProducts = useMemo(() => products.filter((p) => p.fav), [products])

  const boxRef = useRef<HTMLDivElement>(null)

  const _products = favLayout ? favProducts : products

  const toggleGridLayoutAndScroll = () => {
    if (!boxRef.current) return
    const y = window.scrollY
    const w = window.innerWidth
    const offsetTop = boxRef.current.offsetTop
    toggleGridLayout()

    const newY =
      gridLayout === 'model'
        ? offsetTop + (y - offsetTop) / 4 - (w * 4) / 5
        : offsetTop + (y - offsetTop + (w * 4) / 5) * 4

    if (y < offsetTop && newY < offsetTop) return
    setTimeout(() => window.scroll({ top: newY, behavior: 'smooth' }), 100)
  }

  return (
    <Box
      css={{
        background: '$white',
        '&.hp-enter': { opacity: 0 },
        '&.hp-enter-active': {
          opacity: 1,
          transition: 'opacity 1s $smooth 1s'
        },
        '&.hp-exit': { opacity: 1 },
        '&.hp-exit-active': { opacity: 0, transition: 'opacity 1s $smooth' }
      }}
    >
      <Container css={{ paddingTop: '$9' }}>
        <Box as="h1" css={{ marginBottom: 0 }}>
          Dresses
        </Box>
      </Container>
      <Filter toggleGridLayout={toggleGridLayoutAndScroll} />
      <Box
        ref={boxRef}
        css={{
          display: 'grid',
          minHeight: '100vh',
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
    </Box>
  )
}
