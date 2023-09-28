import logo from "./assets/logo.png"

export default function App() {
  const companies = [
    {title: "Homebot"},
    {title: "Zillow"},
    {title: "Corelogic"},
    {title: "Realtor"}
  ]

  return (
    <div className="flex flex-col place-items-center gap-4 h-screen bg-gray-100 dark:bg-slate-700 dark:text-white">
      
      <div></div>

      <figure className="p-4 bg-black w-full flex justify-center">
        <img src={logo} alt="Logo" />
        <figcaption></figcaption>
      </figure>
      
      <h1 className="text-2xl md:text-4xl lg:text-6xl">Comps⬦Home Value Sites</h1>
      
      <main className="flex-1 overflow-y-auto place-items-center p-4 relative">
        <SearchBar/>
        {companies.map(
          items => <CardForValues title={items.title} />
        )}
      </main>
    </div>
  )
}

function SearchBar() {
  return(
    <input type="search" placeholder="827 Cedar Ridge Dr Raymore, MO 64083"/>
  )
}

function CardForValues({title}) {
  return(
    <div>
      <h3>{title}</h3>
    </div>
  )
}