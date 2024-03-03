import { PostsContext } from '../context/PostContext'
import { useContext } from 'react'

export const usePostsContext = () => {
  const context = useContext(PostsContext)

  if (!context) {
    throw Error('posts')
  }

  return context
}