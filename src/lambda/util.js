import fetch from 'node-fetch';

export const makeRequest = async url => {
  try {
    const res = await fetch(url)
      .then(res => res.json())
      .catch(err => {
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
