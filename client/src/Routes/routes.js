import React from 'react';
import Login from '../Components/UserComponents/login';
import Register from '../Components/UserComponents/register'
import AdminRegister from '../Components/UserComponents/adminRegister'
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../Components/UserComponents/dashboard';
import Teacher from '../Components/UserComponents/teacher';
import PromotionRequestCreateForm from '../Components/PromotionComponents/promotionRequestCreateForm'
import PromotionRequestEditForm from '../Components/PromotionComponents/promotionRequestEditForm'
import CommitteePromotionRequest from '../Components/PromotionCommitteeComponents/committeePromotionRequest'
import AdministrativeRanksUpdate from '../Components/UserComponents/administrativeRanksUpdate';
import { AuthRoute, DashboardRoute } from './AuthRoute';

function Routes() {

    return (
        <Switch>
            <DashboardRoute exact path="/" component={Dashboard} />
            <DashboardRoute exact path="/admin" component={AdministrativeRanksUpdate} />
            <Route exact path="/promotion-request/:id" render={(routeProps) => <Teacher {...routeProps} />} />
            <Route exact path="/promotion-request/create/:promotionType"
                render={(routeProps) => <PromotionRequestCreateForm {...routeProps} />}
            />
            <Route exact path="/edit"
                render={(routeProps) => <PromotionRequestEditForm {...routeProps} />}
            />
            <Route exact path="/promotion-committee/promotion-request/:id"
                render={(routeProps) => <CommitteePromotionRequest {...routeProps} />}
            />
            <AuthRoute exact path="/login" component={Login} />
            <AuthRoute exact path="/register" component={Register} />
            <AuthRoute exact path="/register/admin" component={AdminRegister} />
        </Switch>
    );
}

export default Routes;