// This is an example of to protect an API route
import { unstable_getServerSession as getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)

  if (session) {
    return res.send({
      content:
        'This is protected content. You can access this content because you are signed in as',
        ...session
    })
  }

  res.send({
    error: "You must be signed in to view this protected content.",
  })
}