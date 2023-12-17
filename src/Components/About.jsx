import '../App.css';

function About() {
  return (
    <div className='about overflow-x-hidden px-4 py-8'>
      <h1 className='text-3xl font-extrabold tracking-wider'>About</h1>
      <p className='text-base font-semibold'>
        'Where in the world' is a place where you can manually search for countries or explore them one by one.
      </p>

      <h2 className='mt-4 font-semibold'>Key Points:</h2>
      <ol className='list-disc px-4'>
        <li className='py-1'>Filter countries by region.</li>
        <li className='py-1'>Manually search for a particular country.</li>
        <li className='py-1'>Click on any country name to get more information about the country.</li>
        <li className='py-1'>Dark/Light Themes.</li>
      </ol>
    </div>
  );
}

export default About;

