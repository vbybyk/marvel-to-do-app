import { useState, useCallback } from "react";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [process, setProcess] = useState('waiting');  // !! State-Machine

  const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type':'application/json'}) => {

      setLoading(true);
      setProcess('loading');  // !! State-Machine

      try {
        const response = await fetch(url, {method, body, headers});

        if (!response.ok){
          throw console.log(`Couldn't get fetch ${url} Status: ${response.status}`)
        }

        const data = await response.json();
        
        setLoading(false)
        return data;
      
      } catch(e) {

        setLoading(false);
        console.log('error')
        setError(true);
        setProcess('error');  // !! State-Machine
        throw e;
      }
  }, [])

  const clearError = useCallback(() => {
    setError(null);
    setProcess('error')  // !! State-Machine
  }, []);

  return {loading, request, error, clearError, process, setProcess}
}