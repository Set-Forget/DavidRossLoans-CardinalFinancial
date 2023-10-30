import SearchPage from "./page/searchPage";
import { useState, useEffect } from "react";
import UserSession from "./components/UserSession";
import Spinner from "./components/Spinner";
import Login from "./components/user/Login";

export default function App() {

  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({ email:null })

  const headerStyle = {
    background: "linear-gradient(180deg, #05293e, #033652)",
  }

  return (
    <div className="flex flex-col place-items-center h-screen text-stone-800 dark:bg-slate-700 dark:text-white">
    <header className="w-full p-4 grid grid-cols-2 gap-2 place-items-center bg-white dark:bg-slate-700">
      <img src={"https://www.cardinalfinancial.com/wp-content/themes/cfstack/assets/images/logo_mark.svg"} alt="Logo" className="w-10" />
      <div className="flex gap-4 flex-col lg:flex-row items-center">
        <a href="https://www.cardinalfinancial.com/loan-originator/david-ross/" className="font-medium tracking-wide dark:text-white p-1 hover:text-[#00B1A4]">Contact us</a>
        { user.email ?
         <span className="hidden lg:flex gap-4 items-center">| <UserSession user={user} setUser={setUser}/> </span>
        : null}
      </div>
      <div className="col-span-2 lg:hidden">{ user.email ? <UserSession user={user} setUser={setUser}/> : null}</div>
    </header>
    <main className="flex-1 w-full flex flex-col place-items-center gap-4 relative p-6"  style={headerStyle}>
      <div className="w-full h-full bg-white rounded-lg p-4 m-4 flex flex-col place-items-center gap-4 dark:bg-transparent">
        {
          loading ? <Spinner/> : 
          user.email ? 
            < SearchPage /> :
            <>
              <h2 className="uppercase font-semibold">User not found. Request premision.</h2>
              <Login setUser={setUser} setLoading={setLoading}/>
            </>
        }
      </div>
    </main>
    </div>
  )
}
