import { useInView } from 'react-intersection-observer'
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
            bottom: '$2',
            zIndex: 10,
            display: 'flex',
            justifyContent: 'center',
            $invert: '',
            transition: 'all 150ms $smooth'
          }}
        >
          <Flex css={{ height: '$button' }}>{children}</Flex>
        </Box>
      </Flex>
      <Box
        css={{
          position: 'sticky',
          top: 0,
          height: hasScrolled ? 0 : 'calc($button + 2 * $space$2)',
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
