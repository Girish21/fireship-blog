import { firestore } from './firebase'

export const getUserWithUsername = async (username: string) => {
  const userRef = firestore.collection('users')
  const query = userRef.where('username', '==', username).limit(1)

  return (await query.get()).docs[0]
}
