import { useState, useEffect } from 'react';
import axios from '../interceptors/auth.interceptor';

import { Card } from 'primereact/card';
import { Image } from 'primereact/image';

const Greeting = () => {
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    axios
      .get('/api/user/current')
      .then((response) => setFirstName(response.data.data.firstName))
      .catch(console.error);
  }, []);

  return (
    <Card className='greeting-relative'>
      <div className='greeting-absolute'>
        <Image
          src='/greeting.png'
          width={130}
          height={130}
        />
        <h1 className='greeting-text'>Welcome, {firstName}</h1>
      </div>
    </Card>
  );
};

export default Greeting;
