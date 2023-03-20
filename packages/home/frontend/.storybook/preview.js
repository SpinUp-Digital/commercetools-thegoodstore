import { RouterContext } from 'next/dist/shared/lib/router-context';
import { SDK } from '../sdk';
import 'tailwindcss/tailwind.css';
import '../styles/app.css';
import 'react-loading-skeleton/dist/skeleton.css';
import theme from './theme';

export const parameters = {
  docs: {
    theme: theme,
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  nextRouter: {
    Provider: RouterContext.Provider,
    locales: ['en_GB', 'de_DE'],
    locale: 'en_GB',
  },
  options: {
    storySort: {
      method: 'alphabetical',
    },
  },
};

const StoryWrapper = ({ Story }) => {
  SDK.configure('en');

  return <Story />;
};

export const decorators = [(Story) => <StoryWrapper Story={Story} />];
