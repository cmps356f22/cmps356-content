import React from "react";

export default function PostPage({ params }) {
  const { id } = params;
  return <div>Este es el post {id}</div>;
}
