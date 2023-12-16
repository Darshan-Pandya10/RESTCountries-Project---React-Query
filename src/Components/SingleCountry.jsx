import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { MdArrowBackIosNew } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';

function SingleCountry() {
  const { countryname } = useParams();

  const getSingleCountry = async () => {
    const response = await axios(`https://restcountries.com/v3.1/name/${countryname}?fullText=true`);
    console.log(response)
    return response;
  };

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['Country', countryname],
    queryFn: getSingleCountry,
    staleTime: 10000,
    placeholderData: keepPreviousData,
  });

  if (isLoading) {
    return (
      <main className='singleCountry loading'>
        <h1 className='text-2xl text-center font-extrabold tracking-widest m-8'>Loading Country Details...</h1>
      </main>
    );
  }

  if (isError) {
    return (
      <main className='singleCountry error'>
        <h1 className='text-2xl text-center font-extrabold tracking-widest m-8'>Error while Loading : {error.message}</h1>
      </main>
    );
  }

  // Formatting population number.
  const formattedPopulationCount = data?.data?.[0]?.population?.toLocaleString("en-IN");

  // Formatting area number.
  const formattedArea = data?.data?.[0]?.area?.toLocaleString("en-IN");

  // Loop through languages.
  const Languages = Object.entries(data?.data?.[0]?.languages);

  return (
    <div className='singleCountry  relative w-[90vw] flex-col h-auto md:flex md:flex-row item-center justify-between my-8 mx-auto'>
      <img className=' country-flag w-[80%] h-[50%] sm:w-[50%] sm:h-[50%] md:w-[30%] md:h-[30%] m-auto' src={data?.data?.[0]?.flags?.png} alt={data?.data?.[0]?.flags?.alt} />

      <section className='w-auto p-4 mx-auto my-8 md:my-auto '>
        <h1 className='text-2xl font-extrabold tracking-wider mb-4 ml-2'>{data?.data?.[0]?.name?.common}</h1>

        <section className='flex-col md:flex md:flex-row'>
          <div className='mr-2'>
            <p className='m-2'><span className='font-bold'>Native Name</span> : {data?.data?.[0]?.name?.nativeName?.eng?.official}</p>
            <p className='m-2'><span className='font-bold'>Population</span> : {formattedPopulationCount}</p>
            <p className='m-2'><span className='font-bold'>Region</span> : {data?.data?.[0]?.region}</p>
            <p className='m-2'><span className='font-bold'>Sub Region</span> : {data?.data?.[0]?.subregion}</p>
            <p className='m-2'><span className='font-bold'>Capital</span> : {data?.data?.[0]?.capital}</p>
          </div>

          <div className=''>
            <p className='m-2'><span className='font-bold'>Top Level Domain</span> : {data?.data?.[0]?.tld}</p>
            <p className='m-2'><span className='font-bold'>Area</span> : {formattedArea} km²</p>
            {Languages ? (
              <p className='m-2'><span className='font-bold'>Languages</span> : {Languages.map((language) => {
                const id = uuidv4();
                return <span key={id}>{language[1]} </span>;
              })}</p>
            ) : null}
          </div>
        </section>

        {data?.data?.[0]?.borders && (
          <p className='my-10 mx-2'>
            <span className='font-bold'>Border Countries:</span>
            {data.data[0].borders.map((border) => {
              const id = uuidv4();
              return (
                <span
                  key={id}
                  className='border-2 border-solid text-md border-slate-400 py-1 px-4 m-1 font-semibold'
                >
                  {border}
                </span>
              );
            })}
          </p>
        )}
      </section>
    </div>
  );
}

export default SingleCountry;
