import { useState, useCallback } from 'react';

const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, dataFn) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method || 'GET',
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      let data;
      const contentType = response.headers.get('Content-Type') || '';
      const isJson = contentType?.includes('application/json');
      if (isJson) {
        data = await response.json();
      } else {
        data = await response.text();
      }
      dataFn(data);
    } catch (error) {
      setError(error.message || 'Something went wrong');
    }
    setIsLoading(false);
  }, []);

  return { isLoading, error, sendRequest };
};

export default useFetch;
