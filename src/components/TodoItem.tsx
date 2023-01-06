import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri';
import { deleteTodo, Todo, TodoUpdate, updateTodo } from '../api';
import TodoDialog from './AddDialog';

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

  const onDeleteClick = () => {
    mutateAsync(todo.id);
  };

  return (
    <div className='flex items-center gap-4 rounded-md shadow-md border-2 border-transparent hover:border-primary px-4 py-2'>
      <input
        disabled={updateIsLoading}
        type='checkbox'
        checked={todo.is_active ? false : true}
        onChange={(e) => {
          updateMutateAsync({ is_active: !e.target.checked });
        }}
      />
      <span
        aria-label={`priority ${todo.priority}`}
        className={`w-3 h-3 inline-block rounded-full ${priorityClass}`}
      />
      <p className={`${!todo.is_active && 'line-through'}`}>{todo.title}</p>
      <TodoDialog
        defaultValue={{ title: todo.title, priority: todo.priority }}
        title='Update List Item'
        mutationFn={updateTodo}
        todoId={todo.id}>
        <button>
          <RiEditLine />
        </button>
      </TodoDialog>
      <button className='ml-auto' onClick={onDeleteClick} disabled={isLoading}>
        <RiDeleteBinLine />
      </button>
    </div>
  );
};

export default TodoItem;
