'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslation } from '@/lib/i18n'
import { mockInvoices } from '@/lib/mock-data'
import { PageHeader } from '@/components/shared/page-header'
import { DataTable, type Column } from '@/components/shared/data-table'
import { StatusBadge } from '@/components/shared/status-badge'
import { KPICard } from '@/components/dashboard/kpi-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { motion } from 'framer-motion'
import {
  FilePlus,
  Receipt,
  CreditCard,
  AlertTriangle,
  CheckCircle,
  Download,
  Printer,
  Send,
  MoreVertical,
} from 'lucide-react'
import type { Invoice } from '@/lib/mock-data'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function BillingPage() {
  const t = useTranslation()
  const router = useRouter()
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filteredInvoices = statusFilter === 'all'
    ? mockInvoices
    : mockInvoices.filter((inv) => inv.status === statusFilter)

  const stats = {
    total: mockInvoices.reduce((sum, inv) => sum + inv.total, 0),
    paid: mockInvoices.filter((inv) => inv.status === 'paid').reduce((sum, inv) => sum + inv.total, 0),
    pending: mockInvoices.filter((inv) => ['unpaid', 'partial'].includes(inv.status)).reduce((sum, inv) => sum + (inv.total - inv.paidAmount), 0),
    overdue: mockInvoices.filter((inv) => inv.status === 'overdue').reduce((sum, inv) => sum + inv.total, 0),
  }

  const columns: Column<Invoice>[] = [
    {
      key: 'number',
      header: t.billing.invoiceNumber,
      render: (invoice) => (
        <span className="font-medium">{invoice.number}</span>
      ),
    },
    {
      key: 'patientName',
      header: t.billing.patient,
    },
    {
      key: 'date',
      header: t.billing.date,
    },
    {
      key: 'dueDate',
      header: t.billing.dueDate,
    },
    {
      key: 'total',
      header: t.billing.amount,
      render: (invoice) => (
        <span className="font-semibold">{invoice.total.toFixed(2)} {t.common.currency}</span>
      ),
    },
    {
      key: 'paidAmount',
      header: t.billing.paid,
      render: (invoice) => (
        <span className={invoice.paidAmount > 0 ? 'text-success' : 'text-muted-foreground'}>
          {invoice.paidAmount.toFixed(2)} {t.common.currency}
        </span>
      ),
    },
    {
      key: 'status',
      header: t.common.status,
      render: (invoice) => <StatusBadge status={invoice.status} />,
    },
    {
      key: 'actions',
      header: '',
      width: '50px',
      render: (invoice) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Printer className="mr-2 h-4 w-4" />
              {t.billing.print}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Download className="mr-2 h-4 w-4" />
              {t.billing.download}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Send className="mr-2 h-4 w-4" />
              {t.billing.send}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title={t.billing.title}
        description={`${mockInvoices.length} ${t.billing.invoices.toLowerCase()}`}
        actions={
          <Button onClick={() => router.push('/billing/new')}>
            <FilePlus className="mr-2 h-4 w-4" />
            {t.billing.newInvoice}
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title={t.billing.total}
          value={stats.total}
          prefix="₾"
          icon={Receipt}
          color="primary"
          delay={0}
        />
        <KPICard
          title={t.billing.paid}
          value={stats.paid}
          prefix="₾"
          icon={CheckCircle}
          color="success"
          delay={1}
        />
        <KPICard
          title="მომლოდინე"
          value={stats.pending}
          prefix="₾"
          icon={CreditCard}
          color="warning"
          delay={2}
        />
        <KPICard
          title={t.billing.overdue}
          value={stats.overdue}
          prefix="₾"
          icon={AlertTriangle}
          color="destructive"
          delay={3}
        />
      </div>

      {/* Filter Tabs */}
      <Tabs value={statusFilter} onValueChange={setStatusFilter}>
        <TabsList>
          <TabsTrigger value="all">ყველა</TabsTrigger>
          <TabsTrigger value="paid">{t.billing.paid}</TabsTrigger>
          <TabsTrigger value="unpaid">{t.billing.unpaid}</TabsTrigger>
          <TabsTrigger value="partial">{t.billing.partial}</TabsTrigger>
          <TabsTrigger value="overdue">{t.billing.overdue}</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Invoices Table */}
      <DataTable
        data={filteredInvoices}
        columns={columns}
        searchKey="patientName"
        searchPlaceholder="ინვოისის ძებნა..."
        onRowClick={(invoice) => router.push(`/billing/${invoice.id}`)}
      />
    </div>
  )
}
