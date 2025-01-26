// CodeContext.js
import React, { createContext, useContext, useState } from 'react';

// Create a Context for the code
const CodeContext = createContext();

// Custom hook to use the Code Context
export const useCode = () => useContext(CodeContext);

// Provider component to wrap your app with
export const CodeProvider = ({ children }) => {
  const [code, setCode] = useState('');

  return (
    <CodeContext.Provider value={{ code, setCode }}>
      {children}
    </CodeContext.Provider>
  );
};