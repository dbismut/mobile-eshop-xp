import create from 'zustand'
import produce from 'immer'

import { data } from './data'

export type Product = {
  id: string
  name: string
  price: string
  model: string
  product: string
  fav: boolean
}

type State = {
  products: Product[]
  gridLayout: 'product' | 'model'
  favLayout: boolean
  toggleGridLayout(): void
  toggleFavLayout(): void
  toggleProductFav(id: string): void
}

export const useStore = create<State>((set) => ({
  products: data,
  gridLayout: 'model',
  favLayout: false,
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
  toggleFavLayout: () => set((state) => ({ favLayout: !state.favLayout }))
}))
