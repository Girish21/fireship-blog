import React from 'react'
import { Button } from '../components/Button'
import { auth } from '../lib/firebase'

export const SignOutButton = () => {
	return <Button onClick={() => auth.signOut()}>Sign Out</Button>
}
