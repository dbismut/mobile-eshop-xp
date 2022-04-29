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
  scroll: { visibleId?: string }
  toggleGridLayout(): void
  toggleFavLayout(): void
  toggleProductFav(id: string): void
  toggleInversedMenu(): void
}

export const useStore = create<State>((set, get) => ({
  products: data,
  scroll: { visibleId: undefined },
  gridLayout: 'model',
  favLayout: false,
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

const store = useStore

export const useProductFromSlug = (slug: string) => {
  const id = slug.split('--').shift()
  return useStore((state) => state.products.find((p) => p.id === id))
}

export const setVisibleId = (id?: string) => {
  useStore.getState().scroll.visibleId = id
}

export const BuyButtonContext = createContext([false, (_flag: boolean) => {}])
