# commercetools for Frontend (coFe) Template

> :information_source: Full documentation can be found [Here](https://docs.commercetools.com/frontend-development/)

# Before you begin:

In order to get you started quickly with your demo, you can follow those steps:

1. In the root run:
   ```bash
   cd getting-started
   ```
2. Install dependencies
   ```bash
   yarn install
   ```
3. Add a `.env` file under `getting-started` directory with your merchant center credentials.
   ```bash
   CTP_PROJECT_KEY=
   CTP_CLIENT_SECRET=
   CTP_CLIENT_ID=
   CTP_AUTH_URL=
   CTP_API_URL=
   CTP_SCOPES=
   ```
4. Now, in your terminal you can run the following
   ```bash
   yarn run import:data # Imports demo data to your merchant center
   yarn run clean:data # Cleans all the data in your merchant center
   yarn run reset:data # Cleans all data and then imports demo data
   ```
5. You can also clear/import specific resources if needed
   ```bash
   yarn run clean:products # Cleans all products in merchant center
   yarn run import:products # Imports demo product to merchant center
   ```
   For a full list, check the scripts in [package.json](./getting-started/package.json).

# Getting Started:

1. Install the `Frontastic-CLI`.

   ```bash
   brew tap frontasticgmbh/tap && brew install frontastic-cli
   ```

2. Initialize the `Frontastic-CLI`.

   ```bash
   frontastic init
   ```

3. Install project dependencies. This installs both frontend and backend dependencies.

   ```bash
   frontastic install
   ```

4. Under `/packages/home/frontend` create a `.env.local` file with keys from `.env.dist` and populate with your own values.
   <br />
   :warning: `.env.local` is gitignored and this should not change. In production environments you should set these variables using [Netlify environment variables](https://docs.netlify.com/environment-variables/overview/).

   ```bash
   NEXT_PUBLIC_FRONTASTIC_HOST=https://home-thegoodstore.frontastic.io/frontastic
   NEXT_PUBLIC_FRONTASTIC_API_KEY=
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dlwdq84ig
   SITE_URL=
   NEXT_PUBLIC_GA_TRACKING_ID=GTM-NWT2CTF
   NEXT_PUBLIC_ALGOLIA_APPLICATION_ID=
   NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY=
   NEXT_PUBLIC_ALGOLIA_PRODUCTS_INDEX=test_TheGoodStore
   NEXT_PUBLIC_ALGOLIA_PRODUCTS_QUERY_SUGGESTIONS_INDEX=test_TheGoodStore_query_suggestions
   NEXT_PUBLIC_ADYEN_CLIENT_KEY=
   ```

Next step depends wether you want to work on the backend or the frontend.

## For Frontend Development:

1. `cd` into frontend working directory.

   ```bash
   cd /packages/home/frontend
   ```

2. Start the project in development mode.

   ```bash
   yarn dev
   ```

3. Launch storybook.

   ```bash
   yarn storybook
   ```

## For Back-End Development:

1. From the project's root run

   ```bash
   frontastic run
   ```

# Our stack:

- [NextJs](https://nextjs.org/docs/getting-started) for the fastest and the best development experience :boom:
- [Typescript](https://www.typescriptlang.org/docs/handbook/intro.html) for a strong typed and bug-free code :bug:
- [TailwindCSS](https://tailwindcss.com/docs/installation) for the easiest and the most customizable styling :heart_eyes_cat:
- [NodeJs](https://nodejs.org/en/docs/) for a blazing fast response time from the extensions :zap:

# Integrations:

- [commercetools Composable Commerce (CoCo)](https://docs.commercetools.com/api/) is our e-commerce suite :briefcase:
- [Algolia](https://www.algolia.com/doc/) for the fastest real time search experience :zap:
- [Adyen](https://docs.adyen.com/) for fast and secure payments :lock:

# Front-End In-Depth Guide:

## Folder Structure

```bash
.
├── algolia	# Algolia related configurations
├── components
│   ├── commercetools-ui	# UI components
│   ├── headless		# Components with no UI
│   ├── HOC			# Higher order components
├── context	# Global providers
├── frontastic
│   ├── hooks	   # Data fetching & mutation hooks
│   ├── lib	   # Library sepcific code
│   ├── provider
│   │   └── Frontastic	# Main provider
│   └── tastics    # Tastic components
├── helpers
│   ├── constants # Constants
│   ├── hooks     # Custom hooks
│   ├── mappers   # Data transformation
│   ├── mocks     # Mocks & placeholders
│   └── utils     # Utility functions
├── pages
│   ├── __preview			# Preview
│   ├── sitemap-categories.xml	        # Ctageories sitemap
│   ├── sitemap-products.xml		# Products sitemap
│   ├── sitemap-static.xml		# Structure sitemap
│   └── verify				# Account verification
├── public	# Public assets
├── sdk	        # SDK instance
├── styles	# Global styling
└── types	# Types
```

## Customization & Configuration Files

- `next.config.js`: Main configuration for NextJs
- `next-i18next.config.js` Configuration for internationalization
- `next-sitemap.config.js` Configuration for generating sitemaps
- `tailwind.config.js` Configuration for TailwindCSS
- `prettier.config.js` Configuration for prettier
- `.eslintrc.json` Configuration for EsLint
- `netlify.toml` Configuration for Netify
- `project.config.js` Project specific configurations

## Production

1. Run linter to detect or auto fix code errors and presist a consistent code styling

   ```bash
   yarn fix
   ```

2. Run the `build` command. This will build the project and generate sitemaps and robots.txt file.

   ```bash
   yarn build
   ```

## Deployment

If you want to deploy your project. All you have to do is push to master and Netlify will automatically start building your project.

> :information_source: If you want to manually trigger a build based on the latest commit on master you can do it from Netlify. For more information refer to [this documentation](https://docs.netlify.com/site-deploys/create-deploys/).

# Additional Links

- [Frontastic-CLI](https://docs.frontastic.cloud/docs/frontastic-cli)
- [Adyen setup](https://docs.commercetools.com/frontend-development/adyen)
