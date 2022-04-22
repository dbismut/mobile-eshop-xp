import { useContext } from 'react'
import { useInView } from 'react-intersection-observer'
import { BuyButtonContext } from '../state'
import { Flex, Box } from './Atoms'

export const Button: React.FC = ({ children }) => (
  <Flex
    as="button"
    css={{
      height: '$button',
      margin: '$2',
      justifyContent: 'center',
      border: '3px solid $black',
      width: 'calc(100% - $space$mx * 2)',
      backgroundColor: '$white'
    }}
  >
    {children}
  </Flex>
)

export const BuyButton: React.FC = ({ children }) => {
  const [ref, hasScrolled] = useInView({ initialInView: false })
  const [hidden] = useContext(BuyButtonContext)

  return (
    <>
      <Flex css={{ width: '100%', justifyContent: 'center' }}>
        <Box
          as="button"
          css={{
            position: 'fixed',
            width: hasScrolled ? '100%' : 'calc(100% - $space$mx * 2)',
            height: hasScrolled ? 'calc($button + $space$4)' : '$button',
            transform: hasScrolled ? 'translateY($space$2)' : 'none',
            bottom: hidden ? 'calc(-$sizes$button * 4)' : '$2',
            zIndex: 90,
            display: 'flex',
            justifyContent: 'center',
            $invert: '',
            opacity: 1,
            transition:
              'all 150ms $smooth, opacity 500ms $smooth, bottom 500ms $smooth',
            '.pp-enter &,.pp-exit &': { opacity: 0, transitionDuration: '0s' }
          }}
        >
          <Flex css={{ height: '$button' }}>{children}</Flex>
        </Box>
      </Flex>
      <Box
        css={{
          position: 'sticky',
          top: 0,
          height: hasScrolled && !hidden ? 0 : 'calc($button + 2 * $space$2)',
          transition: 'height 350ms $smooth 350ms'
        }}
      >
        <Box
          // this box is to track visibility of the BuyButton
          ref={ref}
          css={{
            position: 'absolute',
            top: 'calc($sizes$button + $space$2 * 2 + 1px)',
            height: 0,
            visibility: 'hidden'
            // zIndex: 10,
            // height: 1,
            // width: '100%',
            // background: 'red'
          }}
        />
      </Box>
    </>
  )
}
