import { useEffect, useState } from "react"
import { useMutation } from 'react-query';
import Spinner from "./../components/Spinner"
import WebScrappingResult from "./../components/TableResults"
import SearchBar from "./../components/searchBar/MapboxSearchBar"

export default function SearchPage() {
    const [hasSearched, setHasSearched] = useState(true); // esta en true para testear, sino tiene que ser false
    const [average, setAverage] = useState(100); // tiene valor para testear, sino tiene que ser 0
    const [searchItem, setSearchItem] = useState("")
    const companies = [
        {title: "Homebot", img:"https://imgs.search.brave.com/6Laiiyi2pSBnp5knhBT0xjKcyVnuSgYnNc-A92zgY58/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/c2NsbW9ydGdhZ2Uu/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDIzLzAyL2hvbWVi/b3QtbG9nby0yOTN4/MzAwLnBuZw"},
        {title: "Zillow", img:"https://s.zillowstatic.com/pfs/static/z-logo-default.svg"},
        {title: "Corelogic", img:"https://imgs.search.brave.com/PNU0Uym5dsCc1rqpNhFF5itvNhvSWJlxiUUpNJmS0OY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy80/LzRkL0NvcmVMb2dp/Y19sb2dvLnN2Zw.svg"},
        {title: "Realtor", img:"https://imgs.search.brave.com/0aJD-DQCf4FViZMXm0kgCk05J17qx48pVme8QX6kkEw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9hY3Jl/YWxlc3RhdGUub3Jn/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDEz/LzEwL1JlYWx0b3It/TG9nby0yNjN4MzAw/LmpwZw"}
    ]

    const [webInfo, setWebInfo] = useState([{ // tiene datos para testear, sino tiene que ser []
      estimatedValue:1,
      websiteName: "Realtor"
    },
    {
      estimatedValue:2,
      websiteName: "Zillow"
    },
    {
      estimatedValue:3,
      websiteName: "Corelogic"
    }])
    
    const searchRealStateValues = async (address) => {
        const url = "https://script.google.com/macros/s/AKfycbwzIyZEUg78F3IbJvYJHNVPgqkwLIBnb4Lz0Y_cErcYxBKipyj-QoM5WKaj5oO6gFgnog/exec" + "?address=" + address
        const info = await fetch(url)
        .then((response) => response.json())
        .catch((e) => {
            console.error(e.message)
            throw new Error('Network response was not ok. ' + e.message)
        })
        
        const infoValues = info.results.map( i => {
        let value = Number(i.estimatedValue);
        return isNaN(value) ? 0 : value;
        }).filter(value => value !== 0)
        const avg = infoValues.reduce((acc, num) => acc + num, 0) / infoValues.length
        setAverage(avg)
        setWebInfo(info.results)
        setHasSearched(true);
        return info;
    }
    
    const mutation = useMutation(address => searchRealStateValues(address));

    return (
        <>
            <h1 className="p-6 text-2xl md:text-4xl lg:text-6xl">Home Value Sites</h1>
            <SearchBar mutation={mutation} setSearchItem={setSearchItem} />
            { mutation.isLoading ?
              <>
                <p>Searching values for <span className="font-semibold">{searchItem}</span></p>
                <Spinner/>
              </>
              :
              mutation.isError ?
              (<>
              <p>Error looking the address <span>{searchItem}</span></p>
              <hr />
              </>):
              hasSearched ?
              webInfo && (
              <>
                <WebScrappingResult searchItem={searchItem} companies={companies} webInfo={webInfo} avg={average}/>
                <ButtonAddToPipedrive searchItem={searchItem} companies={companies} webInfo={webInfo} avg={average}/>
              </>
              ):
              <p>Make a search to find the values</p>
            }
        </>
      )
}

import Select from 'react-select';

function ButtonAddToPipedrive({ avg }) {
    const [deals, setDeals] = useState([])
    const [options, setOptions] = useState([])
    const [selectedDeal, setSelectedDeal] = useState(null)
    const apiUrl = "https://api.pipedrive.com/v1"
    const apiKey = "6a7d6756d454c725103f483026d2773693b1d5fc"

    const updateDeal = function () {
      const deal = deals.find( d => d.id == selectedDeal.value)
      if (deal) {
        const apiEndpoint = `/deals/${deal.id}?api_token=${apiKey}`;
        fetch(apiUrl + apiEndpoint, {
          method: "PUT",
          body: JSON.stringify({
            "value": avg,
          }),
          headers: {
            'Content-Type': 'application/json'
          },
        })
      }
    }

    const handleSelectChange = (selectedOption) => {
      setSelectedDeal(selectedOption);
    }

    useEffect(()=>{
      const apiEndpoint = "/deals?status=all_not_deleted&start=0&limit=500&api_token="
      fetch(apiUrl + apiEndpoint + apiKey)
      .then(response => response.json())
      .then( res => {
        const newOptions = res.data.map(d => ({
          label: d.title,
          value: d.id
        }));
        setDeals(res.data)
        setOptions(newOptions)
      })
    }, [])

    return(
      <section className="flex gap-6 w-1/2">
        <div className="flex gap-4 items-center flex-1">
          <Select
            id="deals"
            value={selectedDeal}
            onChange={handleSelectChange}
            options={options}
            className="bg-gray-50 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          to
        </div>
        <button type="button" onClick={updateDeal} className="text-white bg-[#00B1A4] hover:bg-[#033652] focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 focus:outline-none dark:focus:ring-blue-800">add to pipedrive</button>
      </section>
    )
}
