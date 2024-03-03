import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header className="shadow-sm shadow-slate-500/50 flex flex-row justify-between items-center px-24 py-5">
      <Link to="/">
        <h1 className="text-3xl font-bold">Blog</h1>
      </Link>

      <nav className="flex flex-row items-center gap-6 ">
        {user && (
          <>
            <Link to="/all">
              <h1>Все статьи</h1>
            </Link>
            <Link to="/">
              <h1>Мои статьи</h1>
            </Link>
            <div>
              <span>{user.email}</span>
              <button
                className="border-2 border-indigo-700 rounded px-2 py-1 ml-2 text-indigo-700"
                onClick={handleClick}
              >
                Выйти
              </button>
            </div>
          </>
        )}
        {!user && (
          <>
            <Link to="/login">Войти</Link>
            <Link
              className="border-2 border-indigo-700 rounded px-2 py-1 ml-2 text-indigo-700"
              to="/signup"
            >
              Регистрация
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
