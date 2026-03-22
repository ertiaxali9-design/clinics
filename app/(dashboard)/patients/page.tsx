'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslation } from '@/lib/i18n'
import { mockPatients } from '@/lib/mock-data'
import { PageHeader } from '@/components/shared/page-header'
import { DataTable, type Column } from '@/components/shared/data-table'
import { StatusBadge } from '@/components/shared/status-badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { motion } from 'framer-motion'
import { UserPlus, LayoutGrid, List, Phone, Mail, Calendar } from 'lucide-react'
import type { Patient } from '@/lib/mock-data'

export default function PatientsPage() {
  const t = useTranslation()
  const router = useRouter()
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table')

  const columns: Column<Patient>[] = [
    {
      key: 'name',
      header: t.patients.name,
      render: (patient) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary/10 text-primary text-xs">
              {patient.firstName[0]}{patient.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{patient.firstName} {patient.lastName}</p>
            <p className="text-xs text-muted-foreground">{patient.personalId}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'phone',
      header: t.patients.phone,
    },
    {
      key: 'lastVisit',
      header: t.patients.lastVisit,
      render: (patient) => patient.lastVisit || '-',
    },
    {
      key: 'totalVisits',
      header: t.patients.totalVisits,
    },
    {
      key: 'balance',
      header: t.patients.balance,
      render: (patient) => (
        <span className={patient.balance > 0 ? 'text-destructive' : patient.balance < 0 ? 'text-success' : ''}>
          {patient.balance > 0 ? '+' : ''}{patient.balance} {t.common.currency}
        </span>
      ),
    },
    {
      key: 'status',
      header: t.patients.status,
      render: (patient) => (
        <StatusBadge status={patient.status} />
      ),
    },
  ]

  const getInitials = (firstName: string, lastName: string) => 
    `${firstName[0]}${lastName[0]}`.toUpperCase()

  return (
    <div className="space-y-6">
      <PageHeader
        title={t.patients.title}
        description={`${mockPatients.length} ${t.patients.title.toLowerCase()}`}
        actions={
          <Button onClick={() => router.push('/patients/new')}>
            <UserPlus className="mr-2 h-4 w-4" />
            {t.patients.addPatient}
          </Button>
        }
      />

      <div className="flex items-center justify-between">
        <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as 'table' | 'cards')}>
          <TabsList>
            <TabsTrigger value="table" className="gap-2">
              <List className="h-4 w-4" />
              {t.appointments.list}
            </TabsTrigger>
            <TabsTrigger value="cards" className="gap-2">
              <LayoutGrid className="h-4 w-4" />
              ბარათები
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {viewMode === 'table' ? (
        <DataTable
          data={mockPatients}
          columns={columns}
          searchKey="firstName"
          searchPlaceholder={t.patients.search}
          onRowClick={(patient) => router.push(`/patients/${patient.id}`)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockPatients.map((patient, index) => (
            <motion.div
              key={patient.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => router.push(`/patients/${patient.id}`)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {getInitials(patient.firstName, patient.lastName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold truncate">
                          {patient.firstName} {patient.lastName}
                        </h3>
                        <StatusBadge status={patient.status} />
                      </div>
                      <p className="text-sm text-muted-foreground">{patient.personalId}</p>
                      <div className="mt-3 space-y-1">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="h-3.5 w-3.5" />
                          <span>{patient.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="h-3.5 w-3.5" />
                          <span className="truncate">{patient.email}</span>
                        </div>
                        {patient.lastVisit && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>{t.patients.lastVisit}: {patient.lastVisit}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
