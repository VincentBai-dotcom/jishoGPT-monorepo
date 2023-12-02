import { useEffect, useState } from "react";
export function useFetch(url: string, body: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_API_PATH + url, {
          method: "POST",
          body: body,
        });
        const res_json = await res.json();
        setData(res_json);
      } catch (err) {
        setErrorMessage("Fetch Failed");
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [body, url]);

  return { isLoading, data, errorMessage };
}
