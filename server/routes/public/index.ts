import * as Router from 'koa-router';
import * as send from 'koa-send';

export const publicRoute = (router: Router) => {
    router.get('/public/*', async (ctx: any) => {
        await send(ctx, ctx.path, {
            maxAge: ctx.app.env === 'production' ? 1.2e9 : 0,
            root: './build'
        });
    });
};
