import * as React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, firestore } from '../firebase'

type AuthContextType = {
	user: any
	username: string
}

const AuthContext = React.createContext<AuthContextType>({
	user: null,
	username: null,
})

export const useAuthContext = () => {
	const value = React.useContext(AuthContext)

	if (!value) throw new Error('useAuthContext should be used under AuthContext')

	return value
}

export const AuthContextWrapper = (props) => {
	const [user] = useAuthState(auth)
	const [username, setUsername] = React.useState<string>(null)

	React.useEffect(() => {
		let unsubscribe: () => void

		if (user) {
			const ref = firestore.collection('users').doc(user.uid)
			unsubscribe = ref.onSnapshot((doc) => setUsername(doc.data()?.username))
		} else {
			setUsername(null)
		}

		return unsubscribe
	}, [user])

	return <AuthContext.Provider value={{ user, username }} {...props} />
}
