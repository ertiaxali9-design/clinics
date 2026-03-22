// Mock Data for Marte Healthcare SaaS
// All data is hardcoded - no database connections

export interface Patient {
  id: string
  firstName: string
  lastName: string
  personalId: string
  phone: string
  email: string
  birthDate: string
  gender: 'male' | 'female'
  address: string
  status: 'active' | 'inactive'
  createdAt: string
  lastVisit: string | null
  totalVisits: number
  balance: number
  allergies: string[]
  medications: string[]
  notes: string
}

export interface Appointment {
  id: string
  patientId: string
  patientName: string
  doctorId: string
  doctorName: string
  serviceId: string
  serviceName: string
  date: string
  time: string
  duration: number // minutes
  status: 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled' | 'no-show'
  notes: string
  price: number
}

export interface Invoice {
  id: string
  number: string
  patientId: string
  patientName: string
  date: string
  dueDate: string
  status: 'paid' | 'unpaid' | 'partial' | 'overdue'
  items: {
    serviceId: string
    serviceName: string
    quantity: number
    price: number
  }[]
  subtotal: number
  discount: number
  tax: number
  total: number
  paidAmount: number
  paymentMethod: 'cash' | 'card' | 'transfer' | null
}

export interface Transaction {
  id: string
  type: 'income' | 'expense'
  category: string
  description: string
  amount: number
  date: string
  relatedId: string | null
}

export interface Doctor {
  id: string
  firstName: string
  lastName: string
  specialty: string
  phone: string
  email: string
  avatar: string | null
}

export interface Service {
  id: string
  name: string
  category: string
  price: number
  duration: number
  description: string
}

export interface Tenant {
  id: string
  name: string
  slug: string
  plan: 'starter' | 'professional' | 'enterprise'
  status: 'active' | 'suspended' | 'trial'
  usersCount: number
  patientsCount: number
  monthlyRevenue: number
  createdAt: string
  lastActive: string
}

// Dental Types
export type ToothCondition = 
  | 'healthy' 
  | 'cavity' 
  | 'filled' 
  | 'crown' 
  | 'missing' 
  | 'implant' 
  | 'root_canal' 
  | 'bridge'
  | 'veneer'

export type ToothSurface = 'mesial' | 'distal' | 'occlusal' | 'buccal' | 'lingual'

export interface ToothRecord {
  toothNumber: number
  condition: ToothCondition
  surfaces?: ToothSurface[]
  notes?: string
  lastTreatment?: string
}

export interface DentalChart {
  patientId: string
  teeth: ToothRecord[]
  lastUpdated: string
}

export interface DentalTreatment {
  id: string
  patientId: string
  toothNumber: number | null
  treatmentType: string
  description: string
  date: string
  doctorId: string
  doctorName: string
  price: number
  status: 'planned' | 'in-progress' | 'completed'
  notes?: string
}

export interface DentalService {
  id: string
  name: string
  category: 'preventive' | 'restorative' | 'cosmetic' | 'surgical' | 'orthodontic' | 'endodontic'
  price: number
  duration: number
  description: string
}

