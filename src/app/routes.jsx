import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Zone from '../containers/zone';
import Admin from '../containers/admin';

const routes = {
  '/': {
    component: Zone,
    exact: true,
  },
  '/admin': {
    component: Admin,
    exact: true,
  },
};

const Routes = () => (
  <div>
    <Switch>
      {Object.keys(routes)
            .map(key => (
              <Route
                key={key}
                exact={routes[key].exact}
                path={key}
                component={routes[key].component}
              />
            ))
        }
    </Switch>
  </div>
);

export default Routes;
