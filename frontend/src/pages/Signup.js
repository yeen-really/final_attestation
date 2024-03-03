import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password);
  };

  return (
    <form
      className=" shadow-lg shadow-slate-500/50 my-20 flex flex-col w-1/2 m-auto  p-6 rounded-xl"
      onSubmit={handleSubmit}
    >
      <h3 className="text-center font-bold text-3xl">Регистрация</h3>

      <label>Email:</label>
      <input
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className="mb-5 rounded border-2 p-2"
      />
      <label>Пароль*:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className="mb-5 rounded border-2 p-2"
      />
      <span>* Должен содержать не менее 8 символов. Буквы в нижнем и верхнем регистре, цифры и спец символы</span>

      <button className="bg-indigo-600 text-white rounded p-2" disabled={isLoading}>
        Зарегистироваться
      </button>
      {error && (
        <div className="bg-red-300 border my-5 p-2 text-center border-red-600 border-2 text-red-600 rounded">
          {error}
        </div>
      )}
    </form>
  );
};

export default Signup;
