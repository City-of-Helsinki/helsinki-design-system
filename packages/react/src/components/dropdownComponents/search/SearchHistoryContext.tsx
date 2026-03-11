import React, { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from 'react';

interface SearchHistoryContextType {
  searchHistory: string[];
  addSearchItem: (item: string) => void;
  clearHistory: () => void;
  historyEnabled: boolean;
}

const SearchHistoryContext = createContext<SearchHistoryContextType | undefined>(undefined);

interface SearchHistoryProviderProps {
  children: ReactNode;
  historyId?: string;
}

export const SearchHistoryProvider: React.FC<SearchHistoryProviderProps> = ({ children, historyId }) => {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const storageKey = historyId != null && historyId !== '' ? `hds-search-history-${historyId}` : null;

  useEffect(() => {
    if (storageKey === null) return;
    const storedHistory = localStorage.getItem(storageKey);
    if (storedHistory) {
      try {
        const parsedHistory = JSON.parse(storedHistory);
        if (Array.isArray(parsedHistory)) {
          setSearchHistory(parsedHistory.slice(0, 10));
        }
      } catch {
        localStorage.removeItem(storageKey);
      }
    }
  }, [storageKey]);

  const addSearchItem = useCallback(
    (item: string) => {
      if (storageKey === null || !item.trim()) return;

      setSearchHistory((prev) => {
        const lowerCaseItem = item.toLowerCase();
        const filtered = prev.filter((historyItem) => historyItem !== lowerCaseItem);
        const updated = [lowerCaseItem, ...filtered].slice(0, 10);
        localStorage.setItem(storageKey, JSON.stringify(updated));
        return updated;
      });
    },
    [storageKey],
  );

  const clearHistory = useCallback(() => {
    if (storageKey !== null) {
      localStorage.removeItem(storageKey);
    }
    setSearchHistory([]);
  }, [storageKey]);

  const historyEnabled = storageKey !== null;

  const value = useMemo(
    () => ({ searchHistory, addSearchItem, clearHistory, historyEnabled }),
    [searchHistory, addSearchItem, clearHistory, historyEnabled],
  );

  return <SearchHistoryContext.Provider value={value}>{children}</SearchHistoryContext.Provider>;
};

export const useSearchHistory = () => {
  const context = useContext(SearchHistoryContext);
  if (context === undefined) {
    throw new Error('useSearchHistory must be used within a SearchHistoryProvider');
  }
  return context;
};
