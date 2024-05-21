import { Image } from 'primereact/image';

const Logo = () => {
  return (
    <Image
      src='/logo-m.svg'
      alt='logo'
      width={80}
      height={80}
    />
  );
};

export default Logo;
