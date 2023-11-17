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
      className="input input-primary input-bordered w-full"
      onChange={onChange}
      value={value}
    />
  );
}

export const getTextInputBoxOnChange = (
  setState: React.Dispatch<React.SetStateAction<string>>
) => {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };
};
