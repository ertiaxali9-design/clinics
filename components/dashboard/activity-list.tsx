'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

interface Activity {
  id: string
  type: 'appointment' | 'payment' | 'patient' | 'invoice'
  title: string
  description: string
  time: string
  status?: 'success' | 'warning' | 'info' | 'default'
}

interface ActivityListProps {
  title: string
  activities: Activity[]
}

const typeIcons = {
  appointment: 'A',
  payment: 'P',
  patient: 'Pt',
  invoice: 'I',
}

const typeColors = {
  appointment: 'bg-primary/10 text-primary',
  payment: 'bg-success/10 text-success',
  patient: 'bg-info/10 text-info',
  invoice: 'bg-warning/10 text-warning',
}

const statusColors = {
  success: 'bg-success/10 text-success border-success/20',
  warning: 'bg-warning/10 text-warning border-warning/20',
  info: 'bg-info/10 text-info border-info/20',
  default: 'bg-muted text-muted-foreground',
}

export function ActivityList({ title, activities }: ActivityListProps) {
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
        <CardContent className="space-y-4">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex items-start gap-3"
            >
              <Avatar className={cn('h-9 w-9', typeColors[activity.type])}>
                <AvatarFallback className="text-xs font-medium bg-transparent">
                  {typeIcons[activity.type]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium truncate">{activity.title}</p>
                  {activity.status && (
                    <Badge 
                      variant="outline" 
                      className={cn('text-xs', statusColors[activity.status])}
                    >
                      {activity.status}
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  {activity.description}
                </p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {activity.time}
              </span>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  )
}
