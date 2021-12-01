import React from 'react';
import Login from '../Components/UserComponents/login';
import Register from '../Components/UserComponents/register'
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../Components/UserComponents/dashboard';
import { AuthRoute, DashboardRoute } from './AuthRoute';

function Routes() {
    return (
        <Switch>
            <DashboardRoute exact path="/" component={Dashboard} />
            <AuthRoute exact path="/login" component={Login} />
            <AuthRoute exact path="/register" component={Register} />
            {/* <DashboardRoute exact path="/" component={Dashboard} />
            <AuthRoute exact path="/wise/login" component={Login} />
            <AuthRoute exact path="/wise/register" component={Register} /> */}
        </Switch>
    );
}

export default Routes;