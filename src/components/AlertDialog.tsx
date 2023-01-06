import * as Alert from '@radix-ui/react-alert-dialog';
import { RiAlertLine } from 'react-icons/ri';

import type { Activity, Todo } from '../api';

type Props = {
  children: React.ReactNode;
  title: Activity['title'] | Todo['title'];
  action: () => void;
};

const AlertDialog = ({ children, title, action }: Props) => {
  return (
    <Alert.Root>
      <Alert.Trigger asChild>{children}</Alert.Trigger>
      <Alert.Portal>
        <Alert.Overlay className='bg-gray-300 opacity-50 w-screen h-screen fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
        <Alert.Content
          data-cy='modal-add'
          className='p-5 w-[60%] md:max-w-[400px] bg-white rounded-lg shadow-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <Alert.Title className='flex items-center gap-4 flex-col font-bold'>
            <RiAlertLine className='text-7xl text-danger' />
            <p data-cy='modal-delete-title' className='text-center'>
              {title}
            </p>
          </Alert.Title>
          <div className='grid gap-3 grid-cols-2 justify-stretch mt-8'>
            <Alert.Cancel asChild>
              <button
                data-cy='modal-delete-cancel-button'
                className='rounded-full bg-gray-300 font-bold py-2 text-gray-500'>
                Batal
              </button>
            </Alert.Cancel>
            <Alert.Action asChild>
              <button
                data-cy='modal-delete-confirm-button'
                onClick={action}
                className='rounded-full bg-danger font-bold py-2 text-white'>
                Hapus
              </button>
            </Alert.Action>
          </div>
        </Alert.Content>
      </Alert.Portal>
    </Alert.Root>
  );
};

export default AlertDialog;
