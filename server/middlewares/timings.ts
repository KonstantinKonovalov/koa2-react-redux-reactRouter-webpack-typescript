import { Middleware } from 'koa';

export const timings = (): Middleware => async function apiMiddleware(ctx, next) {
    ctx.timings = [];

    await next();

    ctx.append(
        'Server-Timing',
        ctx.timings.map((x, i) => `api${i};dur=${(x.end || Date.now()) - x.start};desc="${x.url}"`)
    );
};
