import { HTMLAttributes } from 'react';

type Translation = {
  file: string;
  id: string;
  defaultValue?: string;
};

type ElementType = Pick<HTMLElementTagNameMap, 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'>;

export interface TypographyProps extends HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement | HTMLSpanElement> {
  as?: keyof ElementType;
  children?: string;
  className?: HTMLElement['className'];
  translation?: Translation;
  lineHeight?: 'tight' | 'normal' | 'loose';
  fontSize?: number;
  fontWeight?: 'light' | 'regular' | 'medium' | 'semibold' | 'bold';
  fontFamily?: 'inter' | 'libre';
  align?: HTMLElement['style']['textAlign'];
}
