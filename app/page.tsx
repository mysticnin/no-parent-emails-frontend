import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import LogoutButton from '@/components/logout-button'

const resources = [
  {
    title: 'Cookie-based Auth and the Next.js App Router',
    subtitle:
      'This free course by Jon Meyers, shows you how to configure Supabase Auth to use cookies, and steps through some common patterns.',
    url: 'https://youtube.com/playlist?list=PL5S4mPUpp4OtMhpnp93EFSo42iQ40XjbF',
    icon: 'youtube',
  },
  {
    title: 'Supabase Next.js App Router Example',
    subtitle:
      'Want to see a code example containing some common patterns with Next.js and Supabase? Check out this repo!',
    url: 'https://github.com/supabase/supabase/tree/master/examples/auth/nextjs',
    icon: 'code',
  },
  {
    title: 'Supabase Auth Helpers Docs',
    subtitle:
      'This template has configured Supabase Auth to use cookies for you, but the docs are a great place to learn more.',
    url: 'https://supabase.com/docs/guides/auth/auth-helpers/nextjs',
    icon: 'book',
  },
]

const examples = [
  { type: 'Client Components', src: 'app/_examples/client-component/page.tsx' },
  { type: 'Server Components', src: 'app/_examples/server-component/page.tsx' },
  { type: 'Server Actions', src: 'app/_examples/server-action/page.tsx' },
  { type: 'Route Handlers', src: 'app/_examples/route-handler.ts' },
  { type: 'Middleware', src: 'app/middleware.ts' },
  { type: 'Protected Routes', src: 'app/_examples/protected/page.tsx' },
]

export default async function Index() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="flex flex-col flex-1 max-w-3xl">
      <h1 className="flex justify-between mb-2 text-2xl">
        <span className="sr-only">Supabase and Next.js Starter Template</span>
      </h1>

      <div className="flex py-3 text-sm border-b border-neutral-500 text-primary">
        <span className="ml-auto">
          {user ? (
            <span className="flex gap-4">
              Hey, {user.email}! <span className="border-r"></span>{' '}
              <LogoutButton />
            </span>
          ) : (
            <div>
              <Link href="/login" className="text-primary hover:underline">
                Login
              </Link>
            </div>
          )}
        </span>
      </div>

      <div className="flex justify-center gap-8 mt-12">
        <Image
          src="/supabase.svg"
          alt="Supabase Logo"
          width={225}
          height={45}
          priority
        />
        <div className="h-10 rotate-45 border-l border-black"></div>
        <Image
          src="/next.svg"
          alt="Vercel Logo"
          width={150}
          height={36}
          priority
        />
      </div>

      <p className="max-w-2xl mx-auto mt-8 text-3xl text-center text-secondary">
        The fastest way to get started building apps with{' '}
        <strong>Supabase</strong> and <strong>Next.js</strong>
      </p>

      <div className="flex justify-center mt-16">
        <span className="px-6 py-3 font-mono text-sm rounded-lg bg-neutral-100 text-secondary">
          Get started by editing <strong>app/page.tsx</strong>
        </span>
      </div>

      <p className="text-lg font-bold text-center text-primary mt-28">
        Everything you need to started
      </p>

      <div className="flex gap-12 mt-10 mb-16 -mx-12 h-60">
        {resources.map(({ title, subtitle, url, icon }) => (
          <a
            key={title}
            className="grid gap-4 py-6 pr-2 border-t-2 border-secondary group text-primary"
            href={url}
          >
            <h2 className="font-bold mb-2 group-hover:underline min-h-[42px]">
              {title}
            </h2>
            <p className="text-sm text-primary">{subtitle}</p>
            <div className="mt-2">
              <Image
                src={`/${icon}.svg`}
                alt="Vercel Logo"
                width={20}
                height={25}
                priority
              />
            </div>
          </a>
        ))}
      </div>

      <div className="grid justify-center max-w-lg gap-3 mx-auto mt-16 text-center">
        <p className="text-lg font-bold text-center text-primary">
          Examples
        </p>
        <p className="mb-2 text-primary">
          Look in the <code>_examples</code> folder to see how to create a
          Supabase client in all the different contexts
        </p>
      </div>

      <div className="grid justify-center mt-8 mb-24 border-t text-primary border-neutral-500">
        {examples.map(({ type, src }) => (
          <div className="" key={type}>
            <div className="grid grid-cols-2 gap-4 border-b border-neutral-500">
              <span className="py-4 pr-4 font-bold text-right border-r border-neutral-500">
                {type}{' '}
              </span>
              <span className="py-4">
                <code className="text-sm">{src}</code>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
