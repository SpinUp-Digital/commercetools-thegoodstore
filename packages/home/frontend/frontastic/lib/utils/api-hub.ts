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
