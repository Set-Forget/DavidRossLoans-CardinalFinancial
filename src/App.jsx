import { useState } from "react"
import { useMutation } from 'react-query';
import logo from "./assets/logo.png"
import Spinner from "./components/Spinner"
import WebScrappingResult from "./components/TableResults"

export default function App() {
  const [hasSearched, setHasSearched] = useState(false);
  const [searchItem, setSearchItem] = useState("")
  const companies = [
    {title: "Homebot", img:"https://imgs.search.brave.com/6Laiiyi2pSBnp5knhBT0xjKcyVnuSgYnNc-A92zgY58/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/c2NsbW9ydGdhZ2Uu/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDIzLzAyL2hvbWVi/b3QtbG9nby0yOTN4/MzAwLnBuZw"},
    {title: "Zillow", img:"https://s.zillowstatic.com/pfs/static/z-logo-default.svg"},
    {title: "Corelogic", img:"https://imgs.search.brave.com/PNU0Uym5dsCc1rqpNhFF5itvNhvSWJlxiUUpNJmS0OY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy80/LzRkL0NvcmVMb2dp/Y19sb2dvLnN2Zw.svg"},
    {title: "Realtor", img:"https://imgs.search.brave.com/0aJD-DQCf4FViZMXm0kgCk05J17qx48pVme8QX6kkEw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9hY3Jl/YWxlc3RhdGUub3Jn/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDEz/LzEwL1JlYWx0b3It/TG9nby0yNjN4MzAw/LmpwZw"}
  ]

  const [webInfo, setWebInfo] = useState([])
  
  const searchRealStateValues = async (address) => {
    const url = "https://script.google.com/macros/s/AKfycbwzIyZEUg78F3IbJvYJHNVPgqkwLIBnb4Lz0Y_cErcYxBKipyj-QoM5WKaj5oO6gFgnog/exec" + "?address=" + address
    const info = await fetch(url)
      .then((response) => response.json())
      .catch((e) => {
        console.error(e.message)
        throw new Error('Network response was not ok. ' + e.message)
      })
    setWebInfo(info.results)
    setHasSearched(true);
    return info;
  }
  
  const mutation = useMutation(address => searchRealStateValues(address));

  return (
    <div className="flex flex-col place-items-center gap-4 h-screen bg-gray-100 dark:bg-slate-700 dark:text-white">
      
      <main className="flex-1 overflow-y-auto w-full flex flex-col place-items-center gap-4 relative">
        <figure className="bg-black w-full flex justify-center">
          <img src={logo} alt="Logo" />
          <figcaption></figcaption>
        </figure>
        <h1 className="text-2xl md:text-4xl lg:text-6xl">Home Value Sites</h1>
        <SearchBar mutation={mutation} setSearchItem={setSearchItem} />
        { mutation.isLoading ?
          <Spinner/>:
          mutation.isError ?
          (<>
          <p>Error looking the address <span>{searchItem}</span></p>
          <hr />
          </>):
          hasSearched ?
          webInfo && <WebScrappingResult searchItem={searchItem} companies={companies} webInfo={webInfo}/>:
          <p>Make a search to find the values</p>
        }
      </main>
    </div>
  )
}

function SearchBar({mutation, setSearchItem}) {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = (e) => {
    e.preventDefault()
    setSearchItem(inputValue);
    mutation.mutate(inputValue);
  };

  return(
    <form
     className="flex flex-col gap-2 w-full lg:w-1/2"
     onSubmit={handleSearch}
    >
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
      <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
          </div>
          <input 
           type="search" 
           placeholder="827 Cedar Ridge Dr Raymore, MO 64083"
           value={inputValue}
           onChange={(e) => setInputValue(e.target.value)}
           id="default-search" 
           className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
           required/>
          <button 
           type="submit" 
           className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >Search</button>
      </div>
    </form>
  )
}
