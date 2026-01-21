// 路由元信息类型
export interface RouteMeta {
  title?: string;          // 菜单标题
  icon?: string;           // 菜单图标
  hidden?: boolean;        // 是否隐藏菜单
  alwaysShow?: boolean;    // 是否总是显示菜单
  affix?: boolean;         // 是否固定到标签栏
  noTagsView?: boolean;    // 是否不显示在标签栏
  accessmode?: string;     // 访问模式
  lb?: string;             // 报表参数
}

// 路由配置类型
export interface RouteConfig {
  path: string;                   // 路由路径
  element?: React.ReactNode;       // 路由组件
  name?: string;                  // 路由名称
  meta?: RouteMeta;               // 路由元信息
  children?: RouteConfig[];        // 子路由
  redirect?: string;              // 重定向路径
  index?: boolean;                // 是否为索引路由
}

// 动态路由配置
export interface DynamicRouteConfig {
  key: string;
  routes: RouteConfig[];
}
