import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { postAdded } from './postsSlice';
import { User } from '../users/usersSlice';

export const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('');

  const dispatch = useAppDispatch();

  const users = useAppSelector(state => state.users);

  const onSavePostClick = () => {
    if (title && content) {
      dispatch(postAdded(title, content, userId));
      setTitle('');
      setContent('');
    }
  }

  const canSave = Boolean(title) && Boolean(content) && Boolean(userId)

  const usersOptions = users.map((user: User) => {
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  })

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={e => setUserId(e.target.value)}>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="button" onClick={onSavePostClick} disabled={!canSave}>Save Post</button>
      </form>
    </section>
  )
}