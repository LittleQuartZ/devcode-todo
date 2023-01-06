import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { RiAddLine, RiArrowUpDownLine, RiEditLine } from 'react-icons/ri';
import { useMatch } from 'react-router-dom';
import { createTodo, getActivityDetail, updateActivityDetail } from '../api';
import TodoDialog from './TodoDialog';
import SortMenu from './SortMenu';
import TodoItem from './TodoItem';
import { useAtom } from 'jotai';
import { orderAtom } from '../states/todoOrder';

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

  const [order] = useAtom(orderAtom);

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
        <SortMenu>
          <button className='border-black-3 text-black-3 border-2 p-2 rounded-full'>
            <RiArrowUpDownLine className='text-xl' />
          </button>
        </SortMenu>
        <TodoDialog title='Tambah List Item' mutationFn={createTodo}>
          <button className='flex items-center font-bold bg-primary rounded-full py-2 px-4 text-white gap-2'>
            <RiAddLine className='text-xl' /> Tambah
          </button>
        </TodoDialog>
      </div>
      {activityDetail.data &&
        (() => {
          const todos = activityDetail.data.todo_items;

          switch (order) {
            case 'newest':
              return todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
              ));
            case 'oldest':
              return [...todos]
                .reverse()
                .map((todo) => <TodoItem key={todo.id} todo={todo} />);
            case 'az':
              return [...todos]
                .sort((a, b) => {
                  if (a.title < b.title) {
                    return -1;
                  }
                  if (a.title > b.title) {
                    return 1;
                  }
                  return 0;
                })
                .map((todo) => <TodoItem key={todo.id} todo={todo} />);
            case 'za':
              return [...todos]
                .sort((a, b) => {
                  if (a.title < b.title) {
                    return 1;
                  }
                  if (a.title > b.title) {
                    return -1;
                  }
                  return 0;
                })
                .map((todo) => <TodoItem key={todo.id} todo={todo} />);
            case 'active':
              return [...todos]
                .sort((a, b) => {
                  if (a.is_active === b.is_active) {
                    return -1;
                  }

                  return a.is_active ? 1 : -1;
                })
                .map((todo) => <TodoItem key={todo.id} todo={todo} />);
          }
        })()}
    </main>
  );
};

export default ActivityDetail;
