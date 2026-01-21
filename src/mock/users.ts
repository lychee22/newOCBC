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
      resolve();
    }, 300);
  });
};
