import { useRef, useState } from 'react';
import axios from '../../../interceptors/auth.interceptor';

import { Menu } from 'primereact/menu';
import { Dialog } from 'primereact/dialog';

import AddSecurityDialog from './AddSecurityDialog';
import AddCashDialog from './AddCashDialog';

const ActionMenu = ({ status, accountId, refetchData }) => {
  const menu = useRef(null);
  const [securityDialogShow, setSecurityDialogShow] = useState(false);
  const [cashDialogShow, setCashDialogShow] = useState(false);

  const menuModel = [
    {
      label: status === 'Active' ? 'Suspend' : 'Activate',
      command: () => {
        axios
          .patch(`/api/account/${accountId}/status`, {
            status: status === 'Active' ? 'Suspended' : 'Active',
          })
          .then(refetchData);
      },
    },
    {
      label: 'Add Security Transaction',
      command: () => setSecurityDialogShow(true),
    },
    { label: 'Add Cash Transaction', command: () => setCashDialogShow(true) },
  ];

  return (
    <>
      <i
        className='pi pi-ellipsis-v'
        onClick={(e) => {
          e.stopPropagation();
          menu.current.toggle(e);
        }}
      ></i>
      <Menu
        ref={menu}
        popup
        popupAlignment='right'
        model={menuModel}
        style={{ minWidth: 'fit-content' }}
      />
      <Dialog
        visible={securityDialogShow}
        content={
          <AddSecurityDialog
            accountId={accountId}
            hideDialog={() => setSecurityDialogShow(false)}
          />
        }
      />
      <Dialog
        visible={cashDialogShow}
        content={
          <AddCashDialog
            accountId={accountId}
            hideDialog={() => setCashDialogShow(false)}
          />
        }
      />
    </>
  );
};

export default ActionMenu;
