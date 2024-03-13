import React, { useRef, useState } from 'react';
import { LoadScript, StandaloneSearchBox } from '@react-google-maps/api';

const libraries = ["places"];

function SearchBar() {
  const [address, setAddress] = useState("");
  const searchBoxRef = useRef(null);

  const handlePlacesChanged = () => {
    const places = searchBoxRef.current.getPlaces();
    if (places && places.length > 0) {
      setAddress(places[0].formatted_address);
    }
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyDBNaUXsCtRqRqt0f1X9c2MmMlzNTEKG0c" libraries={libraries}>
      <StandaloneSearchBox
        onLoad={ref => searchBoxRef.current = ref}
        onPlacesChanged={handlePlacesChanged}
      >
        <input
          type="search"
          placeholder="827 Cedar Ridge Dr Raymore, MO 64083"
          className="block w-full p-4 pl-10 text-sm border rounded-lg  bg-slate-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          style={{ width: "200px", height: "20px" }}
        />
      </StandaloneSearchBox>
      <div>{address}</div>
    </LoadScript>
  );
}

export default SearchBar;
