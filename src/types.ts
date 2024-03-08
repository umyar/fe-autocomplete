import { Dispatch, SetStateAction } from "react";

export interface ISuggestion {
  value: string;
  id: string;
}

export enum KeyboardKeys {
  ArrowDown = 'ArrowDown',
  ArrowUp = 'ArrowUp',
  Escape = 'Escape',
  Enter = 'Enter',
  Tab = 'Tab'
}

export interface ISuggestionsCommonProps {
  chooseSuggestion: (value: ISuggestion["value"]) => void;
  activeItemIndex: number;
  setFocusedItem: Dispatch<SetStateAction<number>>
  searchString: string;
}