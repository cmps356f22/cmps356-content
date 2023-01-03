// This is an example of how to access a session from an API route
import { unstable_getServerSession as getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)

  if (session) {
    return res.send(JSON.stringify(session, null, 2))
  }

  res.send({
    error: "You are not signed in.",
  })
}