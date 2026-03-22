'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslation } from '@/lib/i18n'
import { mockAppointments, mockDoctors } from '@/lib/mock-data'
import { PageHeader } from '@/components/shared/page-header'
import { StatusBadge } from '@/components/shared/status-badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { motion } from 'framer-motion'
import {
  CalendarPlus,
  Calendar,
  List,
  Clock,
  User,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
} from 'lucide-react'
import type { Appointment } from '@/lib/mock-data'

const statusLabels: Record<Appointment['status'], string> = {
  scheduled: 'დაგეგმილი',
  confirmed: 'დადასტურებული',
  'in-progress': 'მიმდინარე',
  completed: 'დასრულებული',
  cancelled: 'გაუქმებული',
  'no-show': 'არ გამოცხადდა',
}

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30',
]

const weekDays = ['ორშ', 'სამ', 'ოთხ', 'ხუთ', 'პარ', 'შაბ', 'კვი']

export default function AppointmentsPage() {
  const t = useTranslation()
  const router = useRouter()
  const [viewMode, setViewMode] = useState<'calendar' | 'list' | 'timeline'>('list')
  const [selectedDoctor, setSelectedDoctor] = useState<string>('all')

  const today = new Date()
  const todayStr = today.toISOString().split('T')[0]

  const filteredAppointments = mockAppointments.filter(
    (a) => selectedDoctor === 'all' || a.doctorId === selectedDoctor
  )

  const todayAppointments = filteredAppointments.filter((a) => a.date === todayStr)

  const getInitials = (name: string) =>
    name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)

  // Generate week dates
  const getWeekDates = () => {
    const dates = []
    const start = new Date(today)
    start.setDate(start.getDate() - start.getDay() + 1) // Start from Monday
    for (let i = 0; i < 7; i++) {
      const d = new Date(start)
      d.setDate(d.getDate() + i)
      dates.push(d)
    }
    return dates
  }

  const weekDates = getWeekDates()

  return (
    <div className="space-y-6">
      <PageHeader
        title={t.appointments.title}
        description={`${todayAppointments.length} ${t.dashboard.todayAppointments.toLowerCase()}`}
        actions={
          <Button onClick={() => router.push('/appointments/new')}>
            <CalendarPlus className="mr-2 h-4 w-4" />
            {t.appointments.newAppointment}
          </Button>
        }
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as typeof viewMode)}>
          <TabsList>
            <TabsTrigger value="list" className="gap-2">
              <List className="h-4 w-4" />
              {t.appointments.list}
            </TabsTrigger>
            <TabsTrigger value="calendar" className="gap-2">
              <Calendar className="h-4 w-4" />
              {t.appointments.calendar}
            </TabsTrigger>
            <TabsTrigger value="timeline" className="gap-2">
              <Clock className="h-4 w-4" />
              {t.appointments.timeline}
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder={t.appointments.doctor} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">ყველა ექიმი</SelectItem>
            {mockDoctors.map((doctor) => (
              <SelectItem key={doctor.id} value={doctor.id}>
                {doctor.firstName} {doctor.lastName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* List View */}
      {viewMode === 'list' && (
        <div className="space-y-4">
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment, index) => (
              <motion.div
                key={appointment.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
              >
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {getInitials(appointment.patientName)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold truncate">{appointment.patientName}</h3>
                          <StatusBadge status={appointment.status} label={statusLabels[appointment.status]} />
                        </div>
                        <p className="text-sm text-muted-foreground">{appointment.serviceName}</p>
                        <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {appointment.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {appointment.time} ({appointment.duration} წთ)
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {appointment.doctorName}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{appointment.price} {t.common.currency}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">{t.common.noData}</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Calendar View */}
      {viewMode === 'calendar' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  {today.toLocaleDateString('ka-GE', { month: 'long', year: 'numeric' })}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">დღეს</Button>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1">
                {weekDays.map((day) => (
                  <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                    {day}
                  </div>
                ))}
                {weekDates.map((date, index) => {
                  const dateStr = date.toISOString().split('T')[0]
                  const dayAppointments = filteredAppointments.filter((a) => a.date === dateStr)
                  const isToday = dateStr === todayStr

                  return (
                    <div
                      key={index}
                      className={`min-h-24 border rounded-lg p-2 ${
                        isToday ? 'bg-primary/5 border-primary' : 'border-border'
                      }`}
                    >
                      <div className={`text-sm font-medium mb-1 ${isToday ? 'text-primary' : ''}`}>
                        {date.getDate()}
                      </div>
                      <div className="space-y-1">
                        {dayAppointments.slice(0, 3).map((apt) => (
                          <div
                            key={apt.id}
                            className="text-xs p-1 rounded bg-primary/10 text-primary truncate"
                          >
                            {apt.time} {apt.patientName.split(' ')[0]}
                          </div>
                        ))}
                        {dayAppointments.length > 3 && (
                          <div className="text-xs text-muted-foreground">
                            +{dayAppointments.length - 3} more
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Timeline View */}
      {viewMode === 'timeline' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">დღევანდელი განრიგი</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {timeSlots.map((time) => {
                  const appointment = todayAppointments.find((a) => a.time === time)
                  return (
                    <div key={time} className="flex items-stretch gap-4">
                      <div className="w-16 text-sm text-muted-foreground py-3">{time}</div>
                      <div className="flex-1 border-l border-border pl-4">
                        {appointment ? (
                          <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium text-sm">{appointment.patientName}</p>
                                <p className="text-xs text-muted-foreground">
                                  {appointment.serviceName} - {appointment.doctorName}
                                </p>
                              </div>
                              <StatusBadge status={appointment.status} label={statusLabels[appointment.status]} />
                            </div>
                          </div>
                        ) : (
                          <div className="py-3 text-sm text-muted-foreground">
                            თავისუფალი
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
