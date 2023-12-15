import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Countries from './Components/Countries.jsx'
import SingleCountry from './Components/SingleCountry.jsx'
import About from './Components/About.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements( 
    <Route path='' element={<App/>}>
      <Route  path='Countries'>
      <Route index element={<Countries/>}/>
      <Route path=':countryname' element={<SingleCountry/>}/>
      </Route>
      <Route path='About' element={<About/>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
  <RouterProvider router={router}>
      <App />
  </RouterProvider>
  </QueryClientProvider>
  
  // </React.StrictMode>
)
