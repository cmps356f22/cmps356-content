"use client"
import { useSession, signIn, signOut, SessionProvider } from "next-auth/react";

export default function Dashboad() {
  return <SessionProvider>
      <IndexPage />
  </SessionProvider>
}

function IndexPage() {
  const { session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
        <h1>Dashboard Page</h1>
        <p>
          This is a secure page only accessible to authenticated admin users.
        </p>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}
