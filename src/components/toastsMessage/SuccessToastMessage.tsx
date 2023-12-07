import { useState } from "react";

export default function SuccessToastMessage({ message }: { message?: String }) {
  const [showToastMessage, setShowToastMessage] = useState(
    message !== undefined
  );

  return (
    <>
      {showToastMessage ? (
        <div className="alert alert-success shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{message}</span>
          <button
            className="btn btn-sm btn-success"
            onClick={() => setShowToastMessage(false)}
          >
            ✕
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
