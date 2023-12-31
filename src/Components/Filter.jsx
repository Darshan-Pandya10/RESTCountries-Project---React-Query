import React, { useState } from 'react';
import '../App.css';
import { v4 as uuidv4 } from 'uuid';


const FilterMenu = ({handleFilter}) => {
  

  const [selectedValue, setSelectedValue] = useState('');
  const Regions =  
  [
  {value : 'Africa' , label : 'Africa'},
  {value : 'Americas' , label : 'America'},
  {value : 'Asia' , label : 'Asia'},
  {value : 'Europe' , label : 'Europe'},
  {value : 'Oceania' , label : 'Oceania'}
]
 
  const handleDropdownChange = (event) => {
  setSelectedValue(event.target.value);
  handleFilter(event.target.value);
};

  return (
    <>
      <div className="">
        {Regions.map((Region) => {
          const id = uuidv4();
          const {value , label} = Region
          return <button className='filter-btn' key={id} onClick={handleDropdownChange} value={value}>{label}</button>
        })}
      </div>
    </>
  );
};

export default FilterMenu;