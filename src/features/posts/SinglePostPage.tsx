import React from 'react'
import { useAppSelector } from '../../app/hooks'
import { Link } from 'react-router-dom';
import { PostAuthor } from '../users/PostAuthor';
import { selectPostById } from './postsSlice';

export const SinglePostPage = ({match}: any) => {
  const { postId } = match.params

  const post = useAppSelector(state => selectPostById(state, postId));

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
         <Link to={`/editPost/${post.id}`} className="button">
          Edit Post
        </Link>
      </article>
      {/* <PostAuthor userId={post.user}/> */}
    </section>
  )
}