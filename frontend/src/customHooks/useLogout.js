import { useNavigate } from 'react-router-dom';

export default function useLogout() {
  const navigate = useNavigate();
  async function onLogout() {
    const promise = await fetch('http://localhost:3000/api/users/logout', {
      method: 'GET',
      credentials: 'include',
    });

    if (promise.ok) {
      window.location.reload();
    }
  }
  return { onLogout };
}
