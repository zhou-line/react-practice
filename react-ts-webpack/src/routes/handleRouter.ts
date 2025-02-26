import {RouteObject} from "react-router-dom";
import {RouteConfig} from "@/routes/index";
export const generateRouter = (routerItems: RouteConfig[]): RouteObject[] | undefined => {
    if (routerItems && routerItems.length) {
        return routerItems.map(config => {
            const children = config.children ? generateRouter(config.children) : undefined;
            const routeObject: RouteObject = {
                path: config.path,
                element: config.element,
                children
            }
            return routeObject;
        })
    }
};

