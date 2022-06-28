import { Switch, Route, Redirect } from 'react-router-dom'
import { initializeIcons } from '@fluentui/react/lib/Icons'

import Home from './pages/home'
import Preview from './pages/preview'

/* Theme variables */
import '../theme/variables.css'

initializeIcons()

const App = () => (
    <Switch>
        <Route exact path="/home">
            <Home />
        </Route>
        <Route exact path="/preview">
            <Preview />
        </Route>
        <Route exact path="/">
            <Redirect to="/home" />
        </Route>
    </Switch>
)

export default App
