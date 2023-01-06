import * as Dialog from '@radix-ui/react-dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { RiCloseLine, RiLoader3Line } from 'react-icons/ri';
import { useMatch } from 'react-router-dom';
import { createTodo, Todo, TodoPriority, updateTodo } from '../api';

const TodoDialog = ({
  title,
  children,
  defaultValue,
  mutationFn,
  todoId,
}: {
  title: string;
  children: React.ReactNode;
  defaultValue?: Partial<{ title: Todo['title']; priority: Todo['priority'] }>;
  mutationFn: typeof createTodo | typeof updateTodo;
  todoId?: Todo['id'];
}) => {
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const [priority, setPriority] = useState<TodoPriority>('very-high');

  useEffect(() => {
    if (defaultValue) {
      setName(defaultValue.title || '');
      setPriority(defaultValue.priority || 'very-high');
    }
  }, [defaultValue]);

  const queryClient = useQueryClient();
  const match = useMatch('/detail/:id');
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: () =>
      mutationFn(todoId || (match?.params.id as string), {
        title: name,
        priority,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(['activity-detail', match?.params.id]);
      setOpen(false);
      setName('');
      setPriority('very-high');
    },
  });

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='bg-gray-300 opacity-50 w-screen h-screen fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
        <Dialog.Content
          data-cy='modal-add'
          className='p-5 rounded-lg flex flex-col gap-4 bg-white shadow-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <Dialog.Title
            data-cy='modal-add-title'
            className='flex items-center text-lg font-bold'>
            {title}{' '}
            <Dialog.Close
              data-cy='modal-add-close-button'
              className='ml-auto text-2xl'>
              <RiCloseLine />
            </Dialog.Close>
          </Dialog.Title>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              mutateAsync();
            }}
            className='flex flex-col gap-4'>
            <label
              data-cy='modal-add-name-title'
              className='uppercase text-sm flex flex-col gap-2'>
              nama list item{' '}
              <input
                data-cy='modal-add-name-input'
                placeholder='tambahkan nama list item'
                type='text'
                onChange={(e) => setName(e.target.value)}
                value={name}
                className='border-2 border-grey-100 rounded-md px-4 py-3 input:px-2'
              />
            </label>
            <label
              data-cy='modal-add-priority-title'
              className='relative uppercase text-sm flex flex-col gap-2'>
              priority
              <select
                data-cy='modal-add-priority-dropdown'
                className='block appearance-none bg-white border-2 border-grey-100 hover:border-gray-500 px-4 py-2 pr-8 rounded focus:outline-none focus:shadow-outline'
                onChange={(e) => {
                  setPriority(e.target.value as TodoPriority);
                  console.log(e.target.value);
                }}
                value={priority}>
                <option
                  value='very-high'
                  data-cy='modal-add-priority-very-high modal-add-priority-item'>
                  Very High
                </option>
                <option
                  value='high'
                  data-cy='modal-add-priority-high modal-add-priority-item'>
                  High
                </option>
                <option
                  value='normal'
                  data-cy='modal-add-priority-normal modal-add-priority-item'>
                  Normal
                </option>
                <option
                  value='low'
                  data-cy='modal-add-priority-low modal-add-priority-item'>
                  Low
                </option>
                <option
                  value='very-low'
                  data-cy='modal-add-priority-very-low modal-add-priority-item'>
                  Very Low
                </option>
              </select>
            </label>
            <button
              data-cy='modal-add-save-button'
              type='submit'
              disabled={!name || isLoading}
              className='ml-auto bg-primary text-white rounded-full px-6 py-2 font-bold disabled:bg-blue-200'>
              {isLoading ? (
                <RiLoader3Line className='text-2xl text-primary animate-spin' />
              ) : (
                'Simpan'
              )}
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default TodoDialog;
