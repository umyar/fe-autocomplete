import { useMemo } from "react";
import { ISuggestion } from "../../types.ts";

import './suggestions-list.css';

interface ISuggestionsListProps {
  suggestions: ISuggestion[];
  chooseSuggestion: (value: ISuggestion["value"]) => void
}

export const SuggestionsList = ({suggestions, chooseSuggestion}: ISuggestionsListProps) => {
  const suggestionItems = useMemo(() => {
    return suggestions.map(({value, id}) => (
      <li className="suggestion-item" key={id} onClick={() => chooseSuggestion(value)}>{value}</li>
    ))
  }, [suggestions, chooseSuggestion])

  return (
    <ul className="suggestion-list">
      {suggestionItems}
    </ul>
  )
}