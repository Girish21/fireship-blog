import * as React from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { Loader } from '../components/Loader'
import { firestore, fromMillis, parseToJSON } from '../lib/firebase'
import { Post } from '../types'
import { PostFeed } from '../components/PostFeed'
import { ButtonBlue } from '../components/Button'

const LIMIT = 10

const getServerSideProps: GetServerSideProps = async () => {
  const postsQuery = firestore
    .collectionGroup('posts')
    .where('published', '==', true)
    .orderBy('createdAt', 'desc')
    .limit(LIMIT)

  const posts = (await postsQuery.get()).docs.map(parseToJSON)

  return { props: { posts } }
}

const Home: NextPage<{ posts: Post[] }> = ({ posts: prefetchedPosts }) => {
  const [posts, setPosts] = React.useState(prefetchedPosts)
  const [loading, setLoading] = React.useState(false)
  const [postsEnd, setPostsEnd] = React.useState(false)

  const getMore = async () => {
    setLoading(true)
    const last = posts[posts.length - 1]

    const cursor =
      typeof last.createdAt === 'number'
        ? fromMillis(last.createdAt)
        : last.createdAt
    console.log(cursor)

    const query = firestore
      .collectionGroup('posts')
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
      .startAfter(cursor)
      .limit(LIMIT)
    const newPosts = (await query.get()).docs.map(parseToJSON) as Post[]

    setPosts((posts) => [...posts, ...newPosts])
    setLoading(false)

    if (newPosts.length < LIMIT) setPostsEnd(true)
  }

  return (
    <main>
      <PostFeed posts={posts} />
      {!loading && !postsEnd && (
        <ButtonBlue onClick={getMore}>Load more</ButtonBlue>
      )}
      <Loader show={loading} />
      {postsEnd && 'You have reached the end!'}
    </main>
  )
}

export default Home
export { getServerSideProps }
