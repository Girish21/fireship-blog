import { Authcheck } from '../../components/Authcheck'
import { CreateNewPost } from '../../components/CreateNewPost'
import { PostList } from '../../components/PostList'

export default function Page({}) {
  return (
    <main>
      <Authcheck>
        <PostList />
        <CreateNewPost />
      </Authcheck>
    </main>
  )
}
