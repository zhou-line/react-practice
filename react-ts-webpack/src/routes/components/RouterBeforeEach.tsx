import { useLocation} from "react-router-dom";
import {baseRoutes, RouteConfig} from "@/routes";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store/store";
import { setMenuKey } from "@/store/actions/adminAction";

// 遍历获取目标路由
const getCurrentRouterMap = (routers: RouteConfig[], path: string): RouteConfig => {
    for(const router of routers) {
        // 父路由
        if(router.path == path) return router;
        // 子路由
        if(router.children) {
            path = path.replace("/", "")
            const childRouter = getCurrentRouterMap(router.children, path)
            if(childRouter) return childRouter;
        }
    }
    return baseRoutes[baseRoutes.length -1]
}

export const RouterBeforeEach = ({children}: any) => {
    const token = useSelector<RootState, string>(state => state.admin.auth)
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        const router = getCurrentRouterMap(baseRoutes, location.pathname);
        
        // 设置页面标题
        dispatch(setMenuKey(router.path === '/' ? 'home' : router.path ?? ''))
        if (router.meta?.title) {
            document.title = router.meta.title;
        }
        
    }, [token, location.pathname]);
    return children
}