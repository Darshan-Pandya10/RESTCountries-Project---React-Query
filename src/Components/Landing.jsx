import React from 'react'

function Landing() {
  return (
    <div className='flex flex-col mx-4 items-center justify-center md:mx-8 py-[10rem]'>
        <div className='welcome-box m-auto px-2 py-6 md:p-4 w-fit rounded-lg  border-4 border-solid mb-8'>
            <h1 className='text-xl font-bold md:text-2xl md:tracking-wider'>Welcome To 'Where in the world?'</h1>
        </div>
      <h3 className='text-base mx-2 md:mx-8 text-center font-semibold tracking-widest leading-7'>'Where in the world?' is a platform where you can manually search for countries. Alternatively, you can explore them one by one.'</h3>
    </div>
  )
}

export default Landing
