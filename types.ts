type User = {
  username: string
  displayName: string
  photoURL: string
}

type Post = {
  content: string
  createdAt: Date
  heartCount: number
  published: boolean
  slug: string
  title: string
  uid: string
  updatedAt: Date
  username: string
}

export type { User, Post }
