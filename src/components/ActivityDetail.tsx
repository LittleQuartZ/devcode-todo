import { useQuery } from '@tanstack/react-query';
import { RiAddLine, RiArrowUpDownLine, RiEditLine } from 'react-icons/ri';
import { useMatch } from 'react-router-dom';
import { createTodo, getActivityDetail } from '../api';
import TodoDialog from './AddDialog';
import TodoItem from './TodoItem';

const ActivityDetail = () => {
  const match = useMatch('/detail/:id');
  const activityDetail = useQuery({
    queryKey: ['activity-detail', match?.params.id],
    queryFn: ({ queryKey }) => getActivityDetail(queryKey[1] as string),
  });

  return (
    <main className='p-8 flex flex-col gap-4'>
      <div className='flex items-center justify-between'>
        <h1 className='font-bold'>{activityDetail.data?.title}</h1>
        <RiEditLine className='text-xl' />
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
