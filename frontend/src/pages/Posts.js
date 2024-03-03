import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

import { usePostsContext } from "../hooks/usePostsContext";
import PostDetails from "../components/PostDetails";
import PostForm from "../components/PostForm";

const Posts = () => {
  const { posts, dispatch } = usePostsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/posts", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_POSTS", payload: json });
      }
    };

    if (user) {
      fetchPosts();
    }
  }, [dispatch, user]);
  

  return (
    <>
        <PostForm />

      <div className="px-24">
      <h3 className="text-3xl font-bold my-12">Мои статьи</h3>

        <div className="grid grid-cols-3 gap-10">
          {posts &&
            posts.map((post) => <PostDetails key={post._id} post={post} />)}
        </div>
      </div>
    </>
  );
};

export default Posts;
