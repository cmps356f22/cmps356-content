"use client"
import { useState } from "react"
import './style.css'

export function LikeButton({ id }) {
  const [liked, setLiked] = useState(false)
  return (
    <button
      className="likeButton"
      onClick={() => setLiked(!liked)}
    >
      {liked ? "♥" : "♡"}
    </button>
  )
}
