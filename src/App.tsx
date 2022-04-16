import { Router, Link, Stack } from '@cher-ami/router'
import { createBrowserHistory } from 'history'
import useVH from 'react-vh'
import { Menu } from './components/Menu'
import { Home } from './pages/Home'
import { globalStyles } from './stitches.config'

const routesList = [
  {
    path: '/',
    component: Home
  }
]

const history = createBrowserHistory()

export function App() {
  useVH()
  globalStyles()

  return (
    <Router routes={routesList} history={history} base={'/'}>
      <Menu />
      <nav>
        <Link to={'/'} />
        <Link to={'/foo'} />
      </nav>
      <Stack />
    </Router>
  )
}
