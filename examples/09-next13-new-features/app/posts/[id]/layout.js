import Link from 'next/link'
import styles from './Comments.module.css'

const fetchPost = async (id) => {
  // Incremental Static Regeneration
  const data = await fetch(`http://localhost:3500/posts/${id}`, {
    next: {
      revalidate: 60
    }
  })
  return data.json()
}

export default async function Post ({ children, params }) {
  const { id } = params
  const post = await fetchPost(id)
  // return (<h1>
  //     This is a post :D with and id of {id}
  // </h1>)
  return (
    <article>
      <h2 style={{ color: '#09f' }}>{post.title}</h2>
      <p>{post.body}</p>
      <Link className={styles.comments} href={`/posts/${id}/comments`}>See comments</Link>
      {children}
    </article>
  )
}
