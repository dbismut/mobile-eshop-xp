import { styled } from '../stitches.config'

export const Box = styled('div', { position: 'relative' })
export const Flex = styled(Box, {
  display: 'flex',
  alignItems: 'center'
})
export const Container = styled(Box, {
  padding: '$2 $mx'
})

type Css = React.ComponentProps<typeof Box>['css']

export const ButtonBox = ({
  icon,
  css,
  ...props
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & { icon?: boolean; css?: Css }) => (
  // @ts-ignore
  <Box
    as="button"
    // @ts-ignore
    css={{
      all: 'unset',
      cursor: 'pointer',
      fontSize: icon ? '1.4em' : '1em',
      padding: '$2',
      WebkitTapHighlightColor: 'transparent',
      '> svg': { display: 'block' },
      ...css
    }}
    {...props}
  />
)
