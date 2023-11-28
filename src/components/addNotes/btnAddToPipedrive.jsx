import Select from 'react-select';
import { renderToString } from 'react-dom/server';
import { useEffect, useState } from "react"
import Spinner from '../Spinner';

export default function ButtonAddToPipedrive({ companies, avg }) {
    const [deals, setDeals] = useState([])
    const [options, setOptions] = useState([])
    const [selectedDeal, setSelectedDeal] = useState(null)
    const [loading, setLoading] = useState(false)
    const apiUrl = "https://api.pipedrive.com/v1"
    const apiKey = import.meta.env.VITE_PIPEDRIVE_API_KEY

    const updateDeal = function () {
      const deal = deals.find( d => d.id == selectedDeal.value)
      if (deal) {
        const noteContent = renderToString(<CreateNote companies={companies} avg={avg} />);
        const noteData = {
          deal_id: deal.id,
          content: noteContent
        }
        const fetchOptions = {
          method: "POST",
          body: JSON.stringify(noteData),
          headers: {
            'Content-Type': 'application/json'
          },
        }
        const apiEndpoint = `/notes?api_token=${apiKey}`;
        setLoading(true)
        fetch(apiUrl + apiEndpoint, fetchOptions)
        .then( res => setLoading(false))
        .catch( err => {
            console.error(err)
            setLoading(false)
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
       loading ? 
       <Spinner/> : 
      <section className="flex gap-6 w-1/2">
        <div className="flex gap-4 items-center flex-1">
          <Select
            id="deals"
            value={selectedDeal}
            onChange={handleSelectChange}
            options={options}
            className="bg-gray-50 text-gray-900 focus:ring-[#00B1A4] focus:border-[#00B1A4] block w-full dark:bg-gray-700 dark:placeholder-gray-400"
          />
          to
        </div>
        <button type="button" onClick={updateDeal} className="text-white bg-[#00B1A4] hover:bg-[#033652] focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 focus:outline-none dark:focus:ring-blue-800">add to pipedrive</button>
      </section>
    )
}

function CreateNote({ companies, avg }) {
  const tableStyle = {
    border: "1px solid #000",
    borderCollapse: "collapse",
    width: "100%",
  };

  const headerRowStyle = {
    backgroundColor: "#f0f0f0",
    textAlign: "left",
  };

  const cellStyle = {
    border: "1px solid #000",
    padding: "5px",
    textAlign: "left",
  };

  return (
    <table style={tableStyle}>
      <tr style={headerRowStyle}>
        <th style={cellStyle}>Web Name</th>
        <th style={cellStyle}>Value</th>
      </tr>
      {companies.map((items, i) => {
        return (
          <tr key={i}>
            <td style={cellStyle}>{items.title}</td>
            <td style={cellStyle}>{items.estimatedValue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
          </tr>
        );
      })}
      <tr>
        <td style={cellStyle}>Average</td>
        <td style={cellStyle}>{avg.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
      </tr>
    </table>
  );
}
