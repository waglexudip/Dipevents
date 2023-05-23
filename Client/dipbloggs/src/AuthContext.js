import React, { createContext, useState } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [userin, setUserin] = useState({});

  return (
    <AuthContext.Provider value={{ userin, setUserin }}>
      {children}
    </AuthContext.Provider>
  );
};
