import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { PostContent } from '../../components/PostContent'
import { firestore, parseToJSON } from '../../lib/firebase'
import { getUserWithUsername } from '../../lib/getUserWithUsername'
import { Post } from '../../types'

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { username, slug } = params as { username: string; slug: string }
  const userDoc = await getUserWithUsername(username)

  let post
  let path

  if (userDoc) {
    const postQuery = userDoc.ref.collection('posts').doc(slug)
    post = parseToJSON(await postQuery.get())
    path = postQuery.path
  }

  return {
    props: { post, path },
    revalidate: 5000,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const snapshots = await firestore.collectionGroup('posts').get()

  const paths = snapshots.docs.map((doc) => {
    const { slug, username } = doc.data()
    return {
      params: { username, slug },
    }
  })

  return {
    paths,
    fallback: 'blocking',
  }
}

const Page: NextPage<{ post: Post }> = ({ post }) => {
  return (
    <main>
      <PostContent post={post} />
    </main>
  )
}

export default Page
