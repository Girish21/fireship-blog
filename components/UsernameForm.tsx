import debounce from 'lodash.debounce'
import * as React from 'react'
import { useAuthContext } from '../lib/context/AuthContext'
import { firestore } from '../lib/firebase'
import { ButtonGreen } from './Button'

type UsernameFormProp = Record<string, unknown>
type UsernameMessageProp = {
	username: string
	isValid: boolean
	loading: boolean
}

const UsernameMessage: React.FunctionComponent<UsernameMessageProp> = ({
	username,
	isValid,
	loading,
}) => {
	if (loading) {
		return <p>Checking...</p>
	} else if (isValid) {
		return <p className='text-success'>{username} is available!</p>
	} else if (username && !isValid) {
		return <p className='text-danger'>That username is taken!</p>
	} else {
		return <p></p>
	}
}

export const UsernameForm: React.FunctionComponent<UsernameFormProp> = () => {
	const [formValue, setFormValue] = React.useState('')
	const [isValid, setIsValid] = React.useState(false)
	const [loading, setLoading] = React.useState(false)

	const { user, username } = useAuthContext()

	const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault()

		const userDoc = firestore.doc(`users/${user.uid}`)
		const usernameDoc = firestore.doc(`usernames/${formValue}`)

		const batch = firestore.batch()
		batch.set(userDoc, {
			username: formValue,
			photoURL: user.photoURL,
			displayName: user.displayName,
		})
		batch.set(usernameDoc, { uid: user.uid })

		await batch.commit()
	}

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.toLowerCase()
		const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/

		if (value.length < 3) {
			setIsValid(false)
			setLoading(false)
		}

		if (re.test(value)) {
			setLoading(true)
			setIsValid(false)
		}

		setFormValue(value)
	}

	const checkUsername = React.useCallback(
		debounce(async (username: string) => {
			if (username.length > 3) {
				const ref = firestore.doc(`usernames/${username}`)
				const { exists } = await ref.get()
				setIsValid(!exists)
				setLoading(false)
			}
		}, 500),
		[]
	)

	React.useEffect(() => checkUsername(formValue), [formValue])

	return (
		!username && (
			<section>
				<h3>Choose Username</h3>
				<form onSubmit={onSubmit}>
					<input
						name='username'
						placeholder='Username'
						value={formValue}
						onChange={onChange}
						autoComplete='off'
					/>
					<ButtonGreen type='submit' disabled={!isValid}>
						Choose
					</ButtonGreen>
					<UsernameMessage
						isValid={isValid}
						loading={loading}
						username={formValue}
					/>
					<h3>Debug status</h3>
					<div>
						Username: {formValue}
						<br />
						Loading: {loading.toString()}
						<br />
						Username valid: {isValid.toString()}
					</div>
				</form>
			</section>
		)
	)
}
