import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { Post } from '../types'
import { Card } from './Card'

export const PostContent: React.FunctionComponent<{ post: Post }> = ({
  post,
}) => {
  const createdAt =
    typeof post?.createdAt === 'number'
      ? new Date(post.createdAt)
      : post.createdAt

  return (
    <Card>
      <h1>{post?.title}</h1>
      <span className='text-sm'>
        Written by&nbsp;
        <Link href={`/${post.username}/`}>
          <a className='text-info'>@{post.username}</a>
        </Link>
        &nbsp; on {createdAt.toISOString()}
      </span>
      <ReactMarkdown>{post?.content}</ReactMarkdown>
    </Card>
  )
}
