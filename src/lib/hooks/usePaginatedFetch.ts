import { useEffect, useState } from "react";
export function usePaginatedFetch(
  url: string,
  body: string,
  initialPage?: number
) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>();
  const [errorMessage, setErrorMessage] = useState("");
  const [page, setPage] = useState(initialPage || 0);

  useEffect(() => {
    const fetchWithPagination = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_API_PATH + url, {
          method: "POST",
          body: JSON.stringify({ ...JSON.parse(body), page: page }),
        });
        const res_json = await res.json();
        setData(res_json);
        // setData(res_json[0]["data"]);
        // setTotalEntries(res_json[0]["metaData"][0]["total"]);
      } catch (err) {
        setErrorMessage("Fetch Failed");
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWithPagination();
  }, [body, page, url]);

  return { isLoading, data, page, setPage, errorMessage };
}
