import { Route, Switch, useLocation } from 'wouter'
import useVH from 'react-vh'
import { Menu } from './components/Menu'
import { Home } from './pages/Home'
import { ProductPage } from './pages/ProductPage'
import { globalStyles } from './stitches.config'
import { AnimatePresence } from 'framer-motion'

export function App() {
  const [location] = useLocation()
  console.log({ location })
  useVH()
  globalStyles()

  return (
    <>
      <Menu />
      <AnimatePresence initial={false} exitBeforeEnter>
        <Switch location={location} key={location}>
          <Route path="/" component={Home} />
          <Route path="/p/:slug" component={ProductPage} />
        </Switch>
      </AnimatePresence>
    </>
  )
}
