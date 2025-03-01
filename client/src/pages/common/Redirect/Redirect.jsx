import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Redirect = () => {
    const { user } = useSelector(state => state.user);
    console.log('User: ', user);

    if (user.role === 'admin') {
        return <Navigate to="/admin/home" />;
    } else if (user.role === 'service-provider') {
        return <Navigate to="/service-provider/home" />;
    } else if (user.role === 'user') {
        return <Navigate to="/user/home" />;
    }
};

export default Redirect;