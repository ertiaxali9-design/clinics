'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { type LucideIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

interface KPICardProps {
  title: string
  value: number
  prefix?: string
  suffix?: string
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  color?: 'primary' | 'success' | 'warning' | 'destructive' | 'info'
  delay?: number
}

const colorVariants = {
  primary: 'bg-primary/10 text-primary',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  destructive: 'bg-destructive/10 text-destructive',
  info: 'bg-info/10 text-info',
}

export function KPICard({
  title,
  value,
  prefix = '',
  suffix = '',
  icon: Icon,
  trend,
  color = 'primary',
  delay = 0,
}: KPICardProps) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const duration = 1500
    const steps = 60
    const increment = value / steps
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setDisplayValue(value)
        clearInterval(timer)
      } else {
        setDisplayValue(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value])

  const formatValue = (val: number) => {
    if (val >= 1000000) {
      return (val / 1000000).toFixed(1) + 'M'
    }
    if (val >= 1000) {
      return (val / 1000).toFixed(1) + 'K'
    }
    return val.toLocaleString()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay * 0.1 }}
    >
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <div className="flex items-baseline gap-1">
                {prefix && <span className="text-2xl font-semibold">{prefix}</span>}
                <span className="text-3xl font-bold tabular-nums">
                  {formatValue(displayValue)}
                </span>
                {suffix && <span className="text-lg text-muted-foreground">{suffix}</span>}
              </div>
              {trend && (
                <div className={cn(
                  'flex items-center gap-1 text-sm font-medium',
                  trend.isPositive ? 'text-success' : 'text-destructive'
                )}>
                  <span>{trend.isPositive ? '+' : ''}{trend.value}%</span>
                  <span className="text-muted-foreground font-normal">vs last month</span>
                </div>
              )}
            </div>
            <div className={cn('p-3 rounded-xl', colorVariants[color])}>
              <Icon className="h-6 w-6" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
