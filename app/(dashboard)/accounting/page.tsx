'use client'

import { useState } from 'react'
import { useTranslation } from '@/lib/i18n'
import { mockAccountingData, mockTransactions } from '@/lib/mock-data'
import { PageHeader } from '@/components/shared/page-header'
import { KPICard } from '@/components/dashboard/kpi-card'
import { AreaChart } from '@/components/dashboard/area-chart'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCcw,
  Download,
  Plus,
  CheckCircle,
  AlertCircle,
  Clock,
} from 'lucide-react'

export default function AccountingPage() {
  const t = useTranslation()
  const [period, setPeriod] = useState('thisMonth')

  const data = mockAccountingData

  // Prepare chart data
  const chartData = [
    { month: 'იან', income: 12500, expenses: 9800 },
    { month: 'თებ', income: 14200, expenses: 10200 },
    { month: 'მარ', income: 15600, expenses: 11830 },
  ]

  const isProfit = data.currentMonth.profit > 0

  return (
    <div className="space-y-6">
      <PageHeader
        title={t.accounting.title}
        description={t.accounting.overview}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              {t.accounting.exportReport}
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              {t.accounting.newExpense}
            </Button>
          </div>
        }
      />

      {/* Period Selector */}
      <Tabs value={period} onValueChange={setPeriod}>
        <TabsList>
          <TabsTrigger value="thisMonth">{t.accounting.thisMonth}</TabsTrigger>
          <TabsTrigger value="lastMonth">{t.accounting.lastMonth}</TabsTrigger>
          <TabsTrigger value="thisYear">{t.accounting.thisYear}</TabsTrigger>
          <TabsTrigger value="custom">{t.accounting.custom}</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title={t.accounting.income}
          value={data.currentMonth.income}
          prefix="₾"
          icon={TrendingUp}
          trend={{ value: 9.8, isPositive: true }}
          color="success"
          delay={0}
        />
        <KPICard
          title={t.accounting.expenses}
          value={data.currentMonth.expenses}
          prefix="₾"
          icon={TrendingDown}
          trend={{ value: 16, isPositive: false }}
          color="destructive"
          delay={1}
        />
        <KPICard
          title={t.accounting.netIncome}
          value={Math.abs(data.currentMonth.profit)}
          prefix={isProfit ? '+₾' : '-₾'}
          icon={Wallet}
          color={isProfit ? 'success' : 'destructive'}
          delay={2}
        />
        <KPICard
          title="YTD მოგება"
          value={data.yearToDate.profit}
          prefix="₾"
          icon={ArrowUpRight}
          color="primary"
          delay={3}
        />
      </div>

      {/* Charts and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AreaChart
            title={t.accounting.profitLoss}
            data={chartData}
            dataKey="income"
            xAxisKey="month"
            secondaryDataKey="expenses"
            color="var(--chart-2)"
            secondaryColor="var(--chart-5)"
            height={350}
          />
        </div>

        {/* RS.ge Integration Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <RefreshCcw className="h-5 w-5" />
                {t.accounting.rsIntegration}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t.accounting.syncStatus}</span>
                <Badge variant={data.rsgeStatus.connected ? 'default' : 'destructive'} className="bg-success">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  დაკავშირებულია
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t.accounting.lastSync}</span>
                <span className="text-sm font-medium">{data.rsgeStatus.lastSync}</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">სინქრონიზებული</span>
                  <span className="font-medium">{data.rsgeStatus.syncedInvoices}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">მომლოდინე</span>
                  <span className="font-medium text-warning">{data.rsgeStatus.pendingInvoices}</span>
                </div>
              </div>

              <Button className="w-full" variant="outline">
                <RefreshCcw className="mr-2 h-4 w-4" />
                {t.accounting.syncNow}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Expense Categories and Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expense Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t.accounting.categories}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.expenseCategories.map((category, index) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between text-sm">
                    <span>{category.category}</span>
                    <span className="font-medium">{category.amount} {t.common.currency}</span>
                  </div>
                  <Progress value={category.percentage} className="h-2" />
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t.accounting.transactions}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockTransactions.slice(0, 6).map((transaction, index) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.03 }}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      transaction.type === 'income' 
                        ? 'bg-success/10 text-success' 
                        : 'bg-destructive/10 text-destructive'
                    }`}>
                      {transaction.type === 'income' 
                        ? <ArrowUpRight className="h-4 w-4" />
                        : <ArrowDownRight className="h-4 w-4" />
                      }
                    </div>
                    <div>
                      <p className="text-sm font-medium">{transaction.description}</p>
                      <p className="text-xs text-muted-foreground">{transaction.date}</p>
                    </div>
                  </div>
                  <span className={`font-semibold ${
                    transaction.type === 'income' ? 'text-success' : 'text-destructive'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}{transaction.amount} {t.common.currency}
                  </span>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
