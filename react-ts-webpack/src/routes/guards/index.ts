import {RouteConfig} from "@/routes";

export const checkPermission = (route: RouteConfig, token: string) => {
    // 基础权限检查
    if (route.auth && !token) {
        return false;
    }
    
    // 可以添加更多的权限检查逻辑
    // 比如角色权限等
    return true;
};