"use client"
import styles from "./header.module.css"
import { signIn } from "next-auth/react"

const capitalizeFirstLetter = str => `${str[0].toUpperCase()}${str.slice(1)}`

export function SignIn({provider}) {
  return (
    <button className={styles.buttonPrimary} onClick={() => signIn(provider)}>
      Sign in with {capitalizeFirstLetter(provider)}
    </button>
  )
}