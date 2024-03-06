import { useState } from "react";

export default function SearchBar({mutation, setSearchItem}) {
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
      <label htmlFor="default-search" className="mb-2 text-sm font-medium sr-only text-white">Search</label>
      <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
          </div>
          <input 
           type="search" 
           placeholder="827 Cedar Ridge Dr Raymore, MO 64083"
           value={inputValue}
           onChange={(e) => setInputValue(e.target.value)}
           id="default-search" 
           className="block w-full p-4 pl-10 text-sm border rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
           required/>
          <button 
           type="submit" 
           className="text-white absolute right-2.5 bottom-2.5  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
          >Search</button>
      </div>
    </form>
  )
}