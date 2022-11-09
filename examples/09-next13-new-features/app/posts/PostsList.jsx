import Link from 'next/link'
import { LikeButton } from './LikeButton'

const fetchPosts = async () => {
  //https://jsonplaceholder.typicode.com
  const data = await fetch('http://localhost:3500/posts', {
    next: {
      revalidate: 60
    }
  })
  return data.json()
}
// Server-side rendering
export async function PostsList () {
  const posts = await fetchPosts()
  return posts.map((post) => (
    <article key={post.id}>
      <Link href='/posts/[id]' as={`/posts/${post.id}`}>
        <h2 style={{ color: '#09f' }}>{post.title}</h2>
        <p>{post.body}</p>
        <LikeButton id={post.id} />
      </Link>
    </article>
  ))
}
