import { useState } from "react"
import logo from "./assets/logo.png"

export default function App() {
  const [searchItem, setSearchItem] = useState("827 Cedar Ridge Dr Raymore, MO 64083")
  const companies = [
    {title: "Homebot", value:"395177", img:"https://imgs.search.brave.com/6Laiiyi2pSBnp5knhBT0xjKcyVnuSgYnNc-A92zgY58/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/c2NsbW9ydGdhZ2Uu/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDIzLzAyL2hvbWVi/b3QtbG9nby0yOTN4/MzAwLnBuZw"},
    {title: "Zillow", value:"390000", img:"https://s.zillowstatic.com/pfs/static/z-logo-default.svg"},
    {title: "Corelogic", value:"471800", img:"https://imgs.search.brave.com/PNU0Uym5dsCc1rqpNhFF5itvNhvSWJlxiUUpNJmS0OY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy80/LzRkL0NvcmVMb2dp/Y19sb2dvLnN2Zw.svg"},
    {title: "Realtor", value:"369000", img:"https://imgs.search.brave.com/0aJD-DQCf4FViZMXm0kgCk05J17qx48pVme8QX6kkEw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9hY3Jl/YWxlc3RhdGUub3Jn/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDEz/LzEwL1JlYWx0b3It/TG9nby0yNjN4MzAw/LmpwZw"}
  ]

  return (
    <div className="flex flex-col place-items-center gap-4 h-screen bg-gray-100 dark:bg-slate-700 dark:text-white">
      
      <main className="flex-1 overflow-y-auto w-full flex flex-col place-items-center gap-4 relative">
        <figure className="bg-black w-full flex justify-center">
          <img src={logo} alt="Logo" />
          <figcaption></figcaption>
        </figure>
        <h1 className="text-2xl md:text-4xl lg:text-6xl">Home Value Sites</h1>
        <SearchBar/>
        <p>Subject Property Address: {searchItem}</p>
        <div className="flex flex-wrap place-content-center gap-8 w-full">
        {companies.map(
          (items, i) => <CardForValues title={items.title} img={items.img} value={items.value} key={i}/>
          )}
        </div>
      </main>
    </div>
  )
}

function SearchBar() {
  return(
    <div className="flex flex-col gap-2 w-full lg:w-1/2">
      <input type="search" placeholder="827 Cedar Ridge Dr Raymore, MO 64083"/>
      <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Update INFO</button>
    </div>
  )
}

function CardForValues({title, img, value}) {
  const formatted = parseFloat(value).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
  return(
    <div className="border-solid border-2 border-sky-500 p-4 rounded min-w-min w-48 h-48 flex flex-col relative items-end justify-between">
      <img src={img} alt={title} className="self-start justify-self-start h-12"/>
      <p className="font-semibold ">{formatted}</p>
    </div>
  )
}