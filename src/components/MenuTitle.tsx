import { motion } from 'framer-motion'
import { useStore } from '../state'
import { Box, Css, Flex } from './Atoms'

const variants = {
  left: {
    transform: `rotate(-90deg) translateY(calc(-50vw + var(--sizes-menuH) / 2 - 1px))`
  },
  right: {
    transform: `rotate(-90deg) translateY(calc(50vw - var(--sizes-menuH) / 2 + 1px))`
  }
}

export const MenuTitle = ({ children }: { children: React.ReactNode }) => {
  const inversedMenu = useStore((state) => state.inversedMenu)
  return (
    <Box
      as={motion.div}
      variants={variants}
      initial={false}
      animate={inversedMenu ? 'right' : 'left'}
      css={{
        minWidth: '$100lvh',
        height: '$menuH',
        paddingLeft: 'calc($sizes$100lvh / 2 + $sizes$menuW / 2)',
        pointerEvents: 'none',
        zIndex: 10
      }}
    >
      <Flex css={{ height: '$menuH' }}>{children}</Flex>
    </Box>
  )
}

type Props = { children: React.ReactNode; css: Css }

export const FixedMenuTitle = ({ children, css }: Props) => {
  return (
    <Flex
      // @ts-ignore
      css={{
        position: 'fixed',
        justifyContent: 'center',
        pointerEvents: 'none',
        top: 0,
        left: 0,
        height: '$100lvh',
        width: '100vw',
        zIndex: 100,
        '> * > *': {
          pointerEvents: 'all'
        },
        ...css
      }}
    >
      <MenuTitle>
        <Box
          css={{
            width: 'calc(100% - $button)',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden'
          }}
        >
          {children}
        </Box>
      </MenuTitle>
    </Flex>
  )
}
