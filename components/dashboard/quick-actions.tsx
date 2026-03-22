'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface QuickAction {
  id: string
  label: string
  icon: LucideIcon
  color?: 'primary' | 'success' | 'warning' | 'info'
  onClick?: () => void
}

interface QuickActionsProps {
  title: string
  actions: QuickAction[]
}

const colorVariants = {
  primary: 'bg-primary hover:bg-primary/90 text-primary-foreground',
  success: 'bg-success hover:bg-success/90 text-success-foreground',
  warning: 'bg-warning hover:bg-warning/90 text-warning-foreground',
  info: 'bg-info hover:bg-info/90 text-info-foreground',
}

export function QuickActions({ title, actions }: QuickActionsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <Button
                variant="outline"
                className={cn(
                  'w-full h-auto py-4 flex flex-col items-center gap-2',
                  action.color && colorVariants[action.color]
                )}
                onClick={action.onClick}
              >
                <action.icon className="h-5 w-5" />
                <span className="text-xs font-medium">{action.label}</span>
              </Button>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  )
}
