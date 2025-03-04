import useSession from '../customHooks/useSession';

export default function Dashboard() {
  const { userData } = useSession();
  console.log(userData);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>Welcome {userData.username}</h1>
    </>
  );
}
