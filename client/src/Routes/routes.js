import React, { useEffect } from 'react';
import Login from '../Components/UserComponents/login';
import Register from '../Components/UserComponents/register'
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../Components/UserComponents/dashboard';
import Teacher from '../Components/UserComponents/teacher';
import { AuthRoute, DashboardRoute } from './AuthRoute';

function Routes() {

    return (
        <Switch>
            <DashboardRoute exact path="/" component={Dashboard} />
            <Route exact path="/promotion-request/:id" render={(routeProps) => <Teacher {...routeProps} />} />
            <AuthRoute exact path="/login" component={Login} />
            <AuthRoute exact path="/register" component={Register} />
        </Switch>
    );
}

export default Routes;