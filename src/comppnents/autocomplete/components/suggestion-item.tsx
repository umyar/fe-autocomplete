import { ISuggestionsCommonProps } from '@/types.ts';

import styles from './suggestions-list.module.css';

interface ISuggestionItemProps extends ISuggestionsCommonProps {
  value: string;
  index: number;
}

export const SuggestionItem = ({
  activeItemIndex,
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

  const renderSuggestionValue = () => {
    if (!searchString) {
      return value;
    }

    const regexp = new RegExp(`(${searchString})`, 'gi');

    return value.split(regexp).map((part, index) => {
      if (regexp.test(part)) return <mark key={index}>{part}</mark>;
      return part;
    });
  };

  const className = `${styles.suggestionItem} ${activeItemIndex === index ? styles.active : ''}`;

  return (
    // I'm not sure that onMouseMove ok here, have to think on it
    <li className={className} onClick={handleClickSuggestion} onMouseMove={handleMouseMoveOnSuggestion} role="option">
      {renderSuggestionValue()}
    </li>
  );
};
