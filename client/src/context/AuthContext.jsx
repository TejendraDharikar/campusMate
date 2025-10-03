import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [name, setName] = useState(localStorage.getItem('name'));

  return (
    <AuthContext.Provider value={{ role, name, setRole, setName }}>
      {children}
    </AuthContext.Provider>
  );
};