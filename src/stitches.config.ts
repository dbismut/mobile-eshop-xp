import { createStitches } from '@stitches/react'
import { gray } from '@radix-ui/colors'

export const { styled, css, globalCss, keyframes } = createStitches({
  theme: {
    colors: {
      white: '#fff',
      black: '#000',
      ...gray
    },
    space: {
      1: '0.35rem',
      2: '0.75rem',
      3: '1rem',
      4: '1.5rem',
      5: '2rem',
      mx: '$2'
    },
    transitions: {
      smooth: 'cubic-bezier(.6,.03,.25,1)'
    }
  },
  utils: {
    $invert: () => ({
      color: '$white',
      backgroundColor: '$black'
    })
  }
})

export const globalStyles = globalCss({
  'html, body': {
    fontSize: '13px',
    margin: 0,
    padding: 0
  },
  body: {
    fontWeight: 500,
    fontFamily: 'system-ui,sans-serif'
  },
  '*,*:after,*:before': { boxSizing: 'border-box' },
  img: { display: 'block' }
})

export type Polymorphic = string | React.ComponentType<any>
