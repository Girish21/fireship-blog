import * as React from 'react'
import styled from 'styled-components'

export const Button = styled.button`
	background-color: var(--color-gray);
	border: none;
	color: var(--color-text);
	padding: 1rem 2rem;
	display: flex;
	align-items: center;
	text-align: center;
	justify-content: center;
	text-decoration: none;
	font-family: 'Noto Sans', sans-serif;
	font-weight: bold;
	border-radius: 0.25rem;
	cursor: pointer;
	margin: 0.5rem 1rem 0.5rem 0;

	&:hover {
		filter: brightness(90%);
	}

	&:disabled,
	&[disabled] {
		filter: brightness(80%);
		cursor: not-allowed;
	}

	@media only screen and (max-width: 768px) {
		padding: 0.5rem 1rem;
		font-size: 0.8rem;
	}
`

export const ButtonLogo = styled(Button)`
	background-color: var(--color-text);
	color: white;
	text-transform: uppercase;
	font-size: 1.5rem;
	padding: 0.5rem 1rem;
`

export const ButtonBlue = styled(Button)`
	background-color: var(--color-blue);
	color: white;
`

export const ButtonRed = styled(Button)`
	background-color: var(--color-red);
	color: white;
`

export const ButtonGreen = styled(Button)`
	background-color: var(--color-green);
	color: white;
`

export const ButtonGoogle = styled(Button)`
	background-color: white;
	color: var(--color-text);

	& img {
		width: 30px;
		margin-right: 10px;
	}
`
