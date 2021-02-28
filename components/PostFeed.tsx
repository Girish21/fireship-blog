import Link from 'next/link'
import * as React from 'react'
import { Post } from '../types'
import { Card } from './Card'

type PostFeedType = {
  posts?: Post[]
  admin?: boolean
}

type PostItemProp = {
  post: Post
  admin: boolean
}

const PostItem: React.FunctionComponent<PostItemProp> = ({ post, admin }) => {
  const wordCount = post.content.trim().split(/\s+/g).length
  const minutesToRead = (wordCount / 100 + 1).toFixed(0)

  return (
    <Card>
      <Link href={`/${post.username}`}>
        <a>
          <strong>By @{post.username}</strong>
        </a>
      </Link>
      <Link href={`/${post.username}/${post.slug}`}>
        <h2>
          <a>{post.title}</a>
        </h2>
      </Link>
      <footer>
        <span>
          {wordCount} words. {minutesToRead} min read
        </span>
        <span>💗 {post.heartCount} Hearts</span>
      </footer>
    </Card>
  )
}

export const PostFeed: React.FunctionComponent<PostFeedType> = ({
  posts,
  admin = false,
}) => (
  <>
    {posts
      ? posts.map((post) => (
          <PostItem key={post.uid} post={post} admin={admin} />
        ))
      : null}
  </>
)