// Mock Patients
export const mockPatients: Patient[] = [
  {
    id: 'p1',
    firstName: 'გიორგი',
    lastName: 'მაისურაძე',
    personalId: '01024056789',
    phone: '+995 555 123 456',
    email: 'giorgi.maisuradze@gmail.com',
    birthDate: '1985-03-15',
    gender: 'male',
    address: 'თბილისი, ვაკე, ჭავჭავაძის 42',
    status: 'active',
    createdAt: '2024-01-15',
    lastVisit: '2025-03-20',
    totalVisits: 12,
    balance: 0,
    allergies: ['პენიცილინი'],
    medications: ['მეტფორმინი 500მგ'],
    notes: 'დიაბეტის მართვა, რეგულარული შემოწმება',
  },
  {
    id: 'p2',
    firstName: 'ნინო',
    lastName: 'ბერიძე',
    personalId: '01033098765',
    phone: '+995 577 234 567',
    email: 'nino.beridze@yahoo.com',
    birthDate: '1992-07-22',
    gender: 'female',
    address: 'თბილისი, საბურთალო, პეკინის 12',
    status: 'active',
    createdAt: '2024-02-20',
    lastVisit: '2025-03-18',
    totalVisits: 5,
    balance: 150,
    allergies: [],
    medications: [],
    notes: 'პროფილაქტიკური შემოწმება',
  },
  {
    id: 'p3',
    firstName: 'დავით',
    lastName: 'კვარაცხელია',
    personalId: '01045123456',
    phone: '+995 599 345 678',
    email: 'davit.kvarackhelia@gmail.com',
    birthDate: '1978-11-08',
    gender: 'male',
    address: 'ბათუმი, რუსთაველის 15',
    status: 'active',
    createdAt: '2023-11-10',
    lastVisit: '2025-03-15',
    totalVisits: 8,
    balance: -50,
    allergies: ['ასპირინი', 'იოდი'],
    medications: ['ლიზინოპრილი 10მგ', 'ატორვასტატინი 20მგ'],
    notes: 'ჰიპერტენზია, ქოლესტერინი',
  },
  {
    id: 'p4',
    firstName: 'მარიამ',
    lastName: 'გელაშვილი',
    personalId: '01056234567',
    phone: '+995 568 456 789',
    email: 'mariam.gelashvili@mail.ru',
    birthDate: '1988-05-30',
    gender: 'female',
    address: 'თბილისი, გლდანი, ხიზანიშვილის 8',
    status: 'active',
    createdAt: '2024-03-05',
    lastVisit: '2025-03-22',
    totalVisits: 3,
    balance: 0,
    allergies: [],
    medications: [],
    notes: '',
  },
  {
    id: 'p5',
    firstName: 'ლევან',
    lastName: 'ჯანელიძე',
    personalId: '01067345678',
    phone: '+995 591 567 890',
    email: 'levan.janelidze@gmail.com',
    birthDate: '1995-09-12',
    gender: 'male',
    address: 'ქუთაისი, ნიკეას 25',
    status: 'inactive',
    createdAt: '2023-08-20',
    lastVisit: '2024-12-10',
    totalVisits: 2,
    balance: 200,
    allergies: [],
    medications: [],
    notes: 'გადავიდა სხვა ქალაქში',
  },
  {
    id: 'p6',
    firstName: 'ანა',
    lastName: 'წერეთელი',
    personalId: '01078456789',
    phone: '+995 558 678 901',
    email: 'ana.tsereteli@gmail.com',
    birthDate: '2000-01-25',
    gender: 'female',
    address: 'თბილისი, ისანი, ნავთლუღის 3',
    status: 'active',
    createdAt: '2024-06-15',
    lastVisit: '2025-03-21',
    totalVisits: 4,
    balance: 0,
    allergies: ['ლატექსი'],
    medications: [],
    notes: 'დერმატოლოგიური პრობლემები',
  },
]

// Mock Doctors
export const mockDoctors: Doctor[] = [
  {
    id: 'd1',
    firstName: 'თამარ',
    lastName: 'ნიკოლაძე',
    specialty: 'თერაპევტი',
    phone: '+995 599 111 222',
    email: 'tamar.nikoladze@marte.ge',
    avatar: null,
  },
  {
    id: 'd2',
    firstName: 'ზურაბ',
    lastName: 'გოგიჩაშვილი',
    specialty: 'კარდიოლოგი',
    phone: '+995 599 222 333',
    email: 'zurab.gogichashvili@marte.ge',
    avatar: null,
  },
  {
    id: 'd3',
    firstName: 'ნათია',
    lastName: 'მჭედლიშვილი',
    specialty: 'დერმატოლოგი',
    phone: '+995 599 333 444',
    email: 'natia.mchedlishvili@marte.ge',
    avatar: null,
  },
  {
    id: 'd4',
    firstName: 'გიორგი',
    lastName: 'ხუციშვილი',
    specialty: 'ენდოკრინოლოგი',
    phone: '+995 599 444 555',
    email: 'giorgi.khutsishvili@marte.ge',
    avatar: null,
  },
]

