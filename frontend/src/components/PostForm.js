import { useState } from "react";
import { usePostsContext } from "../hooks/usePostsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const PostForm = () => {
  const { dispatch } = usePostsContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [article, setArticle] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const post = { title, article };

    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify(post),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setTitle("");
      setArticle("");
      setError(null);
      setEmptyFields([]);
      dispatch({ type: "CREATE_POST", payload: json });
    }
  };

  return (
    <form
      className=" shadow-lg shadow-slate-500/50 my-20 flex flex-col w-2/3 m-auto  p-6 rounded-xl"
      onSubmit={handleSubmit}
    >
      <h3 className="text-center text-3xl  font-bold">Создать новую статью</h3>

      <label>Название:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "mb-5 rounded border-2 p-2" : "mb-5 rounded border-2 p-2"}
      />

      <label>Текст:</label>
      <textarea
        type="text"
        onChange={(e) => setArticle(e.target.value)}
        value={article}
        className={
          emptyFields.includes("article")
            ? "mb-5 rounded border-2 p-2"
            : "mb-5 rounded border-2 p-2"
        }
      />

      <button className="bg-indigo-600 text-white rounded p-2">Добавить</button>
      {error && (
        <div className="bg-red-300 border my-5 p-2 text-center border-red-600 border-2 text-red-600 rounded">
          {error}
        </div>
      )}
    </form>
  );
};

export default PostForm;
