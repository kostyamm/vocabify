import { ElementType } from 'react';
import { RouteObject } from 'react-router/dist/lib/context';

type GetElementProps = {
    [key: string]: ElementType
}
type GetElement = (page: GetElementProps) => ElementType

type Route = {
    path: RouteObject['path'];
    Element: ElementType;
}

type RouteGroups = { auth: Array<Route>, common: Array<Route> }

const pages: Record<any, any> = import.meta.glob('./pages/**/*.tsx', { eager: true });

const AUTH_PAGES = ['/account']

const getElement: GetElement = (page) => {
    const elementKey = Object.keys(page)[0]

    return page[elementKey]
}

const normalizePath = (path: string) => {
    return path
        .match(/\.\/pages(.*)\.tsx$/)?.[1]
        .replace(/\/index/, '')
        .replace(/\/home/, '/')
        .toLowerCase();
};

export const routes: Array<Route> = Object.keys(pages).map((path) => {
    const routePath = normalizePath(path);
    const Element = getElement(pages[path])

    return {
        path: routePath,
        Element
    };
});

export const routeGroups: RouteGroups = routes.reduce((result, route) => {
    const authRequired = AUTH_PAGES.includes(`${route.path}`)

    result[authRequired ? 'auth' : 'common'].push(route)

    return result
}, {
    auth: [],
    common: []
} as RouteGroups);
