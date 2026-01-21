// 模拟用户数据
export interface User {
  id: string;
  username: string;
  password: string;
  role: 'admin' | 'user';
  name: string;
  email: string;
}

// 模拟用户列表
export const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    name: '系统管理员',
    email: 'admin@example.com'
  },
  {
    id: '2',
    username: 'user',
    password: 'user123',
    role: 'user',
    name: '普通用户',
    email: 'user@example.com'
  },
  {
    id: '3',
    username: 'test',
    password: 'test123',
    role: 'user',
    name: '测试用户',
    email: 'test@example.com'
  },
  {
    id: '4',
    username: 'TEST02',
    password: 'TEST02',
    role: 'user',
    name: '测试用户02',
    email: 'test02@example.com'
  }
];

// 模拟登录函数
export const mockLogin = (username: string, password: string): Promise<User | null> => {
  return new Promise((resolve) => {
    // 模拟网络延迟
    setTimeout(() => {
      const user = mockUsers.find(
        u => u.username === username && u.password === password
      );
      resolve(user || null);
    }, 500);
  });
};

// 模拟获取当前用户信息
export const mockGetCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve) => {
    // 从localStorage获取当前用户
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      resolve(JSON.parse(currentUser));
    } else {
      resolve(null);
    }
  });
};

// 模拟登出
export const mockLogout = (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userEnv');
      resolve();
    }, 300);
  });
};

// 模拟获取用户菜单
export const mockGetUserMenu = (): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: {
          menu: [
            {
              id: '1',
              name: '仪表盘',
              path: '/dashboard/index',
              icon: 'ant-design:home-filled',
              children: []
            },
            {
              id: '2',
              name: '文件维护',
              path: '/fileMaintenance',
              icon: 'ant-design:medium-outlined',
              children: [
                {
                  id: '2-1',
                  name: '系统参数设置',
                  path: '/fileMaintenance/masterSetup/systemParameterSetup',
                  children: []
                },
                {
                  id: '2-2',
                  name: '货币设置',
                  path: '/fileMaintenance/masterSetup/currencySetup',
                  children: []
                },
                {
                  id: '2-3',
                  name: 'Nostro账户设置',
                  path: '/fileMaintenance/masterSetup/nostroAccountSetup',
                  children: []
                },
                {
                  id: '2-4',
                  name: '货币对设置',
                  path: '/fileMaintenance/masterSetup/currPairSetup',
                  children: []
                },
                {
                  id: '2-5',
                  name: '节假日表设置',
                  path: '/fileMaintenance/masterSetup/holidayTblSetup',
                  children: []
                }
              ]
            },
            {
              id: '3',
              name: '汇率监控',
              path: '/rateMonitor',
              icon: 'ant-design:alert-outlined',
              children: [
                {
                  id: '3-1',
                  name: '汇率监控',
                  path: '/rateMonitor/rateMonitor',
                  children: []
                }
              ]
            },
            {
              id: '4',
              name: '交易录入',
              path: '/dealEntry',
              icon: 'ant-design:delivered-procedure-outlined',
              children: [
                {
                  id: '4-1',
                  name: '远期合约录入',
                  path: '/dealEntry/forwardContractEntry',
                  children: []
                },
                {
                  id: '4-2',
                  name: '远期抵消录入',
                  path: '/dealEntry/forwardSetoffEntry',
                  children: []
                },
                {
                  id: '4-3',
                  name: '远期交割录入',
                  path: '/dealEntry/fxFwdDeliveryEntry',
                  children: []
                }
              ]
            }
          ]
        }
      });
    }, 500);
  });
};
