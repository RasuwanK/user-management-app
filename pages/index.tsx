import Head from 'next/head'
import Image from 'next/image'
import {Fragment} from "react";
import { Inter } from 'next/font/google'
import {useSession, useSupabaseClient} from "@supabase/auth-helpers-react";
import {Auth} from "@supabase/auth-ui-react";
import {ThemeSupa} from "@supabase/auth-ui-shared";
import Account from '@/components/Account';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const session = useSession();
  const supabase = useSupabaseClient();
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="description" content="This is starter app for supabase" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${inter.className} container`} style={{padding: '50px 0px 100px 0px'}}>
        {!session ? (
          <Auth 
            supabaseClient={supabase}
            theme="dark" 
            appearance={{theme: ThemeSupa}}
          />
        ): (
          <Account session={session} />
        )}
      </main>
    </>
  )
}
