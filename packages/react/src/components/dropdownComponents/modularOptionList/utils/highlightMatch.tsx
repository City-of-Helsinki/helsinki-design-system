import React from 'react';

/**
 * Highlights the NON-matching parts of text (the context around the search term)
 * The search term itself appears in normal weight, while surrounding text is bold
 */
export function highlightMatch(text: string, searchTerm: string | undefined): React.ReactNode {
  if (!searchTerm || searchTerm.trim() === '') {
    return text;
  }

  // Escape special regex characters
  const escapedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedSearchTerm})`, 'gi');

  // Split text by matches
  const parts = text.split(regex);

  let charPosition = 0;
  return parts.map((part) => {
    const key = `${charPosition}-${part.length}`;
    charPosition += part.length;

    // Check if this part matches the search term (case-insensitive)
    if (part.toLowerCase() === searchTerm.toLowerCase()) {
      // Search term appears in normal weight
      return <React.Fragment key={key}>{part}</React.Fragment>;
    }
    // Non-matching parts are highlighted (bold)
    return <strong key={key}>{part}</strong>;
  });
}
