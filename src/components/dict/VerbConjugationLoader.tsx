"use client";

import { IWordEntry } from "../../../models/WordEntry";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { useGeneratedContentLoader } from "@/lib/hooks/useGeneratedContentLoader";
import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import { useEffect, useState } from "react";

export default function VerbConjugationLoader({
  wordEntry,
}: {
  wordEntry: IWordEntry;
}) {
  const [conjugationTableHTML, setConjugationTableHTML] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const conjugationLoader = useGeneratedContentLoader<"conjugation">(
    wordEntry.conjugation,
    "conjugation",
    wordEntry._id
  );

  useEffect(() => {
    setConjugationTableHTML(conjugationLoader.errorMessage);
    const markdownToHTML = async () => {
      try {
        setIsLoading(true);
        if (conjugationLoader.content) {
          const result = await remark()
            .use(remarkGfm)
            .use(remarkRehype)
            .use(rehypeStringify)
            .process(conjugationLoader.content);
          setConjugationTableHTML(result.toString());
        }
      } catch (err) {
        setConjugationTableHTML("Generation failed :(");
      } finally {
        setIsLoading(false);
      }
    };
    markdownToHTML();
  }, [
    conjugationLoader.content,
    conjugationLoader.errorMessage,
    conjugationTableHTML,
  ]);

  return (
    <div>
      <h3>Conjugations</h3>
      {conjugationLoader.isLoading || isLoading ? (
        <div
          className="flex flex-col gap-4 w-full"
          style={{ marginTop: "1rem" }}
        >
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      ) : (
        <div className="flex flex-col">
          <div
            dangerouslySetInnerHTML={{
              __html: conjugationTableHTML,
            }}
          />
          <button
            className="btn btn-sm btn-primary ml-auto"
            onClick={() => conjugationLoader.reloadContent()}
          >
            <FaArrowRotateLeft />
            Regenerate
          </button>
        </div>
      )}
    </div>
  );
}
