import { makeRequest } from './util';

export async function handler(event, context) {
  const { queryStringParameters } = event;

  if (!(!!queryStringParameters && 'id' in queryStringParameters)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ msg: 'Invalid request' })
    };
  }

  const { id } = queryStringParameters;

  return makeRequest(
    event,
    context,
    `https://pitchfork.com/api/v2/entities/artists/${id}/albumreviews/?size=100&start=0`
  );
}
