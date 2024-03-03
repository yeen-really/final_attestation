import { useAuthContext } from './useAuthContext'
import { usePostsContext } from './usePostsContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchPosts } = usePostsContext()

  const logout = () => {
    localStorage.removeItem('user')

    dispatch({ type: 'LOGOUT' })
    dispatchPosts({ type: 'SET_POSTS', payload: null })
  }

  return { logout }
}