import axios from 'axios'
import '../App.css'
import { keepPreviousData, useQuery} from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import SingleCountry from './CountryCard';
import debounce from 'lodash.debounce';
import { BiSolidSearch } from "react-icons/bi";
import { useState } from 'react';
import Filter from './Filter'

function Countries() {
  const [searchQuery , setSearchQuery] = useState('');
  const [filterValue , setFilterValue] = useState('');


  const getCountries = async () => {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    return response;
  };

  const { isLoading, isError, error, data, refetch : allCountrieRefetch} = useQuery({
    queryKey: ['Countries'],
    queryFn: getCountries,
    staleTime: 10000,
    placeholderData: keepPreviousData,
  });

  // Manual Searching 
const getSearchedCountry = async () => {
    const response = await axios.get(`https://restcountries.com/v3.1/name/${searchQuery}?fullText=true`);
    return response;
  };
  
  const {data: singleCountryData, isLoading : singleCountryIsLoading , isError : singleCountryIsError , error : singleCountryerror , refetch : singleCountryRefetch} = useQuery({
    queryKey: ['Countries', searchQuery],
    queryFn: getSearchedCountry,
    staleTime: 10000,
    enabled: false,
    placeholderData: keepPreviousData,
  });

  
  if (singleCountryIsLoading) {
    return (
      <main className='countries loading'>
        <h1 className='text-2xl text-center font-extrabold tracking-widest pt-8'>Loading Searched Country ...</h1>
      </main>
    );
  }

  if (singleCountryIsError) {
    return (
      <main className='countries error'>
        <h1 className='text-2xl text-center font-extrabold tracking-widest pt-8'>Error: {singleCountryerror.message}</h1>
      </main>
    );
  }

  // for countries
  
  if (isLoading) {
    return (
      <main className='countries loading'>
        <h1 className='text-2xl text-center font-extrabold tracking-widest pt-8'>Loading ...</h1>
      </main>
    );
  }

  if (isError) {
    return (
      <main className='countries error'>
        <h1 className='text-2xl text-center font-extrabold tracking-widest pt-8'>Error: {error.message}</h1>
      </main>
    );
  }

  // filter callback function 

  const handleFilter = (filtervalue) => {
      setFilterValue(filtervalue);
  }

  const getFilteredCountries = async () => {
    const response = await axios.get(`https://restcountries.com/v3.1/name/${searchQuery}?fullText=true`);
    return response;
  };
  
  const {data: filteredCountries, isLoading : filteredCountriesIsLoading , isError : filteredCountriesIsError , error : filteredCountrieserror , refetch : filteredCountriesRefetch} = useQuery({
    queryKey: ['Countries', filterValue],
    queryFn: getFilteredCountries,
    staleTime: 10000,
    enabled: false,
    placeholderData: keepPreviousData,
  });

  let DisplayCountries = filterValue !== '' ? data.data.filter((country) => country.region === filterValue) : data.data;



  return (
    <main className='w-[90vw] m-auto'>   
    <div className='inputs w-[90vw] overflow-x-hidden flex flex-col item-center justify-between lg:flex-row mx-auto pt-8 p-2'>
      <form className='w-fit mx-auto flex items-center border-2 border-solid  rounded-lg'  onSubmit={(e) => {
    e.preventDefault();
    singleCountryRefetch();
  }}>
    <input
        className='w-[70vw] md:w-[20rem] m-2 p-2 outline-none'
        type="text"
        placeholder='Search By Country Name'
        name='searchQuery'
        onChange={debounce((e) => {
          setSearchQuery(e.target.value)
        }, 500)}
      />
    <button className='border-l-2 border-solid p-2'><BiSolidSearch size={26} /></button>
    </form>
    <div className='filter-menu overflow-x-hidden mx-auto my-2 lg:my-0 flex items-center justify-center w-fit flex-wrap'> 
      <button onClick={() => {
        // allCountrieRefetch()
        setFilterValue('')
        // queryClient.invalidateQueries()
      }}
        className='filter-btn'>All</button>
         <Filter
        handleFilter={handleFilter} 
        />
    </div>
    </div> 

      {singleCountryData ? 
      <main className='countries flex flex-wrap items-center justify-around pt-8'>
        { 
        singleCountryData && <SingleCountry singleCountryData = {singleCountryData} /> 
        }
      </main> 
        :
      <main className='countries flex flex-wrap items-center justify-around pt-8'>
        {
          DisplayCountries.map((country) => { 
            const id = uuidv4();
            return <SingleCountry country={country} key={id} />;
          })
        }
      </main>}
    </main>
  );
  }


export default Countries;