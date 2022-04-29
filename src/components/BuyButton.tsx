import { useContext } from 'react'
import { useInView } from 'react-intersection-observer'
import { BuyButtonContext } from '../state'
import { Flex, Box } from './Atoms'

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

export const Button = ({ children, ...props }: ButtonProps) => (
  // @ts-ignore
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
    {...props}
  >
    {children}
  </Flex>
)

export const BuyButton = ({ children }: ButtonProps) => {
  const [ref, hasScrolled] = useInView({ initialInView: false })
  const [hidden] = useContext(BuyButtonContext)

  return (
    <>
      <Flex css={{ width: '100%', justifyContent: 'center' }}>
        <Box
          css={{
            position: 'fixed',
            width: hasScrolled ? '100%' : 'calc(100% - $space$mx * 2)',
            height: hasScrolled ? 'calc($button + $space$4)' : '$button',
            transform: hasScrolled ? 'translateY($space$2)' : 'none',
            opacity: 1,
            bottom: '$2',
            zIndex: 90,
            overflow: 'hidden',
            transition: 'all 150ms $smooth, opacity 500ms $smooth',
            '.pp-enter &,.pp-exit &,.hp-enter &,.hp-exit &': { opacity: 0 },
            '.pp-enter &,.hp-enter &': { transitionDelay: '1000ms' }
          }}
        >
          <Box
            as="button"
            css={{
              $invert: '',
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
              transform: hidden
                ? 'translateY(calc($sizes$button * 4))'
                : 'none',
              transition: 'transform 500ms $smooth'
            }}
          >
            <Flex css={{ height: '$button' }}>{children}</Flex>
          </Box>
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
