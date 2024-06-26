import { useContext } from 'react';
import { AuthContext } from '../context/firebase/auth-context';

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuthContext context must be used inside AuthProvider');

  return context;
};

