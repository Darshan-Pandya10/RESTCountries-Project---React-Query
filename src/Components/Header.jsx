import { NavLink } from 'react-router-dom'
import '../App.css'
import { MdSunny } from "react-icons/md";
import { RiMoonClearFill } from "react-icons/ri";
import { useContext } from 'react'
import { ThemeContext } from '../App';

function Header() {
    const {theme , toggleTheme} = useContext(ThemeContext);

  return (
    <div className='header flex items-center overflow-x-hidden justify-between p-4 sm:p-4 w-screen shadow-lg'>
        <NavLink to='/'>
            <h1 className='logo text-base sm:text-xl md:text-2xl lg:text-[1.75rem] font-extrabold tracking-tight'>
                Where in the world?
            </h1> 
        </NavLink>
      <nav className='flex items-center justify-center'>
        <NavLink to='Countries' className='m-1 sm:m-2 font-semibold text-sm sm:text-base tracking-wider' >
            Countries
        </NavLink>
        {theme === 'light' ? 
        <button className='m-2 font-semibold text-sm sm:text-base md:text-xl tracking-wider p-2 rounded-3xl'  onClick={toggleTheme}>
            <RiMoonClearFill />
        </button> :
        <button className='m-2 font-semibold text-sm sm:text-base md:text-xl tracking-wider p-2 rounded-3xl' onClick={toggleTheme}>
            <MdSunny />
        </button>
        }
      </nav>
    </div>
  )
}

export default Header
