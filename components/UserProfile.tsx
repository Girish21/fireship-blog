import * as React from 'react'
import { User } from '../types'
import { BoxCenter } from './Box'
import { CardImageCenter } from './Card'

type UserProfileProp = {
  user: User
}

export const UserProfile: React.FunctionComponent<UserProfileProp> = ({
  user,
}) => (
  <BoxCenter>
    <CardImageCenter src={user.photoURL} alt={user.username} />
    <p>
      <i>@{user.username}</i>
    </p>
    <h1>{user.displayName}</h1>
  </BoxCenter>
)