// Mock Services
export const mockServices: Service[] = [
  {
    id: 's1',
    name: 'პირველადი კონსულტაცია',
    category: 'კონსულტაცია',
    price: 50,
    duration: 30,
    description: 'პირველადი გასინჯვა და კონსულტაცია',
  },
  {
    id: 's2',
    name: 'განმეორებითი კონსულტაცია',
    category: 'კონსულტაცია',
    price: 30,
    duration: 20,
    description: 'განმეორებითი ვიზიტი და შედეგების განხილვა',
  },
  {
    id: 's3',
    name: 'ეკგ',
    category: 'დიაგნოსტიკა',
    price: 40,
    duration: 15,
    description: 'ელექტროკარდიოგრამა',
  },
  {
    id: 's4',
    name: 'სისხლის ზოგადი ანალიზი',
    category: 'ლაბორატორია',
    price: 25,
    duration: 10,
    description: 'სისხლის ზოგადი კვლევა',
  },
  {
    id: 's5',
    name: 'ექოსკოპია',
    category: 'დიაგნოსტიკა',
    price: 80,
    duration: 30,
    description: 'ულტრაბგერითი კვლევა',
  },
  {
    id: 's6',
    name: 'დერმატოსკოპია',
    category: 'დერმატოლოგია',
    price: 60,
    duration: 20,
    description: 'კანის დერმატოსკოპიული კვლევა',
  },
]

// Mock Appointments - Today and upcoming
const today = new Date()
const formatDate = (d: Date) => d.toISOString().split('T')[0]

export const mockAppointments: Appointment[] = [
  {
    id: 'a1',
    patientId: 'p1',
    patientName: 'გიორგი მაისურაძე',
    doctorId: 'd4',
    doctorName: 'გიორგი ხუციშვილი',
    serviceId: 's2',
    serviceName: 'განმეორებითი კონსულტაცია',
    date: formatDate(today),
    time: '09:00',
    duration: 20,
    status: 'completed',
    notes: 'შაქრის კონტროლი',
    price: 30,
  },
  {
    id: 'a2',
    patientId: 'p2',
    patientName: 'ნინო ბერიძე',
    doctorId: 'd1',
    doctorName: 'თამარ ნიკოლაძე',
    serviceId: 's1',
    serviceName: 'პირველადი კონსულტაცია',
    date: formatDate(today),
    time: '10:30',
    duration: 30,
    status: 'in-progress',
    notes: '',
    price: 50,
  },
  {
    id: 'a3',
    patientId: 'p4',
    patientName: 'მარიამ გელაშვილი',
    doctorId: 'd2',
    doctorName: 'ზურაბ გოგიჩაშვილი',
    serviceId: 's3',
    serviceName: 'ეკგ',
    date: formatDate(today),
    time: '11:00',
    duration: 15,
    status: 'confirmed',
    notes: 'გულის შემოწმება',
    price: 40,
  },
  {
    id: 'a4',
    patientId: 'p6',
    patientName: 'ანა წერეთელი',
    doctorId: 'd3',
    doctorName: 'ნათია მჭედლიშვილი',
    serviceId: 's6',
    serviceName: 'დერმატოსკოპია',
    date: formatDate(today),
    time: '14:00',
    duration: 20,
    status: 'scheduled',
    notes: '',
    price: 60,
  },
  {
    id: 'a5',
    patientId: 'p3',
    patientName: 'დავით კვარაცხელია',
    doctorId: 'd2',
    doctorName: 'ზურაბ გოგიჩაშვილი',
    serviceId: 's5',
    serviceName: 'ექოსკოპია',
    date: formatDate(new Date(today.getTime() + 86400000)),
    time: '09:30',
    duration: 30,
    status: 'scheduled',
    notes: 'გულის ექო',
    price: 80,
  },
  {
    id: 'a6',
    patientId: 'p1',
    patientName: 'გიორგი მაისურაძე',
    doctorId: 'd4',
    doctorName: 'გიორგი ხუციშვილი',
    serviceId: 's4',
    serviceName: 'სისხლის ზოგადი ანალიზი',
    date: formatDate(new Date(today.getTime() + 86400000 * 2)),
    time: '10:00',
    duration: 10,
    status: 'scheduled',
    notes: '',
    price: 25,
  },
]

