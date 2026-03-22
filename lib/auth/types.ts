export type UserRole = 'admin' | 'doctor' | 'assistant' | 'accountant'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  clinicId?: string
  avatar?: string
  createdAt: Date
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  name: string
  role: UserRole
  clinicId?: string
}

export interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  updateUser: (data: Partial<User>) => void
}

// Demo users for testing
export const DEMO_USERS: (User & { password: string })[] = [
  {
    id: '1',
    email: 'admin@marte.ge',
    password: 'admin123',
    name: 'ადმინისტრატორი',
    role: 'admin',
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    email: 'doctor@marte.ge',
    password: 'doctor123',
    name: 'დოქტორი ნინო',
    role: 'doctor',
    clinicId: 'clinic-1',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '3',
    email: 'assistant@marte.ge',
    password: 'assistant123',
    name: 'ასისტენტი მარიამი',
    role: 'assistant',
    clinicId: 'clinic-1',
    createdAt: new Date('2024-02-01'),
  },
  {
    id: '4',
    email: 'accountant@marte.ge',
    password: 'accountant123',
    name: 'ბუღალტერი გიორგი',
    role: 'accountant',
    clinicId: 'clinic-1',
    createdAt: new Date('2024-02-15'),
  },
]
