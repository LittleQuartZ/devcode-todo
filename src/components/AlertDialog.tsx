import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';
import { RiAlertLine } from 'react-icons/ri';

import type { Activity, Todo } from '../api';

type Props = {
  children: React.ReactNode;
  title: Activity['title'] | Todo['title'];
  action: (setter: React.Dispatch<React.SetStateAction<boolean>>) => void;
};

const AlertDialog = ({ children, title, action }: Props) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setOpen(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [open]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='bg-gray-300 opacity-50 w-screen h-screen fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
        <Dialog.Content
          data-cy='modal-delete'
          className='p-5 w-[60%] md:max-w-[400px] bg-white rounded-lg shadow-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <Dialog.Title className='flex items-center gap-4 flex-col font-bold'>
            <RiAlertLine className='text-7xl text-danger' />
            <p data-cy='modal-delete-title' className='text-center'>
              {title}
            </p>
          </Dialog.Title>
          <div className='grid gap-3 grid-cols-2 justify-stretch mt-8'>
            <Dialog.Close asChild>
              <button
                data-cy='modal-delete-cancel-button'
                className='rounded-full bg-gray-300 font-bold py-2 text-gray-500'>
                Batal
              </button>
            </Dialog.Close>
            <button
              data-cy='modal-delete-confirm-button'
              onClick={() => action(setOpen)}
              className='rounded-full bg-danger font-bold py-2 text-white'>
              Hapus
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AlertDialog;
