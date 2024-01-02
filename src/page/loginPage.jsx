import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { LoadingContext } from "../context/LoadingContext";
import Login from "../components/user/Login";
import RequestAuth from "../components/user/requestAuth";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { BASE_URL } from "../routes";

export default function LoginPage() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { loading, setLoading } = useContext(LoadingContext);
  const [tempUser, setTempUser] = useState({});
  const [auth, setAuth] = useState(true);
  const [reqSend, setReqSend] = useState(false);

  useEffect(() => {
    if (!user.email) return;
    navigate(`${BASE_URL}home`);
  }, [navigate, user]);

  if (loading) return <Spinner />;

  return (
    <section className="flex flex-col gap-4 items-center">
      <h2 className="uppercase font-semibold">
        Sign in to gain access or request permission
      </h2>
      <Login setAuth={setAuth} setTempUser={setTempUser} />
      {!auth && (
        <RequestAuth
          user={tempUser}
          setLoading={setLoading}
          reqSend={reqSend}
          setReqSend={setReqSend}
        />
      )}
    </section>
  );
}
