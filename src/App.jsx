import { useState } from "react";
import SearchPage from "./page/searchPage";
import { Route, Routes } from "react-router-dom";
import { useLocation, Link } from 'react-router-dom';

export default function App() {

  return (
    <div className="flex flex-col place-items-center gap-4 h-screen bg-gray-100 dark:bg-slate-700 dark:text-white">
    <header className="w-full p-4 flex justify-around items-center bg-sky-300 dark:bg-sky-900">
        <Link to="/" className="text-black dark:text-white p-1 hover:underline hover:decoration-rose-500">
          <img src={"https://www.cardinalfinancial.com/wp-content/themes/cfstack/assets/images/logo_mark.svg"} alt="Logo" className="w-10" />
        </Link>
      <div className="flex gap-4">
        <a href="https://www.cardinalfinancial.com/loan-originator/david-ross/" className="text-black dark:text-white p-1 hover:underline hover:decoration-rose-500">Contact us</a>
        <Link to="/login" className="text-black dark:text-white p-1 hover:underline hover:decoration-rose-500">Login</Link>
      </div>
    </header>
    <main className="flex-1 overflow-y-auto w-full flex flex-col place-items-center gap-4 relative p-4">
      <Routes>
          <Route exact path="/search" element={< SearchPage />} />
          <Route path="*" element={<h2>Not Found</h2>} />
          <Route path="/" element={< SearchPage />} />
      </Routes>
    </main>
    </div>
  )
}

function Home() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const error = queryParams.get('error');
  const userToken = localStorage.getItem("user_pipedrive_token")

  return(
    error ? 
    <ErrorComponent errMsg={error}/>:
    userToken ? 
    <SearchPage/>:
    (<>
      <h2 className="p-6 text-2xl md:text-4xl lg:text-6xl">log in to get access</h2>
      </>)
  )
}

function ErrorComponent({errMsg}) {

  return (
    <div>
      <h1>Error: {errMsg}</h1>
    </div>
  );
}

