import { Route } from 'wouter'
import useVH from 'react-vh'
import { Menu } from './components/Menu'
import { Home } from './pages/Home'
import { ProductPage } from './pages/ProductPage'
import { globalStyles } from './stitches.config'
import { AnimatePresence } from 'framer-motion'

export function App() {
  useVH()
  globalStyles()

  return (
    <>
      <Menu />
      <AnimatePresence initial={false} exitBeforeEnter>
        <Route key="home" path="/" component={Home} />
        <Route key="product" path="/p/:slug" component={ProductPage} />
      </AnimatePresence>
    </>
  )
}
