"use client";

import { notFound } from "next/navigation";
import { IWordEntry } from "../../../models/WordEntry";
import WordEntryListElement from "./WordEntryListElement";
import WarningAlert from "../alerts/WarningAlert";
import InfoAlert from "../alerts/InfoAlert";
import { useSearchParams } from "next/navigation";
import { useFetch } from "@/lib/hooks/useFetch";
import { useRouter } from "next/navigation";
import { createQueryString } from "@/lib/createQueryString";

export default function WordSearchResults({
  searchString,
}: {
  searchString: string;
}) {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "0")
    ? parseInt(searchParams.get("page") || "0")
    : 0;
  const pageSize = 7;
  const { isLoading, data, errorMessage } = useFetch(
    "/dict/search",
    JSON.stringify({
      searchString,
      page,
      pageSize,
    })
  );
  const searchResults = isLoading || errorMessage ? [] : data[0]["data"];
  const totalEntries =
    isLoading || errorMessage || data[0]["metaData"].length === 0
      ? 0
      : data[0]["metaData"][0]["total"];
  const totalPage = Math.ceil(totalEntries / pageSize);
  const router = useRouter();
  const setPage = (newPage: number) => {
    router.push(
      `/dict/search/${searchString}?` +
        createQueryString([{ name: "page", value: newPage.toString() }])
    );
  };

  return (
    <div>
      {isLoading ? (
        <div
          className="flex flex-col gap-4 w-full"
          style={{ marginTop: "1rem" }}
        >
          <div className="skeleton h-8 w-2/12"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 mt-4">
          {errorMessage ? (
            <div className=" max-w-md">
              <WarningAlert message={errorMessage} />
            </div>
          ) : totalEntries === 0 ? (
            <div className=" max-w-md">
              <WarningAlert
                message={`No search results for \"${searchString}\"`}
              />
            </div>
          ) : (
            <div className=" max-w-md">
              <InfoAlert
                message={`${totalEntries} results found for \"${searchString}\"`}
              />
            </div>
          )}
          {searchResults.map((wordEntry: IWordEntry, index: number) => {
            return <WordEntryListElement wordEntry={wordEntry} key={index} />;
          })}
          <div className="join mt-4 ml-auto">
            <button
              className={`join-item btn ${page === 0 ? "btn-disabled" : ""}`}
              onClick={() => setPage(page - 1)}
            >
              «
            </button>
            <select className="join-item btn" value={page}>
              {[...Array(totalPage).keys()].map((num, index) => {
                return (
                  <option key={index} value={num}>
                    Page {num + 1}
                  </option>
                );
              })}
            </select>
            <button
              className={`join-item btn ${
                page + 1 >= totalPage ? "btn-disabled" : ""
              }`}
              onClick={() => setPage(page + 1)}
            >
              »
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
