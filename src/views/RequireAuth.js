import { useGetMySessionQuery } from '../services/session';
import { useNavigate } from 'react-router-dom';
import { useEffect, Fragment } from 'react';

function RequireAuth(props) {
    const { isSuccess, isError: isNotLoggedIn } = useGetMySessionQuery();
    const navigate = useNavigate();

    useEffect(() => {
        if (isNotLoggedIn) {
            navigate('/login');
        }
    }, [isNotLoggedIn]);
    
    return (
        <Fragment>
            { isSuccess && props.children }
        </Fragment>
    )
}

export default RequireAuth;