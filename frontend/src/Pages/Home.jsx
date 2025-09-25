// Home.jsx
import AdminDashboard from '../Admin/Dashboard';
import UserDashboard from '../User/Dashboard';

import {useAuth} from '../context/authContext';


export default function Home() {
  const { user } = useAuth();

  if (!user) return <p>Loading...</p>;

  return (
    <>
      {user.role === 'admin' ? <AdminDashboard /> : <UserDashboard />}
    </>
  );
}
