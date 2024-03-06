import { useState, ChangeEvent, useEffect } from "react";

import { SuggestionsList } from "./components/suggestions-list.tsx";
import { httpClient } from "../http-client/http-client.ts";
import { ISuggestion } from "../types.ts";

import './autocomplete.css';

const fetchSuggestions = async (searchString: string) => {
  const searchQuery = searchString ? `?search=${searchString}` : '';

  return await httpClient<ISuggestion[]>('/names' + searchQuery);
};

export function Autocomplete() {
  const [value, setValue] = useState<string>("");
  const [suggestionsShown, setSuggestionsShown] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<ISuggestion[]>([]);

  const handleChangeSearchString = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    fetchSuggestions(value).then(suggestions => {
      console.log('suggestions', suggestions);
      setSuggestions(suggestions);
      setSuggestionsShown(true);

    });
  }, [value]);

  const chooseSuggestion = (suggestion: ISuggestion["value"]) => {
    setValue(suggestion);
    setSuggestionsShown(false);
  };

  const isSuggestionsVisible = suggestionsShown && suggestions.length;

  return (
    <div className="autocomplete">
      <input
        value={value}
        onChange={handleChangeSearchString}
        className="autocomplete-input"
        type="search"
        autoComplete="off"
        aria-autocomplete="list"
      />
      <span className="tip">start to type in some name</span>
      {isSuggestionsVisible && <SuggestionsList suggestions={suggestions} chooseSuggestion={chooseSuggestion} />}
    </div>
  );
}