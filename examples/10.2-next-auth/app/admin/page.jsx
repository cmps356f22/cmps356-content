import { unstable_getServerSession as getServerSession } from "next-auth/next"

export default async function IndexPage() {
  const session = await getServerSession()
  console.log("Current User Session:", session)

  return (
    session ? (
    <>
      <h1>Welcome to Admin Page</h1>
      <p>
        You are an authenticated admin user {session.user.email}
      </p>
    </> ) :
    (<h1>Access designed. This is a secure page only accessible to authenticated admin users.</h1>)
  )
}
