import { useAuth } from '../context/authContext';
import { Navigate } from 'react-router-dom';

function ProjectedRoute({children , role}) {
     const { user } = useAuth();

     if(!user){
        return <Navigate to = '/' />
     }
     if (role && user.role !== role) return <Navigate to="/home" />;

  return children;

}

export default ProjectedRoute;
