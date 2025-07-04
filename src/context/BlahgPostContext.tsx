import React, { createContext, useContext, ReactNode, useState } from 'react';

interface BlahgPostContextType {
  blahgPost: {
    title: string;
    content: string;
    created_at: string;
    url: string;
  } | null;
  setBlahgPost: (blahgPost: {
    title: string;
    content: string;
    created_at: string;
    url: string;
  } | null) => void;
}

const BlahgPostContext = createContext<BlahgPostContextType | undefined>(undefined);

export const BlahgPostProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [blahgPost, setBlahgPost] = useState<{
    title: string;
    content: string;
    created_at: string;
    url: string;
  } | null>(null);

  return (
    <BlahgPostContext.Provider value={{ blahgPost, setBlahgPost }}>
      {children}
    </BlahgPostContext.Provider>
  );
};

export const useBlahgPost = (): BlahgPostContextType => {
  const context = useContext(BlahgPostContext);
  if (context === undefined) {
    throw new Error('useBlahgPost must be used within a BlahgPostProvider');
  }
  return context;
};