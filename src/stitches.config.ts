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
      6: '2.5rem',
      7: '3rem',
      8: '5rem',
      9: '9rem',
      mx: '$2'
    },
    sizes: {
      lvh: 'var(--vh-total, 1vh)',
      dvh: 'var(--vh, 1vh)',
      '100lvh': 'calc($lvh * 100)',
      '100dvh': 'calc($dvh * 100)',
      menuH: '46px',
      menuW: '104px',
      button: '50px'
    },
    transitions: {
      smooth: 'cubic-bezier(.6,.03,.25,1)',
      fast: 'cubic-bezier(.25,.1,.25,.1)'
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
    fontFamily: 'system-ui,sans-serif',
    width: '100%'
  },
  button: { all: 'unset', boxSizing: 'border-box' },
  'a, button': { WebkitTapHighlightColor: 'transparent' },
  '*,*:after,*:before, button': { boxSizing: 'border-box' },
  img: { display: 'block' },
  h1: { fontSize: '3rem' },
  a: { color: 'inherit' },
  'a[href]': { textDecoration: 'none' }
})

export type Polymorphic = string | React.ComponentType<any>
