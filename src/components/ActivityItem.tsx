import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RiDeleteBinLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { Activity, deleteActivity } from '../api';
import AlertDialog from './AlertDialog';

const ActivityItem = ({ group }: { group: Activity }) => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: deleteActivity,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['activity-groups'] });
    },
  });

  const onDeleteClick = () => {
    mutateAsync(group.id);
  };

  return (
    <div
      data-cy='activity-item'
      className='shadow-lg p-4 rounded-md border-2 border-transparent hover:border-primary flex flex-col'>
      <Link
        to={`/detail/${group.id}`}
        data-cy='activity-item-title'
        className='flex-1 break-words font-bold text-sm'>
        {group.title}
      </Link>
      <div className='text-black-3 flex items-center justify-between'>
        <span data-cy='activity-item-date' className='text-sm'>
          {new Date(group.created_at).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </span>
        <AlertDialog
          title={`Apakah anda yakin menghapus activity "${group.title}"?`}
          action={onDeleteClick}>
          <button data-cy='activity-item-delete-button'>
            <RiDeleteBinLine className='hover:text-danger' />
          </button>
        </AlertDialog>
      </div>
    </div>
  );
};

export default ActivityItem;
