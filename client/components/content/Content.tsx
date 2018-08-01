import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

export const Content = () => (
    <React.Fragment>
        <Switch>
            <Route exact path="/" render={() => <div>Root</div>} />
            <Route path="/about" render={() => <div>About</div>} />
            <Route path="/home" render={() => <div>Home</div>} />
        </Switch>
    </React.Fragment>
);
