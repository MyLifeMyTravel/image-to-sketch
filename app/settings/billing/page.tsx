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
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from '@/components/ui/breadcrumb'
import { useAuth } from '@/components/auth/auth-provider'
import {
  User,
  CreditCard,
  Settings,
  LogOut,
  Menu,
  Crown
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function BillingPage() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  // 状态管理
  const [isUpgrading, setIsUpgrading] = useState(false)

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

  // 处理升级计划
  const handleUpgrade = async () => {
    setIsUpgrading(true)

    try {
      // 这里可以集成实际的支付系统（如Stripe）
      // 模拟升级过程
      await new Promise(resolve => setTimeout(resolve, 2000))

      toast({
        title: "升级成功！",
        description: "您已成功升级到Pro计划",
      })
    } catch (error) {
      toast({
        title: "升级失败",
        description: "升级过程中出现问题，请稍后重试",
        variant: "destructive",
      })
    } finally {
      setIsUpgrading(false)
    }
  }

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
                  <SidebarMenuButton isActive>
                    <CreditCard className="size-4" />
                    <span className="truncate font-medium text-sm">Billing</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="/settings/credits">
                      <Settings className="size-4" />
                      <span className="truncate font-medium text-sm">Credits</span>
                    </a>
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
                  <BreadcrumbPage>Billing</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="ml-auto flex items-center gap-3 pl-4">
            </div>
          </div>
        </header>

        <div className="flex-1 space-y-6 p-4 md:p-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Billing</h1>
            <p className="text-muted-foreground">Manage your subscription and billing details</p>
          </div>

          {/* 当前计划 */}
          <div className="w-full max-w-2xl">
            <Card className="bg-card text-card-foreground gap-6 rounded-xl border py-6 shadow-sm w-full overflow-hidden flex flex-col">
              <CardHeader>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>
                  Your current plan details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold">Free</h3>
                    <p className="text-muted-foreground">You are currently on the free plan with limited features</p>
                  </div>
                  <Button
                    onClick={handleUpgrade}
                    disabled={isUpgrading}
                    size="lg"
                  >
                    {isUpgrading ? 'Processing...' : 'Upgrade Plan'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
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