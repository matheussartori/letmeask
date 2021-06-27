import { useState, useEffect, createContext, ReactNode } from 'react'
import { useToasts } from 'react-toast-notifications'
import { auth, firebase } from '../services/firebase'

type User = {
  id: string
  name: string
  avatar: string
}

export type AuthContextType = {
  user: User | undefined
  signInWithGoogle: () => Promise<void>
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider({
  children
}: AuthContextProviderProps): JSX.Element {
  const [user, setUser] = useState<User>()
  const { addToast } = useToasts()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid } = user

        if (!displayName || !photoURL) {
          addToast(
            'Existem informações faltando na sua conta Google. Por favor, defina um nome e uma foto e tente novamente.',
            {
              appearance: 'error',
              autoDismiss: true
            }
          )
          return
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider()

    const result = await auth.signInWithPopup(provider)

    if (result.user) {
      const { displayName, photoURL, uid } = result.user

      if (!displayName || !photoURL) {
        addToast(
          'Existem informações faltando na sua conta Google. Por favor, defina um nome e uma foto e tente novamente.',
          {
            appearance: 'error',
            autoDismiss: true
          }
        )
        return
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  }
  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  )
}
