import { Link } from 'react-router-dom'
import '../App.css'

function ErrorPage() {
  return (
    <div className='ErrorPage p-8 '>
      <h1 className='text-2xl font-extrabold tracking-wider mb-2'>Error : Page not found!</h1>
      <p className='text-base font-semibold tracking-wider '>Go to the <Link to=''>Home Page</Link></p>
    </div>
  )
}

export default ErrorPage
