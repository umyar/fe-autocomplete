import { useMemo } from "react";
import { ISuggestion } from "../../types.ts";

import './suggestions-list.css';

interface ISuggestionsListProps {
  suggestions: ISuggestion[];
  chooseSuggestion: (value: ISuggestion["value"]) => void
}

export const SuggestionsList = ({suggestions, chooseSuggestion}: ISuggestionsListProps) => {
  const suggestionItems = useMemo(() => {
    return suggestions.map(({value}) => (
      <li className="suggestion-item" key={value} onClick={() => chooseSuggestion(value)}>{value}</li>
    ))
  }, [suggestions, chooseSuggestion])

  return (
    <ul className="suggestion-list">
      {suggestionItems}
    </ul>
  )
}