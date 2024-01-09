import { useState, useContext } from "react";
import { LoadingContext } from "../context/LoadingContext";
import Login from "../components/user/Login";
import RequestAuth from "../components/user/requestAuth";

export default function LoginPage() {
  const { setLoading } = useContext(LoadingContext);
  const [tempUser, setTempUser] = useState({});
  const [auth, setAuth] = useState(true);
  const [reqSend, setReqSend] = useState(false);

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
