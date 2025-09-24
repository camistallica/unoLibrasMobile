import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
  } from 'react';
  import { onAuthStateChanged, User } from 'firebase/auth';
  import { auth } from '../firebase';
  
  // ✅ Define a interface do contexto
  interface AuthContextType {
    currentUser: User | null;
  }
  
  // ✅ Cria o contexto tipado corretamente
  const AuthContext = createContext<AuthContextType | undefined>(undefined);
  
  // ✅ AuthProvider com tipagem
  export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, user => setCurrentUser(user));
      return () => unsubscribe();
    }, []);
  
    return (
      <AuthContext.Provider value={{ currentUser }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  // ✅ Hook personalizado com tipo explícito de retorno
  export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
  };
  
  export default AuthProvider;