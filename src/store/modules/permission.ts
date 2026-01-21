import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { constantRoutes, asyncRoutes, RouteConfig } from '../../router';

// 定义权限状态类型
interface PermissionState {
  isAddRouters: boolean;
  addRouters: RouteConfig[];
  routers: RouteConfig[];
  defaultRoutes: RouteConfig[];
  topbarRouters: RouteConfig[];
  sidebarRouters: RouteConfig[];
  
  // Actions
  setIsAddRouters: (isAddRouters: boolean) => void;
  setRouters: (routers: RouteConfig[]) => void;
  setDefaultRoutes: (defaultRoutes: RouteConfig[]) => void;
  setTopbarRouters: (topbarRouters: RouteConfig[]) => void;
  setSidebarRouters: (sidebarRouters: RouteConfig[]) => void;
  generateRoutes: (role?: string) => Promise<void>;
  reset: () => void;
}

// 定义角色类型
type UserRole = 'admin' | 'user' | 'guest';

// 定义路由权限配置
const routePermissions: Record<string, UserRole[]> = {
  // 管理员专属路由
  '/userMaintenance': ['admin'],
  '/groupMaintenance': ['admin'],
  '/systemReport': ['admin'],
  
  // 所有用户可访问的路由
  '/dashboard': ['admin', 'user'],
  '/fileMaintenance': ['admin', 'user'],
  '/spread': ['admin', 'user'],
  '/rateMonitor': ['admin', 'user'],
  '/dealEntry': ['admin', 'user'],
  '/inquiry': ['admin', 'user'],
  '/report': ['admin', 'user'],
  '/about': ['admin', 'user']
};

// 检查路由是否有权限访问
const hasPermission = (route: RouteConfig, userRole: UserRole): boolean => {
  // 如果路由没有定义权限，默认允许访问
  if (!route.meta?.accessmode) {
    return true;
  }
  
  // 检查路由是否在权限配置中
  const routePath = route.path;
  const allowedRoles = routePermissions[routePath];
  
  // 如果没有配置权限，默认允许访问
  if (!allowedRoles) {
    return true;
  }
  
  // 检查用户角色是否在允许的角色列表中
  return allowedRoles.includes(userRole);
};

// 基于角色过滤路由
const filterRoutesByRole = (routes: RouteConfig[], userRole: UserRole): RouteConfig[] => {
  return routes.filter(route => {
    // 检查当前路由是否有权限
    if (!hasPermission(route, userRole)) {
      return false;
    }
    
    // 如果有children，递归过滤
    if (route.children && route.children.length > 0) {
      route.children = filterRoutesByRole(route.children, userRole);
      
      // 如果过滤后没有children且不是alwaysShow，则隐藏该路由
      if (route.children.length === 0 && !route.meta?.alwaysShow) {
        return false;
      }
    }
    
    // 过滤隐藏的路由
    if (route.meta?.hidden) {
      return false;
    }
    
    return true;
  });
};

// 过滤隐藏的路由
const filterHiddenRoutes = (routes: RouteConfig[]): RouteConfig[] => {
  return routes.filter(route => {
    // 如果路由有children，递归过滤
    if (route.children && route.children.length > 0) {
      route.children = filterHiddenRoutes(route.children);
      // 如果有alwaysShow，即使children为空也显示该路由
      if (route.children.length === 0 && !route.meta?.alwaysShow) {
        return false;
      }
    }
    // 只返回非隐藏的路由
    return !route.meta?.hidden;
  });
};

// 创建权限状态管理
export const usePermissionStore = create<PermissionState>()(
  persist(
    (set, get) => ({
      isAddRouters: false,
      addRouters: [],
      routers: [],
      defaultRoutes: [],
      topbarRouters: [],
      sidebarRouters: [],
      
      setIsAddRouters: (isAddRouters: boolean) => set({ isAddRouters }),
      
      setRouters: (routers: RouteConfig[]) => set({ routers }),
      
      setDefaultRoutes: (defaultRoutes: RouteConfig[]) => set({ defaultRoutes }),
      
      setTopbarRouters: (topbarRouters: RouteConfig[]) => set({ topbarRouters }),
      
      setSidebarRouters: (sidebarRouters: RouteConfig[]) => set({ sidebarRouters }),
      
      generateRoutes: async (role?: string) => {
        try {
          console.log('generateRoutes called with role:', role);
          
          const { setRouters, setIsAddRouters, setSidebarRouters, setDefaultRoutes, setTopbarRouters } = get();
          
          // 数据验证：确保角色参数有效
          const userRole: UserRole = (role as UserRole) || 'user';
          if (!['admin', 'user', 'guest'].includes(userRole)) {
            console.warn('Invalid role provided, defaulting to user');
          }
          
          // 模拟异步请求
          await new Promise(resolve => setTimeout(resolve, 300));
          
          // 合并静态路由和动态路由
          const allRoutes = [...constantRoutes, ...asyncRoutes];
          console.log('----allRoutes----', allRoutes);
          
          // 找到带有children的根路由
          const rootRoute = allRoutes.find(route => route.path === '/');
          if (rootRoute && rootRoute.children) {
            // 基于角色过滤路由
            const filteredRoutes = filterRoutesByRole([...rootRoute.children], userRole);
            
            console.log('Filtered routes by role:', userRole, filteredRoutes);
            
            // 设置路由
            setRouters(allRoutes);
            setDefaultRoutes(filteredRoutes);
            setSidebarRouters(filteredRoutes);
            setTopbarRouters(filteredRoutes);
            setIsAddRouters(true);
            
            console.log('Routes generated successfully for role:', userRole);
          } else {
            console.error('Root route or children not found');
            throw new Error('Root route configuration error');
          }
        } catch (error) {
          console.error('Error generating routes:', error);
          throw error;
        }
      },
      
      reset: () => {
        set({
          isAddRouters: false,
          addRouters: [],
          routers: [],
          sidebarRouters: [],
        });
      }
    }),
    {
      name: 'permission-storage',
      partialize: (state) => ({
        isAddRouters: state.isAddRouters,
        routers: state.routers,
        sidebarRouters: state.sidebarRouters
      })
    }
  )
);
