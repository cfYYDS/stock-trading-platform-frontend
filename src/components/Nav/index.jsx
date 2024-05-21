import { Toolbar } from 'primereact/toolbar';

import Logo from './Logo';
import Logout from './Logout';

const Nav = () => {
  return (
    <Toolbar
      style={{
        position: 'sticky',
        top: 0,
        padding: '0 6rem',
        backgroundColor: 'white',
        zIndex: 1,
      }}
      start={<Logo />}
      center={''}
      end={<Logout />}
    />
  );
};

export default Nav;
