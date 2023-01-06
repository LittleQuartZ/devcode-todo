import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { RiDeleteBinLine, RiEditLine, RiInformationLine } from 'react-icons/ri';
import { deleteTodo, Todo, TodoUpdate, updateTodo } from '../api';
import AlertDialog from './AlertDialog';
import TodoDialog from './TodoDialog';

const TodoItem = ({ todo }: { todo: Todo }) => {
  let priorityClass;
  switch (todo.priority) {
    case 'very-high':
      priorityClass = 'bg-priority-very-high';
      break;
    case 'high':
      priorityClass = 'bg-priority-high';
      break;
    case 'normal':
      priorityClass = 'bg-priority-normal';
      break;
    case 'low':
      priorityClass = 'bg-priority-low';
      break;
    case 'very-low':
      priorityClass = 'bg-priority-very-low';
      break;
  }

  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries([
        'activity-detail',
        `${todo.activity_group_id}`,
      ]);
    },
  });
  const { mutateAsync: updateMutateAsync, isLoading: updateIsLoading } =
    useMutation({
      mutationFn: (update: TodoUpdate) => updateTodo(todo.id, update),
      onSettled: () => {
        queryClient.invalidateQueries([
          'activity-detail',
          `${todo.activity_group_id}`,
        ]);
      },
    });

  const onDeleteClick = async () => {
    await mutateAsync(todo.id);
    toast((t) => (
      <span
        onClick={() => toast.dismiss(t.id)}
        className='flex items-center text-base gap-4'>
        <RiInformationLine className='text-2xl text-success' /> Activity
        berhasil dihilangkan
      </span>
    ));
  };

  return (
    <div className='flex items-center gap-4 rounded-md shadow-md border-2 border-transparent hover:border-primary px-4 py-2'>
      <input
        data-cy='todo-item-checkbox'
        disabled={updateIsLoading}
        type='checkbox'
        checked={todo.is_active ? false : true}
        onChange={(e) => {
          updateMutateAsync({ is_active: !e.target.checked });
        }}
      />
      <span
        data-cy='todo-item-priority-indicator'
        aria-label={`priority ${todo.priority}`}
        className={`w-3 h-3 inline-block rounded-full ${priorityClass}`}
      />
      <p
        data-cy='todo-item-title'
        className={`${!todo.is_active && 'line-through'}`}>
        {todo.title}
      </p>
      <TodoDialog
        defaultValue={{ title: todo.title, priority: todo.priority }}
        title='Update List Item'
        mutationFn={updateTodo}
        todoId={todo.id}>
        <button data-cy='todo-item-edit-button'>
          <RiEditLine />
        </button>
      </TodoDialog>
      <AlertDialog
        title={`Apakah anda yakin menghapus List Item "${todo.title}"?`}
        action={onDeleteClick}>
        <button
          className='ml-auto'
          data-cy='todo-item-delete-button'
          disabled={isLoading}>
          <RiDeleteBinLine />
        </button>
      </AlertDialog>
    </div>
  );
};

export default TodoItem;
