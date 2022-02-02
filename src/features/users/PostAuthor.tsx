import React from 'react'
import { useAppSelector } from '../../app/hooks'
import { User } from './usersSlice'

export const PostAuthor = ({ userId }: any) => {
  const author = useAppSelector(state =>
    state?.users.find((user) => user.id === userId)
  )

  return <span>by {author ? author.name : 'Unknown author'}</span>
}
