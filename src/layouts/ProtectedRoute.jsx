
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux'
import  {jwtDecode} from 'jwt-decode';
import { Spinner, Center } from "@chakra-ui/react";
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ roles, selector, requiredRole, children }) => {
  const location = useLocation();
  const token = useSelector(selector)
  let userRole = null;
  const [loading, setLoading] = useState(true);
  
useEffect(() => {
  setTimeout(() => {
    setLoading(false);
  }
  , 2000)
}
, [loading])

  if (loading) {
    return (
      <div>
        {" "}
        <Center height="100vh">
          <Spinner size="xl" />
        </Center>
      </div>
    ); // Replace with your loading component
  }

  if (token) {
    const decodedToken = jwtDecode(token);
    userRole = decodedToken.role;
    
  }

  if (!token || !roles.includes(userRole) || userRole !== requiredRole) {
    console.log('not connected')
    return <Navigate to="/" state={{ from: location }} replace />
  } else {
    return children;
  }

  
  
};

export default ProtectedRoute;