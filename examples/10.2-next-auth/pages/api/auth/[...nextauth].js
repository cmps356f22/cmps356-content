import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth from "next-auth"
// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
const googleScopes = [
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/contacts',
  'https://www.googleapis.com/auth/youtube.readonly'
];

export const authOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: { params: { scope: 'user notifications' } },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: { 
        params: { 
          scope: googleScopes.join(' ')
        }
      }
    }),
    CredentialsProvider({
      name: 'CustomAuthProvider',
      // generate a suitable form on the sign in page.
      credentials: {
        username: {
          label: 'Email',
          type: 'email',
          placeholder: 'firnas@example.com'
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        console.log("CustomAuthProvider", credentials)
        // const res = await fetch('/your/endpoint', {
        //   method: 'POST',
        //   body: JSON.stringify(credentials),
        //   headers: { 'Content-Type': 'application/json' }
        // });

        // const user = await res.json();

        // If no error and we have user data, return it
        // if (res.ok && user) {
        //   return user;
        // }

        // return test user
        return { id: 1, 
                name: 'Abbas ibn Firnas', 
                email: credentials.username,
                image: 'https://science4fun.info/wp-content/uploads/2019/05/Abbas-Ibn-Firnas.jpg'
              }

        // Return null if user data could not be retrieved
        // return null;
      }
    })
  ],
  theme: {
    colorScheme: "light",
  },
  callbacks: {
        // This callback is called whenever a JSON Web Token is created (i.e. at sign in)
        // or updated (i.e whenever a session is accessed in the client).
        // The returned value will be signed and optionally encrypted,
        // and it is stored in a cookie

        // The arguments user, account, profile and isNewUser are only passed the first time
        // this callback is called on a new session, after the user signs in.
        // In subsequent calls, only token will be available.
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log("jwt callback")
      console.log("Token object returned after authentication:", token)
      console.log("Account object returned after authentication:", account)
      console.log("accessToken returned after authentication:", account?.access_token)
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token
        token.id = profile.id
      }
      return token
    },

    // session callback is where we specify what will be available on the client with useSession() or getSession().
    // The session callback is called WHENEVER a SESSION IS CHECKED.
    // By default, only a subset of the TOKEN is returned for increased security.
    // If you want to make something available you ADDED TO THE TOKEN through the jwt() callback,
    // you have to explicitly forward it here to make it available to the client.
    async session(props) {
      const { session, token, user } = props;
      console.log('session: props :>> ', props);
      if (user && session.user) {
				session.user.id = user.userId;
				session.accessToken = user.accessToken;
			}
			return session;

      /*
      // first time jwt callback is run, user object is available
      if (token) {
          session.user = token;
      }
      //if you want to add user details info
      return session;*/
  },
    /*sync session({ session, token, user }) {
      session.user.id = token.id;
      session.accessToken = token.accessToken;
      return session;
    },*/
    /*async jwt(token, user, account, profile, isNewUser) {
      console.log("jwt callback")
      console.log("Token object returned after authentication:", token)
      console.log("Account object returned after authentication:", token.account)
      console.log("accessToken returned after authentication:", token.account?.access_token)
      token.userRole = "admin"
      if (token?.account?.access_token) {
        token.access_token = token.account.access_token;
      }
      return token;
    },*/
  },
}

export default NextAuth(authOptions);

//export { default } from "next-auth/middleware"
//export const config = { matcher: ["/dashboard"] }