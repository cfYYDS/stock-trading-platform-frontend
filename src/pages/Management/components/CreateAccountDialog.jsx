import { useState, useEffect } from 'react';
import { useDebounce } from 'primereact/hooks';
import axios from '../../../interceptors/auth.interceptor';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';

import DialogHeader from '../../../components/dialog/DialogHeader';
import DialogButtons from '../../../components/dialog/DialogButtons';
import InputLabel from '../../../components/input/InputLabel';
import InputError from '../../../components/input/InputError';

const createAccountSchema = z.object({
  nickname: z.string().min(3).max(32),
  userId: z.number(),
});

const CreateAccountDialog = ({ hideDialog }) => {
  const [emailOptions, setEmailOptions] = useState([]);
  const [, debouncedSearch, setSearch] = useDebounce('', 400);

  useEffect(() => {
    axios
      .post('/api/user/search', {
        searchContent: debouncedSearch,
        pageNumber: 0,
        pageSize: 10,
      })
      .then((response) => {
        const users = response.data.data;
        setEmailOptions(
          users.map((user) => ({ label: user.email, value: user.userId })),
        );
      })
      .catch(console.error);
  }, [debouncedSearch]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      nickname: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    axios
      .post('/api/account', data)
      .then(reset)
      .then(hideDialog)
      .catch(console.error);
  };

  return (
    <div className='dialog-container'>
      <DialogHeader
        hideDialog={hideDialog}
        title='CREATE ACCOUNT'
      />
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='input'>
            <InputLabel
              property='userId'
              title='Select User'
            />
            <Controller
              name='userId'
              control={control}
              render={({ field }) => (
                <Dropdown
                  id={field.name}
                  placeholder='Select By Email'
                  value={field.value}
                  options={emailOptions}
                  optionLabel='label'
                  onChange={(e) => field.onChange(e.value)}
                  filter
                  filterPlaceholder='Filter By Email'
                  filterInputAutoFocus
                  onFilter={(e) => setSearch(e.filter)}
                  invalid={!!errors[field.name]}
                />
              )}
            />
            <InputError error={errors.userId} />
          </div>
          <div className='input'>
            <InputLabel
              property='nickname'
              title='Nick Name'
            />
            <Controller
              name='nickname'
              control={control}
              render={({ field }) => (
                <InputText
                  id={field.name}
                  {...field}
                  placeholder='Enter Nickname'
                  invalid={!!errors[field.name]}
                />
              )}
            />
            <InputError error={errors.nickname} />
          </div>
          <DialogButtons hideDialog={hideDialog} />
        </form>
      </Card>
    </div>
  );
};

export default CreateAccountDialog;
