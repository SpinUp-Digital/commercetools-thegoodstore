import { IncomingMessage, ServerResponse } from 'http';
/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-ignore
import cookieCutter from 'cookie-cutter';
import ServerCookies from 'cookies';
import { SESSION_PERSISTENCE } from 'helpers/constants/auth';
import { REMEMBER_ME } from 'helpers/constants/localStorage';
import { Log } from 'helpers/errorLogger';

export function resolveApiHubUrl(): string {
  if (process.env['NEXT_PUBLIC_FRONTASTIC_HOST'] === undefined) {
    return 'https://home-thegoodstore.frontastic.io/frontastic';
  }
  const apiHubUrl = process.env.NEXT_PUBLIC_FRONTASTIC_HOST;
  /*
  if (process.env.NEXT_PUBLIC_VERCEL_ENV! === 'preview') {
    // FIXME: Get project & customer ID from configuration
    apiHubUrl =
      'https://<project>-' +
      process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF!.replace(/[^a-zA-Z0-9-]/g, '-') +
      '-<customer>.frontastic.dev/frontastic';
  }
  */
  return apiHubUrl;
}

type ExpressMessages = {
  req?: IncomingMessage;
  res?: ServerResponse;
};

type CookieManager = {
  getCookie: (cookieIdentifier: string) => string | undefined;
  setCookie: (cookieIdentifier: string, cookieValue: string) => void;
};

export class ResponseError extends Error {
  private readonly response: Response;

  constructor(response: Response) {
    super(`Got HTTP status code ${response.status} (${response.statusText})`);
    this.response = response;
  }

  getResponse() {
    return this.response;
  }

  getStatus() {
    return this.response.status;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FetchFunction = (
  endpointPath: string,
  locale: string,
  init?: RequestInit,
  payload?: object,
) => Promise<any>;

const performFetchApiHub = async (
  endpointPath: string,
  locale: string,
  init: RequestInit,
  payload: object | undefined,
  cookieManager: CookieManager,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  const frontasticSessionHeaders = {} as Record<string, string>;

  const frontasticSessionCookie = cookieManager.getCookie('frontastic-session');
  if (frontasticSessionCookie) {
    frontasticSessionHeaders['Frontastic-Session'] = frontasticSessionCookie;
  }

  const bodyOverride = payload ? { body: JSON.stringify(payload) } : {};

  const actualInit = {
    ...bodyOverride,
    ...init,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(init.headers || {}),
      'X-Frontastic-Access-Token': 'APIKEY',
      'Commercetools-Frontend-Extension-Version': process.env.NEXT_PUBLIC_EXT_BUILD_ID ?? 'dev',
      ...frontasticSessionHeaders,
      'Frontastic-Locale': locale,
    },
  };

  const endpoint = resolveApiHubUrl() + endpointPath;

  return await fetch(endpoint, actualInit).then((response): Response => {
    if (response.ok && response.headers.has('Frontastic-Session')) {
      cookieManager.setCookie('frontastic-session', response.headers.get('Frontastic-Session') as string);
    }
    return response;
  });
};

export const rawFetchApiHub: FetchFunction = async (endpointPath, locale: string, init = {}, payload) => {
  return await performFetchApiHub(endpointPath, locale, init, payload, {
    getCookie: (cookieIdenfier) => {
      return cookieCutter.get(cookieIdenfier);
    },
    setCookie: (cookieIdenfier, cookieValue) => {
      const expiryDate = window.localStorage.getItem(REMEMBER_ME)
        ? new Date(Date.now() + SESSION_PERSISTENCE)
        : 'Session';
      cookieCutter.set(cookieIdenfier, cookieValue, { path: '/', expires: expiryDate });
    },
  });
};

export const handleApiHubResponse = (fetchApiHubPromise: Promise<Response | ResponseError>): Promise<object> => {
  // TODO: Handle errors
  return fetchApiHubPromise
    .then((response: ResponseError | Response) => {
      if ((response as Response).ok) {
        return (response as Response).json();
      }
      throw new ResponseError(response as Response);
    })
    .catch(async (err: ResponseError) => {
      if (err && err.getResponse) {
        const response = err.getResponse();
        let error: object | string;
        try {
          error = await response.json();
        } catch (e) {
          error = await response.text();
        }
        Log.error(new Error(error as string));
        return error;
      } else {
        return 'Network error: ' + err;
      }
    })
    .then((response) => {
      if (response.error) {
        throw new Error(response.errorCode);
      }

      return response;
    });
};

export const fetchApiHub: FetchFunction = async (endpointPath, locale: string, init = {}, payload) => {
  return handleApiHubResponse(rawFetchApiHub(endpointPath, locale, init, payload));
};

export const rawFetchApiHubServerSide = async (
  endpointPath: string,
  locale: string,
  expressMessages: ExpressMessages,
  headers: HeadersInit = [],
) => {
  if (!expressMessages?.req || !expressMessages?.res)
    return await performFetchApiHub(endpointPath, locale, { headers }, undefined, {
      getCookie() {
        return '';
      },
      setCookie() {},
    });

  const cookies = new ServerCookies(expressMessages.req, expressMessages.res);
  return await performFetchApiHub(endpointPath, locale, { headers }, undefined, {
    getCookie: (cookieIdentifier) => {
      return cookies.get(cookieIdentifier);
    },
    setCookie: () => {
      // Do nothing. Only actions are eligible to set the session.
    },
  });
};

export const fetchApiHubServerSide = async (
  endpointPath: string,
  locale: string,
  expressMessages: ExpressMessages,
  headers: HeadersInit = [],
) => {
  return handleApiHubResponse(rawFetchApiHubServerSide(endpointPath, locale, expressMessages, headers));
};
