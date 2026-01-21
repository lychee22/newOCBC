import React, { lazy } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LayoutComponent from '../components/common/Layout/Layout';
import { RouteConfig, RouteMeta, DynamicRouteConfig } from './types';

// 导出路由类型，供其他模块使用
export type { RouteConfig, RouteMeta, DynamicRouteConfig };

// 懒加载组件
const AboutPage = lazy(() => import('../pages/AboutPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const RateMonitorPage = lazy(() => import('../pages/RateMonitorPage'));
const ReportPage = lazy(() => import('../pages/ReportPage'));
const FileMaintenancePage = lazy(() => import('../pages/FileMaintenancePage'));
const Error403Page = lazy(() => import('../pages/Error403Page'));
const Error404Page = lazy(() => import('../pages/Error404Page'));
const Error500Page = lazy(() => import('../pages/Error500Page'));
const RedirectPage = lazy(() => import('../pages/RedirectPage'));
const GuidePage = lazy(() => import('../pages/GuidePage'));

// 静态路由（无需权限验证的路由）
export const constantRoutes: RouteConfig[] = [
  {
    path: '/login',
    element: <LoginPage />,
    meta: {
      hidden: true,
      title: '登录',
      noTagsView: true
    }
  },
  {
    path: '/boadminLogin',
    element: <LoginPage />,
    meta: {
      hidden: true,
      title: '管理员登录',
      noTagsView: true
    }
  },
  {
    path: '/403',
    element: <Error403Page />,
    meta: {
      hidden: true,
      title: '403',
      noTagsView: true
    }
  },
  {
    path: '/404',
    element: <Error404Page />,
    meta: {
      hidden: true,
      title: '404',
      noTagsView: true
    }
  },
  {
    path: '/500',
    element: <Error500Page />,
    meta: {
      hidden: true,
      title: '500',
      noTagsView: true
    }
  },
  {
    path: '/',
    redirect: '/dashboard/index',
    meta: {
      hidden: false
    },
    children: [
      {
        path: 'dashboard',
        redirect: '/dashboard/index',
        meta: {
          icon: 'ant-design:home-filled',
          title: '仪表盘',
          alwaysShow: true,
          accessmode: 'user'
        },
        children: [
          {
            path: 'index',
            element: <GuidePage />,
            meta: {
              icon: 'ant-design:home-filled',
              title: '仪表盘',
              affix: true,
              accessmode: 'user'
            }
          }
        ]
      },
      {
        path: 'redirect',
        children: [
          {
            path: ':path(.*)',
            element: <RedirectPage />
          }
        ],
        meta: {
          hidden: true,
          noTagsView: true
        }
      },
      {
        path: 'fileMaintenance',
        redirect: '/fileMaintenance/masterSetup',
        meta: {
          alwaysShow: true,
          icon: 'ant-design:medium-outlined',
          title: '文件维护',
          accessmode: 'user'
        },
        children: [
          {
            path: 'masterSetup',
            element: <FileMaintenancePage />,
            meta: {
              title: '主设置',
              accessmode: 'user'
            },
            children: [
              {
                path: 'systemParameterSetup',
                element: <div>系统参数设置</div>,
                meta: {
                  title: '系统参数设置',
                  accessmode: 'user'
                }
              },
              {
                path: 'currencySetup',
                element: <div>货币设置</div>,
                meta: {
                  title: '货币设置',
                  accessmode: 'user'
                }
              }
            ]
          }
        ]
      },
      {
        path: 'spread',
        meta: {
          icon: 'ant-design:split-cells-outlined',
          title: 'Spread',
          accessmode: 'user'
        },
        children: [
          {
            path: 'index',
            element: <div>Spread</div>,
            meta: {
              title: 'Spread',
              accessmode: 'user'
            }
          }
        ]
      },
      {
        path: 'rateMonitor',
        meta: {
          icon: 'ant-design:alert-outlined',
          title: '汇率监控',
          accessmode: 'user'
        },
        children: [
          {
            path: 'index',
            element: <RateMonitorPage />,
            meta: {
              title: '汇率监控',
              accessmode: 'user'
            }
          }
        ]
      },
      {
        path: 'dealEntry',
        meta: {
          icon: 'ant-design:delivered-procedure-outlined',
          title: '交易录入',
          accessmode: 'user'
        },
        children: [
          {
            path: 'index',
            element: <div>交易录入</div>,
            meta: {
              title: '交易录入',
              accessmode: 'user'
            }
          }
        ]
      },
      {
        path: 'inquiry',
        meta: {
          icon: 'ant-design:search-outlined',
          title: '询价',
          accessmode: 'user'
        },
        children: [
          {
            path: 'index',
            element: <div>询价</div>,
            meta: {
              title: '询价',
              accessmode: 'user'
            }
          }
        ]
      },
      {
        path: 'report',
        meta: {
          icon: 'ant-design:audit-outlined',
          title: '报表',
          accessmode: 'user'
        },
        children: [
          {
            path: 'index',
            element: <ReportPage />,
            meta: {
              title: '报表',
              accessmode: 'user'
            }
          }
        ]
      },
      {
        path: 'userMaintenance',
        meta: {
          icon: 'ant-design:medium-outlined',
          title: '用户维护',
          accessmode: 'admin'
        },
        children: [
          {
            path: 'index',
            element: <div>用户维护</div>,
            meta: {
              title: '用户维护',
              accessmode: 'admin'
            }
          }
        ]
      },
      {
        path: 'groupMaintenance',
        meta: {
          icon: 'ant-design:medium-outlined',
          title: '组维护',
          accessmode: 'admin'
        },
        children: [
          {
            path: 'index',
            element: <div>组维护</div>,
            meta: {
              title: '组维护',
              accessmode: 'admin'
            }
          }
        ]
      },
      {
        path: 'systemReport',
        meta: {
          icon: 'ant-design:audit-outlined',
          title: '系统报表',
          accessmode: 'admin'
        },
        children: [
          {
            path: 'index',
            element: <div>系统报表</div>,
            meta: {
              title: '系统报表',
              accessmode: 'admin'
            }
          }
        ]
      },
      {
        path: 'about',
        element: <AboutPage />,
        meta: {
          title: '关于'
        }
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to='/404' replace />,
    meta: {
      hidden: true
    }
  }
];

// 动态路由（需要权限验证的路由）
export const asyncRoutes: RouteConfig[] = [
  // 这里可以根据角色动态加载不同的路由
];

// 路由守卫组件
export const RouteGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  
  // 模拟登录状态检查
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  // 模拟用户角色
  const userRole = localStorage.getItem('userRole') || 'user';
  
  // 白名单页面，不需要登录
  const whiteList = ['/login', '/boadminLogin', '/403', '/404', '/500'];
  
  // 检查是否在白名单中
  if (whiteList.includes(location.pathname)) {
    return <>{children}</>;
  }
  
  // 检查登录状态
  if (!isLoggedIn) {
    // 如果访问的是根路由且未登录，重定向到登录页
    if (location.pathname === '/') {
      return <Navigate to='/login' replace />;
    }
    return <Navigate to={`/login?redirect=${location.pathname}`} replace />;
  }
  
  // 权限检查示例
  const adminRoutes = ['/userMaintenance', '/groupMaintenance', '/systemReport'];
  if (adminRoutes.includes(location.pathname) && userRole !== 'admin') {
    return <Navigate to='/403' replace />;
  }
  
  return <>{children}</>;
};

// 生成Routes组件
export const RouteComponents: React.FC = () => {
  // 递归生成路由组件
  const generateRoutes = (routes: RouteConfig[], hasLayout = false, isRoot = false): React.ReactNode => {
    return routes.map((route, index) => {
      const { path, element, children, redirect, index: isIndex, meta } = route;
      
      // 如果是索引路由
      if (isIndex) {
        return (
          <Route
            key={`${path}-${index}`}
            path={path}
            index
            element={element}
          />
        );
      }
      
      // 如果有children，生成嵌套路由
      if (children && children.length > 0) {
        // 对于根路由，需要添加LayoutComponent
        const shouldAddLayout = isRoot || (!hasLayout && !element);
        
        if (redirect) {
          return (
            <Route
              key={`${path}-${index}`}
              path={path}
              element={shouldAddLayout ? <LayoutComponent /> : (element || undefined)}
            >
              {/* 生成重定向路由 */}
              <Route index element={<Navigate to={redirect} replace />} />
              {/* 生成子路由 */}
              {generateRoutes(children, true)}
            </Route>
          );
        } else {
          return (
            <Route
              key={`${path}-${index}`}
              path={path}
              element={shouldAddLayout ? <LayoutComponent /> : (element || undefined)}
            >
              {generateRoutes(children, true)}
            </Route>
          );
        }
      }
      
      // 普通路由或带有redirect的路由
      const routeElement = redirect ? <Navigate to={redirect} replace /> : element;
      
      return (
        <Route
          key={`${path}-${index}`}
          path={path}
          element={routeElement}
        />
      );
    });
  };
  
  return (
    <Routes>
      {generateRoutes(constantRoutes, false, true)}
    </Routes>
  );
};
