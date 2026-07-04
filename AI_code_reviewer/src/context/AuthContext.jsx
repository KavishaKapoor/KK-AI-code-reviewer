import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem('active_user')) || null;
  });

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const matchedUser = users.find(u => u.email === email && u.password === password);
    if (!matchedUser) throw new Error("Invalid operational credentials.");
    
    localStorage.setItem('active_user', JSON.stringify(matchedUser));
    setUser(matchedUser);
    return matchedUser;
  };

  const register = (username, email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some(u => u.email === email)) throw new Error("Account configuration already exists.");
    
    const newUser = { username, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('active_user', JSON.stringify(newUser));
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem('active_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);