"use client";

import { useEffect, useState } from "react";

export default function Page({ params }: { params: { wordID: number } }) {
  const [isDescriptionLoading, setIsDescriptionLoading] = useState(true);
  const [description, setDescription] = useState("");

  useEffect();

  return (
    <article className="prose lg:prose-xl">
      <h1></h1>
    </article>
  );
}
