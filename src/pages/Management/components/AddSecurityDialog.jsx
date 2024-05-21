import { useState, useEffect } from 'react';
import axios from '../../../interceptors/auth.interceptor';

import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import DialogHeader from '../../../components/dialog/DialogHeader';
import DialogButtons from '../../../components/dialog/DialogButtons';
import InputLabel from '../../../components/input/InputLabel';
import InputError from '../../../components/input/InputError';

const addSecuritySchema = z.object({
  quantity: z.number().min(1),
  stock: z.string(),
  transactionType: z.enum(['buy', 'sell']),
});

const transactionTypeOptions = [
  { label: 'Buy', value: 'buy' },
  { label: 'Sell', value: 'sell' },
];

const AddSecurityDialog = ({ accountId, hideDialog }) => {
  const [stockOptions, setStockOptions] = useState([]);

  useEffect(() => {
    axios
      .get('/api/instrument')
      .then((response) => {
        const instruments = response.data.data;
        setStockOptions(
          instruments.map((instrument) => ({ value: instrument })),
        );
      })
      .catch(console.error);
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(addSecuritySchema),
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    axios
      .post('/api/account/security', {
        ...data,
        accountId,
      })
      .then(reset)
      .then(hideDialog)
      .catch(console.error);
  };

  return (
    <div
      className='dialog-container'
      onClick={(e) => e.stopPropagation()}
    >
      <DialogHeader
        title='ADD SECURITY TRANSACTION'
        hideDialog={hideDialog}
      />
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='input'>
            <InputLabel
              property='stock'
              title='Instrument Name'
            />
            <Controller
              name='stock'
              control={control}
              render={({ field }) => (
                <Dropdown
                  id={field.name}
                  placeholder='Select Instrument'
                  value={field.value}
                  onChange={(e) => field.onChange(e.value)}
                  options={stockOptions}
                  optionLabel='value'
                  checkmark
                  invalid={!!errors[field.name]}
                />
              )}
            />
            <InputError error={errors.stock} />
          </div>
          <div className='input'>
            <InputLabel
              property='quantity'
              title='Quantity'
            />
            <Controller
              name='quantity'
              control={control}
              render={({ field }) => (
                <InputNumber
                  id={field.name}
                  placeholder='Enter Quantity'
                  value={field.value}
                  onChange={(e) => field.onChange(e.value)}
                  invalid={!!errors[field.name]}
                />
              )}
            />
            <InputError error={errors.quantity} />
          </div>
          <div className='input'>
            <InputLabel
              property='transactionType'
              title='Transaction Type'
            />
            <Controller
              name='transactionType'
              control={control}
              render={({ field }) => (
                <Dropdown
                  id={field.name}
                  placeholder='Select Transaction Type'
                  value={field.value}
                  onChange={(e) => field.onChange(e.value)}
                  options={transactionTypeOptions}
                  optionLabel='label'
                  checkmark
                  invalid={!!errors[field.name]}
                />
              )}
            />
            <InputError error={errors.transactionType} />
          </div>
          <DialogButtons hideDialog={hideDialog} />
        </form>
      </Card>
    </div>
  );
};

export default AddSecurityDialog;
