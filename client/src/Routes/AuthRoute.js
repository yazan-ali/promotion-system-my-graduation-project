import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../Components/UserComponents/userContext';

const AuthRoute = ({ component: Component, ...rest }) => {
    const { user } = useContext(AuthContext);
    return (
        <Route
            {...rest}
            render={props =>
                user ? <Redirect to="/" /> : <Component {...props} />
            }
        />
    )
}

const DashboardRoute = ({ component: Component, ...rest }) => {
    const { user } = useContext(AuthContext);
    return (
        <Route
            {...rest}
            render={props =>
                !user ? <Redirect to="/login" /> : <Component {...props} />
            }
        />
    )
}

export { AuthRoute, DashboardRoute };