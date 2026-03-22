'use client'

import { useTranslation } from '@/lib/i18n'
import { mockDashboardStats, mockAppointments } from '@/lib/mock-data'
import { PageHeader } from '@/components/shared/page-header'
import { KPICard } from '@/components/dashboard/kpi-card'
import { AreaChart } from '@/components/dashboard/area-chart'
import { BarChart } from '@/components/dashboard/bar-chart'
import { PieChart } from '@/components/dashboard/pie-chart'
import { UpcomingAppointments } from '@/components/dashboard/upcoming-appointments'
import { QuickActions } from '@/components/dashboard/quick-actions'
import {
  CalendarDays,
  Users,
  Wallet,
  CreditCard,
  UserPlus,
  CalendarPlus,
  FileText,
} from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const t = useTranslation()
  const router = useRouter()
  
  const todayAppointments = mockAppointments.filter(
    (a) => a.date === new Date().toISOString().split('T')[0]
  )

  const quickActions = [
    {
      id: '1',
      label: t.dashboard.newPatient,
      icon: UserPlus,
      color: 'primary' as const,
      onClick: () => router.push('/patients/new'),
    },
    {
      id: '2',
      label: t.dashboard.newAppointment,
      icon: CalendarPlus,
      color: 'success' as const,
      onClick: () => router.push('/appointments/new'),
    },
    {
      id: '3',
      label: t.dashboard.newInvoice,
      icon: FileText,
      color: 'warning' as const,
      onClick: () => router.push('/billing/new'),
    },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title={t.dashboard.title}
        description={`${t.dashboard.welcome}, თამარ!`}
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title={t.dashboard.todayAppointments}
          value={mockDashboardStats.todayAppointments}
          icon={CalendarDays}
          color="primary"
          delay={0}
        />
        <KPICard
          title={t.dashboard.totalPatients}
          value={mockDashboardStats.totalPatients}
          icon={Users}
          trend={{ value: 3.2, isPositive: true }}
          color="info"
          delay={1}
        />
        <KPICard
          title={t.dashboard.monthlyRevenue}
          value={mockDashboardStats.monthlyRevenue}
          prefix="₾"
          icon={Wallet}
          trend={{ value: 9.8, isPositive: true }}
          color="success"
          delay={2}
        />
        <KPICard
          title={t.dashboard.pendingPayments}
          value={mockDashboardStats.pendingPayments}
          prefix="₾"
          icon={CreditCard}
          color="warning"
          delay={3}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AreaChart
          title="შემოსავალი vs ხარჯები"
          data={mockDashboardStats.monthlyRevenueTrend}
          dataKey="revenue"
          xAxisKey="month"
          secondaryDataKey="expenses"
          color="var(--chart-1)"
          secondaryColor="var(--chart-5)"
        />
        <BarChart
          title="კვირის ვიზიტები"
          data={mockDashboardStats.weeklyAppointments}
          dataKey="count"
          xAxisKey="day"
        />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <UpcomingAppointments
            title={t.dashboard.upcomingAppointments}
            appointments={todayAppointments}
            onViewAll={() => router.push('/appointments')}
          />
        </div>
        <div className="space-y-6">
          <QuickActions
            title={t.dashboard.quickActions}
            actions={quickActions}
          />
          <PieChart
            title="სერვისების განაწილება"
            data={mockDashboardStats.serviceDistribution}
            height={200}
          />
        </div>
      </div>
    </div>
  )
}
