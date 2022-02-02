import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { postUpdated, selectPostById } from './postsSlice';


export const EditPostForm = ({ match }: any) => {
  const { postId } = match.params

  const post = useAppSelector(state => selectPostById(state, postId));


  const [title, setTitle] = useState(post?.title)
  const [content, setContent] = useState(post?.content)

  const dispatch = useAppDispatch()
  const history = useHistory()


  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postUpdated({ id: postId, title, content }))
      history.push(`/posts/${postId}`)
    }
  }

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
      </form>
      <button type="button" onClick={onSavePostClicked}>
        Save Post
      </button>
    </section>
  )
}