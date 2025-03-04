import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useLogin() {
  const [userData, setUserData] = useState();
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  async function onLogin(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const loginData = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    try {
      const response = await fetch('http://localhost/server/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setUserData(data);
        setMessage('Loged in successfully');
        setTimeout(() => {
          navigate('/dashboard');
          setMessage('');
        }, 1000);
      }

      setMessage(data.message || data.error);
      setTimeout(() => {
        setMessage('');
      }, 1000);
    } catch (error) {
      console.log('Error', error);
    }
  }
  return { onLogin, userData, message };
}
