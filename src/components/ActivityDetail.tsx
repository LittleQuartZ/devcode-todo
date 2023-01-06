import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import {
  RiAddLine,
  RiArrowUpDownLine,
  RiEditLine,
  RiLoader3Line,
} from 'react-icons/ri';
import { useMatch } from 'react-router-dom';
import { createTodo, getActivityDetail, updateActivityDetail } from '../api';
import TodoDialog from './AddDialog';
import TodoItem from './TodoItem';

const ActivityDetail = () => {
  const match = useMatch('/detail/:id');
  const queryClient = useQueryClient();
  const activityDetail = useQuery({
    queryKey: ['activity-detail', match?.params.id as string],
    queryFn: ({ queryKey }) => getActivityDetail(queryKey[1]),
  });
  const updateActivity = useMutation({
    mutationFn: () => updateActivityDetail(match?.params.id as string, title),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['activity-detail', match?.params.id],
      });
    },
  });

  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState('');
  const onEditClick = () => {
    setTitle(activityDetail.data?.title as string);
    setEditing(true);
  };

  useEffect(() => {
    setTitle(activityDetail.data?.title as string);
  }, [activityDetail.data?.title]);

  return (
    <main className='p-8 flex flex-col gap-4'>
      <div className='flex items-center justify-between'>
        {editing ? (
          <input
            className='font-bold'
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => {
              setEditing(false);
              updateActivity.mutateAsync();
            }}
          />
        ) : (
          <h1 className='font-bold' onClick={onEditClick}>
            {title}
          </h1>
        )}
        <button onClick={onEditClick}>
          <RiEditLine className='text-xl' />
        </button>
      </div>
      <div className='flex ml-auto gap-4 my-4'>
        <button className='border-black-3 text-black-3 border-2 p-2 rounded-full'>
          <RiArrowUpDownLine className='text-xl' />
        </button>
        <TodoDialog title='Tambah List Item' mutationFn={createTodo}>
          <button className='flex items-center font-bold bg-primary rounded-full py-2 px-4 text-white gap-2'>
            <RiAddLine className='text-xl' /> Tambah
          </button>
        </TodoDialog>
      </div>
      {activityDetail.data?.todo_items.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </main>
  );
};

export default ActivityDetail;
