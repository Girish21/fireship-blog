import React from 'react'
import { ButtonGoogle } from '../components/Button'
import { auth, googleAuthProvider } from '../lib/firebase'

export const SignInButton = () => {
  const signinWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider)
  }

  return (
    <ButtonGoogle onClick={signinWithGoogle}>
      <img src='/google.png' /> Sign in with Google
    </ButtonGoogle>
  )
}
