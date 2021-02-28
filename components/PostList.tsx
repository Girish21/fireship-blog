import * as React from 'react'
import { auth, firestore } from '../lib/firebase'
import { useCollection } from 'react-firebase-hooks/firestore'
import { PostFeed } from './PostFeed'

type PostListProp = Record<string, unknown>

export const PostList: React.FunctionComponent<PostListProp> = () => {
  const ref = firestore
    .collection('users')
    .doc(auth.currentUser?.uid)
    .collection('posts')
  const query = ref.orderBy('createdAt')

  const [querySnapshot] = useCollection(query)
  const posts = querySnapshot?.docs.map((doc: any) => doc.data())

  return (
    <>
      <h1>Manage your Posts</h1>
      <PostFeed posts={posts} admin />
    </>
  )
}
