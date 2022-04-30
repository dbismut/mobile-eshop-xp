import { cloneElement, useRef } from 'react'
import { Route, Switch } from 'wouter'
import { useVH } from './utils/react-vh'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { useLocation } from './utils/useLocation'
import { Menu } from './components/Menu'
import { Home } from './pages/Home'
import { ProductPage } from './pages/ProductPage'
import { globalStyles } from './stitches.config'

export function App() {
  const [{ location, prev, isPop }] = useLocation()
  const popRef = useRef(isPop)
  popRef.current = isPop

  useVH()
  globalStyles()

  const isProductTransition =
    location.indexOf('/p/') === 0 && prev.indexOf('/p/') === 0

  const classNames = isPop ? 'null' : isProductTransition ? 'pp' : 'hp'
  const timeout = isPop ? 0 : isProductTransition ? 1000 : 2000

  return (
    <>
      <Menu />
      <TransitionGroup
        component={null}
        childFactory={(child: any) =>
          cloneElement(child, { classNames, timeout })
        }
      >
        <CSSTransition
          key={location}
          timeout={timeout}
          onExiting={() =>
            setTimeout(() => !popRef.current && window.scrollTo(0, 0), 1000)
          }
        >
          <Switch location={location}>
            <Route path="/" component={Home} />
            <Route path="/p/:slug">
              {(params) => <ProductPage params={params} />}
            </Route>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </>
  )
}
