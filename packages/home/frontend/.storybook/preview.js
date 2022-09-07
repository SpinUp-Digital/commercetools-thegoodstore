import { RouterContext } from 'next/dist/shared/lib/router-context';
import DarkModeProvider from '../frontastic/provider/DarkMode';
import 'tailwindcss/tailwind.css';
import '../styles/app.css';
import '../styles/themes/default.css';
import '../styles/themes/theme1.css';
import '../styles/themes/theme2.css';
import '../styles/themes/theme3.css';
import '../styles/components/slider.css';
import '../styles/components/default-loader.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  nextRouter: {
    Provider: RouterContext.Provider,
    locales: ['en', 'de'],
    locale: 'en',
  },
};

export const decorators = [
  (Story) => (
    <DarkModeProvider>
      <Story />
    </DarkModeProvider>
  ),
];
