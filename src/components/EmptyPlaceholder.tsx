import emptyStateVector from '../assets/activity-empty-state.png';
const EmptyPlaceholder = () => {
  return (
    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 gap-8 w-full flex flex-col items-center'>
      <img
        src={emptyStateVector}
        data-cy='activity-empty-state'
        className='w-4/5'
      />
      <h1 className='text-black-2 font-bold'>Buat activity pertamamu</h1>
    </div>
  );
};

export default EmptyPlaceholder;
