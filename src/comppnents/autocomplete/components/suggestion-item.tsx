import { useCallback } from "react";
import { ISuggestionsCommonProps } from "../../../types";

interface ISuggestionItemProps extends ISuggestionsCommonProps {
  value: string;
  index: number;
}

export const SuggestionItem = ({
  activeElementIndex,
  value,
  chooseSuggestion,
  setFocusedItem,
  index,
  searchString,
}: ISuggestionItemProps) => {
  const handleClickSuggestion = () => {
    chooseSuggestion(value);
  };

  const handleMouseMoveOnSuggestion = () => {
    setFocusedItem(index);
  };

  const renderSuggestionValue = useCallback(() => {
    if (!searchString) {
      return value;
    }

    const regexp = new RegExp(`(${searchString})`, "gi");

    return value.split(regexp).map((part, index) => {
      if (regexp.test(part)) return <mark key={index}>{part}</mark>;
      return part;
    });
  }, [searchString, value]);

  const className = `suggestion-item ${activeElementIndex === index ? "active" : ""}`;

  return (
    // I'm not sure that onMouseMove ok here, have to think on it
    <li
      className={className}
      onClick={handleClickSuggestion}
      onMouseMove={handleMouseMoveOnSuggestion}
      role="option"
    >
      {renderSuggestionValue()}
    </li>
  );
};
