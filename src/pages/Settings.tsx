import { motion } from 'framer-motion';
import { useWalletStore } from '@/stores/walletStore';
import { useNavigate } from 'react-router-dom';
import { Moon, Sun, Bell, Wallet, LogOut, Smartphone } from 'lucide-react';

export default function Settings() {
  const { darkMode, toggleDarkMode, disconnect, address } = useWalletStore();
  const navigate = useNavigate();

  const handleDisconnect = () => {
    disconnect();
    navigate('/');
  };

  return (
    <div className="page-container max-w-2xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="section-title text-3xl mb-2">Settings</h1>
        <p className="text-muted-foreground mb-8">Manage your preferences</p>
      </motion.div>

      <div className="space-y-4">
        {/* Dark Mode */}
        <div className="glass-card p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {darkMode ? <Moon className="w-5 h-5 text-primary" /> : <Sun className="w-5 h-5 text-warning" />}
            <div>
              <p className="font-medium text-sm">Dark Mode</p>
              <p className="text-xs text-muted-foreground">Toggle dark/light theme</p>
            </div>
          </div>
          <button onClick={toggleDarkMode}
            className={`w-12 h-6 rounded-full transition-colors flex items-center px-0.5 ${darkMode ? 'bg-primary' : 'bg-secondary'}`}>
            <div className={`w-5 h-5 rounded-full bg-foreground transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
        </div>

        {/* Notifications */}
        <div className="glass-card p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium text-sm">Notifications</p>
              <p className="text-xs text-muted-foreground">Push notifications for activity</p>
            </div>
          </div>
          <button className="w-12 h-6 rounded-full bg-primary flex items-center px-0.5">
            <div className="w-5 h-5 rounded-full bg-foreground translate-x-6" />
          </button>
        </div>

        {/* PWA */}
        <div className="glass-card p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Smartphone className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium text-sm">Install App</p>
              <p className="text-xs text-muted-foreground">Add Scholaris DAO to home screen</p>
            </div>
          </div>
          <button className="btn-secondary-glass text-xs py-1.5 px-3">Install</button>
        </div>

        {/* Wallet */}
        <div className="glass-card p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Wallet className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium text-sm">Connected Wallet</p>
              <p className="text-xs text-muted-foreground font-mono">{address || 'None'}</p>
            </div>
          </div>
        </div>

        {/* Disconnect */}
        <button onClick={handleDisconnect}
          className="w-full glass-card p-5 flex items-center gap-3 text-destructive hover:bg-destructive/5 transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="font-medium text-sm">Disconnect Wallet</span>
        </button>
      </div>
    </div>
  );
}
