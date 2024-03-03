import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

import { usePostsContext } from "../hooks/usePostsContext";
import Post from "../components/Post";

const AllPosts = () => {
  const { posts, dispatch } = usePostsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/posts/all", {
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
    <div className="px-24">
      <h3 className="text-3xl font-bold my-12">Все статьи</h3>

      <div className="grid grid-cols-3 gap-10">
        {posts && posts.map((post) => <Post key={post._id} post={post} />)}
      </div>
    </div>
  );
};

export default AllPosts;
