import { useLocation, useNavigate} from "react-router-dom";
import {baseRoutes, RouteConfig} from "@/routes";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";

// 遍历获取目标路由
const getCurrentRouterMap = (routers: RouteConfig[], path: string): RouteConfig => {
    for(const router of routers) {
        // 父路由
        if(router.path == path) return router;
        // 子路由
        console.log(router.children)
        if(router.children) {
            path = path.replace("/", "")
            const childRouter = getCurrentRouterMap(router.children, path)
            console.log((childRouter))
            if(childRouter) return childRouter;
        }
    }
    return baseRoutes[baseRoutes.length -1]
}

export const RouterBeforeEach = ({children}: any) => {
    const role= useSelector<RootState, number>(state => state.player.role)
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        const router = getCurrentRouterMap(baseRoutes, location.pathname)
        const origin = location.pathname || '/login';
        if(!role && router.auth) {
            navigate(origin)
        }
    }, [role, navigate, location.pathname]);
    return children
}