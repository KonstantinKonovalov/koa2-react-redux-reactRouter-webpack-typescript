import * as Koa from 'koa';
import { protectedRouter, publicRouter } from './routes';
import { timings } from './middlewares/timings';

const assets = require('./assets.json');

const app = new Koa();

app.proxy = true;

app.context.assets = assets;

app.use(async (ctx: any, next: Function) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message || 'FAIL';
    }
});

app.use(timings());
app.use((publicRouter as any).routes());
app.use((protectedRouter as any).routes());

export { app };
