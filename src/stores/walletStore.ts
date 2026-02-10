import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WalletState {
  address: string | null;
  isConnected: boolean;
  prepTokens: number;
  attendanceTokens: number;
  reputation: number;
  showConnectModal: boolean;
  darkMode: boolean;
  notifications: Notification[];
  connect: (address: string) => void;
  disconnect: () => void;
  setShowConnectModal: (show: boolean) => void;
  toggleDarkMode: () => void;
  addNotification: (n: Omit<Notification, 'id' | 'timestamp'>) => void;
  clearNotification: (id: string) => void;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  timestamp: number;
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      address: null,
      isConnected: false,
      prepTokens: 1250,
      attendanceTokens: 42,
      reputation: 87,
      showConnectModal: false,
      darkMode: true,
      notifications: [],
      connect: (address) => set({ address, isConnected: true, showConnectModal: false }),
      disconnect: () => set({ address: null, isConnected: false, prepTokens: 0, attendanceTokens: 0, reputation: 0 }),
      setShowConnectModal: (show) => set({ showConnectModal: show }),
      toggleDarkMode: () => set((s) => ({ darkMode: !s.darkMode })),
      addNotification: (n) =>
        set((s) => ({
          notifications: [
            { ...n, id: crypto.randomUUID(), timestamp: Date.now() },
            ...s.notifications.slice(0, 19),
          ],
        })),
      clearNotification: (id) =>
        set((s) => ({ notifications: s.notifications.filter((n) => n.id !== id) })),
    }),
    { name: 'campus-chain-wallet' }
  )
);
