import { mockLogin, mockGetCurrentUser, mockGetUserMenu } from '../mock/users';
import { handleBOPull, handleBOAppLogin } from '../mock/fxcore';

// 登录接口
export const loginApi = async (username: string, password: string) => {
  try {
    // 在开发环境下使用Mock数据
    const user = await mockLogin(username, password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userRole', user.role);
      localStorage.setItem('userEnv', user.role === 'admin' ? 'MFXDBADMIN' : 'MFXDBMAIN');
      
      return {
        success: true,
        data: {
          loginID: user.username,
          name: user.name,
          role: user.role,
          env: user.role === 'admin' ? 'MFXDBADMIN' : 'MFXDBMAIN'
        }
      };
    }
    return {
      success: false,
      message: '用户名或密码错误'
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      message: '登录失败'
    };
  }
};

// 登出接口
export const logoutApi = async () => {
  try {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEnv');
    return {
      success: true
    };
  } catch (error) {
    console.error('Logout error:', error);
    return {
      success: false,
      message: '登出失败'
    };
  }
};

// 获取当前用户信息
export const getCurrentUserApi = async () => {
  return mockGetCurrentUser();
};

// BOPullServlet接口，用于获取各种数据
export const BOPullServlet = async (url: string, params: any = {}) => {
  try {
    // 在开发环境下使用Mock数据
    const mockResponse = await handleBOPull({ query: { url }, body: params });
    return mockResponse;
  } catch (error) {
    console.error('BOPull error:', error);
    return {
      success: false,
      message: '获取数据失败'
    };
  }
};

// BOAppLoginServlet接口，用于应用登录
export const BOAppLoginServlet = async (data: any = {}) => {
  try {
    const mockResponse = await handleBOAppLogin(data);
    return mockResponse;
  } catch (error) {
    console.error('BOAppLogin error:', error);
    return {
      success: false,
      message: '登录失败'
    };
  }
};

// 获取用户菜单
export const getUserMenuApi = async () => {
  return mockGetUserMenu();
};
