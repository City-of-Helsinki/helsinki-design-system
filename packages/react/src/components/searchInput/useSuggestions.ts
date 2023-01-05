import { useCallback, useEffect, useRef, useState } from 'react';

import { cancellablePromise } from '../../utils/cancellablePromise';
import { useDebouncedEffect } from '../../hooks/useDebouncedEffect';

export type GetSuggestionsFunction<SuggestionItemType> = (searchString: string) => Promise<SuggestionItemType[]>;

export const SUGGESTIONS_DEBOUNCE_VALUE = 200;

export const useSuggestions = <SuggestionItemType>(
  searchString: string,
  getSuggestions: GetSuggestionsFunction<SuggestionItemType>,
  isSubmitted: boolean,
) => {
  // Cancel all suggestions if form is submitted
  const cancelAll = useRef(isSubmitted);
  // Loading state
  const [isLoading, setIsLoading] = useState(false);
  // Reference to the cancel function
  const cancelSuggestionsFunction = useRef<() => void>(() => null);
  // Currently visible suggestion items
  const [suggestions, setSuggestions] = useState<SuggestionItemType[]>([]);

  const clearSuggestions = useCallback(() => {
    setSuggestions([]);
    setIsLoading(false);
    cancelSuggestionsFunction.current();
  }, [setSuggestions, cancelSuggestionsFunction]);

  // cancel possible suggestion promise on unload
  useEffect(() => {
    return () => {
      cancelSuggestionsFunction.current();
    };
  }, [cancelSuggestionsFunction]);

  // If form is submitted, cancel all suggestions
  useEffect(() => {
    cancelAll.current = isSubmitted;
  }, [isSubmitted]);

  // Refresh suggestions whenever searchString changes
  useDebouncedEffect(
    () => {
      // Skip if getSuggestions function is not defined
      // or form is submitted
      if (typeof getSuggestions !== 'function' || cancelAll.current === true) {
        return;
      }
      // Set the loading status
      setIsLoading(true);
      // Cancel previous suggestions call
      cancelSuggestionsFunction.current();
      // Clear suggestions and exit if search string is empty
      if (searchString.length === 0) {
        setIsLoading(false);
        setSuggestions([]);
        return;
      }
      // Wrap the suggestion call to a cancellable promise
      const { promise, cancel } = cancellablePromise<SuggestionItemType[]>(getSuggestions(searchString));
      // Save reference to the cancel function
      cancelSuggestionsFunction.current = cancel;
      // Execute the promise and set suggestions based on the result
      promise.then((newSuggestions) => {
        setIsLoading(false);
        if (Array.isArray(newSuggestions) && typeof setSuggestions === 'function' && cancelAll.current === false) {
          setSuggestions(newSuggestions);
        }
      });
    },
    SUGGESTIONS_DEBOUNCE_VALUE,
    [searchString, getSuggestions, setSuggestions],
  );

  return { suggestions, isLoading: cancelAll.current ? false : isLoading, clearSuggestions };
};
