"use client";

import { useSearchParams } from "next/navigation";
import SuccessToastMessage from "./SuccessToastMessage";

export default function SuccessToastMessageWraper({
  params,
}: {
  params: [
    {
      searchParam: string;
      message: string;
    }
  ];
}) {
  const searchParams = useSearchParams();
  return (
    <div className="toast">
      {params.map(({ searchParam, message }, index) => {
        return (
          <SuccessToastMessage
            message={
              searchParams.get(searchParam) === "true" ? message : undefined
            }
            key={index}
          />
        );
      })}
    </div>
  );
}
