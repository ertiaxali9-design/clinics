'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslation } from '@/lib/i18n'
import { mockPatients, mockAppointments, mockInvoices } from '@/lib/mock-data'
import { PageHeader } from '@/components/shared/page-header'
import { StatusBadge } from '@/components/shared/status-badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Edit,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CreditCard,
  FileText,
  AlertTriangle,
  Pill,
  History,
} from 'lucide-react'

interface PatientDetailPageProps {
  params: Promise<{ id: string }>
}

export default function PatientDetailPage({ params }: PatientDetailPageProps) {
  const { id } = use(params)
  const t = useTranslation()
  const router = useRouter()

  const patient = mockPatients.find((p) => p.id === id)
  const patientAppointments = mockAppointments.filter((a) => a.patientId === id)
  const patientInvoices = mockInvoices.filter((inv) => inv.patientId === id)

  if (!patient) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">{t.common.noData}</p>
      </div>
    )
  }

  const getInitials = (firstName: string, lastName: string) =>
    `${firstName[0]}${lastName[0]}`.toUpperCase()

  return (
    <div className="space-y-6">
      <PageHeader
        title=""
        actions={
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => router.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              უკან
            </Button>
            <Button>
              <Edit className="mr-2 h-4 w-4" />
              {t.common.edit}
            </Button>
          </div>
        }
      />

      {/* Patient Header Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                  {getInitials(patient.firstName, patient.lastName)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                  <h1 className="text-2xl font-bold">
                    {patient.firstName} {patient.lastName}
                  </h1>
                  <StatusBadge status={patient.status} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CreditCard className="h-4 w-4" />
                    <span>{patient.personalId}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{patient.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>{patient.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{patient.address}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">{t.patients.balance}</p>
                  <p className={`text-xl font-bold ${patient.balance > 0 ? 'text-destructive' : patient.balance < 0 ? 'text-success' : ''}`}>
                    {patient.balance > 0 ? '+' : ''}{patient.balance} {t.common.currency}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">{t.patients.totalVisits}</p>
                  <p className="text-xl font-bold">{patient.totalVisits}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tabs */}
      <Tabs defaultValue="info" className="space-y-4">
        <TabsList>
          <TabsTrigger value="info" className="gap-2">
            <FileText className="h-4 w-4" />
            ინფორმაცია
          </TabsTrigger>
          <TabsTrigger value="history" className="gap-2">
            <History className="h-4 w-4" />
            {t.patients.medicalHistory}
          </TabsTrigger>
          <TabsTrigger value="visits" className="gap-2">
            <Calendar className="h-4 w-4" />
            {t.patients.visits}
          </TabsTrigger>
          <TabsTrigger value="payments" className="gap-2">
            <CreditCard className="h-4 w-4" />
            {t.patients.payments}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-warning" />
                    {t.patients.allergies}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {patient.allergies.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {patient.allergies.map((allergy, index) => (
                        <Badge key={index} variant="destructive">
                          {allergy}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">არ აქვს ცნობილი ალერგია</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Pill className="h-5 w-5 text-info" />
                    {t.patients.medications}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {patient.medications.length > 0 ? (
                    <ul className="space-y-2">
                      {patient.medications.map((med, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-info" />
                          {med}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">მიმდინარე მედიკამენტები არ არის</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {patient.notes && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t.patients.notes}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{patient.notes}</p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground text-center py-8">
                სამედიცინო ისტორია ჩაიტვირთება...
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="visits" className="space-y-4">
          {patientAppointments.length > 0 ? (
            patientAppointments.map((appointment, index) => (
              <motion.div
                key={appointment.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{appointment.serviceName}</p>
                        <p className="text-sm text-muted-foreground">
                          {appointment.doctorName} - {appointment.date} {appointment.time}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold">{appointment.price} {t.common.currency}</span>
                        <StatusBadge status={appointment.status} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground text-center py-8">{t.common.noData}</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          {patientInvoices.length > 0 ? (
            patientInvoices.map((invoice, index) => (
              <motion.div
                key={invoice.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{invoice.number}</p>
                        <p className="text-sm text-muted-foreground">
                          {invoice.date} - {invoice.items.length} სერვისი
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="font-semibold">{invoice.total} {t.common.currency}</p>
                          <p className="text-xs text-muted-foreground">
                            გადახდილი: {invoice.paidAmount} {t.common.currency}
                          </p>
                        </div>
                        <StatusBadge status={invoice.status} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground text-center py-8">{t.common.noData}</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
