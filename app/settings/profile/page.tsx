'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
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
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from '@/components/ui/breadcrumb'
import { useAuth } from '@/components/auth/auth-provider'
import { Upload, User, Settings, CreditCard, LogOut, Menu } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function ProfilePage() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  // 状态管理
  const [displayName, setDisplayName] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  // 初始化用户数据
  useEffect(() => {
    if (user) {
      const name = user.user_metadata?.full_name ||
                   user.user_metadata?.name ||
                   user.email?.split('@')[0] ||
                   'User'
      const avatar = user.user_metadata?.avatar_url ||
                     user.user_metadata?.picture ||
                     ''

      setDisplayName(name)
      setAvatarUrl(avatar)
    }
  }, [user])

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

  // 处理名称保存
  const handleSaveName = async (e: React.FormEvent) => {
    e.preventDefault()

    if (displayName.length < 3 || displayName.length > 30) {
      toast({
        title: "Invalid Name",
        description: "Please use 3-30 characters for your name",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)

    try {
      // 获取session token
      const { data: { session } } = await createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      ).auth.getSession()

      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({
          displayName,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update profile')
      }

      toast({
        title: "Profile Updated",
        description: "Your name has been updated successfully",
      })
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update your profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  // 处理头像上传
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // 检查文件大小 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please select an image smaller than 5MB",
        variant: "destructive",
      })
      return
    }

    // 检查文件类型
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File Type",
        description: "Please select a valid image file",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    try {
      // 获取session token
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )
      const { data: { session } } = await supabase.auth.getSession()

      const formData = new FormData()
      formData.append('avatar', file)

      const response = await fetch('/api/user/avatar', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session?.access_token}`,
        },
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to upload avatar')
      }

      const data = await response.json()
      setAvatarUrl(data.avatarUrl)

      toast({
        title: "Avatar Updated",
        description: "Your avatar has been updated successfully",
      })
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Failed to upload avatar. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const userEmail = user.email || ''
  const userInitials = displayName.slice(0, 2).toUpperCase()

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
                  <SidebarMenuButton isActive>
                    <User className="size-4" />
                    <span className="truncate font-medium text-sm">Profile</span>
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
              <SidebarMenuButton size="lg">
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
                  <BreadcrumbPage>Profile</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="ml-auto flex items-center gap-3 pl-4">
              <Button variant="outline" size="sm">
                0
              </Button>
            </div>
          </div>
        </header>

        <div className="flex-1 space-y-4 p-4 md:p-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
            <p className="text-muted-foreground">Manage your account information</p>
          </div>

          <div className="max-w-2xl space-y-6">
            {/* 名称编辑卡片 */}
            <Card className="bg-card text-card-foreground gap-6 rounded-xl border py-6 shadow-sm w-full overflow-hidden pt-6 pb-0 flex flex-col">
              <CardHeader className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6">
                <CardTitle className="text-lg font-semibold">Name</CardTitle>
                <CardDescription className="text-muted-foreground text-sm">Please enter your display name</CardDescription>
              </CardHeader>
              <form className="flex flex-col flex-1" onSubmit={handleSaveName}>
                <CardContent className="px-6 space-y-4 flex-1">
                  <Input
                    placeholder="Enter your name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    disabled={isSaving}
                  />
                </CardContent>
                <CardFooter className="[.border-t]:pt-6 mt-6 px-6 py-4 flex justify-between items-center bg-muted rounded-none">
                  <p className="text-sm text-muted-foreground">
                    Please use 3-30 characters for your name
                  </p>
                  <Button type="submit" disabled={isSaving}>
                    {isSaving ? 'Saving...' : 'Save'}
                  </Button>
                </CardFooter>
              </form>
            </Card>

            {/* 头像上传卡片 */}
            <Card className="bg-card text-card-foreground gap-6 rounded-xl border py-6 shadow-sm w-full overflow-hidden pt-6 pb-0 flex flex-col">
              <CardHeader className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6">
                <CardTitle className="text-lg font-semibold">Avatar</CardTitle>
                <CardDescription className="text-muted-foreground text-sm">Click upload button to upload a custom one</CardDescription>
              </CardHeader>
              <div className="flex flex-col flex-1">
                <CardContent className="px-6 space-y-4 flex-1">
                  <div className="flex flex-col items-center sm:flex-row gap-4 sm:gap-8">
                    <Avatar className="size-16 border">
                      <AvatarImage src={avatarUrl} alt={displayName} />
                      <AvatarFallback className="text-lg">{userInitials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        className="hidden"
                        id="avatar-upload"
                        disabled={isUploading}
                      />
                      <Button
                        variant="outline"
                        asChild
                        disabled={isUploading}
                      >
                        <label htmlFor="avatar-upload" className="cursor-pointer flex items-center gap-1.5">
                          <Upload className="size-4" />
                          {isUploading ? 'Uploading...' : 'Upload Avatar'}
                        </label>
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="[.border-t]:pt-6 mt-6 px-6 py-4 flex justify-between items-center bg-muted rounded-none">
                  <p className="text-sm text-muted-foreground">
                    An avatar is optional but strongly recommended
                  </p>
                </CardFooter>
              </div>
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