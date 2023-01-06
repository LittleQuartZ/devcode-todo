type Props = {
  image: string;
  text: string;
  dataCy: string;
};

const EmptyPlaceholder = ({ image, text, dataCy }: Props) => {
  return (
    <div className='fixed -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 gap-8 w-full flex flex-col items-center'>
      <img src={image} data-cy={dataCy} className='min-w-4/5' />
      <h1 className='text-black-2 font-bold'>{text}</h1>
    </div>
  );
};

export default EmptyPlaceholder;
