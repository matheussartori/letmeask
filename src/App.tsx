import { BrowserRouter, Route } from 'react-router-dom'

import { Home } from './pages/Home'
import { NewRoom } from './pages/Home/NewRoom'
import { Room } from './pages/Room'
import { AdminRoom } from './pages/Room/AdminRoom'

import { AppProvider } from './AppProvider'

function App () {
  return (
    <BrowserRouter>
      <AppProvider>
        <Route path="/" exact component={Home} />
        <Route path="/rooms/new" component={NewRoom} />
        <Route path="/rooms/:id" component={Room} />
        <Route path="/admin/rooms/:id" component={AdminRoom} />
      </AppProvider>
    </BrowserRouter>
  )
}

export default App
