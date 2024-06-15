"use client";
import React, { useRef, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const searchTypes = ["All", "Word", "Kanji"] as const;

type SearchType = (typeof searchTypes)[number];

export default function SearchBar() {
  const [searchString, setSearchString] = useState("");
  const [selectedSearchType, setSelectedSearchType] =
    useState<SearchType>("All");

  const UListRef = useRef<HTMLUListElement>(null);

  const { data: session, status } = useSession();

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "unauthenticated") {
      (
        document.getElementById("registrationModal") as HTMLDialogElement
      )?.showModal();
    } else if (searchString !== "") {
      router.replace(`/dict/search/${searchString}`);
    }
  };

  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
  };

  const getSearchTypesDropDown = () => {
    return searchTypes.map((searchType, index) => {
      return (
        <li key={index}>
          <a
            className={searchType == selectedSearchType ? "active" : ""}
            onClick={() => {
              setSelectedSearchType(searchType);
              UListRef.current?.blur();
            }}
          >
            {searchType}
          </a>
        </li>
      );
    });
  };

  return (
    <div className="flex relative navbar bg-base-300 rounded-box w-full gap-2 shadow-2xl">
      <div className="dropdown dropdown-bottom">
        <label tabIndex={0} className="btn btn-neutral rounded-btn">
          {selectedSearchType}
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          ref={UListRef}
        >
          {getSearchTypesDropDown()}
        </ul>
      </div>
      <form className="w-full" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="English, Japanese, or Kanji"
          className="input input-bordered input-neutral w-full"
          value={searchString}
          onChange={onchange}
        />
        <button className="absolute right-7" type="submit">
          <FaMagnifyingGlass />
        </button>
      </form>
    </div>
  );
}
