import create from 'zustand'
import produce from 'immer'

import { data } from './data'
import { createContext, ReactNode } from 'react'

export type Product = {
  id: string
  name: string
  price: string
  model: string
  product: string
  fav: boolean
  slug: string
  nextSlug: string
}

type State = {
  products: Product[]
  gridLayout: 'product' | 'model'
  inversedMenu: boolean
  favLayout: boolean
  toggleGridLayout(): void
  toggleFavLayout(): void
  toggleProductFav(id: string): void
  toggleInversedMenu(): void
}

export const useStore = create<State>((set, get) => ({
  products: data,
  gridLayout: 'model',
  favLayout: false,
  titleNode: null,
  inversedMenu: false,
  toggleProductFav: (id) =>
    set(
      produce((state) => {
        const p = state.products.find((p: Product) => p.id === id)
        if (p) p.fav = !p.fav
      })
    ),
  toggleGridLayout: () =>
    set((state) => ({
      gridLayout: state.gridLayout === 'model' ? 'product' : 'model'
    })),
  toggleFavLayout: () => set((state) => ({ favLayout: !state.favLayout })),
  toggleInversedMenu: () =>
    set((state) => ({ inversedMenu: !state.inversedMenu }))
}))

export const useProductFromSlug = (slug: string) => {
  const id = slug.split('--').shift()
  return useStore((state) => state.products.find((p) => p.id === id))
}

export const BuyButtonContext = createContext([false, (_flag: boolean) => {}])
