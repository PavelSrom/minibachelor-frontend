import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { Backdrop, CircularProgress } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { useQueryClient } from 'react-query'
import { UserDTO } from '../types/api'
import { LoginPayload, RegisterPayload } from '../types/payloads'
import {
  refreshToken,
  registerUser,
  loginUser,
  deleteUser,
  getUserProfile,
} from '../api/auth'

type AuthStatus = 'pending' | 'settled'

type ContextProps = {
  isAuthenticated: boolean
  user: UserDTO | null
  getProfile: () => Promise<void>
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
  const [status, setStatus] = useState<AuthStatus>('pending')
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [user, setUser] = useState<UserDTO | null>(null)

  const getProfile = async (): Promise<void> => {
    try {
      const userData = await getUserProfile()
      setUser(userData)
    } catch (err) {
      enqueueSnackbar('Cannot fetch user data', { variant: 'error' })
    }
  }

  const register = async (formData: RegisterPayload): Promise<void> => {
    const { token } = await registerUser(formData)

    localStorage.setItem('x-auth-token', token)
    setIsAuthenticated(true)
    setStatus('settled')
  }

  const login = async (formData: LoginPayload): Promise<void> => {
    const { token } = await loginUser(formData)

    localStorage.setItem('x-auth-token', token)
    setIsAuthenticated(true)
    setStatus('settled')
  }

  const logout = (): void => {
    localStorage.removeItem('x-auth-token')
    queryClient.clear()
    setIsAuthenticated(false)
    setStatus('settled')
    setUser(null)
    history.push('/login')
  }

  const deleteAccount = async (): Promise<void> => {
    try {
      await deleteUser()
      logout()
    } catch (err) {
      enqueueSnackbar('Cannot delete user profile', { variant: 'error' })
    }
  }

  const loginFromToken = async (): Promise<void> => {
    try {
      const { token } = await refreshToken()

      localStorage.setItem('x-auth-token', token)
      setIsAuthenticated(true)
      setStatus('settled')
      enqueueSnackbar('Signed in', { variant: 'success' })
    } catch (err) {
      enqueueSnackbar('Session expired', { variant: 'warning' })
      logout()
    }
  }

  // automatically login from token on mount
  useEffect(() => {
    const token: string | null = localStorage.getItem('x-auth-token')

    if (token) {
      loginFromToken()
    } else {
      setIsAuthenticated(false)
      setStatus('settled')
    }

    // eslint-disable-next-line
  }, [])

  const value: ContextProps = useMemo(
    () => ({
      isAuthenticated,
      user,
      getProfile,
      register,
      login,
      logout,
      deleteAccount,
    }),
    // eslint-disable-next-line
    [isAuthenticated, user]
  )

  if (status === 'pending')
    return (
      <Backdrop open style={{ color: '#fff' }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = (): ContextProps => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')

  return context
}