// Mock Invoices
export const mockInvoices: Invoice[] = [
  {
    id: 'inv1',
    number: 'INV-2025-001',
    patientId: 'p1',
    patientName: 'გიორგი მაისურაძე',
    date: '2025-03-20',
    dueDate: '2025-04-20',
    status: 'paid',
    items: [
      { serviceId: 's2', serviceName: 'განმეორებითი კონსულტაცია', quantity: 1, price: 30 },
      { serviceId: 's4', serviceName: 'სისხლის ზოგადი ანალიზი', quantity: 1, price: 25 },
    ],
    subtotal: 55,
    discount: 0,
    tax: 9.9,
    total: 64.9,
    paidAmount: 64.9,
    paymentMethod: 'card',
  },
  {
    id: 'inv2',
    number: 'INV-2025-002',
    patientId: 'p2',
    patientName: 'ნინო ბერიძე',
    date: '2025-03-18',
    dueDate: '2025-04-18',
    status: 'unpaid',
    items: [
      { serviceId: 's1', serviceName: 'პირველადი კონსულტაცია', quantity: 1, price: 50 },
      { serviceId: 's3', serviceName: 'ეკგ', quantity: 1, price: 40 },
      { serviceId: 's4', serviceName: 'სისხლის ზოგადი ანალიზი', quantity: 1, price: 25 },
    ],
    subtotal: 115,
    discount: 10,
    tax: 18.9,
    total: 123.9,
    paidAmount: 0,
    paymentMethod: null,
  },
  {
    id: 'inv3',
    number: 'INV-2025-003',
    patientId: 'p3',
    patientName: 'დავით კვარაცხელია',
    date: '2025-03-15',
    dueDate: '2025-03-25',
    status: 'overdue',
    items: [
      { serviceId: 's2', serviceName: 'განმეორებითი კონსულტაცია', quantity: 1, price: 30 },
      { serviceId: 's5', serviceName: 'ექოსკოპია', quantity: 1, price: 80 },
    ],
    subtotal: 110,
    discount: 0,
    tax: 19.8,
    total: 129.8,
    paidAmount: 0,
    paymentMethod: null,
  },
  {
    id: 'inv4',
    number: 'INV-2025-004',
    patientId: 'p6',
    patientName: 'ანა წერეთელი',
    date: '2025-03-21',
    dueDate: '2025-04-21',
    status: 'partial',
    items: [
      { serviceId: 's6', serviceName: 'დერმატოსკოპია', quantity: 1, price: 60 },
      { serviceId: 's1', serviceName: 'პირველადი კონსულტაცია', quantity: 1, price: 50 },
    ],
    subtotal: 110,
    discount: 5,
    tax: 18.9,
    total: 123.9,
    paidAmount: 60,
    paymentMethod: 'cash',
  },
]

// Mock Transactions
export const mockTransactions: Transaction[] = [
  { id: 't1', type: 'income', category: 'სერვისები', description: 'INV-2025-001 - გიორგი მაისურაძე', amount: 64.9, date: '2025-03-20', relatedId: 'inv1' },
  { id: 't2', type: 'income', category: 'სერვისები', description: 'INV-2025-004 - ნაწილობრივი - ანა წერეთელი', amount: 60, date: '2025-03-21', relatedId: 'inv4' },
  { id: 't3', type: 'expense', category: 'მედიკამენტები', description: 'სამედიცინო მასალები', amount: 450, date: '2025-03-19', relatedId: null },
  { id: 't4', type: 'expense', category: 'კომუნალური', description: 'ელექტროენერგია - მარტი', amount: 180, date: '2025-03-15', relatedId: null },
  { id: 't5', type: 'expense', category: 'ხელფასი', description: 'თანამშრომლების ხელფასი - თებერვალი', amount: 8500, date: '2025-03-05', relatedId: null },
  { id: 't6', type: 'income', category: 'სერვისები', description: 'სხვა შემოსავლები', amount: 320, date: '2025-03-10', relatedId: null },
  { id: 't7', type: 'expense', category: 'იჯარა', description: 'ოფისის იჯარა - მარტი', amount: 2500, date: '2025-03-01', relatedId: null },
  { id: 't8', type: 'expense', category: 'მარკეტინგი', description: 'Facebook რეკლამა', amount: 200, date: '2025-03-12', relatedId: null },
]

