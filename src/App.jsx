import SearchPage from "./page/searchPage";
import { Route, Routes } from "react-router-dom";

export default function App() {

  return (
    <div className="flex flex-col place-items-center gap-4 h-screen bg-gray-100 dark:bg-slate-700 dark:text-white">
    <header className="w-full p-4 flex justify-around items-center bg-sky-300 dark:bg-sky-900">
      <img src={"https://www.cardinalfinancial.com/wp-content/themes/cfstack/assets/images/logo_mark.svg"} alt="Logo" className="w-10" />
      <a href="https://www.cardinalfinancial.com/loan-originator/david-ross/" className="text-black dark:text-white p-1 hover:underline hover:decoration-rose-500">Contact us</a>
    </header>
    <main className="flex-1 overflow-y-auto w-full flex flex-col place-items-center gap-4 relative p-4">
      <Routes>
          <Route path="/:error" element={ < ErrorComponent /> } />
          <Route path="/notFound" element={ <h1>Not Found</h1> } />
          <Route exact path="/search" element={< SearchPage />} />
      </Routes>
    </main>
    </div>
  )
}

import { useParams } from 'react-router-dom';

function ErrorComponent() {
  const { error } = useParams();

  return (
    <div>
      <h1>Error: {error}</h1>
    </div>
  );
}

