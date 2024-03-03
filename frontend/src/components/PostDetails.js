import { useAuthContext } from '../hooks/useAuthContext'
import { usePostsContext } from '../hooks/usePostsContext'

const PostDetails = ({ post }) => {
  const { dispatch } = usePostsContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch('/api/posts/' + post._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_POST', payload: json})
    }
  }
  

  return (
    <div className="shadow-lg shadow-slate-500/50 flex flex-col p-5 w-full h-auto rounded">
      <h4 className='text-indigo-700 font-bold text-xl'>{post.title}</h4>
      <p className='truncate'><strong>Статья: </strong>{post.article}</p>
      <p><strong>Добавлено пользователем: </strong>{post.user_id}</p>

      <button className="bg-indigo-600 text-white my-2 rounded p-2 w-[100px]" onClick={handleClick}>
        Удалить
      </button>
    </div>
  )
}

export default PostDetails