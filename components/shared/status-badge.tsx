'use client'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

type Status = 
  | 'active' | 'inactive' 
  | 'paid' | 'unpaid' | 'partial' | 'overdue'
  | 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled' | 'no-show'
  | 'trial' | 'suspended'
  | 'success' | 'warning' | 'error' | 'info'

const statusStyles: Record<Status, string> = {
  // Patient status
  active: 'bg-success/10 text-success border-success/20',
  inactive: 'bg-muted text-muted-foreground',
  
  // Invoice status
  paid: 'bg-success/10 text-success border-success/20',
  unpaid: 'bg-warning/10 text-warning border-warning/20',
  partial: 'bg-info/10 text-info border-info/20',
  overdue: 'bg-destructive/10 text-destructive border-destructive/20',
  
  // Appointment status
  scheduled: 'bg-info/10 text-info border-info/20',
  confirmed: 'bg-success/10 text-success border-success/20',
  'in-progress': 'bg-warning/10 text-warning border-warning/20',
  completed: 'bg-muted text-muted-foreground',
  cancelled: 'bg-destructive/10 text-destructive border-destructive/20',
  'no-show': 'bg-destructive/10 text-destructive border-destructive/20',
  
  // Tenant status
  trial: 'bg-info/10 text-info border-info/20',
  suspended: 'bg-destructive/10 text-destructive border-destructive/20',
  
  // Generic status
  success: 'bg-success/10 text-success border-success/20',
  warning: 'bg-warning/10 text-warning border-warning/20',
  error: 'bg-destructive/10 text-destructive border-destructive/20',
  info: 'bg-info/10 text-info border-info/20',
}

const statusLabels: Partial<Record<Status, string>> = {
  active: 'აქტიური',
  inactive: 'არააქტიური',
  paid: 'გადახდილი',
  unpaid: 'გადაუხდელი',
  partial: 'ნაწილობრივ',
  overdue: 'ვადაგადაცილებული',
  scheduled: 'დაგეგმილი',
  confirmed: 'დადასტურებული',
  'in-progress': 'მიმდინარე',
  completed: 'დასრულებული',
  cancelled: 'გაუქმებული',
  'no-show': 'არ გამოცხადდა',
  trial: 'საცდელი',
  suspended: 'შეჩერებული',
}

interface StatusBadgeProps {
  status: Status
  label?: string
  className?: string
}

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn('font-medium', statusStyles[status], className)}
    >
      {label || statusLabels[status] || status}
    </Badge>
  )
}
