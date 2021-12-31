import React from "react";
import useFetch from "use-http";

export const useGenericAPI = (url, def = []) => {
  const { get, response } = useFetch(url);
  const [data, setData] = React.useState(def);
  const loadData = React.useCallback(async () => {
    const resp = await get();
    if (response.ok) {
      setData(resp);
    }
  }, [get, response]);
  React.useEffect(() => {
    loadData();
  }, [loadData]);
  return [data, setData, response];
};
