import './App.css'
import { createContext, useState } from 'react'
export const ThemeContext = createContext('null')
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Countries from './Components/Countries.jsx'
import SingleCountry from './Components/SingleCountry.jsx'
import ErrorPage from './Components/ErrorPage.jsx'
import HomeLayout from './Components/HomeLayout.jsx'
import Landing from './Components/Landing.jsx'
function App() {

  
const router = createBrowserRouter(
  createRoutesFromElements( 
    <Route path='/' element={<HomeLayout/>}>
      <Route index element={<Landing/>} />
      <Route path='Countries'>
        <Route index element={<Countries/>}/>
        <Route path=':countryname' element={<SingleCountry/>}/>
      </Route>
      <Route path='*' element={<ErrorPage/>}/>
    </Route>
  )
)

  const [theme , setTheme ] = useState('light')

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'))
  }


  return (
    <ThemeContext.Provider value={{theme , toggleTheme}}>
    <main id={theme} className=''>
      <RouterProvider router={router}/>
    </main>
    </ThemeContext.Provider>

  )
}

export default App
