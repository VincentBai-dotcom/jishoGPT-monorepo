"use client";

import { useSearchParams } from "next/navigation";
import SuccessToastMessage from "./SuccessToastMessage";
import FailtureToastMessage from "./FailureToastMessage";

export default function ToastMessageWraper({
  params,
}: {
  params: [
    {
      searchParam: string;
      successMessage?: string;
      failureMessage?: string;
    }
  ];
}) {
  const searchParams = useSearchParams();
  return (
    <div className="toast">
      {params.map(({ searchParam, successMessage, failureMessage }, index) => {
        return (
          <div key={index}>
            <SuccessToastMessage
              message={
                searchParams.get(searchParam) === "true"
                  ? successMessage
                  : undefined
              }
              key={index}
            />
            <FailtureToastMessage
              message={
                searchParams.get(searchParam) === "false"
                  ? failureMessage
                  : undefined
              }
              key={index}
            />
          </div>
        );
      })}
    </div>
  );
}
