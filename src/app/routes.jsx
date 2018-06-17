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

const Routes = ({ socket }) => (
  <div>
    <Switch>
      {Object.keys(routes)
          .map(key => (
            <Route
              key={key}
              exact={routes[key].exact}
              path={key}
              render={(props) => {
                    const Component = routes[key].component;
                    return <Component {...props} socket={socket} />;
                  }}
            />
        ))
      }
    </Switch>
  </div>
);

export default Routes;
