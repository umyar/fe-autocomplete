import { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react';

import { useOutsideClick } from '@/hooks/useOutsideClick';
import { usePortal } from '@/hooks/usePortal';

interface Props {
  children: ReactNode;
  isShown: boolean;
  // alignment?: 'top' | 'right' | 'bottom' |'left';
  anchorEl: HTMLElement | null;
  onClickOutside?: (event: MouseEvent) => void;
}

export function Popover({ children, isShown, anchorEl, onClickOutside }: Props) {
  const [popoverStyles, setPopoverStyles] = useState<CSSProperties | undefined>(undefined);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (anchorEl) {
      const { left, width, bottom } = anchorEl.getBoundingClientRect();
      setPopoverStyles({ top: bottom + 4, left, width });
    }
  }, [anchorEl]);

  const handleClick = (event: MouseEvent) => {
    const isTriggeredAnchorEl = anchorEl && anchorEl.contains(event.target as Node);

    if (onClickOutside && !isTriggeredAnchorEl) {
      onClickOutside(event);
    }
  };

  useOutsideClick<HTMLDivElement>(popoverRef, handleClick);

  const portal = usePortal(
    <div className="popover" style={popoverStyles} ref={popoverRef}>
      {children}
    </div>,
    'root'
  );

  if (isShown) {
    return portal;
  }

  return null;
}
