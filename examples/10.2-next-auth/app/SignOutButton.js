"use client"
import styles from "./header.module.css"
import { signOut } from "next-auth/react"

export function SignOut() {
  return (
    <button className={styles.button} onClick={() => signOut()}>
      Sign out
    </button>
  )
}