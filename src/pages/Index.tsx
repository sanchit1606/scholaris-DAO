import { Navigate } from 'react-router-dom';
import { useWalletStore } from '@/stores/walletStore';

export default function Index() {
  const { isConnected } = useWalletStore();
  return <Navigate to={isConnected ? '/dashboard' : '/'} replace />;
}
