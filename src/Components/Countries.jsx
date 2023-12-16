import axios from 'axios'
import '../App.css'
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import SingleCountry from './CountryCard';
import debounce from 'lodash.debounce';
import { BiSolidSearch } from "react-icons/bi";
import { useRef, useState } from 'react';



function Countries() {

  const [searchQuery , setSearchQuery] = useState(false);


  const getCountries = async () => {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    return response;
  };

  const { isLoading, isError, error, data } = useQuery({
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
  
  const {data: singleCountryData, isLoading : singleCountryIsLoading , isError : singleCountryIsError , error : singleCountryerror , refetch} = useQuery({
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

  // border-2 border-solid border-black

  return (
    <>   
      <form className='w-[70vw] mt-10 mx-4 h-24 flex items-center justify-around '  onSubmit={(e) => {
    e.preventDefault();
    refetch();
  }}>
    <input
        className='w-[60vw] p-2 outline-none border-2 border-solid border-black'
        type="text"
        placeholder='Search By Country Name '
        name='searchQuery'
        onChange={debounce((e) => {
          setSearchQuery(e.target.value)
        }, 1000)}
      />
    <button className='border-2 border-solid border-black p-2'><BiSolidSearch size={26} /></button>
    </form>

      {singleCountryData ? 
      <main className='countries flex flex-wrap items-center justify-around mt-8'>
        { 
        singleCountryData && <SingleCountry singleCountryData = {singleCountryData} /> 
        }
      </main> 
        :
      <main className='countries flex flex-wrap items-center justify-around mt-8'>
        {
          data.data.map((country) => { 
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












//       q ? (
//           // console.log(searchedCountryQuery.data)
//           <SingleCountry searchedCountry={searchedCountryQuery.data} />
//         ) : ( ) 