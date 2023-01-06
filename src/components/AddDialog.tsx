import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import { RiAddLine, RiCloseLine } from 'react-icons/ri';
import { TodoPriority } from '../api';

const AddDialog = () => {
  const [name, setName] = useState('');
  const [priority, setPriority] = useState<TodoPriority>('very-high');

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <button className='flex items-center font-bold bg-primary rounded-full py-2 px-4 text-white gap-2'>
          <RiAddLine className='text-xl' /> Tambah
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='bg-gray-300 opacity-50 w-screen h-screen fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
        <Dialog.Content className='p-5 rounded-lg flex flex-col gap-4 bg-white shadow-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <Dialog.Title className='flex items-center text-lg font-bold'>
            Tambah List Item{' '}
            <Dialog.Close className='ml-auto text-2xl'>
              <RiCloseLine />
            </Dialog.Close>
          </Dialog.Title>
          <form className='flex flex-col gap-4'>
            <label className='uppercase text-sm flex flex-col gap-2'>
              nama list item{' '}
              <input
                placeholder='tambahkan nama list item'
                type='text'
                onChange={(e) => setName(e.target.value)}
                value={name}
                className='border-2 border-grey-100 rounded-md px-4 py-3 input:px-2'
              />
            </label>
            <label className='relative uppercase text-sm flex flex-col gap-2'>
              priority
              <select
                className='block appearance-none bg-white border-2 border-grey-100 hover:border-gray-500 px-4 py-2 pr-8 rounded focus:outline-none focus:shadow-outline'
                onChange={(e) => setPriority(e.target.value as TodoPriority)}
                value={priority}>
                <option value='very-high'>Very High</option>
                <option value='high'>High</option>
                <option value='medium'>Medium</option>
                <option value='low'>Low</option>
                <option value='very-low'>Very Low</option>
              </select>
            </label>
            <button
              type='submit'
              disabled={!Boolean(name)}
              className='ml-auto bg-primary text-white rounded-full px-6 py-2 font-bold disabled:opacity-20'>
              Simpan
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AddDialog;
