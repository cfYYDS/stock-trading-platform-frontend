import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import InputError from '../../components/input/InputError';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  remember: z.boolean(),
});

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Card style={{ padding: '3rem 2rem 2rem 2rem', width: '28rem' }}>
        <div style={{ textAlign: 'start', color: 'var(--primary-color)' }}>
          <h1>LOGIN</h1>
          <p style={{ fontWeight: '600' }}>Trading Capturing System</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='input'>
            <label htmlFor={'email'}>Email</label>
            <Controller
              name='email'
              control={control}
              render={({ field }) => (
                <InputText
                  id={field.name}
                  {...field}
                  placeholder={`Enter your email`}
                  invalid={!!errors[field.name]}
                />
              )}
            />
            <InputError error={errors.email} />
          </div>
          <div className='input'>
            <label htmlFor={'password'}>Password</label>
            <Controller
              name='password'
              control={control}
              render={({ field }) => (
                <Password
                  id={field.name}
                  {...field}
                  placeholder={`Enter your password`}
                  invalid={!!errors[field.name]}
                  toggleMask={true}
                  feedback={false}
                  autoComplete='on'
                />
              )}
            />
            <InputError error={errors.password} />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '1rem 0',
              marginBottom: '1rem',
            }}
          >
            <Controller
              name='remember'
              control={control}
              render={({ field }) => (
                <Checkbox
                  inputId={field.name}
                  onChange={(e) => field.onChange(e.checked)}
                  checked={field.value}
                ></Checkbox>
              )}
            />
            <label htmlFor='remember'>Remember Me</label>
          </div>
          <Button
            rounded
            type='submit'
          >
            Log In
          </Button>
        </form>
        <p
          className='pointer'
          style={{
            color: 'var(--primary-color)',
            marginTop: '3rem',
            textDecoration: 'underline',
          }}
        >
          User Registration
        </p>
      </Card>
    </div>
  );
};

export default Login;
