import { useRef } from 'react'
import { Route, Switch } from 'wouter'
import useVH from 'react-vh'
import { AnimatePresence } from 'framer-motion'
import { useLocation } from './utils/useLocation'
import { Menu } from './components/Menu'
import { Home } from './pages/Home'
import { ProductPage } from './pages/ProductPage'
import { globalStyles } from './stitches.config'

export function App() {
  const [{ location, prev, isPop }] = useLocation()
  const isProductTransition = useRef(false)

  useVH()
  globalStyles()

  isProductTransition.current =
    location.indexOf('/p/') === 0 && prev.indexOf('/p/') === 0

  console.log({ location, prev })

  return (
    <>
      <Menu />
      <AnimatePresence
        initial={false}
        exitBeforeEnter={!isPop && !isProductTransition.current}
        onExitComplete={() => {
          !isPop && window.scrollTo(0, 0)
        }}
      >
        <Switch location={location} key={location}>
          <Route path="/" component={Home} />
          <Route path="/p/:slug">
            {(params) => (
              <ProductPage
                params={params}
                isProductTransition={isProductTransition}
              />
            )}
          </Route>
        </Switch>
      </AnimatePresence>
    </>
  )
}
