import { RiAddFill } from 'react-icons/ri';

import Navbar from './components/Navbar';
import emptyStateVector from './assets/activity-empty-state.png';
import { useQuery } from '@tanstack/react-query';
import { getAllActivity } from './api';
import ActivityItem from './components/ActivityItem';

const App = () => {
  const activityGroups = useQuery({
    queryKey: ['activity-groups'],
    queryFn: getAllActivity,
    onError: (err) => {
      alert((err as Error).message);
    },
  });

  return (
    <>
      <Navbar />
      <main className='pt-8 px-8'>
        <section className='flex items-center justify-between'>
          <h1 data-cy='activity-title' className='font-bold'>
            Activity
          </h1>
          <button
            data-cy='activity-add-button'
            className='flex items-center font-bold gap-2 bg-primary rounded-full px-4 py-3 text-xs text-white'>
            <RiAddFill className='w-4 h-4' />
            Tambah
          </button>
        </section>
        {activityGroups.data ? (
          <section className='grid grid-cols-2 gap-5 mt-8 auto-rows-[140px] pb-8'>
            {activityGroups.data.map((group) => (
              <ActivityItem group={group} key={group.id} />
            ))}
          </section>
        ) : (
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 gap-8 w-full flex flex-col items-center'>
            <img
              src={emptyStateVector}
              data-cy='activity-empty-state'
              className='w-4/5'
            />
            <h1 className='text-black-2 font-bold'>Buat activity pertamamu</h1>
          </div>
        )}
      </main>
    </>
  );
};

export default App;
