'use client'

import { useState } from 'react'
import { useTranslation } from '@/lib/i18n'
import { mockDashboardStats } from '@/lib/mock-data'
import { PageHeader } from '@/components/shared/page-header'
import { AreaChart } from '@/components/dashboard/area-chart'
import { BarChart } from '@/components/dashboard/bar-chart'
import { PieChart } from '@/components/dashboard/pie-chart'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { motion } from 'framer-motion'
import {
  Download,
  FileText,
  Users,
  Calendar,
  CreditCard,
  Stethoscope,
  BarChart3,
  TrendingUp,
  PieChartIcon,
} from 'lucide-react'

const reportTypes = [
  {
    id: 'patients',
    icon: Users,
    titleKey: 'patientReport',
    description: 'პაციენტების სტატისტიკა და ანალიზი',
  },
  {
    id: 'financial',
    icon: CreditCard,
    titleKey: 'financialReport',
    description: 'შემოსავლები, ხარჯები და მოგება',
  },
  {
    id: 'appointments',
    icon: Calendar,
    titleKey: 'appointmentReport',
    description: 'ვიზიტების სტატისტიკა და ტრენდები',
  },
  {
    id: 'services',
    icon: Stethoscope,
    titleKey: 'serviceReport',
    description: 'სერვისების პოპულარობა და შემოსავალი',
  },
  {
    id: 'doctors',
    icon: Users,
    titleKey: 'doctorPerformance',
    description: 'ექიმების პროდუქტიულობის ანალიზი',
  },
]

export default function ReportsPage() {
  const t = useTranslation()
  const [selectedReport, setSelectedReport] = useState('financial')
  const [dateRange, setDateRange] = useState('thisMonth')

  return (
    <div className="space-y-6">
      <PageHeader
        title={t.reports.title}
        description="ანალიტიკა და ანგარიშები"
        actions={
          <Button>
            <Download className="mr-2 h-4 w-4" />
            {t.reports.export}
          </Button>
        }
      />

      {/* Report Type Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {reportTypes.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedReport === report.id
                  ? 'border-primary bg-primary/5'
                  : 'hover:border-primary/50'
              }`}
              onClick={() => setSelectedReport(report.id)}
            >
              <CardContent className="p-4 text-center">
                <div className={`inline-flex p-3 rounded-xl mb-3 ${
                  selectedReport === report.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}>
                  <report.icon className="h-5 w-5" />
                </div>
                <h3 className="font-medium text-sm">
                  {t.reports[report.titleKey as keyof typeof t.reports]}
                </h3>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Date Range Selector */}
      <div className="flex items-center justify-between">
        <Tabs value={dateRange} onValueChange={setDateRange}>
          <TabsList>
            <TabsTrigger value="thisWeek">ეს კვირა</TabsTrigger>
            <TabsTrigger value="thisMonth">ეს თვე</TabsTrigger>
            <TabsTrigger value="lastMonth">წინა თვე</TabsTrigger>
            <TabsTrigger value="thisYear">ეს წელი</TabsTrigger>
          </TabsList>
        </Tabs>

        <Select defaultValue="pdf">
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder={t.reports.format} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pdf">PDF</SelectItem>
            <SelectItem value="excel">Excel</SelectItem>
            <SelectItem value="csv">CSV</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Report Content */}
      {selectedReport === 'financial' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AreaChart
              title="შემოსავალი vs ხარჯები"
              data={mockDashboardStats.monthlyRevenueTrend}
              dataKey="revenue"
              xAxisKey="month"
              secondaryDataKey="expenses"
              color="var(--chart-2)"
              secondaryColor="var(--chart-5)"
            />
            <PieChart
              title="ხარჯების განაწილება"
              data={[
                { name: 'ხელფასი', value: 72 },
                { name: 'იჯარა', value: 21 },
                { name: 'კომუნალური', value: 2 },
                { name: 'მედიკამენტები', value: 4 },
                { name: 'სხვა', value: 1 },
              ]}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  ფინანსური მაჩვენებლები
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-success">15,600</p>
                    <p className="text-sm text-muted-foreground">სულ შემოსავალი</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-destructive">11,830</p>
                    <p className="text-sm text-muted-foreground">სულ ხარჯები</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-primary">3,770</p>
                    <p className="text-sm text-muted-foreground">წმინდა მოგება</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold">24.2%</p>
                    <p className="text-sm text-muted-foreground">მოგების მარჟა</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}

      {selectedReport === 'appointments' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <BarChart
              title="კვირის ვიზიტები"
              data={mockDashboardStats.weeklyAppointments}
              dataKey="count"
              xAxisKey="day"
            />
            <PieChart
              title="ვიზიტების სტატუსი"
              data={[
                { name: 'დასრულებული', value: 65 },
                { name: 'დაგეგმილი', value: 20 },
                { name: 'გაუქმებული', value: 10 },
                { name: 'არ გამოცხადდა', value: 5 },
              ]}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  ვიზიტების მაჩვენებლები
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold">95</p>
                    <p className="text-sm text-muted-foreground">სულ ვიზიტები</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-success">62</p>
                    <p className="text-sm text-muted-foreground">დასრულებული</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-warning">28</p>
                    <p className="text-sm text-muted-foreground">დაგეგმილი</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-destructive">5</p>
                    <p className="text-sm text-muted-foreground">გაუქმებული</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}

      {selectedReport === 'patients' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AreaChart
              title="პაციენტების ზრდა"
              data={mockDashboardStats.patientGrowth}
              dataKey="total"
              xAxisKey="month"
              color="var(--chart-3)"
            />
            <PieChart
              title="პაციენტების აქტივობა"
              data={[
                { name: 'აქტიური', value: 85 },
                { name: 'არააქტიური', value: 15 },
              ]}
            />
          </div>
        </div>
      )}

      {selectedReport === 'services' && (
        <div className="space-y-6">
          <PieChart
            title="სერვისების განაწილება"
            data={mockDashboardStats.serviceDistribution}
            height={400}
          />
        </div>
      )}

      {selectedReport === 'doctors' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">ექიმების პროდუქტიულობა</CardTitle>
              <CardDescription>თვის მაჩვენებლები</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'თამარ ნიკოლაძე', specialty: 'თერაპევტი', patients: 45, revenue: 4500 },
                  { name: 'ზურაბ გოგიჩაშვილი', specialty: 'კარდიოლოგი', patients: 32, revenue: 5200 },
                  { name: 'ნათია მჭედლიშვილი', specialty: 'დერმატოლოგი', patients: 28, revenue: 3800 },
                  { name: 'გიორგი ხუციშვილი', specialty: 'ენდოკრინოლოგი', patients: 25, revenue: 2900 },
                ].map((doctor, index) => (
                  <motion.div
                    key={doctor.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
                  >
                    <div>
                      <p className="font-medium">{doctor.name}</p>
                      <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="text-right">
                        <p className="font-semibold">{doctor.patients}</p>
                        <p className="text-xs text-muted-foreground">პაციენტი</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-success">{doctor.revenue} ₾</p>
                        <p className="text-xs text-muted-foreground">შემოსავალი</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
