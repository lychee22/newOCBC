import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockLogout } from '../../mock/users';

// 定义用户状态类型
interface UserState {
  userInfo?: {
    loginID: string;
    name: string;
    role: string;
    env: string;
  };
  token: string;
  roleRouters: any[];
  rememberMe: boolean;
  fxRateCache: Record<string, any>;
  trigger: {
    _registry: Record<string, any[]>;
    EVENT_OverrideAddApproved: string;
    EVENT_OverrideAddRejected: string;
    EVENT_OverrideDelApproved: string;
    EVENT_OverrideDelRejected: string;
    EVENT_OverrideEditApproved: string;
    EVENT_OverrideEditRejected: string;
    EVENT_NotifAlertUpdated: string;
    EVENT_FXPriceUpdated: string;
    EVENT_FXTradibilityUpdated: string;
    EVENT_FXEnableUpdated: string;
    EVENT_FXAlertUpdated: string;
    EVENT_FXBidAskSpreadUpdated: string;
    EVENT_LPControlSelectionUpdated: string;
    EVENT_LPControlHealthUpdated: string;
    EVENT_CurrUpdated: string;
    EVENT_CoreRateErrStatusUpdated: string;
    EVENT_MarginCallCutStatusUpdated: string;
    register: (eventName: string, callback: any) => void;
    unregister: (eventName: string, callback: any) => void;
    fire: (event: any) => void;
  };
  
  // Actions
  setToken: (token: string) => void;
  setUserInfo: (userInfo?: any) => void;
  setRoleRouters: (roleRouters: any[]) => void;
  setRememberMe: (rememberMe: boolean) => void;
  setFxRateCache: (fxRateCache: Record<string, any>) => void;
  logout: () => void;
  reset: () => void;
}

// 创建用户状态管理
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userInfo: undefined,
      token: '',
      roleRouters: [],
      rememberMe: true,
      fxRateCache: {},
      trigger: {
        _registry: {},
        EVENT_OverrideAddApproved: 'OverrideAddApproved',
        EVENT_OverrideAddRejected: 'OverrideAddRejected',
        EVENT_OverrideDelApproved: 'OverrideDelApproved',
        EVENT_OverrideDelRejected: 'OverrideDelRejected',
        EVENT_OverrideEditApproved: 'OverrideEditApproved',
        EVENT_OverrideEditRejected: 'OverrideEditRejected',
        EVENT_NotifAlertUpdated: 'NotifAlertUpdated',
        EVENT_FXPriceUpdated: 'FXPriceUpdated',
        EVENT_FXTradibilityUpdated: 'FXTradibilityUpdated',
        EVENT_FXEnableUpdated: 'FXEnableUpdated',
        EVENT_FXAlertUpdated: 'FXAlertUpdated',
        EVENT_FXBidAskSpreadUpdated: 'FXBidAskSpreadUpdated',
        EVENT_LPControlSelectionUpdated: 'LPControlSelectionUpdated',
        EVENT_LPControlHealthUpdated: 'LPControlHealthUpdated',
        EVENT_CurrUpdated: 'CurrUpdated',
        EVENT_CoreRateErrStatusUpdated: 'CoreRateErrStatusUpdated',
        EVENT_MarginCallCutStatusUpdated: 'MarginCallCutStatusUpdated',
        
        register: function (eventName: string, callback: any) {
          if (!this._registry[eventName]) {
            this._registry[eventName] = [];
          }
          if (!this._registry[eventName].includes(callback)) {
            this._registry[eventName].push(callback);
          }
        },
        
        unregister: function (eventName: string, callback: any) {
          if (this._registry[eventName]) {
            this._registry[eventName] = this._registry[eventName].filter(
              (cb: any) => cb !== callback
            );
          }
        },
        
        fire: function (event: any) {
          try {
            const listeners = this._registry[event.name];
            if (listeners && listeners.length > 0) {
              listeners.forEach((listener: any) => {
                try {
                  listener(event);
                } catch (e) {
                  console.error('Error firing event:', e);
                }
              });
            }
          } finally {
            if (event.params) {
              delete event.params;
            }
          }
        }
      },
      
      setToken: (token: string) => set({ token }),
      
      setUserInfo: (userInfo?: any) => set({ userInfo }),
      
      setRoleRouters: (roleRouters: any[]) => set({ roleRouters }),
      
      setRememberMe: (rememberMe: boolean) => set({ rememberMe }),
      
      setFxRateCache: (fxRateCache: Record<string, any>) => set({ fxRateCache }),
      
      logout: async () => {
        await mockLogout();
        set((state) => ({
          ...state,
          token: '',
          userInfo: undefined,
          roleRouters: [],
          fxRateCache: {}
        }));
      },
      
      reset: () => {
        set({
          token: '',
          userInfo: undefined,
          roleRouters: [],
          fxRateCache: {}
        });
      }
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({
        userInfo: state.userInfo,
        token: state.token,
        rememberMe: state.rememberMe
      })
    }
  )
);
