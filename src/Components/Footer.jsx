import '../App.css'
import { FaGithub } from "react-icons/fa";


function Footer() {
  return (
    <div className='footer flex items-center justify-between p-8 font-semibold'>
      <p>A <a target='_blank' href="https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca/hub"> Frontend Mentor </a> Chellenge Made By <a  target='_blank' href="https://github.com/Darshan-Pandya10"> Darshan Pandya </a>.</p>

      <div className="socials">
        <a href="https://github.com/Darshan-Pandya10">
          <FaGithub size={35} />
        </a>
      </div>
    </div>
  )
}

export default Footer
