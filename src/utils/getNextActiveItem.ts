import { RefObject } from "react";
import { KeyboardKeys } from "../types";

export function scrollToActiveElement(
  dropdownMenuRef: RefObject<HTMLElement>,
  newActiveOption: number
): void {
  dropdownMenuRef.current?.children[newActiveOption].scrollIntoView({
    block: 'nearest',
    behavior: 'smooth'
  });
}

export function getNextActiveItem(currentIndex: number, key: KeyboardKeys.ArrowUp | KeyboardKeys.ArrowDown, listLength: number): number {
  if (key === KeyboardKeys.ArrowDown) {
    return currentIndex === listLength - 1 ? 0 : ++currentIndex;
  } else {
    return currentIndex === 0 ? listLength - 1 : --currentIndex;
  }
}