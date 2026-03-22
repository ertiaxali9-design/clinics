"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import {
  ArrowRight,
  Check,
  Star,
  Building2,
  Users,
  Calendar,
  CreditCard,
  BarChart3,
  Shield,
  Globe,
  Zap,
  Heart,
  Phone,
  Mail,
  MapPin,
  Moon,
  Sun,
  ChevronDown,
  Play,
  Sparkles,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useI18n, type Locale } from "@/lib/i18n"
import { cn } from "@/lib/utils"

const features = [
  {
    icon: Users,
    titleKey: "patientManagement",
    descKey: "patientManagementDesc",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Calendar,
    titleKey: "appointments",
    descKey: "appointmentsDesc",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    icon: CreditCard,
    titleKey: "billing",
    descKey: "billingDesc",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: BarChart3,
    titleKey: "analytics",
    descKey: "analyticsDesc",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    icon: Shield,
    titleKey: "security",
    descKey: "securityDesc",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
  {
    icon: Globe,
    titleKey: "multiLanguage",
    descKey: "multiLanguageDesc",
    color: "text-teal-500",
    bgColor: "bg-teal-500/10",
  },
]

const pricingPlans = [
  {
    name: "Starter",
    price: "₾199",
    period: "/თვე",
    description: "მცირე კლინიკებისთვის",
    features: [
      "5 მომხმარებელი",
      "500 პაციენტი",
      "ძირითადი რეპორტები",
      "Email მხარდაჭერა",
    ],
    cta: "დაწყება",
    popular: false,
  },
  {
    name: "Professional",
    price: "₾499",
    period: "/თვე",
    description: "მზარდი კლინიკებისთვის",
    features: [
      "20 მომხმარებელი",
      "შეუზღუდავი პაციენტი",
      "სრული ანალიტიკა",
      "RS.ge ინტეგრაცია",
      "24/7 მხარდაჭერა",
    ],
    cta: "აირჩიეთ",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "დიდი ორგანიზაციებისთვის",
    features: [
      "შეუზღუდავი მომხმარებელი",
      "White-label ბრენდინგი",
      "კუსტომ ინტეგრაციები",
      "დედიკატივი მხარდაჭერა",
      "SLA გარანტია",
    ],
    cta: "დაგვიკავშირდით",
    popular: false,
  },
]

const testimonials = [
  {
    name: "დავით მელაძე",
    role: "კლინიკის დირექტორი",
    company: "მედი+",
    content:
      "Marte-მ მთლიანად შეცვალა ჩვენი კლინიკის მუშაობის პროცესი. რეგისტრაცია, დოკუმენტაცია და ბილინგი ახლა ერთ სისტემაშია.",
    avatar: "DM",
    rating: 5,
  },
  {
    name: "ნინო ბერიძე",
    role: "მმართველი პარტნიორი",
    company: "დენტალ კეა",
    content:
      "RS.ge ინტეგრაცია და ავტომატური ზედნადების შექმნა გენიალურია. დავზოგეთ თვეში 20+ საათი ადმინისტრაციულ სამუშაოზე.",
    avatar: "NB",
    rating: 5,
  },
  {
    name: "გიორგი ხარაიშვილი",
    role: "IT მენეჯერი",
    company: "ჰელთქეა ქსელი",
    content:
      "Multi-tenant არქიტექტურა საშუალებას გვაძლევს ერთი პანელიდან ვმართოთ 12 კლინიკა სხვადასხვა ლოკაციაზე.",
    avatar: "GK",
    rating: 5,
  },
]

const stats = [
  { value: "150+", label: "კლინიკა" },
  { value: "50,000+", label: "პაციენტი" },
  { value: "99.9%", label: "Uptime" },
  { value: "24/7", label: "მხარდაჭერა" },
]

export default function LandingPage() {
  const { theme, setTheme } = useTheme()
  const { locale, setLocale, t } = useI18n()
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])

  const languages: { code: Locale; label: string; flag: string }[] = [
    { code: "ka", label: "ქართული", flag: "GE" },
    { code: "en", label: "English", flag: "US" },
    { code: "ru", label: "Русский", flag: "RU" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">Marte</span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              {t("features")}
            </a>
            <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              {t("pricing")}
            </a>
            <a href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              {t("testimonials")}
            </a>
            <a href="#contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              {t("contact")}
            </a>
          </div>

          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLocale(lang.code)}
                    className={cn(locale === lang.code && "bg-muted")}
                  >
                    <span className="mr-2">{lang.flag}</span>
                    {lang.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            <Link href="/dashboard">
              <Button variant="ghost">{t("login")}</Button>
            </Link>
            <Link href="/dashboard">
              <Button className="gap-2">
                {t("startFreeTrial")}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />

        <motion.div
          style={{ opacity, scale }}
          className="relative mx-auto max-w-7xl px-6 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Badge variant="secondary" className="mb-6 gap-2 px-4 py-2">
              <Sparkles className="h-4 w-4 text-primary" />
              {t("newFeature")}
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {t("heroTitle")}
            <br />
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {t("heroTitleHighlight")}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl"
          >
            {t("heroDescription")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link href="/dashboard">
              <Button size="lg" className="gap-2 px-8">
                {t("startFreeTrial")}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="gap-2 px-8">
              <Play className="h-5 w-5" />
              {t("watchDemo")}
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mx-auto mt-20 grid max-w-3xl grid-cols-2 gap-8 md:grid-cols-4"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl font-bold text-foreground md:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              {t("features")}
            </Badge>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              {t("featuresTitle")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              {t("featuresDescription")}
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.titleKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className={cn("inline-flex rounded-xl p-3", feature.bgColor)}>
                      <feature.icon className={cn("h-6 w-6", feature.color)} />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-foreground">
                      {t(feature.titleKey)}
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      {t(feature.descKey)}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              {t("pricing")}
            </Badge>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              {t("pricingTitle")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              {t("pricingDescription")}
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  className={cn(
                    "relative h-full",
                    plan.popular && "border-primary shadow-lg shadow-primary/20"
                  )}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground">
                        {t("mostPopular")}
                      </Badge>
                    </div>
                  )}
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-foreground">
                      {plan.name}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {plan.description}
                    </p>
                    <div className="mt-4 flex items-baseline">
                      <span className="text-4xl font-bold text-foreground">
                        {plan.price}
                      </span>
                      <span className="ml-1 text-muted-foreground">
                        {plan.period}
                      </span>
                    </div>
                    <ul className="mt-6 space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <Check className="h-5 w-5 text-primary" />
                          <span className="text-sm text-muted-foreground">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="mt-8 w-full"
                      variant={plan.popular ? "default" : "outline"}
                    >
                      {plan.cta}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              {t("testimonials")}
            </Badge>
            <h2 className="text-3xl font-bold text-foreground md:text-4xl">
              {t("testimonialsTitle")}
            </h2>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex gap-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="mt-4 text-muted-foreground">
                      "{testimonial.content}"
                    </p>
                    <div className="mt-6 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary/80 p-12 text-center md:p-20">
            <div className="absolute inset-0 bg-grid-white/10" />
            <div className="relative">
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                {t("ctaTitle")}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-white/80">
                {t("ctaDescription")}
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Input
                  type="email"
                  placeholder={t("enterEmail")}
                  className="max-w-xs bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
                <Button size="lg" variant="secondary" className="gap-2">
                  {t("startFreeTrial")}
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="border-t border-border bg-muted/30 py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <Link href="/" className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70">
                  <Heart className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-foreground">Marte</span>
              </Link>
              <p className="mt-4 text-sm text-muted-foreground">
                Healthcare & Business Management SaaS Platform
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                თბილისი, საქართველო
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-foreground">პროდუქტი</h4>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground">ფუნქციონალი</a></li>
                <li><a href="#pricing" className="hover:text-foreground">ფასები</a></li>
                <li><a href="#" className="hover:text-foreground">ინტეგრაციები</a></li>
                <li><a href="#" className="hover:text-foreground">API დოკუმენტაცია</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground">კომპანია</h4>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">ჩვენს შესახებ</a></li>
                <li><a href="#" className="hover:text-foreground">ბლოგი</a></li>
                <li><a href="#" className="hover:text-foreground">კარიერა</a></li>
                <li><a href="#" className="hover:text-foreground">კონტაქტი</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground">კონტაქტი</h4>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  info@marte.ge
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  +995 32 222 3333
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © 2024 Marte. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground">Privacy Policy</a>
              <a href="#" className="hover:text-foreground">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
