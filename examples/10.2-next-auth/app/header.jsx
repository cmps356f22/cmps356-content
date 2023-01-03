import styles from "./header.module.css"
import { SignIn } from "./SignInButton"
import { SignOut } from "./SignOutButton"
import { unstable_getServerSession as getServerSession } from "next-auth/next"

export default async function Header() {
  const session = await getServerSession()
  console.log("Current User Session:", session)

  return (
    <header className={styles.signedInStatus}>
      <div className={styles.loaded}>
        {session?.user ? (
          <>
            {session.user.image && (
              <span
                style={{ backgroundImage: `url('${session.user.image}')` }}
                className={styles.avatar}
              />
            )}
            <span className={styles.signedInText}>
              <small>Signed in as</small>
              <br />
              <strong>{session.user.name} ({session.user.email})</strong>
            </span>
            <SignOut />
          </>
        ) : (
          <>
            <span className={styles.notSignedInText}>
              You are not signed in
            </span>
            
            <SignIn provider={'github'}/>
            <SignIn provider={'google'}/>
            <SignIn provider={'CustomAuthProvider'}/>
          </>
        )}
      </div>
    </header>
  )
}
