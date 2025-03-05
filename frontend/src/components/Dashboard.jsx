import { useContext } from 'react';
import { SessionContext } from '../context/SessionContext';

export default function Dashboard() {
  const { userData } = useContext(SessionContext);
  // if (!userData) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      <h1>
        {userData ? `Welcome ${userData.username}` : 'Welcome  to job posts'}
      </h1>
    </>
  );
}
