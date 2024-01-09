import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useGoogleLogin, googleLogout } from "@react-oauth/google";
import { UserContext } from "../../context/UserContext";
import { LoadingContext } from "../../context/LoadingContext";
import PropTypes from "prop-types";

function Login({ setAuth, setTempUser }) {
  const { setUser } = useContext(UserContext);
  const { setLoading } = useContext(LoadingContext);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (response) => {
      localStorage.setItem("userInfo", JSON.stringify(response));
      setLoading(true);
      fetchGoogleUserData(response);
    },
    onError: (error) => {
      console.log(`Login Failed: ${error}`);
      setLoading(false);
      setShowErrorModal(true);
    },
  });

  const logOut = () => {
    googleLogout();
    localStorage.clear();
  };

  const fetchUserData = async (user) => {
    const encodedEmail = encodeURIComponent(user.email);
    const url = `https://script.google.com/macros/s/AKfycbxBvJxMEbhyMRloRtmW7TqKuCgMKxKdrW09E6rs_Os3sSN7PorHW3qe_QYogdyNDr8s/exec?userEmail=${encodedEmail}`;

    return axios
      .get(url)
      .then((response) => {
        try {
          if (response.data.status === 401) {
            throw new Error("Usuario no encontrado");
          }

          if (response.data.status === 404) {
            throw new Error("Usuario no encontrado");
          }

          if (response.data.status === 403) {
            setTempUser(user);
            throw new Error("Usuario no autorizado");
          }

          if (response.data.status === 200) {
            user.allowPipedrive = response.data.message.allowPipedrive;
            localStorage.setItem("user", JSON.stringify(user));
            setUser(user);
            setLoading(false);
            setAuth(true);
            return response.data.message.email;
          }

          throw new Error("Respuesta inesperada del servidor");
        } catch (error) {
          console.error(error.message);
          setLoading(false);
          setAuth(false);
          logOut();
        }
      })
      .catch((error) => {
        console.error("Error:", error.message || "Hubo un error inesperado");
        setLoading(false);
        setShowErrorModal(true);
      });
  };

  async function fetchGoogleUserData(userInfo) {
    const url = `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${userInfo.access_token}`;
    const opt = {
      headers: {
        Authorization: `Bearer ${userInfo.access_token}`,
        Accept: "application/json",
      },
    };
    return fetch(url, opt)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((response) => {
        fetchUserData(response);
      })
      .catch((error) => {
        console.error(error);
        localStorage.clear();
        setLoading(false);
        setShowErrorModal(true);
      });
  }

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      setLoading(true);
      fetchGoogleUserData(userInfo);
    }
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center justify-center g-signin2">
        <button
          onClick={login}
          className="relative mt-10 flex montserrat items-center w-60 h-[42px] bg-white border border-gray-300 rounded-full shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          <svg
            id="googleIcon"
            className="h-5 w-5 ml-2"
            xmlns="http://www.w3.org/2000/svg"
            width="600px"
            height="600px"
            viewBox="-0.5 0 48 48"
            version="1.1"
          >
            {" "}
            <title>Google-color</title> <desc>Created with Sketch.</desc>{" "}
            <defs> </defs>{" "}
            <g
              id="Icons"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              {" "}
              <g id="Color-" transform="translate(-401.000000, -860.000000)">
                {" "}
                <g id="Google" transform="translate(401.000000, 860.000000)">
                  {" "}
                  <path
                    d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                    id="Fill-1"
                    fill="#FBBC05"
                  >
                    {" "}
                  </path>{" "}
                  <path
                    d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                    id="Fill-2"
                    fill="#EB4335"
                  >
                    {" "}
                  </path>{" "}
                  <path
                    d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                    id="Fill-3"
                    fill="#34A853"
                  >
                    {" "}
                  </path>{" "}
                  <path
                    d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                    id="Fill-4"
                    fill="#4285F4"
                  >
                    {" "}
                  </path>{" "}
                </g>{" "}
              </g>{" "}
            </g>{" "}
          </svg>
          <span id="buttonText" className="ml-4">
            Sign in with Google
          </span>
        </button>
      </div>
      {showErrorModal && (
        <ErrorLoginModal setShowErrorModal={setShowErrorModal} />
      )}
    </div>
  );
}

Login.propTypes = {
  setAuth: PropTypes.func.isRequired,
  setTempUser: PropTypes.func.isRequired
};

export default Login;

const ErrorLoginModal = ({ setShowErrorModal }) => {
  return (
    <div
      id="editMemberModal"
      className="relative z-10 ml-[40px] dark:bg-slate-700 dark:text-white"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-40 transition-opacity"></div>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="dark:bg-slate-700 dark:text-white relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all w-[600px] sm:my-8 sm:p-6">
            <div className="mt-3 text-center sm:mt-5 text-sm montserrat">
              <h3
                className=" font-semibold lg:text-base leading-6 text-gray-900 dark:text-white"
                id="modal-title"
              >
                An error ocurred.
              </h3>
              <p className="text-base">Please, try again later.</p>
            </div>
            <div className="mt-5 flex justify-center">
              <button
                className="w-[120px] mr-2 rounded-lg bg-transparent px-3 py-2 border-2 border-[#243570] text-base font-semibold shadow-sm hover:text-[#535787] hover:bg-[#033652] dark:bg-[#033652] dark:hover:bg-[#00B1A4] hover:text-white focus:outline-none dark:focus:ring-blue-800"
                onClick={() => setShowErrorModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ErrorLoginModal.propTypes = {
  setShowErrorModal: PropTypes.func.isRequired,
};
