import { SignInButton } from '../components/SignInButton'
import { SignOutButton } from '../components/SignoutButton'
import { UsernameForm } from '../components/UsernameForm'
import { useAuthContext } from '../lib/context/AuthContext'

export default function Page({}) {
  const { user, username } = useAuthContext()

  return (
    <main>
      {user ? (
        !username ? (
          <UsernameForm />
        ) : (
          <SignOutButton />
        )
      ) : (
        <SignInButton />
      )}
    </main>
  )
}
