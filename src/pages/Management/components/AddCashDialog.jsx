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

const addCashSchema = z.object({
  amount: z.number().min(1),
  currency: z.string(),
  transactionType: z.enum(['credit', 'debit']),
});

const transactionTypeOptions = [
  { label: 'Debit', value: 'debit' },
  { label: 'Credit', value: 'credit' },
];

const AddCashDialog = ({ accountId, hideDialog }) => {
  const [currencyOptions, setCurrencyOptions] = useState([]);

  useEffect(() => {
    axios
      .get('/api/currency')
      .then((response) => {
        const currencies = response.data.data;
        setCurrencyOptions(currencies.map((currency) => ({ value: currency })));
      })
      .catch(console.error);
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(addCashSchema),
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    axios
      .post('/api/account/cash', {
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
        title='ADD CASH TRANSACTION'
        hideDialog={hideDialog}
      />
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='input'>
            <InputLabel
              property='currency'
              title='Currency'
            />
            <Controller
              name='currency'
              control={control}
              render={({ field }) => (
                <Dropdown
                  id={field.name}
                  placeholder='Select Currency'
                  value={field.value}
                  onChange={(e) => field.onChange(e.value)}
                  options={currencyOptions}
                  optionLabel='value'
                  checkmark
                  invalid={!!errors[field.name]}
                />
              )}
            />
            <InputError error={errors.currency} />
          </div>
          <div className='input'>
            <InputLabel
              property='amount'
              title='Amount'
            />
            <Controller
              name='amount'
              control={control}
              render={({ field }) => (
                <InputNumber
                  id={field.name}
                  placeholder='Enter Amount'
                  value={field.value}
                  onChange={(e) => field.onChange(e.value)}
                  invalid={!!errors[field.name]}
                />
              )}
            />
            <InputError error={errors.amount} />
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

export default AddCashDialog;
