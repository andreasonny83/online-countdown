import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { LandingPage } from './Pages/LandingPage';
import { NewCountdown } from './Pages/NewCountdown';

export const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/new">
          <NewCountdown />
        </Route>
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  );
};
