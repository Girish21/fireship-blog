import Link from 'next/link'
import * as React from 'react'
import styled from 'styled-components'
import { useAuthContext } from '../lib/context/AuthContext'
import { ButtonBlue, ButtonLogo } from './Button'
import { SignOutButton } from './SignoutButton'

type NavbarProp = {}

const StyledNavbar = styled.nav`
  height: 70px;
  width: 100%;
  background: white;
  color: var(--colors-text);
  position: fixed;
  top: 0;
  padding: 0 10vw;
  font-weight: bold;
  border-bottom: 1px solid var(--color-gray);
  z-index: 99;
`

const StyledUl = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`

const StyledLi = styled.li`
  border-radius: 50%;
`

const StyledPushleftLi = styled(StyledLi)`
  margin-left: auto;
`

const StyledProfileImg = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  cursor: pointer;
`

export const Navbar: React.FunctionComponent<NavbarProp> = () => {
  const { username, user } = useAuthContext()

  return (
    <StyledNavbar>
      <StyledUl>
        <StyledLi>
          <Link href='/'>
            <ButtonLogo>FEED</ButtonLogo>
          </Link>
        </StyledLi>
        {user && (
          <>
            <StyledPushleftLi>
              <SignOutButton />
            </StyledPushleftLi>
            <StyledLi>
              <Link href='/admin'>
                <ButtonBlue>Write Posts</ButtonBlue>
              </Link>
            </StyledLi>
            <StyledLi>
              <Link href={`/${username}`}>
                <StyledProfileImg
                  src={user?.photoURL || '/hacker.png'}
                  alt={username}
                />
              </Link>
            </StyledLi>
          </>
        )}
        {!user && (
          <>
            <StyledPushleftLi>
              <Link href='/enter'>
                <ButtonBlue>Log in</ButtonBlue>
              </Link>
            </StyledPushleftLi>
          </>
        )}
      </StyledUl>
    </StyledNavbar>
  )
}
