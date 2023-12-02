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
  const { isLoading, data, page, setPage, errorMessage } = usePaginatedFetch(
    "/dict/search",
    {
      searchString,
    }
  );
  return (
    <div className="flex flex-col gap-4 mt-4">
      {(data.length as Number) === 0 ? (
        <div className=" max-w-md">
          <WarningAlert message={`No search results for \"${searchString}\"`} />
        </div>
      ) : (
        <div className=" max-w-md">
          <InfoAlert
            message={`${data.length} results found for \"${searchString}\"`}
          />
        </div>
      )}
      {data.map((wordEntry, index) => {
        return <WordEntryListElement wordEntry={wordEntry} key={index} />;
      })}
    </div>
  );
}
