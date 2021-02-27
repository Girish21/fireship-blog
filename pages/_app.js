import '../styles/globals.css'
import { Navbar } from '../components/Navbar'
import { Toaster } from 'react-hot-toast'
import { AuthContextWrapper } from '../lib/context/AuthContext'

function MyApp({ Component, pageProps }) {
	return (
		<AuthContextWrapper>
			<Navbar />
			<Component {...pageProps} />
			<Toaster />
		</AuthContextWrapper>
	)
}

export default MyApp
