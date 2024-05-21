import { Image } from 'primereact/image';

const Loading = () => {
  return (
    <div className='center'>
      <Image
        src='/loading.gif'
        alt='loading...'
      />
    </div>
  );
};

export default Loading;
