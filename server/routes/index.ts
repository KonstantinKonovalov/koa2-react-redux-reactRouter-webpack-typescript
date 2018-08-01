import * as Router from 'koa-router';
import { homeRoute } from './home';
import { publicRoute } from './public';

export const publicRouter = new Router();
export const protectedRouter = new Router();

[
    homeRoute
].map(route => route(protectedRouter));

[
    publicRoute
].map(route => route(publicRouter));
