import { HTMLAttributes } from 'react';
import { fontSizesToUse } from 'tailwind.settings';

type Translation = {
  file: string;
  id: string;
  defaultValue?: string;
};

export const tagTypesToUse = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span'] as const;
type ElementType = Pick<JSX.IntrinsicElements, typeof tagTypesToUse[number]>;

export const fontSizes = [...fontSizesToUse] as const;
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
