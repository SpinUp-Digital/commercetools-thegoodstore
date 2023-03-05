import { RouterContext } from 'next/dist/shared/lib/router-context';
import { SDK } from '../sdk';
import 'tailwindcss/tailwind.css';
import '../styles/app.css';
import 'react-loading-skeleton/dist/skeleton.css';

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

const StoryWrapper = ({ Story }) => {
  SDK.configure('en');

  return <Story />;
};

export const decorators = [(Story) => <StoryWrapper Story={Story} />];
