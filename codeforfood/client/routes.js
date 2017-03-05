import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
//Component
import Container from './container';
import App from './app';
import LoginPage from './screen/login_page';
import QuestsScreen from './screen/quests';
import PantryScreen from './screen/pantry';
import InventoryScreen from './screen/inventory';


const authenticate = (nextState, replace) => {
    if ((!Meteor.loggingIn() && !Meteor.userId())) {
        console.log("breaking")
;        replace({
            pathname: '/',
            state: { nextPathname: nextState.location.pathname },
        });
    }
};


const FadingRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={matchProps => (
        <Fade duration={2}>
            <Component {...matchProps}/>
        </Fade>
    )}/>
);

export default Routes = (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={LoginPage}/>
            <Route path="app" component={Container}>
                <IndexRoute component={QuestsScreen} onEnter={authenticate}/>
                <Route path="pantry" component={PantryScreen} onEnter={authenticate}/>
                <Route path="inventory" component={InventoryScreen} onEnter={authenticate}/>
            </Route>
        </Route>
    </Router>
);
