import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('kg_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [admin, setAdmin] = useState(() => {
    try {
      const saved = localStorage.getItem('kg_admin');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem('kg_user', JSON.stringify(user));
    else localStorage.removeItem('kg_user');
  }, [user]);

  useEffect(() => {
    if (admin) localStorage.setItem('kg_admin', JSON.stringify(admin));
    else localStorage.removeItem('kg_admin');
  }, [admin]);

  const login = useCallback((email, name) => {
    const u = { id: Date.now(), email, name: name || email.split('@')[0], mobile: '' };
    setUser(u);
    return u;
  }, []);

  const register = useCallback((name, email, mobile) => {
    const u = { id: Date.now(), name, email, mobile };
    setUser(u);
    return u;
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const adminLogin = useCallback((email) => {
    const a = { email, name: 'Admin' };
    setAdmin(a);
    return a;
  }, []);

  const adminLogout = useCallback(() => setAdmin(null), []);

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, admin, adminLogin, adminLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
