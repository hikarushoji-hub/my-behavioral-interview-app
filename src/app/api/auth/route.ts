import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

export async function POST(request: NextRequest) {
  const { email, password, type } = await request.json()

  if (type === 'login') {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    return error ? NextResponse.json({ error: error.message }, { status: 400 })
                 : NextResponse.json({ user: data.user })
  }

  if (type === 'signup') {
    const { data, error } = await supabase.auth.signUp({ email, password })
    return error ? NextResponse.json({ error: error.message }, { status: 400 })
                 : NextResponse.json({ user: data.user })
  }

  return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
}

export async function DELETE() {
  const { error } = await supabase.auth.signOut()
  return error ? NextResponse.json({ error: error.message }, { status: 400 })
               : NextResponse.json({ message: 'Logged out' })
}
