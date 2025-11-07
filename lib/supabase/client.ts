'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/types/database'

// 客户端 Supabase 客户端
export function createSupabaseClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// 使用 Auth Helpers 的客户端（推荐用于客户端组件）
export const supabase = createClientComponentClient<Database>()