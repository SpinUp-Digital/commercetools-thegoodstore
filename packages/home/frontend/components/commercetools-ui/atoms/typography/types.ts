import { HTMLAttributes } from 'react';

type Translation = {
  file: string;
  id: string;
  defaultValue?: string;
};

export const tagTypesToUse = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span'] as const;
type ElementType = Pick<JSX.IntrinsicElements, typeof tagTypesToUse[number]>;

export const fontSizes = [10, 12, 14, 16, 18, 20, 22, 26, 28, 32, 36, 42, 46, 52, 58] as const;
type FontSize = typeof fontSizes[number];

export interface TypographyProps extends HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement | HTMLSpanElement> {
  as?: keyof ElementType | 'fragment';
  children?: string;
  className?: HTMLElement['className'];
  translation?: Translation;
  lineHeight?: 'tight' | 'normal' | 'loose';
  fontSize?: FontSize;
  medium?: boolean;
  underline?: boolean;
  fontFamily?: 'inter' | 'libre';
  align?: HTMLElement['style']['textAlign'];
}
