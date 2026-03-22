'use client'

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import { 
  type User, 
  type AuthContextType, 
  type LoginCredentials, 
  type RegisterData,
  DEMO_USERS 
} from './types'

const AUTH_STORAGE_KEY = 'marte-auth-user'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setUser({
          ...parsed,
          createdAt: new Date(parsed.createdAt),
        })
      } catch {
        localStorage.removeItem(AUTH_STORAGE_KEY)
      }
    }
    setIsLoading(false)
  }, [])

  // Save user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY)
    }
  }, [user])

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const foundUser = DEMO_USERS.find(
      u => u.email === credentials.email && u.password === credentials.password
    )

    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      setIsLoading(false)
      return { success: true }
    }

    setIsLoading(false)
    return { success: false, error: 'არასწორი ელფოსტა ან პაროლი' }
  }, [])

  const register = useCallback(async (data: RegisterData) => {
    setIsLoading(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    // Check if email already exists
    const existingUser = DEMO_USERS.find(u => u.email === data.email)
    if (existingUser) {
      setIsLoading(false)
      return { success: false, error: 'ეს ელფოსტა უკვე რეგისტრირებულია' }
    }

    // Create new user (in demo mode, just set in state)
    const newUser: User = {
      id: `user-${Date.now()}`,
      email: data.email,
      name: data.name,
      role: data.role,
      clinicId: data.clinicId,
      createdAt: new Date(),
    }

    setUser(newUser)
    setIsLoading(false)
    return { success: true }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem(AUTH_STORAGE_KEY)
  }, [])

  const updateUser = useCallback((data: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...data } : null)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
