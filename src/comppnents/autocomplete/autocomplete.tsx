import { useState, ChangeEvent, useEffect, useRef, KeyboardEvent, useCallback } from 'react';
import { useDebouncedCallback } from '@/hooks/useCallbackDebounce';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { getNextActiveItem, scrollToActiveElement } from '@/utils/getNextActiveItem';
// import { Popover } from "../popover/popover";

import { SuggestionsList } from './components/suggestions-list';
import { httpClient } from '@/http-client/http-client.ts';
import { ISuggestion, KeyboardKeys } from '@/types.ts';

import './autocomplete.css';

const fetchSuggestions = async (searchString: string) => {
  const searchQuery = searchString ? `?search=${searchString}` : '';

  return await httpClient<ISuggestion[]>('/names' + searchQuery);
};

export function Autocomplete() {
  const [value, setValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<ISuggestion[]>([]);
  const [suggestionsExpanded, setSuggestionsExpanded] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState(false);
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const [referenceElement, setRefElement] = useState<HTMLInputElement | null>(null);
  const dropdownRef = useRef(null);

  const handleChangeSearchString = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const resetActiveElement = useCallback(() => {
    setActiveItemIndex(0);
  }, []);

  const closeDropdown = useCallback(() => {
    setSuggestionsExpanded(false);
    resetActiveElement();
  }, [resetActiveElement]);

  const showDropdown = useCallback(() => {
    setSuggestionsExpanded(true);
  }, [setSuggestionsExpanded]);

  const handleClick = (event: MouseEvent) => {
    const isTriggeredAnchorEl = referenceElement && referenceElement.contains(event.target as Node);

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
    // TODO: try to move this closeDropdown() to input onBlur event
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
      const nextActiveItemIndex = getNextActiveItem(activeItemIndex, key, suggestions.length);
      setActiveItemIndex(nextActiveItemIndex);
      scrollToActiveElement(dropdownRef, nextActiveItemIndex);
    }

    if (key === KeyboardKeys.Enter) {
      const activeSuggestion = suggestions[activeItemIndex];
      chooseSuggestion(activeSuggestion.value);
    }
  };

  const updateSuggestions = () => {
    setIsFetching(true);
    resetActiveElement();

    fetchSuggestions(value)
      .then((suggestions) => {
        setSuggestions(suggestions);
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  const debouncedSuggestionsUpdate = useDebouncedCallback(updateSuggestions, 500);

  useEffect(() => {
    if (value) {
      debouncedSuggestionsUpdate();
    } else {
      setSuggestions([]);
    }
  }, [value]);

  const chooseSuggestion = (suggestion: ISuggestion['value']) => {
    setValue(suggestion);
    setSuggestionsExpanded(false);
    referenceElement?.blur();
  };

  const onlySelectedSuggestion = suggestions.length === 1 && suggestions[0].value === value;
  const isSuggestionsVisible = Boolean(suggestionsExpanded && value && suggestions.length && !onlySelectedSuggestion);

  return (
    <div className="autocomplete" onKeyDown={onKeyDown}>
      <input
        value={value}
        onChange={handleChangeSearchString}
        onFocus={showDropdown}
        ref={setRefElement}
        className="autocomplete-input"
        type="search"
        autoComplete="off"
        aria-autocomplete="list"
      />
      <div className="tip">
        start to type in some name e.g. <span style={{ fontStyle: 'italic' }}>Jason</span>
      </div>

      {isSuggestionsVisible && (
        <SuggestionsList
          searchString={value}
          activeItemIndex={activeItemIndex}
          ref={dropdownRef}
          suggestions={suggestions}
          setFocusedItem={setActiveItemIndex}
          chooseSuggestion={chooseSuggestion}
          isFetching={isFetching}
        />
      )}
      {/*<Popover*/}
      {/*  anchorEl={referenceElement}*/}
      {/*  isShown={isSuggestionsVisible}*/}
      {/*  onClickOutside={closeDropdown}*/}
      {/*>*/}
      {/*  <SuggestionsList*/}
      {/*    searchString={value}*/}
      {/*    activeItemIndex={activeItemIndex}*/}
      {/*    ref={dropdownRef}*/}
      {/*    suggestions={suggestions}*/}
      {/*    setFocusedItem={setActiveItemIndex}*/}
      {/*    chooseSuggestion={chooseSuggestion}*/}
      {/*    isFetching={isFetching}*/}
      {/*  />*/}
      {/*</Popover>*/}
    </div>
  );
}
