import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type Toast, toast } from 'react-hot-toast';
import { RiDeleteBinLine, RiInformationLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

import { type Activity, deleteActivity } from '../api';
import AlertDialog from './AlertDialog';

type Props = {
  group: Activity;
};

const ActivityItem = ({ group }: Props) => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: deleteActivity,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['activity-groups'] });
    },
  });

  const toastElement = (t: Toast) => (
    <div
      className='flex items-center text-base gap-4'
      data-cy='modal-information'
      onClick={() => toast.dismiss(t.id)}>
      <RiInformationLine
        data-cy='modal-information-icon'
        className='text-2xl text-success'
      />
      <span data-cy='modal-information-title'>
        Activity berhasil dihilangkan
      </span>
    </div>
  );

  const onDeleteClick = async (
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    await mutateAsync(group.id);
    toast(toastElement);
    setter(false);
  };

  const prettyDate = (date: Date) => {
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div
      data-cy='activity-item'
      className='bg-white shadow-lg p-4 rounded-md border-2 border-transparent hover:border-primary flex flex-col'>
      <Link
        to={`/detail/${group.id}`}
        data-cy='activity-item-title'
        className='flex-1 break-words font-bold'>
        {group.title}
      </Link>
      <div className='text-black-3 flex items-center justify-between'>
        <span data-cy='activity-item-date' className='text-sm'>
          {prettyDate(new Date(group.created_at))}
        </span>
        <AlertDialog
          title={`Apakah anda yakin menghapus activity "${group.title}"?`}
          action={onDeleteClick}>
          <button data-cy='activity-item-delete-button'>
            <RiDeleteBinLine className='hover:text-danger text-lg' />
          </button>
        </AlertDialog>
      </div>
    </div>
  );
};

export default ActivityItem;
