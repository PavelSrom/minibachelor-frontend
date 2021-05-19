import { createContext, useContext } from 'react'

type ContextProps = {}

const AuthContext = createContext<ContextProps>({} as ContextProps)

export const AuthProvider: React.FC = ({ children }) => {
  const value = {}

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = (): ContextProps => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')

  return context
}
