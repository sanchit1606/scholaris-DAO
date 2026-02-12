import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WalletState {
  address: string | null;
  isConnected: boolean;
  prepTokens: number;
  attendanceTokens: number;
  reputation: number;
  algoBalance: number;
  showConnectModal: boolean;
  darkMode: boolean;
  notifications: Notification[];
  connect: (address: string) => void;
  disconnect: () => void;
  setShowConnectModal: (show: boolean) => void;
  toggleDarkMode: () => void;
  fetchAlgoBalance: (addr?: string) => Promise<void>;
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
      algoBalance: 0,
      showConnectModal: false,
      darkMode: true,
      notifications: [],
      connect: (address) => set({ address, isConnected: true, showConnectModal: false }),
      disconnect: () => {
        // attempt to disconnect Pera wallet session if available
        try {
          if (typeof window !== 'undefined' && (window as any)._peraWallet && typeof (window as any)._peraWallet.disconnect === 'function') {
            (window as any)._peraWallet.disconnect();
            // also clear reference
            (window as any)._peraWallet = null;
          }
        } catch (e) {
          // ignore non-fatal errors
          console.error('Error disconnecting wallet provider', e);
        }
        // remove known storage keys used by walletconnect / pera
        try {
          if (typeof window !== 'undefined') {
            Object.keys(window.localStorage || {}).forEach((k) => {
              const kl = k.toLowerCase();
              if (kl.includes('pera') || kl.includes('walletconnect') || kl.includes('wc@') || kl.includes('wc:') || kl.includes('wc-')) {
                window.localStorage.removeItem(k);
              }
            });
            Object.keys(window.sessionStorage || {}).forEach((k) => {
              const kl = k.toLowerCase();
              if (kl.includes('pera') || kl.includes('walletconnect') || kl.includes('wc@') || kl.includes('wc:') || kl.includes('wc-')) {
                window.sessionStorage.removeItem(k);
              }
            });
          }
        } catch (e) {
          // ignore
        }
        set({ address: null, isConnected: false, prepTokens: 0, attendanceTokens: 0, reputation: 0 });
      },
      fetchAlgoBalance: async (addr?: string) => {
        try {
          const state = (set as any).__state; // not used; we will read addr param
        } catch (e) {
          // ignore - fallback
        }
        try {
          const addressToQuery = addr || (typeof window !== 'undefined' && JSON.parse(localStorage.getItem('persist:campus-chain-wallet') || '{}')?.state?.address) || null;
          // fallback to stored state if available
          const target = addr || undefined;
          if (!target) {
            return;
          }
          // try AlgoExplorer indexer API
          const urlCandidates = [
            `https://algoexplorerapi.io/idx2/v2/accounts/${target}`,
            `https://api.algoexplorer.io/idx2/v2/accounts/${target}`,
            `https://algoindexer.algoexplorerapi.io/v2/accounts/${target}`
          ];
          let resJson = null;
          for (const u of urlCandidates) {
            try {
              const res = await fetch(u);
              if (!res.ok) continue;
              const j = await res.json();
              if (j && j.account && (typeof j.account.amount === 'number' || typeof j.account['amount'] === 'number')) {
                resJson = j;
                break;
              }
            } catch (e) {
              // try next
            }
          }
          if (!resJson) return;
          const microAlgos = Number(resJson.account.amount || 0);
          const algo = microAlgos / 1e6;
          set({ algoBalance: algo });
        } catch (e) {
          console.error('Failed to fetch algo balance', e);
        }
      },
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
