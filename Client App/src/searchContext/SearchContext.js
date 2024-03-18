import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) =>
{
  const [searchData, setSearchData] = useState({
    location: '',
    startDate: '',
    endDate: '',
    adults: 1,
    children: 0,
    rooms: 1,
    minPrice: '',
    maxPrice: ''
  });

  const updateSearchData = (newData) =>
  {
    setSearchData((prevData) => ({ ...prevData, ...newData }));
  }
  return (
    <SearchContext.Provider value={{ searchData, updateSearchData }}>
      {children}
    </SearchContext.Provider>
  );
}