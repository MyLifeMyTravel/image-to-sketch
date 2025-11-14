'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from '@/components/ui/breadcrumb'
import { useAuth } from '@/components/auth/auth-provider'
import {
  User,
  CreditCard,
  Settings,
  LogOut,
  Menu,
  Zap,
  Clock,
  TrendingUp,
  Gift,
  ArrowRight
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function CreditsPage() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  // 状态管理
  const [credits, setCredits] = useState({
    current: 10,
    max: 50,
    usedThisMonth: 5,
    totalEarned: 25,
    nextResetDate: '2024-12-01'
  })
  const [isPurchasing, setIsPurchasing] = useState(false)

  // 检查认证状态
  useEffect(() => {
    if (!loading && !user) {
      router.push('/')
    }
  }, [user, loading, router])

  if (loading || !user) {
    return (
      <SidebarProvider>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-muted-foreground">Loading...</div>
        </div>
      </SidebarProvider>
    )
  }

  const displayName = user.user_metadata?.full_name ||
                   user.user_metadata?.name ||
                   user.email?.split('@')[0] ||
                   'User'
  const avatarUrl = user.user_metadata?.avatar_url ||
                     user.user_metadata?.picture ||
                     ''
  const userEmail = user.email || ''
  const userInitials = displayName.slice(0, 2).toUpperCase()

  // 处理购买积分
  const handlePurchaseCredits = async (amount: number, price: string) => {
    setIsPurchasing(true)

    try {
      // 这里可以集成实际的支付系统
      // 模拟购买过程
      await new Promise(resolve => setTimeout(resolve, 2000))

      setCredits(prev => ({
        ...prev,
        current: prev.current + amount,
        totalEarned: prev.totalEarned + amount
      }))

      toast({
        title: "购买成功！",
        description: `您已成功购买${amount}个积分`,
      })
    } catch (error) {
      toast({
        title: "购买失败",
        description: "购买过程中出现问题，请稍后重试",
        variant: "destructive",
      })
    } finally {
      setIsPurchasing(false)
    }
  }

  // 积分套餐
  const creditPackages = [
    { credits: 50, price: '$4.99', savings: '17%', popular: true },
    { credits: 100, price: '$8.99', savings: '28%' },
    { credits: 200, price: '$14.99', savings: '40%' },
    { credits: 500, price: '$29.99', savings: '50%' },
  ]

  const creditPercentage = (credits.current / credits.max) * 100

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <img
                  alt="Logo"
                  title="Logo"
                  className="size-5 rounded-md"
                  src="/white-logo.svg"
                />
                <span className="truncate font-semibold text-base">Image to Sketch</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Settings</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="/settings/profile">
                      <User className="size-4" />
                      <span className="truncate font-medium text-sm">Profile</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="/settings/billing">
                      <CreditCard className="size-4" />
                      <span className="truncate font-medium text-sm">Billing</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive>
                    <Settings className="size-4" />
                    <span className="truncate font-medium text-sm">Credits</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" onClick={() => signOut()}>
                <Avatar className="size-8">
                  <AvatarImage src={avatarUrl} alt={displayName} />
                  <AvatarFallback>{userInitials}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{displayName}</span>
                  <span className="truncate text-xs text-muted-foreground">{userEmail}</span>
                </div>
                <LogOut className="size-4" />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height]">
          <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
            <SidebarTrigger>
              <Menu className="size-4" />
            </SidebarTrigger>
            <Separator orientation="vertical" className="mx-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">Settings</BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Credits</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="ml-auto flex items-center gap-3 pl-4">
              <Badge variant="outline" className="flex items-center gap-1">
                <Zap className="size-3" />
                {credits.current} Credits
              </Badge>
            </div>
          </div>
        </header>

        <div className="flex-1 space-y-6 p-4 md:p-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Credits</h1>
            <p className="text-muted-foreground">Manage your credits and usage</p>
          </div>

          {/* 当前积分状态 */}
          <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Zap className="size-5 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Current Credits</CardTitle>
                    <CardDescription>
                      Available for image conversion
                    </CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-purple-900">{credits.current}</div>
                  <p className="text-sm text-purple-700">of {credits.max} total</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-purple-600">{credits.usedThisMonth} used this month</div>
                  <div className="text-xs text-purple-500">Next reset: {credits.nextResetDate}</div>
                </div>
              </div>
              <Progress value={creditPercentage} className="h-3" />
            </CardContent>
          </Card>

          {/* 使用统计 */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <TrendingUp className="size-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{credits.totalEarned}</div>
                    <p className="text-sm text-muted-foreground">Total Credits Earned</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Clock className="size-4 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{credits.current}</div>
                    <p className="text-sm text-muted-foreground">Available Now</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Gift className="size-4 text-orange-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">Free</div>
                    <p className="text-sm text-muted-foreground">Monthly Credits</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 购买积分套餐 */}
          <Card>
            <CardHeader>
              <CardTitle>Purchase More Credits</CardTitle>
              <CardDescription>
                Choose the credit package that works best for you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {creditPackages.map((pkg, index) => (
                  <Card
                    key={index}
                    className={`relative ${pkg.popular ? 'ring-2 ring-purple-400 border-purple-200' : ''}`}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-purple-500 hover:bg-purple-600 text-white px-2 py-1 text-xs">
                          Most Popular
                        </Badge>
                      </div>
                    )}
                    <CardContent className="p-4 text-center">
                      <div className="mb-3">
                        <div className="text-2xl font-bold">{pkg.credits}</div>
                        <div className="text-sm text-muted-foreground">credits</div>
                      </div>
                      <div className="mb-4">
                        <div className="text-xl font-semibold text-green-600">{pkg.price}</div>
                        {pkg.savings && (
                          <div className="text-xs text-green-500 bg-green-50 rounded px-2 py-1 mt-1">
                            Save {pkg.savings}
                          </div>
                        )}
                      </div>
                      <Button
                        onClick={() => handlePurchaseCredits(pkg.credits, pkg.price)}
                        disabled={isPurchasing}
                        className="w-full"
                        variant={pkg.popular ? "default" : "outline"}
                      >
                        {isPurchasing ? (
                          <>
                            <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                            Processing...
                          </>
                        ) : (
                          <>
                            Purchase
                            <ArrowRight className="size-3 ml-2" />
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 获取更多积分的方法 */}
          <Card>
            <CardHeader>
              <CardTitle>Get Free Credits</CardTitle>
              <CardDescription>
                Complete these tasks to earn additional credits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center gap-3 p-4 border rounded-lg">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Gift className="size-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">Refer a Friend</div>
                    <div className="text-sm text-muted-foreground">Get 10 credits for each successful referral</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 border rounded-lg">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <TrendingUp className="size-4 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium">Daily Login</div>
                    <div className="text-sm text-muted-foreground">Earn 1 credit for consecutive daily logins</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

// BreadcrumbSeparator组件
function BreadcrumbSeparator() {
  return (
    <div className="flex items-center gap-1">
      <div className="w-px h-4 bg-border rotate-12" />
    </div>
  )
}