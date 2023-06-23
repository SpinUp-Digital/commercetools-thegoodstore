import { Project } from '@frontastic/extension-types';
import { ClientConfig } from '../interfaces/ClientConfig';
/*
export const getConfig = (configuration: Record<string, string>): ClientConfig => {
  if (!configuration) throw 'Configuration not available';

  return {
    authUrl: configuration.EXTENSION_COMMERCETOOLS_AUTH_URL,
    clientId: configuration.EXTENSION_COMMERCETOOLS_CLIENT_ID,
    clientSecret: configuration.EXTENSION_COMMERCETOOLS_CLIENT_SECRET,
    hostUrl: configuration.EXTENSION_COMMERCETOOLS_HOST_URL,
    projectKey: configuration.EXTENSION_COMMERCETOOLS_PROJECT_KEY,
  } as ClientConfig;
};*/

export const getConfig = (project: Project, engine: string, locale: string | null): ClientConfig => {
  if (!project.configuration[engine]) {
    throw `Configuration details are not available for ${engine}`;
  }

  return {
    authUrl: project.configuration?.[engine].authUrl,
    clientId: project.configuration?.[engine].clientId,
    clientSecret: project.configuration?.[engine].clientSecret,
    hostUrl: project.configuration?.[engine].hostUrl,
    projectKey: project.configuration?.[engine].projectKey,
  } as ClientConfig;
};