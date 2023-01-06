import { RiDeleteBinLine, RiEditLine } from 'react-icons/ri';
import { Todo } from '../api';

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

  return (
    <div className='flex items-center gap-4 rounded-md shadow-md border-2 border-transparent hover:border-primary px-4 py-2'>
      <input type='checkbox' checked={todo.is_active ? false : true} />
      <span
        aria-label={`priority very-low`}
        className={`w-3 h-3 inline-block rounded-full ${priorityClass}`}
      />
      <p className={`${!todo.is_active && 'line-through'}`}>{todo.title}</p>
      <button>
        <RiEditLine />
      </button>
      <button className='ml-auto'>
        <RiDeleteBinLine />
      </button>
    </div>
  );
};

export default TodoItem;
