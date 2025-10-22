import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SearchHistoryContextType {
  searchHistory: string[];
  addSearchItem: (item: string) => void;
  clearHistory: () => void;
}

const SearchHistoryContext = createContext<SearchHistoryContextType | undefined>(undefined);

interface SearchHistoryProviderProps {
  children: ReactNode;
  historyId: string;
}

export const SearchHistoryProvider: React.FC<SearchHistoryProviderProps> = ({
  children,
  historyId = 'hds-search-history',
}) => {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const hdsStorageId = `hds-search-history-${historyId}`;

  useEffect(() => {
    const storedHistory = localStorage.getItem(hdsStorageId);
    if (storedHistory) {
      try {
        const parsedHistory = JSON.parse(storedHistory);
        if (Array.isArray(parsedHistory)) {
          setSearchHistory(parsedHistory.slice(0, 10));
        }
      } catch (error) {
        console.warn('Failed to parse search history from localStorage');
      }
    }
  }, [historyId]);

  const addSearchItem = (item: string) => {
    if (!item.trim()) return;

    setSearchHistory((prev) => {
      const lowerCaseItem = item.toLowerCase();
      const filtered = prev.filter((historyItem) => historyItem !== lowerCaseItem);
      const updated = [lowerCaseItem, ...filtered].slice(0, 10);
      localStorage.setItem(hdsStorageId, JSON.stringify(updated));
      return updated;
    });
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem(hdsStorageId);
  };

  return (
    <SearchHistoryContext.Provider value={{ searchHistory, addSearchItem, clearHistory }}>
      {children}
    </SearchHistoryContext.Provider>
  );
};

export const useSearchHistory = () => {
  const context = useContext(SearchHistoryContext);
  if (context === undefined) {
    throw new Error('useSearchHistory must be used within a SearchHistoryProvider');
  }
  return context;
};
