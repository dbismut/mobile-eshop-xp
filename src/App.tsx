import { Router, Link, Stack } from '@cher-ami/router'
import { createBrowserHistory } from 'history'
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
  globalStyles()

  return (
    <Router routes={routesList} history={history} base={'/'}>
      <nav>
        <Link to={'/'} />
        <Link to={'/foo'} />
      </nav>
      <Stack />
    </Router>
  )
}
