import {
  useState,
  ChangeEvent,
  useEffect,
  useRef,
  KeyboardEvent,
  useCallback,
} from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import {
  getNextFocusedItem,
  scrollToActiveElement,
} from "../../utils/getNextFocusedItem";
// import { Popover } from "../popover/popover";

import { SuggestionsList } from "./components/suggestions-list";
import { httpClient } from "../../http-client/http-client";
import { ISuggestion, KeyboardKeys } from "../../types";

import "./autocomplete.css";

const fetchSuggestions = async (searchString: string) => {
  const searchQuery = searchString ? `?search=${searchString}` : "";

  return await httpClient<ISuggestion[]>("/names" + searchQuery);
};

export function Autocomplete() {
  const [value, setValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<ISuggestion[]>([]);
  const [suggestionsExpanded, setSuggestionsExpanded] =
    useState<boolean>(false);
  const [isFetching, setIsFetching] = useState(false);
  const [focusedItem, setFocusedItem] = useState(0);

  const [referenceElement, setRefElement] = useState<HTMLInputElement | null>(
    null,
  );
  const dropdownRef = useRef(null);

  const handleChangeSearchString = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const resetActiveElement = useCallback(() => {
    setFocusedItem(0);
  }, [setFocusedItem]);

  const closeDropdown = useCallback(() => {
    setSuggestionsExpanded(false);
    resetActiveElement();
  }, [setSuggestionsExpanded]);

  const handleClick = (event: MouseEvent) => {
    const isTriggeredAnchorEl =
      referenceElement && referenceElement.contains(event.target as Node);

    if (!isTriggeredAnchorEl) {
      closeDropdown();
    }
  };

  useOutsideClick(dropdownRef, handleClick);

  const onKeyDown = (e: KeyboardEvent) => {
    if (!suggestionsExpanded) {
      return;
    }

    const key = e.key;
    // try to move this closeDropdown() to input onBlur event
    if (key === KeyboardKeys.Tab) {
      closeDropdown();
    }

    if (key === KeyboardKeys.Escape) {
      e.preventDefault();
      closeDropdown();
      referenceElement?.blur();
    }

    if (key === KeyboardKeys.ArrowDown || key === KeyboardKeys.ArrowUp) {
      e.preventDefault();
      const nextFocusedItem = getNextFocusedItem(
        focusedItem,
        key,
        suggestions.length,
      );
      setFocusedItem(nextFocusedItem);
      scrollToActiveElement(dropdownRef, nextFocusedItem);
    }

    if (key === KeyboardKeys.Enter) {
      const activeSuggestion = suggestions[focusedItem];
      chooseSuggestion(activeSuggestion.value);
    }
  };

  useEffect(() => {
    setIsFetching(true);
    resetActiveElement();

    fetchSuggestions(value)
      .then((suggestions) => {
        setSuggestions(suggestions);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, [value]);

  const chooseSuggestion = (suggestion: ISuggestion["value"]) => {
    setValue(suggestion);
    setSuggestionsExpanded(false);
    referenceElement?.blur();
  };

  const onlySelectedSuggestion =
    suggestions.length === 1 && suggestions[0].value === value;
  const isSuggestionsVisible = Boolean(
    suggestionsExpanded && suggestions.length && !onlySelectedSuggestion,
  );

  const showDropdown = useCallback(() => {
    setSuggestionsExpanded(true);
  }, [setSuggestionsExpanded]);

  return (
    <div className="autocomplete" onKeyDown={onKeyDown}>
      <input
        value={value}
        onChange={handleChangeSearchString}
        onFocus={showDropdown}
        // onBlur={closeDropdown}
        ref={setRefElement}
        className="autocomplete-input"
        type="search"
        autoComplete="off"
        aria-autocomplete="list"
      />
      {/*<Error error={error} />*/}
      <span className="tip">start to type in some name</span>
      {isSuggestionsVisible && (
        <SuggestionsList
          searchString={value}
          activeElementIndex={focusedItem}
          ref={dropdownRef}
          suggestions={suggestions}
          setFocusedItem={setFocusedItem}
          chooseSuggestion={chooseSuggestion}
          isFetching={isFetching}
        />
      )}
      {/*<Popover anchorEl={referenceElement} isShown={isSuggestionsVisible} onClickOutside={closeDropdown}>*/}
      {/*<SuggestionsList activeElement={focusedItem} suggestions={suggestions} chooseSuggestion={chooseSuggestion}*/}
      {/*                 isFetching={isFetching} />*/}
      {/*</Popover>*/}
    </div>
  );
}
