import React from "react";

export default function TextInputBox({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      type="text"
      className="input input-bordered input-primary w-full max-w-xs"
      onChange={onChange}
      value={value}
    />
  );
}
