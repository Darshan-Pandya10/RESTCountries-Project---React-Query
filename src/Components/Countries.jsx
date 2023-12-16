import axios from 'axios'
import '../App.css'
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import SingleCountry from './CountryCard';
import debounce from 'lodash.debounce';
import { BiSolidSearch } from "react-icons/bi";
import { useState } from 'react';
import Filter from './Filter'



function Countries() {

  const [searchQuery , setSearchQuery] = useState(false);
  const [filterValue , setFilterValue] = useState('');


  const getCountries = async () => {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    return response;
  };

  const { isLoading, isError, error, data, refetch } = useQuery({
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
        <h1 className='text-2xl text-center font-extrabold tracking-widest m-8'>Loading Searched Country ...</h1>
      </main>
    );
  }

  if (singleCountryIsError) {
    return (
      <main className='countries error'>
        <h1 className='text-2xl text-center font-extrabold tracking-widest m-8'>Error: {singleCountryerror.message}</h1>
      </main>
    );
  }


  // for countries
  

  if (isLoading) {
    return (
      <main className='countries loading'>
        <h1 className='text-2xl text-center font-extrabold tracking-widest m-8'>Loading ...</h1>
      </main>
    );
  }

  if (isError) {
    return (
      <main className='countries error'>
        <h1 className='text-2xl text-center font-extrabold tracking-widest m-8'>Error: {error.message}</h1>
      </main>
    );
  }


  // filter callback function 

  const handleFilter = (filtervalue) => {
      setFilterValue(filtervalue);
  }

  // console.log(filterValue)
  const DisplayCountries = filterValue !== '' ? data.data.filter((country) => country.region === filterValue) : data.data;
  // console.log(DisplayCountries)   

  // border-2 border-solid border-black

  return (
    <>   
    <div className='inputs w-[90vw] flex item-center justify-between mx-auto m-4 p-2'>
      <form className='w-fit flex items-center  border-2 border-solid border-black'  onSubmit={(e) => {
    e.preventDefault();
    singleCountryRefetch();
  }}>
    <input
        className='w-[20rem] p-2 outline-none'
        type="text"
        placeholder='Search By Country Name '
        name='searchQuery'
        onChange={debounce((e) => {
          setSearchQuery(e.target.value)
        }, 1000)}
      />
    <button className='border-l-2 border-solid border-black p-2'><BiSolidSearch size={26} /></button>
    </form>
     
     <Filter
      handleFilter={handleFilter} 
      />      
     </div> 

      {singleCountryData ? 
      <main className='countries flex flex-wrap items-center justify-around mt-8'>
        { 
        singleCountryData && <SingleCountry singleCountryData = {singleCountryData} /> 
        }
      </main> 
        :
      <main className='countries flex flex-wrap items-center justify-around mt-8'>
        {
          DisplayCountries.map((country) => { 
            const id = uuidv4();
            return <SingleCountry country={country} key={id} />;
          })
        }
      </main>
      }
    </>
  );
}

export default Countries;