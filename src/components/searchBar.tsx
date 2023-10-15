"use client";

import { useState } from "react";

export default function SearchBar() {
  const [searchWord, setSearchWord] = useState("");

  function handleSubmit() {
    alert("submitted");
  }

  function onchange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchWord(e.target.value);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search your word"
          className="input input-bordered w-full max-w-xs"
          value={searchWord}
          onChange={onchange}
        />
        <input type="submit" value={"Submit"}></input>
      </form>
    </div>
  );
}
