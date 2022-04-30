import {
  RiArrowDownSLine,
  RiHeart3Fill,
  RiHeart3Line,
  RiLayoutGridLine,
  RiLayoutRowLine
} from 'react-icons/ri'
import { useInView } from 'react-intersection-observer'
import { useStore } from '../state'
import { Flex, Box, ButtonBox } from './Atoms'

type Props = {
  toggleGridLayout(): void
}

export const Filter = ({ toggleGridLayout }: Props) => {
  const gridLayout = useStore((state) => state.gridLayout)
  const favLayout = useStore((state) => state.favLayout)
  const toggleFavLayout = useStore((state) => state.toggleFavLayout)

  const [ref, isFull] = useInView({ initialInView: true })

  return (
    <Flex
      css={{
        position: 'sticky',
        top: -1,
        width: '100%',
        justifyContent: 'center',
        zIndex: 10
      }}
    >
      <Box
        // this box is to track visibility of the Filter
        ref={ref}
        css={{ position: 'absolute', top: -1, height: 0, visibility: 'hidden' }}
      />
      <Box
        css={{
          position: 'absolute',
          width: !isFull ? '100%' : 'calc(100% - $space$mx * 2)',
          height: '100%',
          backgroundColor: '$black',
          zIndex: -1,
          transition: 'width 150ms $smooth'
        }}
      />
      <Flex
        css={{
          color: '$white',
          width: '100%',
          padding: '$3 $5',
          justifyContent: 'space-between'
        }}
      >
        <Flex>
          <ButtonBox icon onClick={toggleFavLayout}>
            {favLayout ? <RiHeart3Fill /> : <RiHeart3Line />}
          </ButtonBox>
          <ButtonBox icon onClick={toggleGridLayout}>
            {gridLayout === 'product' ? (
              <RiLayoutGridLine />
            ) : (
              <RiLayoutRowLine />
            )}
          </ButtonBox>
        </Flex>
        <ButtonBox icon>
          <RiArrowDownSLine />
        </ButtonBox>
      </Flex>
    </Flex>
  )
}
