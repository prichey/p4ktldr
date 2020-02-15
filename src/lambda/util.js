import AbortController from 'abort-controller';
import fetch from 'isomorphic-unfetch';

const abortController = new AbortController();

export const makeRequest = async url => {
  try {
    const res = await fetch(url, { signal: abortController.signal })
      .then(res => res.json())
      .catch(err => {
        if (err.name === 'AbortError') return; // expected, suppress
        throw err;
      });

    return {
      statusCode: 200,
      body: JSON.stringify(res)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ err })
    };
  }
};
