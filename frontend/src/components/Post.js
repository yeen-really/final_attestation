
const Post = ({ post }) => {

  return (
    <div className="shadow-lg shadow-slate-500/50 flex flex-col p-5 w-full rounded">
      <h4 className='text-indigo-700 font-bold text-xl'>{post.title}</h4>
      <p className='truncate'><strong>Статья: </strong>{post.article}</p>
      <p><strong>Добавлено пользователем: </strong>{post.user_id}</p>
   </div>
  )
}

export default Post