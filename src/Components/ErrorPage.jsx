import { Link } from 'react-router-dom'
import '../App.css'

function ErrorPage() {
  return (
    <div className='ErrorPage '>
      <h1>Error : Page not found!</h1>
      <p>Go to the <Link to=''>Home Page</Link></p>
    </div>
  )
}

export default ErrorPage
