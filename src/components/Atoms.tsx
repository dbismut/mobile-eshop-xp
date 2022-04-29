import { css, styled } from '../stitches.config'

export const Box = styled('div', { position: 'relative' })
export const Flex = styled(Box, {
  display: 'flex',
  alignItems: 'center'
})
export const Container = styled(Box, {
  padding: '$2 $mx'
})

export type Css = React.ComponentProps<typeof Box>['css']

export const ButtonBox = ({
  icon,
  css,
  as,
  ...props
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & { as?: any; icon?: boolean; css?: Css }) => (
  // @ts-ignore
  <Box
    as={as || 'button'}
    // @ts-ignore
    css={{
      cursor: 'pointer',
      fontSize: icon ? '1.4em' : '1em',
      padding: '$2',
      '> svg': { display: 'block' },
      ...css
    }}
    {...props}
  />
)

export const thumbnailStyle = css({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover'
})
