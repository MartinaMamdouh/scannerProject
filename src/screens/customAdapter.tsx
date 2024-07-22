// customAdapter.js
import RNFetchBlob from 'rn-fetch-blob';

const customAdapter = (config) => {
  return new Promise((resolve, reject) => {
    const method = config.method.toUpperCase();
    const headers = config.headers;
    let url = config.url;
    const data = config.data;

    const options = {
      method,
      headers,
      body: data,
    };
      // Ensure the URL is complete by adding the baseURL if necessary
      if (config.baseURL && !url.startsWith('http')) {
        url = config.baseURL + url;
      }

    
    if (!url) {
        reject(new Error("URL is missing in the request configuration."));
        return;
      }
       // Ensure HTTP/1.1 is used by setting the appropriate header
    // headers['Connection'] = 'close';

    console.log("Custom Adapter Config:", config);
    console.log("Method:", method);
    console.log("URL:", url);
    console.log("Headers:", headers);
    console.log("Data:", data);
    
    RNFetchBlob.config({
        trusty: true,
      })
    .fetch(method, url, headers, data)
      .then((res) => {
        resolve({
          data: res.data,
          status: res.info().status,
          statusText: res.info().status,
          headers: res.info().headers,
          config,
          request: {
            responseURL: res.info().respType,
          },
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default customAdapter;