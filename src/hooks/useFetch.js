import axios from "axios";
import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [fetchError, setFetchError] = useState();
  const [fetchLoading, setFetchLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetchLoading(true);
        const response = await axios.get(url);
        setData(response.data);
        setFetchLoading(false);
      } catch (error) {
        setFetchError(error);
        throw error;
      }
    };
    fetchData();
  }, [url]);
  return { data, fetchError, fetchLoading };
};
