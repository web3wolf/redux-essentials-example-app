import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { Link } from 'react-router-dom'

import { PostAuthor } from '../users/PostAuthor';
import { TimeAgo } from './TimeAgo';
import { Spinner } from '../../components/Spinner';

import { Post } from './postsSlice';
import { Status } from './postsSlice';
import { selectAllPosts, fetchPosts } from './postsSlice';


// Render variables
const PostExcerpt = ({ post }: any) => {
  return (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <div>
        {/* <PostAuthor userId={post.user} /> */}
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>

      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  )
};


export const PostsList = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectAllPosts);

  const postStatus = useAppSelector(state => state.posts.status);
  const error = useAppSelector(state => state.posts.error);

  useEffect(() => {
    if (postStatus === Status.IDLE) {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  let content;

  if (postStatus === Status.LOADING) {
    content = <Spinner text="loading..." />
  } else if (postStatus === Status.SUCCESS) {
    const orderedPosts = posts
    .slice()
    .sort((a, b: any) => b.date.localeCompare(a.date))

    content = orderedPosts.map((post: Post) => (
    <PostExcerpt key={post.id} post={post} />
  ))
  } else if (postStatus === Status.FAIL) {
    content = <div>{error}</div>
  }
  

  
  // const orderedPosts = posts.slice().sort((a: Post, b: Post | any) => b?.date?.localeCompare(a?.date));
  /* const renderedPosts = orderedPosts.map(post => (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
      <PostAuthor userId={post.user}/>
    </article>
  )) */

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}
