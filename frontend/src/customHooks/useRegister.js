import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useRegister() {
  const [userData, setUserData] = useState();
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  async function onRegister(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const loginData = {
      username: formData.get('username'),
      email: formData.get('email'),
      password: formData.get('password'),
    };

    try {
      const response = await fetch(
        'http://localhost/server/api/users/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log(userData);
        setMsg('Register successfully');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      }
      console.log(data);
      setMsg(data.message || data.error || data);
    } catch (error) {
      console.log('Error', error);
    }
  }
  return { onRegister, userData, msg };
}
