import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { useRouter } from 'next/router'
import { Card } from '../../components/Card'
import { Container } from '../../components/Container'
import { Meta } from '../../components/Meta'
import { PostContent } from '../../components/PostContent'
import { firestore, parseTime, parseToJSON } from '../../lib/firebase'
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

const Page: NextPage<{ post: Post; path: string }> = ({
  post: serverPost,
  path,
}) => {
  const router = useRouter()
  const postRef = firestore.doc(path)
  const [realTimeData] = useDocumentData<Post>(postRef)

  const post = parseTime(realTimeData) ?? serverPost

  return (
    <>
      <Meta title={post?.title ?? router.query.slug} />
      <Container as='main'>
        <section>
          <PostContent post={post} />
        </section>
        <Card as='aside'>
          <p>
            <strong>{post.heartCount || 0} 💗</strong>
          </p>
        </Card>
      </Container>
    </>
  )
}

export default Page
