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
import EmptyPlaceholder from './EmptyPlaceholder';
import todoEmptyState from '../assets/todo-empty-state.png';

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
    <main className='p-8 flex flex-col gap-4 container mx-auto'>
      <div className='flex items-center text-lg justify-between'>
        {editing ? (
          <input
            data-cy='todo-title-input'
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
          <h1 className='font-bold' data-cy='todo-title' onClick={onEditClick}>
            {title}
          </h1>
        )}
        <button onClick={onEditClick} data-cy='todo-title-edit-button'>
          <RiEditLine className='text-xl' />
        </button>
      </div>
      <div className='flex ml-auto gap-4 my-4'>
        <SortMenu>
          <button
            data-cy='todo-sort-button'
            className='bg-white border-black-3 text-black-3 border-2 p-2 rounded-full'>
            <RiArrowUpDownLine className='text-xl' />
          </button>
        </SortMenu>
        <TodoDialog title='Tambah List Item' mutationFn={createTodo}>
          <button
            data-cy='todo-add-button'
            className='flex items-center font-bold bg-primary rounded-full py-2 px-4 text-white gap-2'>
            <RiAddLine className='text-xl' /> Tambah
          </button>
        </TodoDialog>
      </div>
      {activityDetail.data && activityDetail.data.todo_items.length > 0 ? (
        (() => {
          const todos = activityDetail.data.todo_items;

          switch (order) {
            case 'newest':
              return todos;
            case 'oldest':
              return [...todos].reverse();
            case 'az':
              return [...todos].sort((a, b) => {
                if (a.title < b.title) {
                  return -1;
                }
                if (a.title > b.title) {
                  return 1;
                }
                return 0;
              });
            case 'za':
              return [...todos].sort((a, b) => {
                if (a.title < b.title) {
                  return 1;
                }
                if (a.title > b.title) {
                  return -1;
                }
                return 0;
              });
            case 'active':
              return [...todos].sort((a, b) => {
                if (a.is_active === b.is_active) {
                  return -1;
                }

                return a.is_active ? -1 : 1;
              });
            default:
              return todos;
          }
        })().map((todo, index) => (
          <TodoItem data-cy={`todo-item-${index}`} key={todo.id} todo={todo} />
        ))
      ) : (
        <EmptyPlaceholder
          dataCy='todo-empty-state'
          image={todoEmptyState}
          text='Buat List Item Kamu'
        />
      )}
    </main>
  );
};

export default ActivityDetail;
