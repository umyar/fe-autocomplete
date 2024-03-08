import { forwardRef } from "react";

import { SuggestionItem } from "./suggestion-item";
import { ISuggestion, ISuggestionsCommonProps } from "../../../types";

import './suggestions-list.css';

const LoadingIndicator = () => {
  return <li className="loading-item" aria-busy="true">loading items...</li>;
};

interface ISuggestionsListProps extends ISuggestionsCommonProps {
  suggestions: ISuggestion[];
  isFetching: boolean;
}

// remove forwardRef after migration to Popover
export const SuggestionsList = forwardRef<HTMLUListElement, ISuggestionsListProps>(
  ({suggestions, chooseSuggestion, isFetching, activeItemIndex, setFocusedItem, searchString}, ref) => {
    const suggestionItems = suggestions.map(({value, id}, index) => {
      return (
        <SuggestionItem
          key={id}
          value={value}
          activeItemIndex={activeItemIndex}
          chooseSuggestion={chooseSuggestion}
          searchString={searchString}
          setFocusedItem={setFocusedItem}
          index={index}
        />);
    });


    return (
      <ul ref={ref} className="suggestion-list">
        {isFetching ? <LoadingIndicator /> : suggestionItems}
      </ul>
    );
  }
);