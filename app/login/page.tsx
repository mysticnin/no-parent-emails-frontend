'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import GoogleLoginButton from '../google-login-button'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [view, setView] = useState('sign-in')
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })
    setView('check-email')
  }

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await supabase.auth.signInWithPassword({
      email,
      password,
    })
    router.push('/')
  }

  return (
    <div className="flex flex-col justify-center flex-1 w-full max-w-sm gap-2">
      {view === 'check-email' ? (
        <p className="text-center text-neutral-400">
          Check <span className="font-bold text-white">{email}</span> to
          continue signing up
        </p>
      ) : (
        <form
          className="flex flex-col justify-center flex-1 w-full max-w-sm gap-2"
          onSubmit={view === 'sign-in' ? handleSignIn : handleSignUp}
        >
          <label className="text-md text-neutral-400" htmlFor="email">
            Email
          </label>
          <input
            className="px-4 py-2 mb-6 border rounded-md bg-inherit text-neutral-100"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="you@example.com"
          />
          <label className="text-md text-neutral-400" htmlFor="password">
            Password
          </label>
          <input
            className="px-4 py-2 mb-6 border rounded-md bg-inherit text-neutral-100"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="••••••••"
          />
          {view === 'sign-in' ? (
            <>
              <button className="px-4 py-2 mb-6 bg-green-700 rounded text-neutral-200">
                Sign In
              </button>
              <p className="text-sm text-center text-neutral-500">
                Don't have an account?
                <button
                  className="ml-1 text-white underline"
                  onClick={() => setView('sign-up')}
                >
                  Sign Up Now
                </button>
              </p>
            </>
          ) : null}
          {view === 'sign-up' ? (
            <>
              <button className="px-4 py-2 mb-6 bg-green-700 rounded text-neutral-200">
                Sign Up
              </button>
              <p className="text-sm text-center text-neutral-500">
                Already have an account?
                <button
                  className="ml-1 text-white underline"
                  onClick={() => setView('sign-in')}
                >
                  Sign In Now
                </button>
              </p>
            </>
          ) : null}
          <GoogleLoginButton />
        </form>
      )}
    </div>
  )
}
