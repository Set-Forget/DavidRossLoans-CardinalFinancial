import { useState } from "react"
import { useMutation } from 'react-query';
import Spinner from "./../components/Spinner"
import WebScrappingResult from "./../components/TableResults"
import SearchBar from "./../components/searchBar/MapboxSearchBar"
import ButtonAddToPipedrive from "../components/addNotes/btnAddToPipedrive";

export default function SearchPage() {
    const [hasSearched, setHasSearched] = useState(true);
    const [average, setAverage] = useState(0);
    const [searchItem, setSearchItem] = useState("")
    const [companies, setCompanies] = useState([
        // {title: "Homebot", img:"https://imgs.search.brave.com/6Laiiyi2pSBnp5knhBT0xjKcyVnuSgYnNc-A92zgY58/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/c2NsbW9ydGdhZ2Uu/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDIzLzAyL2hvbWVi/b3QtbG9nby0yOTN4/MzAwLnBuZw"},
        {title: "Zillow", 
         img:"https://s.zillowstatic.com/pfs/static/z-logo-default.svg",
         link:`https://www.zillow.com/homes/${encodeURIComponent(searchItem.split(" ").join("-"))}`,
         estimatedValue:0
        },
        {title: "Corelogic",
        img:"https://imgs.search.brave.com/PNU0Uym5dsCc1rqpNhFF5itvNhvSWJlxiUUpNJmS0OY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy80/LzRkL0NvcmVMb2dp/Y19sb2dvLnN2Zw.svg",
        link:"https://www.chase.com/personal/mortgage/calculators-resources/home-value-estimator",
        estimatedValue:0
        },
        {title: "Red Fin",
         img:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Redfin_logo.png/270px-Redfin_logo.png",
         link:"https://www.redfin.com/",
         estimatedValue:0
        },
        {title: "Realtor",
         img:"https://imgs.search.brave.com/0aJD-DQCf4FViZMXm0kgCk05J17qx48pVme8QX6kkEw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9hY3Jl/YWxlc3RhdGUub3Jn/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDEz/LzEwL1JlYWx0b3It/TG9nby0yNjN4MzAw/LmpwZw",
         link:"https://www.realtor.com/",
         estimatedValue:0
        }
    ])

    const [webInfo, setWebInfo] = useState([])
    
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

        const nc = companies.map( item => {
          const itemInfo = info.results.find(web => web.websiteName == item.title)
          console.log(itemInfo);
          const value = itemInfo ? itemInfo?.estimatedValue ? itemInfo?.estimatedValue: "0" : "0"
          item.estimatedValue = value
          return item
        })

        console.log(nc);
        setCompanies(nc)
        const avg = infoValues.length != 0 ? infoValues.reduce((acc, num) => acc + num, 0) / infoValues.length : 0
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
                <ButtonAddToPipedrive companies={companies} webInfo={webInfo} avg={average}/>
              </>
              ):
              <p>Make a search to find the values</p>
            }
        </>
      )
}
