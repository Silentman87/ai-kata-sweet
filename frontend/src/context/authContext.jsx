import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('utoken');
      // ✅ Try to parse JSON safely
      return stored ? JSON.parse(stored) : null;
    } catch (err) {
      // If parsing fails, remove the invalid item
      localStorage.removeItem('utoken');
      return null;
    }
  });

  const loginUser = (userData) => {
    localStorage.setItem('utoken', JSON.stringify(userData)); // store full object
    setUser(userData);
  };

  const logoutUser = () => {
    localStorage.removeItem('utoken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
