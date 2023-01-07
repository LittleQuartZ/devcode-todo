import { RiArrowLeftLine, RiGithubFill } from 'react-icons/ri';
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
        <a
          className='ml-auto rounded-full bg-black-1 text-2xl font-normal p-0.5 gap-2'
          href='https://github.com/littlequartz/devcode-todo'
          rel='noreferrer'
          target='_blank'>
          <RiGithubFill />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
