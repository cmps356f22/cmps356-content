// "use client"
import React from "react"
import { LikeButton } from "./LikeButton"

const getPosts = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts")
  return await res.json()
}
export async function PostsList() {
  const posts = await getPosts()
  return (
    <section>
      {posts?.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <LikeButton id={post.id} />
        </article>
      ))}
    </section>
  )
}
