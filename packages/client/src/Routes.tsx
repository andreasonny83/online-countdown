import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { LandingPage } from './Pages/LandingPage';

export const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  );
};
