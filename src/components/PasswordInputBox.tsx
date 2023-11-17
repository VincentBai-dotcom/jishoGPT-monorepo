import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

export default function PasswordInputBox({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex relative">
      <input
        type={showPassword ? "text" : "password"}
        className="input input-primary input-bordered w-full"
        onChange={onChange}
        value={value}
      />
      <label className="swap swap-rotate absolute right-3 top-4">
        {/* this hidden checkbox controls the state */}
        <input type="checkbox" />

        {/* sun icon */}
        <div
          className="swap-on fill-current w-6 h-6 "
          onClick={() => setShowPassword(true)}
        >
          <FaEyeSlash />
        </div>

        <div
          className="swap-off fill-current w-6 h-6 "
          onClick={() => setShowPassword(false)}
        >
          <FaEye />
        </div>
      </label>
    </div>
  );
}