// Mock Tenants for GOD MODE
export const mockTenants: Tenant[] = [
  {
    id: 'tenant1',
    name: 'მედი კლინიკა',
    slug: 'medi-clinic',
    plan: 'professional',
    status: 'active',
    usersCount: 8,
    patientsCount: 1250,
    monthlyRevenue: 15600,
    createdAt: '2024-01-10',
    lastActive: '2025-03-22',
  },
  {
    id: 'tenant2',
    name: 'ჯანმრთელობის ცენტრი',
    slug: 'health-center',
    plan: 'enterprise',
    status: 'active',
    usersCount: 25,
    patientsCount: 4500,
    monthlyRevenue: 45200,
    createdAt: '2023-06-15',
    lastActive: '2025-03-22',
  },
  {
    id: 'tenant3',
    name: 'დენტალ პლუსი',
    slug: 'dental-plus',
    plan: 'starter',
    status: 'trial',
    usersCount: 3,
    patientsCount: 120,
    monthlyRevenue: 0,
    createdAt: '2025-03-01',
    lastActive: '2025-03-21',
  },
  {
    id: 'tenant4',
    name: 'ოპტიკა ვიზიონი',
    slug: 'optika-vision',
    plan: 'professional',
    status: 'active',
    usersCount: 5,
    patientsCount: 890,
    monthlyRevenue: 8900,
    createdAt: '2024-05-20',
    lastActive: '2025-03-22',
  },
  {
    id: 'tenant5',
    name: 'ფიზიოთერაპია +',
    slug: 'physio-plus',
    plan: 'starter',
    status: 'suspended',
    usersCount: 2,
    patientsCount: 340,
    monthlyRevenue: 0,
    createdAt: '2024-08-12',
    lastActive: '2025-02-15',
  },
]

// Dashboard Statistics
export const mockDashboardStats = {
  todayAppointments: 4,
  totalPatients: 1250,
  monthlyRevenue: 15600,
  pendingPayments: 2450,
  
  // Weekly appointments trend
  weeklyAppointments: [
    { day: 'ორშ', count: 12 },
    { day: 'სამ', count: 18 },
    { day: 'ოთხ', count: 15 },
    { day: 'ხუთ', count: 22 },
    { day: 'პარ', count: 20 },
    { day: 'შაბ', count: 8 },
    { day: 'კვი', count: 0 },
  ],
  
  // Monthly revenue trend
  monthlyRevenueTrend: [
    { month: 'იან', revenue: 12500, expenses: 9800 },
    { month: 'თებ', revenue: 14200, expenses: 10200 },
    { month: 'მარ', revenue: 15600, expenses: 11500 },
  ],
  
  // Service distribution
  serviceDistribution: [
    { name: 'კონსულტაცია', value: 45, color: 'var(--chart-1)' },
    { name: 'დიაგნოსტიკა', value: 25, color: 'var(--chart-2)' },
    { name: 'ლაბორატორია', value: 20, color: 'var(--chart-3)' },
    { name: 'სხვა', value: 10, color: 'var(--chart-4)' },
  ],
  
  // Patient growth
  patientGrowth: [
    { month: 'იან', new: 45, total: 1160 },
    { month: 'თებ', new: 52, total: 1212 },
    { month: 'მარ', new: 38, total: 1250 },
  ],
}

// Accounting data
export const mockAccountingData = {
  currentMonth: {
    income: 15600,
    expenses: 11830,
    profit: 3770,
  },
  lastMonth: {
    income: 14200,
    expenses: 10200,
    profit: 4000,
  },
  yearToDate: {
    income: 42300,
    expenses: 31500,
    profit: 10800,
  },
  
  // Expense categories
  expenseCategories: [
    { category: 'ხელფასი', amount: 8500, percentage: 72 },
    { category: 'იჯარა', amount: 2500, percentage: 21 },
    { category: 'კომუნალური', amount: 180, percentage: 1.5 },
    { category: 'მედიკამენტები', amount: 450, percentage: 4 },
    { category: 'მარკეტინგი', amount: 200, percentage: 1.5 },
  ],
  
  // RS.ge sync status
  rsgeStatus: {
    connected: true,
    lastSync: '2025-03-22 10:30',
    pendingInvoices: 2,
    syncedInvoices: 45,
  },
}

// GOD MODE Statistics
export const mockGodModeStats = {
  activeTenants: 3,
  totalTenants: 5,
  totalUsers: 43,
  totalPatients: 7100,
  totalRevenue: 69700,
  monthlyGrowth: 12.5,
  
  // Revenue by plan
  revenueByPlan: [
    { plan: 'Enterprise', revenue: 45200, tenants: 1 },
    { plan: 'Professional', revenue: 24500, tenants: 2 },
    { plan: 'Starter', revenue: 0, tenants: 2 },
  ],
  
  // System health
  systemHealth: {
    uptime: 99.9,
    avgResponseTime: 120,
    activeUsers: 28,
    apiCalls: 45000,
  },
}
