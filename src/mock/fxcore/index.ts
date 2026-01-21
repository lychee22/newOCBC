// Mock数据管理
import { mockLogin } from '../users';

// 读取JSON数据文件
const jsonDataMap: Record<string, any> = {};

// 模拟登录接口
export const handleBOAppLogin = (req: any) => {
  // 模拟登录逻辑
  const { username, password } = req.body;
  return mockLogin(username, password).then(user => {
    if (user) {
      return {
        success: true,
        data: {
          loginID: user.username,
          name: user.name,
          role: user.role,
          env: 'user'
        }
      };
    }
    return {
      success: false,
      message: '用户名或密码错误'
    };
  });
};

// 模拟数据获取接口
export const handleBOPull = (req: any) => {
  const { url } = req.query;
  const mockData = jsonDataMap[url as string];
  if (mockData) {
    return mockData;
  }
  return {
    success: false,
    message: '未找到对应的Mock数据'
  };
};

// 初始化Mock数据
const initializeMockData = () => {
  // 这里可以根据需要动态加载Mock数据文件
  // 暂时先加载一些基础数据
  jsonDataMap['userAccessGridMsg_GetUserMenu'] = {
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
            }
          ]
        }
      ]
    }
  };
};

// 初始化Mock数据
initializeMockData();