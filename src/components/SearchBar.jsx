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
    <LoadScript googleMapsApiKey="CLAVE_API" libraries={libraries}>
      <StandaloneSearchBox
        onLoad={ref => searchBoxRef.current = ref}
        onPlacesChanged={handlePlacesChanged}
      >
        <input
          type="search"
          placeholder="827 Cedar Ridge Dr Raymore, MO 64083"
          style={{ width: "200px", height: "20px" }}
        />
      </StandaloneSearchBox>
      <div>{address}</div>
    </LoadScript>
  );
}

export default SearchBar;
