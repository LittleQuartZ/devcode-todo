import { RiArrowLeftLine } from 'react-icons/ri';
import { Link, useMatch } from 'react-router-dom';

const Navbar = () => {
  const match = useMatch('/detail/:id');

  return (
    <nav
      data-cy='header-background'
      className='bg-primary text-white font-bold p-5 shadow-md flex items-center gap-4'>
      {Boolean(match) && (
        <Link to='/'>
          <RiArrowLeftLine className='text-2xl' />
        </Link>
      )}
      <h1 data-cy='header-title' className='text-lg'>
        TO DO LIST APP
      </h1>
    </nav>
  );
};

export default Navbar;
