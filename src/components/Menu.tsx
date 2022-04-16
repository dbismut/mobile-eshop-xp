import { useDrag } from '@use-gesture/react'
import { motion, useAnimation } from 'framer-motion'
import { useEffect, useReducer, useState } from 'react'
import { RiCheckboxBlankCircleFill, RiMenuFill } from 'react-icons/ri'
import { Box, ButtonBox, Flex } from './Atoms'

const variants = {
  left: { y: 0 },
  right: { y: 'calc(100vw - 100%)' }
}

const MENU_HEIGHT = 46

const motionEase = { ease: [0.25, 0.1, 0.25, 0.1], duration: 0.3 }

export const Menu = () => {
  const [isInversed, setInversed] = useState(false)
  const [isOpen, toggleMenu] = useReducer((v) => !v, false)

  const bind: any = useDrag(
    ({ last, swipe: [sx] }) => {
      if (!last) return
      if (sx === 1 && !isInversed) setInversed(true)
      else if (sx === -1 && isInversed) setInversed(false)
    },
    { axis: 'x', filterTaps: true, enabled: !isOpen }
  )

  const controls = useAnimation()

  useEffect(() => {
    const openMenu = async () => {
      await controls.start({ height: 'var(--sizes-100lvh)' }, motionEase)
      controls.start({ width: '100vw' }, { ...motionEase, delay: 0.1 })
    }

    const closeMenu = async () => {
      await controls.start({ width: MENU_HEIGHT - 1.5 }, motionEase)
      await controls.start({ height: 0 }, { ...motionEase, delay: 0.1 })
    }

    if (isOpen) openMenu()
    else closeMenu()
  }, [isOpen])

  return (
    <Flex
      css={{
        justifyContent: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '$100lvh',
        pointerEvents: 'none',
        zIndex: 100,
        backgroundColor: isOpen ? 'rgba(0,0,0,.2)' : 'rgba(0,0,0,0)',
        transition: 'background-color 500ms $smooth'
      }}
    >
      <Flex
        css={{
          padding: '$3',
          position: 'absolute',
          left: 0,
          top: 0,
          right: 0,
          justifyContent: 'flex-end'
        }}
      >
        <ButtonBox css={{ pointerEvents: 'all' }}>
          <RiCheckboxBlankCircleFill />
        </ButtonBox>
      </Flex>
      <Flex
        as={motion.div}
        animate={controls}
        css={{
          position: 'absolute',
          pointerEvents: 'all',
          overflow: 'hidden',
          width: MENU_HEIGHT - 1.5,
          left: !isInversed ? 0 : 'auto',
          right: isInversed ? 0 : 'auto',
          $invert: '',
          height: 0
        }}
      >
        <Flex
          css={{
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '$3',
            height: '$100lvh',
            minWidth: '100vw',
            padding: MENU_HEIGHT * 2,
            fontSize: '2rem',
            '> span': { fontWeight: 200 }
          }}
        >
          <div>Ready to wear</div>
          <div>Shoes</div>
          <div>Bags</div>
          <div>Accessories</div>
          <div>Perfumes</div>
          <Box css={{ height: '$space$6' }} />
          <span>Arrivals</span>
          <span>Sales</span>
          <Box css={{ height: '$space$6' }} />
          <div>Men</div>
          <div>Children</div>
        </Flex>
      </Flex>
      <Box
        css={{
          minWidth: '$100lvh',
          height: MENU_HEIGHT,
          left: '-50%',
          transform: `rotate(-90deg) translateY(${
            MENU_HEIGHT / 2 + (isInversed ? 1 : -1)
          }px)`,
          pointerEvents: 'all',
          zIndex: 10
        }}
      >
        <Flex
          as={motion.div}
          variants={variants}
          initial={false}
          animate={isInversed ? 'right' : 'left'}
          css={{ height: MENU_HEIGHT, justifyContent: 'center' }}
        >
          <Flex
            {...bind()}
            onClick={toggleMenu}
            css={{
              paddingRight: '$3',
              gap: '$2',
              fontSize: '1.4rem',
              $invert: '',
              touchAction: 'none'
            }}
          >
            <ButtonBox icon css={{ transform: 'rotate(90deg)' }}>
              <RiMenuFill />
            </ButtonBox>
            Z&amp;V
          </Flex>
        </Flex>
      </Box>
    </Flex>
  )
}
