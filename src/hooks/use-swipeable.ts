'use client';

import { useEffect, useRef } from 'react';

interface SwipeableOptions {
  onSwipedLeft?: () => void;
  onSwipedRight?: () => void;
  onSwipedUp?: () => void;
  onSwipedDown?: () => void;
  preventDefaultTouchmoveEvent?: boolean;
  trackMouse?: boolean;
  delta?: number;
}

export function useSwipeable(options: SwipeableOptions) {
  const {
    onSwipedLeft,
    onSwipedRight,
    onSwipedUp,
    onSwipedDown,
    preventDefaultTouchmoveEvent = false,
    trackMouse = false,
    delta = 50,
  } = options;

  const elementRef = useRef<HTMLElement | null>(null);
  const startRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleStart = (clientX: number, clientY: number) => {
      startRef.current = { x: clientX, y: clientY };
    };

    const handleEnd = (clientX: number, clientY: number) => {
      if (!startRef.current) return;

      const deltaX = clientX - startRef.current.x;
      const deltaY = clientY - startRef.current.y;
      const absDeltaX = Math.abs(deltaX);
      const absDeltaY = Math.abs(deltaY);

      if (Math.max(absDeltaX, absDeltaY) < delta) return;

      if (absDeltaX > absDeltaY) {
        if (deltaX > 0) {
          onSwipedRight?.();
        } else {
          onSwipedLeft?.();
        }
      } else {
        if (deltaY > 0) {
          onSwipedDown?.();
        } else {
          onSwipedUp?.();
        }
      }

      startRef.current = null;
    };

    // Touch events
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      handleStart(touch.clientX, touch.clientY);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touch = e.changedTouches[0];
      handleEnd(touch.clientX, touch.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (preventDefaultTouchmoveEvent) {
        e.preventDefault();
      }
    };

    // Mouse events (if trackMouse is enabled)
    const handleMouseDown = (e: MouseEvent) => {
      if (trackMouse) {
        handleStart(e.clientX, e.clientY);
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (trackMouse && startRef.current) {
        handleEnd(e.clientX, e.clientY);
      }
    };

    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, {
      passive: !preventDefaultTouchmoveEvent,
    });

    if (trackMouse) {
      element.addEventListener('mousedown', handleMouseDown);
      element.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchend', handleTouchEnd);
      element.removeEventListener('touchmove', handleTouchMove);

      if (trackMouse) {
        element.removeEventListener('mousedown', handleMouseDown);
        element.removeEventListener('mouseup', handleMouseUp);
      }
    };
  }, [
    onSwipedLeft,
    onSwipedRight,
    onSwipedUp,
    onSwipedDown,
    preventDefaultTouchmoveEvent,
    trackMouse,
    delta,
  ]);

  return {
    ref: (el: HTMLElement | null) => {
      elementRef.current = el;
    },
  };
}
