import { useState } from 'react'
import { Box, thumbnailStyle } from '../components/Atoms'
import { Button, BuyButton } from '../components/BuyButton'
import { NextProduct } from '../components/NextProduct'
import { BuyButtonContext, useProductFromSlug } from '../state'

export const ProductPage = (props: any) => {
  const productObject = useProductFromSlug(props.params.slug)
  const buttonState = useState(false)

  if (!productObject) return <>Not Found</>

  const { id, name, model, product, nextSlug, price } = productObject

  return (
    <BuyButtonContext.Provider value={buttonState}>
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
          }
        }}
      >
        <Box
          css={{
            height: 'calc($100dvh - 2 * $button - $space$2 * 3)',
            '.hp-enter &': { transform: 'translateY(100%)', opacity: 0 },
            '.hp-enter-active &': {
              transform: 'translateY(0)',
              opacity: 1,
              transition: 'all 1s $smooth 0.5s'
            }
          }}
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
    </BuyButtonContext.Provider>
  )
}
