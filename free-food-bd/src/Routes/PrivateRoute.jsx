import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../Provider/useAuth';
import { Loader } from 'lucide-react';

const PrivateRoute = ({children}) => {
   
        const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return <Loader></Loader>;

    if (user) return children;

    return <Navigate to="/login" state={{ from: location }} replace />;
    
};

export default PrivateRoute;