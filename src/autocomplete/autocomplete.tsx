import { useState, ChangeEvent, useEffect } from "react";
import { httpClient } from "../http-client/http-client.ts";
import { ISuggestion } from "../types.ts";
import { SuggestionsList } from "./components/suggestions-list.tsx";

const fetchSuggestions = async () => {
  return await httpClient<ISuggestion[]>('/names');
}

export function Autocomplete() {
  const [value, setValue] = useState<string>("");
  const [suggestionsShown, setSuggestionsShown] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<ISuggestion[]>([]);

  const handleChangeSearchString = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }

  useEffect(() => {
    fetchSuggestions().then(suggestions => {
      if (suggestions.length) {
        setSuggestions(suggestions);
        setSuggestionsShown(true);
      }
    });
  }, [])

  const chooseSuggestion = (suggestion: ISuggestion["value"]) => {
    setValue(suggestion);
    setSuggestionsShown(false);
  }

  return (
    <div className="autocomplete">
      <input
        value={value}
        onChange={handleChangeSearchString}
        type="search"
        autoComplete="off"
        aria-autocomplete="list"
      />
      {suggestionsShown && <SuggestionsList suggestions={suggestions} chooseSuggestion={chooseSuggestion} />}
    </div>
  )
}