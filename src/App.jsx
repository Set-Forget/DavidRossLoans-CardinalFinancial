import SearchPage from "./page/searchPage";
import { Route, Routes } from "react-router-dom";
import { useLocation, Link } from 'react-router-dom';

export default function App() {
  const headerStyle = {
    background: "linear-gradient(180deg, #05293e, #033652)",
  }

  return (
    <div className="flex flex-col place-items-center h-screen text-stone-800 dark:bg-slate-700 dark:text-white">
    <header className="w-full p-4 flex justify-around items-center bg-white dark:bg-slate-700">
        <Link to="/" className="dark:text-white p-1 hover:text-[#00B1A4]">
          <img src={"https://www.cardinalfinancial.com/wp-content/themes/cfstack/assets/images/logo_mark.svg"} alt="Logo" className="w-10" />
        </Link>
      <div className="flex gap-4">
        <a href="https://www.cardinalfinancial.com/loan-originator/david-ross/" className="font-medium tracking-wide dark:text-white p-1 hover:text-[#00B1A4]">Contact us</a>
        <Link to="/login" className="font-medium tracking-wide dark:text-white p-1 hover:text-[#00B1A4]">Login</Link>
      </div>
    </header>
    <main className="flex-1 w-full flex flex-col place-items-center gap-4 relative p-6"  style={headerStyle}>
      <div className="w-full h-full bg-white rounded-lg p-4 m-4 flex flex-col place-items-center gap-4 dark:bg-transparent">
        <Routes>
            <Route exact path="/search" element={< SearchPage />} />
            <Route path="*" element={<h2>Not Found</h2>} />
            <Route path="/" element={< SearchPage />} />
        </Routes>
      </div>
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

