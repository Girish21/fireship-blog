import Link from 'next/link'
import * as React from 'react'
import { useAuthContext } from '../lib/context/AuthContext'
import { ButtonRed } from './Button'

type AuthcheckProp = {
  fallback?: React.ReactNode
}

export const Authcheck: React.FunctionComponent<AuthcheckProp> = ({
  children,
  fallback = null,
}) => {
  const { username } = useAuthContext()

  return (
    <>
      {username
        ? children
        : fallback || (
            <Link href='/enter'>
              <ButtonRed>You must be signedin</ButtonRed>
            </Link>
          )}
    </>
  )
}
