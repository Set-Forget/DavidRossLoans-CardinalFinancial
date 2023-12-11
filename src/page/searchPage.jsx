import { useEffect, useState } from "react"
import { useMutation } from 'react-query';
import Spinner from "./../components/Spinner"
import WebScrappingResult from "./../components/TableResults"
import SearchBar from "./../components/searchBar/MapboxSearchBar"
import ButtonAddToPipedrive from "../components/addNotes/btnAddToPipedrive";

export default function SearchPage({ allowPipedrive }) {
    const [hasSearched, setHasSearched] = useState(false);
    const [average, setAverage] = useState(0);
    const [searchItem, setSearchItem] = useState("")
    const [companies, setCompanies] = useState([])

    const setEstimateValue = (companyName, value) => {
      const companyIndex = companies.findIndex(company => company.title === companyName);
      if (companyIndex !== -1) {
        const newCompanies = [...companies];

        newCompanies[companyIndex] = {
          ...newCompanies[companyIndex],
          estimatedValue: value,
        };
        setCompanies(newCompanies);
      }
    }
    
    const searchRealStateValues = async (address) => {
        const url = "https://script.google.com/macros/s/AKfycbwzIyZEUg78F3IbJvYJHNVPgqkwLIBnb4Lz0Y_cErcYxBKipyj-QoM5WKaj5oO6gFgnog/exec" + "?address=" + address
        const info = await fetch(url)
        .then((response) => response.json())
        .catch((e) => {
            console.error(e.message)
            throw new Error('Network response was not ok. ' + e.message)
        })

        const nc = info.results.map( item => {
          return {
            title: item.websiteName,
            estimatedValue: item.estimatedValue,
            img: item.img,
            link: item.link
          }
        })

        setCompanies(nc)
        setHasSearched(true);
        return info;
    }

    useEffect(()=>{
      const infoValues = companies.map( i => {
        let value = Number(i.estimatedValue);
        return isNaN(value) ? 0 : value;
      }).filter(value => value !== 0)

      const avg = infoValues.length != 0 ? infoValues.reduce((acc, num) => acc + num, 0) / infoValues.length : 0
      setAverage(avg)

    }, [companies])
    
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
              (
              <>
                <WebScrappingResult searchItem={searchItem} companies={companies} avg={average} setEstimateValue={setEstimateValue} />
                { allowPipedrive && <ButtonAddToPipedrive companies={companies} avg={average} address={searchItem}/> }
              </>
              ):
              <p>Make a search to find the values</p>
            }
        </>
      )
}
