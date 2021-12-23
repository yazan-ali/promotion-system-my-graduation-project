import React, { useEffect } from 'react';
import Login from '../Components/UserComponents/login';
import Register from '../Components/UserComponents/register'
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../Components/UserComponents/dashboard';
import Teacher from '../Components/UserComponents/teacher';
import CommitteePromotionRequest from '../Components/PromotionCommitteeComponents/committeePromotionRequest'
import AdministrativeRanksUpdate from '../Components/UserComponents/administrativeRanksUpdate';
import { AuthRoute, DashboardRoute } from './AuthRoute';

function Routes() {

    return (
        <Switch>
            <DashboardRoute exact path="/" component={Dashboard} />
            <DashboardRoute exact path="/admin" component={AdministrativeRanksUpdate} />
            <Route exact path="/promotion-request/:id" render={(routeProps) => <Teacher {...routeProps} />} />
            <Route exact path="/promotion-committee/promotion-request/:id"
                render={(routeProps) => <CommitteePromotionRequest {...routeProps} />}
            />
            <AuthRoute exact path="/login" component={Login} />
            <AuthRoute exact path="/register" component={Register} />
        </Switch>
    );
}

export default Routes;