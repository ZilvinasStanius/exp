import { Link } from 'react-router-dom';
import '../styles/navigation.css';
import SignIn from './SignIn';
import useSession from '../customHooks/useSession';
import { SessionContext } from '../context/SessionContext';
import { useContext } from 'react';
import useLogout from '../customHooks/useLogout';

export default function Navigation() {
  const { userData } = useContext(SessionContext);
  const { onLogout } = useLogout();

  return (
    <>
      <div className="nav-div">
        <Link to={'/dashboard'}>Home</Link>
        <Link to={'/'}>Sign In</Link>
        {userData ? <Link onClick={onLogout}>Logout</Link> : ''}
        {userData ? <Link to={'/addPost'}>Create job post</Link> : ''}
      </div>
    </>
  );
}
