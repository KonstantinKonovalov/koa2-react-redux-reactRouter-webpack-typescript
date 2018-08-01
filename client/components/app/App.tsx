import * as React from 'react';
import { Content } from 'components/content/Content';
import { Navigation } from 'components//navigation/Navigation';

require('./app.css');

export const App = () => (
    <React.Fragment>
        <Navigation />
        <div className="container">
            <Content />
        </div>
    </React.Fragment>
);
