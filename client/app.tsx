import createBrowserHistory from 'history/createBrowserHistory';
import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter, routerMiddleware, connectRouter } from 'connected-react-router';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { App } from './components/app/App';
import {
    documentsReducer
} from './reducers';

require('./app.css');

const history = createBrowserHistory();

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    connectRouter(history)(
        combineReducers({
            user: s => s || {},
            documents: documentsReducer
        })
    ),
    window.__INITIAL_STATE__,
    composeEnhancers(
        applyMiddleware(
            routerMiddleware(history)
        )
    )
);

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
)
