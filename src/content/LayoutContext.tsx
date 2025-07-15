'use client';
import { createContext, useContext, useState } from 'react';

const LayoutContext = createContext({
    layout: '',
    setLayout: (layout: string) => {},
});


export function useLayout() {
    const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('layoutContext must be used within a LayoutProvider');
  }
  return context;
}

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [layout, setLayout] = useState('default');
  return (
    <LayoutContext.Provider value={{ layout, setLayout }}>
      {children}
    </LayoutContext.Provider>
  );
}
 