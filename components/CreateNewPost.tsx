import kebabcase from 'lodash.kebabcase'
import { useRouter } from 'next/router'
import * as React from 'react'
import { useAuthContext } from '../lib/context/AuthContext'
import { auth, firestore, serverTimestamp } from '../lib/firebase'
import { ButtonGreen } from './Button'
import { AdminInput } from './Input'
import toast from 'react-hot-toast'

type CreateNewPostProp = Record<string, unknown>

export const CreateNewPost: React.FunctionComponent<CreateNewPostProp> = () => {
  const router = useRouter()
  const { username } = useAuthContext()

  const [title, setTitle] = React.useState<string>('')
  const slug = window.encodeURI(kebabcase(title))

  const isValid = title.length > 3 && title.length < 100

  const submitHandler = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    const uid = auth.currentUser?.uid
    const ref = firestore
      .collection('users')
      .doc(uid)
      .collection('posts')
      .doc(slug)

    const data = {
      title,
      slug,
      uid,
      username,
      published: false,
      content: '# hello world',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      heartCount: 0,
    }

    await ref.set(data)

    toast.success('Post created!')

    router.push(`/admin/${slug}`)
  }

  return (
    <form onSubmit={submitHandler}>
      <AdminInput
        name='title'
        placeholder='Title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoComplete='off'
      />
      <p>
        Slug: <strong>{slug}</strong>
      </p>
      <ButtonGreen type='submit' disabled={!isValid}>
        Create New Post
      </ButtonGreen>
    </form>
  )
}
