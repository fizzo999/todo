import { useState, useEffect } from 'react';
import axios from 'axios';

const useAjax = () => {
  
  const [options, setOptions] = useState({});
  const [response, setResponse] = useState({});
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState({});
  console.log('WE ARE IN AJAX HOOK', response);
  
  useEffect(() => {
    async function ajax() {
      if (!options) {
        console.log('You have NOT specified any request options');
        return};
      setIsLoading(true);
      try {
        const res = await axios(options);
        await setResponse(res.data);
        setIsLoading(false);
      } catch(error) {
        setError(error);
      }
    }
    ajax();
  }, [options]);

  return { setOptions, response, error, isLoading };

};

export default useAjax;
