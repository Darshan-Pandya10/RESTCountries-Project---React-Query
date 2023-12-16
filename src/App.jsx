import './App.css'
import Header from './Components/Header'
import Footer from './Components/Footer'
import { Outlet } from 'react-router-dom'
import { createContext, useState ,  } from 'react'
export const ThemeContext = createContext('null')

function App() {

  const [theme , setTheme ] = useState('light')

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'))
  }


  return (
    <ThemeContext.Provider value={{theme , toggleTheme}}>
    <main id={theme} className=''>
     <Header/>
     <div className='content'>
      <Outlet/>
     </div>
     <Footer/>
    </main>
    </ThemeContext.Provider>

  )
}

export default App
