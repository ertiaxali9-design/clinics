"use client"

import { motion } from "framer-motion"
import {
  Building2,
  Users,
  CreditCard,
  TrendingUp,
  Activity,
  Server,
  Database,
  Cpu,
  HardDrive,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useI18n } from "@/lib/i18n"
import { mockTenants } from "@/lib/mock-data"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"

const platformStats = [
  {
    title: "totalTenants",
    value: "24",
    change: "+3",
    trend: "up",
    icon: Building2,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "activeUsers",
    value: "1,247",
    change: "+156",
    trend: "up",
    icon: Users,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    title: "monthlyRevenue",
    value: "₾89,420",
    change: "+12.5%",
    trend: "up",
    icon: CreditCard,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    title: "apiRequests",
    value: "2.4M",
    change: "+8.3%",
    trend: "up",
    icon: Activity,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
]

const revenueData = [
  { month: "იან", revenue: 65000, tenants: 18 },
  { month: "თებ", revenue: 72000, tenants: 19 },
  { month: "მარ", revenue: 78000, tenants: 20 },
  { month: "აპრ", revenue: 82000, tenants: 21 },
  { month: "მაი", revenue: 85000, tenants: 22 },
  { month: "ივნ", revenue: 89420, tenants: 24 },
]

const systemHealth = [
  { name: "API Server", status: "healthy", uptime: "99.98%", latency: "45ms" },
  { name: "Database", status: "healthy", uptime: "99.99%", latency: "12ms" },
  { name: "Storage", status: "warning", uptime: "99.95%", latency: "89ms" },
  { name: "CDN", status: "healthy", uptime: "100%", latency: "23ms" },
]

const resourceUsage = [
  { name: "CPU", value: 67, icon: Cpu },
  { name: "Memory", value: 72, icon: Server },
  { name: "Storage", value: 45, icon: HardDrive },
  { name: "Database", value: 38, icon: Database },
]

export default function AdminDashboardPage() {
  const { t } = useI18n()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            GOD MODE Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Platform-wide analytics and system monitoring
          </p>
        </div>
        <Button variant="destructive" className="gap-2">
          <AlertTriangle className="h-4 w-4" />
          System Alerts (3)
        </Button>
      </div>

      {/* Platform Stats */}
      <motion.div
        variants={itemVariants}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        {platformStats.map((stat) => (
          <Card key={stat.title} className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`rounded-xl p-3 ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div
                  className={`flex items-center gap-1 text-sm font-medium ${
                    stat.trend === "up" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">{t(stat.title)}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Chart */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Platform Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="hsl(var(--primary))"
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tenants Growth */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-blue-500" />
                Tenant Growth
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar
                      dataKey="tenants"
                      fill="hsl(var(--primary))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* System Health & Resources */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* System Health */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5 text-green-500" />
                System Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemHealth.map((service) => (
                  <div
                    key={service.name}
                    className="flex items-center justify-between rounded-lg border border-border p-4"
                  >
                    <div className="flex items-center gap-3">
                      {service.status === "healthy" ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      )}
                      <div>
                        <p className="font-medium">{service.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Uptime: {service.uptime}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={service.status === "healthy" ? "default" : "secondary"}
                        className={
                          service.status === "healthy"
                            ? "bg-green-500/10 text-green-500"
                            : "bg-yellow-500/10 text-yellow-500"
                        }
                      >
                        {service.status}
                      </Badge>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {service.latency}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Resource Usage */}
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cpu className="h-5 w-5 text-orange-500" />
                Resource Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {resourceUsage.map((resource) => (
                  <div key={resource.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <resource.icon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{resource.name}</span>
                      </div>
                      <span className="text-sm font-bold">{resource.value}%</span>
                    </div>
                    <Progress
                      value={resource.value}
                      className={`h-2 ${
                        resource.value > 80
                          ? "[&>div]:bg-red-500"
                          : resource.value > 60
                          ? "[&>div]:bg-yellow-500"
                          : "[&>div]:bg-green-500"
                      }`}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Tenants */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-blue-500" />
              Recent Tenants
            </CardTitle>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockTenants.slice(0, 5).map((tenant) => (
                <div
                  key={tenant.id}
                  className="flex items-center justify-between rounded-lg border border-border p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold"
                    >
                      {tenant.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{tenant.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {tenant.slug} | {tenant.plan} plan
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">{tenant.usersCount} users</p>
                      <p className="text-xs text-muted-foreground">
                        {tenant.patientsCount} patients
                      </p>
                    </div>
                    <Badge
                      variant={tenant.status === "active" ? "default" : "secondary"}
                      className={
                        tenant.status === "active"
                          ? "bg-green-500/10 text-green-500"
                          : ""
                      }
                    >
                      {tenant.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
