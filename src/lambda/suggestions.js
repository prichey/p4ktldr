import { makeRequest } from './util';

export async function handler(event) {
  const { queryStringParameters } = event;

  if (!(!!queryStringParameters && 'query' in queryStringParameters)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ msg: 'Invalid request' })
    };
  }

  const { query } = queryStringParameters;

  return makeRequest(`https://pitchfork.com/api/v2/search/_ac/?query=${query}`);
}
