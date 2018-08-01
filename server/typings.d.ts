import { UrlObject } from 'url';
import * as Koa from 'koa';

declare module 'koa' {
    interface Context {
        backendURL: UrlObject;
        timings: {url: string; start: number, end?: number}[];
        assets: any;
        user?: any;
    }
}
