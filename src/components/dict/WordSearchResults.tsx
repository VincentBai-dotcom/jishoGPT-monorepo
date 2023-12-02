"use client";

import { notFound } from "next/navigation";
import { IWordEntry } from "../../../models/WordEntry";
import WordEntryListElement from "./WordEntryListElement";
import WarningAlert from "../alerts/WarningAlert";
import InfoAlert from "../alerts/InfoAlert";
import { usePaginatedFetch } from "@/lib/hooks/usePaginatedFetch";

export default function WordSearchResults({
  searchString,
}: {
  searchString: string;
}) {
  const { isLoading, data, page, setPage, errorMessage, totalEntries } =
    usePaginatedFetch(
      "/dict/search",
      JSON.stringify({
        searchString,
      })
    );
  const totalPage = Math.ceil(totalEntries / 10);
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
          {data.map((wordEntry, index) => {
            return <WordEntryListElement wordEntry={wordEntry} key={index} />;
          })}
          <div className="join">
            <button
              className={`join-item btn ${page === 0 ? "btn-disabled" : ""}`}
              onClick={() => setPage(page - 1)}
            >
              «
            </button>
            <button className="join-item btn">Page {page + 1}</button>
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
