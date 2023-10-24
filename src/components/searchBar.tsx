"use client";

import { useRef, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

const searchTypes = ["All", "Word", "Kanji"] as const;

type SearchType = (typeof searchTypes)[number];

export default function SearchBar() {
  const [searchContent, setSearchContent] = useState("");
  const [selectedSearchType, setSelectedSearchType] =
    useState<SearchType>("All");

  const dropdownContentRef = useRef<HTMLDetailsElement>(null);

  const handleSubmit = () => {
    alert("submitted");
  };

  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchContent(e.target.value);
  };

  const getSearchTypesDropDown = () => {
    return searchTypes.map((searchType, index) => {
      return (
        <li key={index}>
          <a
            className={searchType == selectedSearchType ? "active" : ""}
            onClick={() => {
              setSelectedSearchType(searchType);
              dropdownContentRef.current?.removeAttribute("open");
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
      <details className="dropdown dropdown-bottom" ref={dropdownContentRef}>
        <summary className="btn btn-neutral rounded-btn">
          {selectedSearchType}
        </summary>
        <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
          {getSearchTypesDropDown()}
        </ul>
      </details>
      <form className="w-full" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="English, Japanese, or Kanji"
          className="input input-bordered input-neutral w-full"
          value={searchContent}
          onChange={onchange}
        />
        <button className="absolute right-7" type="submit">
          <FaMagnifyingGlass />
        </button>
      </form>
    </div>
  );
}
