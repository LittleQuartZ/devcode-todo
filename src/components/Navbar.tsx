import { RiArrowLeftLine } from 'react-icons/ri';
import { Link, useMatch } from 'react-router-dom';

const Navbar = () => {
  const match = useMatch('/detail/:id');

  return (
    <nav
      data-cy='header-background'
      className='bg-primary text-white font-bold px-8 py-5 shadow-md'>
      <div className='container mx-auto flex items-center gap-4'>
        {Boolean(match) && (
          <Link data-cy='todo-back-button' to='/'>
            <RiArrowLeftLine className='text-2xl' />
          </Link>
        )}
        <h1 data-cy='header-title' className='text-lg'>
          TO DO LIST APP
        </h1>
      </div>
    </nav>
  );
};

export default Navbar;
