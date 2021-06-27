import { BrowserRouter, Route } from 'react-router-dom'

import { Home } from './pages/Home'
import { NewRoom } from './pages/Home/NewRoom'
import { Room } from './pages/Room'
import { AdminRoom } from './pages/Room/AdminRoom'

import { AuthContextProvider } from './contexts/AuthContext'
import { ModalContextProvider } from './contexts/ModalContext'

function App () {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <ModalContextProvider>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />
          <Route path="/admin/rooms/:id" component={AdminRoom} />
        </ModalContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  )
}

export default App
