'use server'

import { redirect } from 'next/navigation'
import { createSession, deleteSession } from '@/app/lib/session'

export type LoginState = {
  error?: string
} | null

export async function login(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const username = formData.get('username') as string
  const password = formData.get('password') as string

  if (!username || !password) {
    return { error: 'กรุณากรอก Username และ Password' }
  }

  let data: { status: string; message: string; id: string; email: string; name: string }

  try {
    const res = await fetch(process.env.LDAP_API_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.LDAP_API_KEY!,
      },
      body: JSON.stringify({ email: username, password }),
    })

    data = await res.json()

    if (!res.ok || data.status !== 'success') {
      return { error: data.message || 'Username หรือ Password ไม่ถูกต้อง' }
    }
  } catch {
    return { error: 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง' }
  }

  await createSession({
    id: data.id,
    email: data.email,
    name: data.name,
  })

  redirect('/admin')
}

export async function logout() {
  await deleteSession()
  redirect('/login')
}
