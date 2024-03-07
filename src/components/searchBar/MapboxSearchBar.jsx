import { useRef, useState } from "react";
import { AddressAutofill } from '@mapbox/search-js-react';

export default function SearchBar({mutation, setSearchItem}) {
    const formRef = useRef(null);
    const [showFormExpanded, setShowFormExpanded] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault()
        const form = formRef.current;
        const address = form.elements["address-search"].value;
        const city = form.elements["address-city"].value ?? "";
        const state = form.elements["address-state"].value ?? "";
        const postcode = form.elements["address-postcode"].value ?? "";
        const unit = form.elements["address-unit"].value ?? "";
        const formatedAddress = unit || city || state || postcode ? ` ${unit} ${city}, ${state} ${postcode}`: ""

        const fullAddress = `${address}${ formatedAddress }`;

        setSearchItem(fullAddress);
        mutation.mutate(encodeURIComponent(fullAddress));
        
        setShowFormExpanded(false)
        form.reset();
    };
    
    return (
     <form
      className="flex flex-col gap-2 w-full lg:w-1/2"
      onSubmit={handleSearch}
      ref={formRef}
    > 
       <label htmlFor="address-search" className="mb-2 text-sm font-medium sr-only text-white">Search</label>
       <div className="relative">
           <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
               <svg className="w-4 h-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                   <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
               </svg>
           </div>
           <AddressAutofill 
            accessToken={"pk.eyJ1IjoiZmFicmltb250aSIsImEiOiJjbG5haDVmazUwM2Z1MmxvMmowNXlsaXY0In0.ed4sCVWrOk_9i_CPuXkazw"}
            options={{
                language: 'en',
                country: 'US',
                }}
            onRetrieve={() => {
                setShowFormExpanded(true)
            }}
           >
           <input 
            type="search" 
            placeholder="Start typing your address, e.g. 123 Main..."
            autoComplete="street-address"
            id="address-search"
            name="address-search"
            className="block w-full p-4 pl-10 text-sm border rounded-lg  bg-slate-800 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            required/>
            </AddressAutofill>
           <button 
            type="submit" 
            className="text-gray-900 absolute right-2.5 bottom-2.5 bg-[#00B1A4] hover:bg-[#033652] hover:text-white focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 focus:ring-blue-800"
            >Search</button>
       </div>
       <div className={`grid grid-cols-4 gap-4 ${showFormExpanded ? '': 'hidden'}`}>
            <div className="flex">
                <span className="inline-flex items-center px-3 text-sm border border-r-0 rounded-l-md bg-gray-600 text-gray-400 border-gray-600">
                City
                </span>
                <input
                    name="address-city"
                    className="block w-full p-4 text-sm border rounded-none rounded-r-lg bg-slate-800 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="City"
                    autoComplete="address-level2"
                    disabled
                />
            </div>
            <div className="flex">
                <span className="inline-flex items-center px-3 text-sm border border-r-0 rounded-l-md bg-gray-600 text-gray-400 border-gray-600">
                State
                </span>
                <input
                    name="address-state"
                    className="block w-full p-4 text-sm border rounded-none rounded-r-lg bg-slate-800 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="State / Region"
                    autoComplete="address-level1"
                    disabled
                />
            </div>
            <div className="flex">
                <span className="inline-flex items-center px-3 text-sm border border-r-0 rounded-l-md bg-gray-600 text-gray-400 border-gray-600">
                Code
                </span>
                <input
                name="address-postcode"
                className="block w-full p-4 text-sm border rounded-none rounded-r-lg bg-slate-800 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="ZIP / Postcode"
                autoComplete="postal-code"
                disabled
                />
            </div>
            <div className="flex">
                <span className="inline-flex items-center px-3 text-sm border border-r-0 rounded-l-md bg-gray-600 text-gray-400 border-gray-600">
                Unit
                </span>
                <input
                name="address-unit"
                className="block w-full p-4 text-sm border rounded-none rounded-r-lg bg-slate-800 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Unit"
                type="text"
                />
            </div>
       </div>
     </form>
    );
  }