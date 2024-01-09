import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { googleLogout } from "@react-oauth/google";

export default function UserSession() {
  const { user, setUser } = useContext(UserContext);
  
  const logOut = () => {
    googleLogout();
    localStorage.clear();
    setUser({ email: null });
  };

  return (
    <article className="text-center text-sm flex place-content-center gap-2">
      <p>
        Logged In as <span className="font-bold"> {user.name} </span>
      </p>
      <button
        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        onClick={logOut}
      >
        log out
      </button>
    </article>
  );
}
