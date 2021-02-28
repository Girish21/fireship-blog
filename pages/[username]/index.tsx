import { GetServerSideProps, NextPage } from 'next'
import * as React from 'react'
import { PostFeed } from '../../components/PostFeed'
import { UserProfile } from '../../components/UserProfile'
import { parseToJSON } from '../../lib/firebase'
import { getUserWithUsername } from '../../lib/getUserWithUsername'
import { Post } from '../../types'

const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { username } = query

  const userDoc = await getUserWithUsername(username as string)

  let user = null
  let posts = null

  if (userDoc) {
    user = userDoc.data()
    const postQuery = userDoc.ref
      .collection('posts')
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
      .limit(5)
    posts = (await postQuery.get()).docs.map(parseToJSON)
  }

  return { props: { user, posts } }
}

const UserProfilePage: NextPage<{ user: any; posts: Post[] }> = ({
  user,
  posts,
}) => {
  return (
    <main>
      <UserProfile user={user} />
      <PostFeed posts={posts} admin={false} />
    </main>
  )
}

export default UserProfilePage
export { getServerSideProps }
