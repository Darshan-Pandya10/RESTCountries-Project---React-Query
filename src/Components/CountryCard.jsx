import React from 'react'
import { NavLink } from 'react-router-dom';
import { FaHashtag } from "react-icons/fa";


function CountryCard({country , singleCountryData}) {

  // console.log(singleCountryData)

const {name,flags,population,region,capital} = country || { };
// formationg number.
const formattedPopulationCount = population?.toLocaleString("en-IN") || singleCountryData?.data[0]?.population?.toLocaleString("en-IN");


  return (
    <div className='Country-card m-8 w-[18rem] h-auto shadow-lg rounded-md'>
        <img className='Country-flag rounded-t-md' src={flags?.svg || singleCountryData?.data[0]?.flags?.svg} alt={name?.common || singleCountryData?.data[0]?.name?.common}/>
        <div className="Country-details p-4">
          <NavLink to={name?.common || singleCountryData?.data[0]?.name?.common} className='country-link'>
          <h2 className='text-xl font-extrabold tracking-wider my-2 flex items-center'>
            <span className='pb-1'><FaHashtag size={16} /></span>
            {name?.common || singleCountryData?.data[0]?.name?.common}
            </h2>
          </NavLink>
          <p><span className='font-semibold'>Population</span> : {formattedPopulationCount}</p>
          <p><span className='font-semibold'>Region</span> : {region || singleCountryData?.data[0]?.region}</p>
          <p><span className='font-semibold'>Capital</span> : {capital || singleCountryData?.data[0]?.capital}</p>
        </div>
    </div>
  )
}

export default CountryCard
