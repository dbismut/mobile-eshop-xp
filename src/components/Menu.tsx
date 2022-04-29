import { useEffect, useReducer, useRef } from 'react'
import { motion } from 'framer-motion'
import { useDrag } from '@use-gesture/react'
import { RiCheckboxBlankCircleFill, RiMenuFill } from 'react-icons/ri'
import { lock, clearBodyLocks } from 'tua-body-scroll-lock'
import { useStore } from '../state'
import { Box, ButtonBox, Flex } from './Atoms'
import { MenuTitle } from './MenuTitle'

export const Menu = () => {
  const menuRef = useRef<HTMLDivElement>(null)
  const inversedMenu = useStore((state) => state.inversedMenu)
  const toggleInversedMenu = useStore((state) => state.toggleInversedMenu)
  const [isOpen, toggleMenu] = useReducer((v) => !v, false)

  const bind: any = useDrag(
    ({ last, swipe: [sx] }) => {
      if (!last) return
      if ((sx === 1 && !inversedMenu) || (sx === -1 && inversedMenu))
        toggleInversedMenu()
    },
    { axis: 'x', filterTaps: true, enabled: !isOpen }
  )

  useEffect(() => {
    if (menuRef.current && isOpen) lock(menuRef.current)
    return clearBodyLocks
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
          height: '$button',
          padding: '0 $2',
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
        ref={menuRef}
        as={motion.div}
        css={{
          position: 'absolute',
          pointerEvents: 'all',
          overflow: 'hidden',
          width: isOpen ? '100vw' : 'calc($menuH - 1.5px)',
          height: isOpen ? '$100lvh' : 0,
          left: !inversedMenu ? 0 : 'auto',
          right: inversedMenu ? 0 : 'auto',
          $invert: '',
          transition: isOpen
            ? 'height 300ms $fast, width 300ms $fast 400ms'
            : 'width 300ms $fast, height 300ms $fast 400ms'
        }}
      >
        <Flex
          css={{
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '$3',
            height: '$100lvh',
            minWidth: '100vw',
            padding: 'calc($sizes$menuH * 2)',
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
      <MenuTitle>
        <Flex
          {...bind()}
          onClick={toggleMenu}
          css={{
            width: '$menuW',
            left: 'calc(-$sizes$menuW - $2)',
            paddingRight: '$3',
            gap: '$2',
            fontSize: '1.4rem',
            $invert: '',
            touchAction: 'none',
            pointerEvents: 'all'
          }}
        >
          <ButtonBox icon css={{ transform: 'rotate(90deg)' }}>
            <RiMenuFill />
          </ButtonBox>
          Z&amp;V
        </Flex>
      </MenuTitle>
    </Flex>
  )
}
