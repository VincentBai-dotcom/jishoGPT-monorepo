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
  const MessagesLoader = () => {
    const searchParams = useSearchParams();

    return params.map(
      ({ searchParam, successMessage, failureMessage }, index) => {
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
      }
    );
  };
  return (
    <div className="toast">
      <MessagesLoader />{" "}
    </div>
  );
}
