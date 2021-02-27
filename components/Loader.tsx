import * as React from 'react'
import styled, { keyframes } from 'styled-components'

type LoaderProp = {
	show: boolean
}

const animationKeyframe = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const StyledLoader = styled.div`
	width: var(--loader-width, 50px);
	height: var(--loader-height, 50px);
	border-radius: 50%;
	border: 10px solid var(--color-bg);
	border-top: 10px solid var(--color-blue);
  animation: ${animationKeyframe} 2s linear infinite;
`

export const Loader: React.FunctionComponent<LoaderProp> = ({ show }) => {
	return show ? <StyledLoader /> : null
}
