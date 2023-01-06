import { RiAddFill, RiLoader3Fill } from 'react-icons/ri';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createActivity, getAllActivity } from '../api';
import ActivityItem from './ActivityItem';
import EmptyPlaceholder from './EmptyPlaceholder';

const ActivityList = () => {
  const queryClient = useQueryClient();
  const activityGroups = useQuery({
    queryKey: ['activity-groups'],
    queryFn: getAllActivity,
    onError: (err) => {
      alert((err as Error).message);
    },
  });
  const addActivityGroup = useMutation({
    mutationKey: ['activity-groups-create'],
    mutationFn: createActivity,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['activity-groups'] });
    },
  });

  const onAddClick = async () => {
    addActivityGroup.mutate();
  };

  return (
    <main className='pt-8 px-8'>
      <section className='flex items-center justify-between'>
        <h1 data-cy='activity-title' className='font-bold'>
          Activity
        </h1>
        <button
          onClick={onAddClick}
          disabled={addActivityGroup.isLoading}
          data-cy='activity-add-button'
          className='flex items-center font-bold gap-2 disabled:bg-black-3 bg-primary rounded-full px-4 py-3 text-xs text-white'>
          {addActivityGroup.isLoading ? (
            <RiLoader3Fill className='animate-spin w-4 h-4' />
          ) : (
            <>
              <RiAddFill className='w-4 h-4' />
              Tambah
            </>
          )}
        </button>
      </section>
      {activityGroups.data ? (
        <section className='grid grid-cols-2 gap-5 mt-8 auto-rows-[140px] pb-8'>
          {activityGroups.data.map((group) => (
            <ActivityItem group={group} key={group.id} />
          ))}
        </section>
      ) : activityGroups.isLoading ? (
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <RiLoader3Fill className='animate-spin text-4xl' />
        </div>
      ) : (
        <EmptyPlaceholder />
      )}
    </main>
  );
};

export default ActivityList;
