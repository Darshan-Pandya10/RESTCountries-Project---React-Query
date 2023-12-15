import React from 'react'
import { NavLink } from 'react-router-dom';
import { FaHashtag } from "react-icons/fa";


function CountryCard({country}) {

const {name,flags,population,region,capital} = country;
// formationg number.
const formattedPopulationCount = population ? population.toLocaleString("en-IN") : 'N/A';

  return (
    <div className='Country-card m-8 w-[18rem] h-auto shadow-lg rounded-md'>
        <img className='Country-flag rounded-t-md' src={flags.svg} alt={name.common}/>
        <div className="Country-details p-4">
          <NavLink to={name.common} className='country-link'>
          <h2 className='text-xl font-extrabold tracking-wider my-2 flex items-center'>
            <span className='pb-1'><FaHashtag size={16} /></span>
            {name.common}
            </h2>
          </NavLink>
          <p><span className='font-semibold'>Population</span> : {formattedPopulationCount}</p>
          <p><span className='font-semibold'>Region</span> : {region}</p>
          <p><span className='font-semibold'>Capital</span> : {capital}</p>
        </div>
    </div>
  )
}

export default CountryCard
