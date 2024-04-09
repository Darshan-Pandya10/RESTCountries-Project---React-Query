import axios from 'axios';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import debounce from 'lodash.debounce';
import { BiSolidSearch } from 'react-icons/bi';
import SingleCountry from './CountryCard';
import Filter from './Filter';

function Countries() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterValue, setFilterValue] = useState('');

  const getCountries = async () => {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    return response.data;
  };

  const { isLoading, isError, error, data: countriesData } = useQuery({
    queryKey: 'Countries',
    queryFn: getCountries,
    staleTime: 10000,
  });

  const getSearchedCountry = async () => {
    const response = await axios.get(
      `https://restcountries.com/v3.1/name/${searchQuery}?fullText=true`
    );
    return response.data;
  };

  const { data: searchedData, isLoading: searchedIsLoading, isError: searchedIsError, error: searchedError } = useQuery({
    queryKey: ['SearchedCountry', searchQuery],
    queryFn: getSearchedCountry,
    staleTime: 10000,
    enabled: !!searchQuery,
  });

  const handleFilter = (filterValue) => {
    setFilterValue(filterValue);
  };

  const filteredCountries = filterValue
    ? countriesData?.filter((country) => country.region === filterValue)
    : countriesData;

  return (
    <main className='w-[90vw] m-auto'>
      <div className='inputs w-[90vw] overflow-x-hidden flex flex-col item-center justify-between lg:flex-row mx-auto pt-8 p-2'>
        <form
          className='w-fit mx-auto flex items-center border-2 border-solid rounded-lg'
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            className='w-[70vw] md:w-[20rem] m-2 p-2 outline-none'
            type='text'
            placeholder='Search By Country Name'
            name='searchQuery'
            onChange={debounce((e) => {
              setSearchQuery(e.target.value);
            }, 500)}
          />
          <button className='border-l-2 border-solid p-2' onClick={() => setSearchQuery('')}>
            <BiSolidSearch size={26} />
          </button>
        </form>
        <div className='filter-menu overflow-x-hidden mx-auto my-2 lg:my-0 flex items-center justify-center w-fit flex-wrap'>
          <button onClick={() => setFilterValue('')} className='filter-btn'>
            All
          </button>
          <Filter handleFilter={handleFilter} />
        </div>
      </div>

      {isLoading && <p className='lifecycle-text'>Loading...</p>}
      {isError && <p className='lifecycle-text'>Error: {error.message}</p>}
      {searchedIsLoading && <p className='lifecycle-text'>Loading Searched Country...</p>}
      {searchedIsError && <p className='lifecycle-text'>Error: {searchedError.message}</p>}

      <main className='countries flex flex-wrap items-center justify-around pt-8'>
        {(searchQuery ? searchedData : filteredCountries)?.map((country) => (
          <SingleCountry country={country} key={uuidv4()} />
        ))}
      </main>
    </main>
  );
}

export default Countries;
