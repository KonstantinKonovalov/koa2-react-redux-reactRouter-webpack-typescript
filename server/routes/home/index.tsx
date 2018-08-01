import * as Router from 'koa-router';
import * as React from 'react';
import { renderToStaticNodeStream } from 'react-dom/server';
import * as serialize from 'serialize-javascript';
import { Html } from '../../components/Html';

async function home(ctx: any) {
    const state = serialize({
        user: {},
        documents: []
    });

    const htmlStream = renderToStaticNodeStream(
        <Html
                title="Учет договоров"
                styles={[ctx.assets.init.css, ctx.assets.vendor.css, ctx.assets.app.css]}
                scripts={[ctx.assets.init.js, ctx.assets.vendor.js, ctx.assets.app.js]}
            >

                <div className="page">
                    <div id="app" className="app" />
                </div>

                <script dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__ = ${state}` }} />
            </Html>
    );

    htmlStream.unshift('<!doctype html>');
    ctx.type = 'text/html';
    ctx.body = htmlStream;
}

export const homeRoute = (router: Router) => {
    router.get('/', home);
    router.get('/home', home);
    router.get('/about', home);
};
