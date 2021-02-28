import { Meta } from '../components/Meta'
import { SignInButton } from '../components/SignInButton'
import { SignOutButton } from '../components/SignoutButton'
import { UsernameForm } from '../components/UsernameForm'
import { useAuthContext } from '../lib/context/AuthContext'

export default function Page({}) {
  const { user, username } = useAuthContext()

  return (
    <main>
      <Meta title='Sign up for the next awesome app!' />
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
