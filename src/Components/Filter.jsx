import React, { useState } from 'react';
import '../App.css';
import { v4 as uuidv4 } from 'uuid';


const FilterMenu = ({handleFilter}) => {
  

  const [selectedValue, setSelectedValue] = useState('');
  const Regions =  
  [{value : 'africa' , label : 'Africa'},
  {value : 'america' , label : 'America'},
  {value : 'asia' , label : 'Asia'},
  {value : 'europe' , label : 'Europe'},
  {value : 'ociania' , label : 'Ociania'}
]

  const handleDropdownChange = (event) => {
    handleFilter(event.target.value)
    setSelectedValue(event.target.value)
  };

  return (
    <>
      <div className="filter-menu flex items-center justify-center w-fit mx-auto flex-wrap">
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