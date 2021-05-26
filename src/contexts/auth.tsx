import { createContext, useContext, useState, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { useQueryClient } from 'react-query'
import { UserDTO } from '../types/api'
import { LoginPayload, RegisterPayload } from '../types/payloads'
import {
  registerUser,
  loginUser,
  deleteUser,
  getUserProfile,
} from '../api/auth'

type ContextProps = {
  isAuthenticated: boolean
  user: UserDTO | null
  email: string
  getProfile: (email: string) => Promise<void>
  register: (formData: RegisterPayload) => Promise<void>
  login: (formData: LoginPayload) => Promise<void>
  logout: () => void
  deleteAccount: () => Promise<void>
}

const AuthContext = createContext<ContextProps>({} as ContextProps)

export const AuthProvider: React.FC = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient()
  const history = useHistory()

  // auth state
  const [email, setEmail] = useState<string>('')
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [user, setUser] = useState<UserDTO | null>(null)

  console.log(user)

  const getProfile = async (email: string): Promise<void> => {
    try {
      const userData = await getUserProfile(email)
      console.log('user data from request:')
      console.log(userData)
      if (!user) setUser(userData)
    } catch (err) {
      enqueueSnackbar('Cannot fetch user data', { variant: 'error' })
    }
  }

  const register = async (formData: RegisterPayload): Promise<void> => {
    await registerUser(formData)
    enqueueSnackbar('Successfully registered, please log in', {
      variant: 'success',
    })
    history.push('/login')
  }

  const login = async (formData: LoginPayload): Promise<void> => {
    const { access: accessToken } = await loginUser(formData)

    localStorage.setItem('x-auth-token', accessToken)
    setIsAuthenticated(true)
    setEmail(formData.email)
  }

  const logout = (): void => {
    localStorage.removeItem('x-auth-token')
    queryClient.clear()
    setIsAuthenticated(false)
    setUser(null)
    history.push('/login')
  }

  const deleteAccount = async (): Promise<void> => {
    try {
      await deleteUser(user!.id)
      enqueueSnackbar('Account deleted', { variant: 'success' })
      logout()
    } catch (err) {
      enqueueSnackbar('Cannot delete user profile', { variant: 'error' })
    }
  }

  const value: ContextProps = useMemo(
    () => ({
      isAuthenticated,
      user,
      email,
      getProfile,
      register,
      login,
      logout,
      deleteAccount,
    }),
    // eslint-disable-next-line
    [isAuthenticated, user, email]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = (): ContextProps => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')

  return context
}
