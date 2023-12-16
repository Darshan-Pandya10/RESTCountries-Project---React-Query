import '../App.css'
import { FaGithub } from "react-icons/fa";


function Footer() {
  return (
    <div className='footer flex items-center justify-between p-8 font-semibold overflow-x-hidden'>
      <p className='text-sm md:text-base'>A <a target='_blank' href="https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca/hub"> Frontend Mentor </a> Chellenge Made By <a  target='_blank' href="https://github.com/Darshan-Pandya10"> Darshan Pandya </a>.</p>

      <div className="socials text-3xl">
        <a href="https://github.com/Darshan-Pandya10">
          <FaGithub />
        </a>
      </div>
    </div>
  )
}

export default Footer
