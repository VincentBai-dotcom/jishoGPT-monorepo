"use client";
import { useState, useRef, useCallback } from "react";
import TextInputBox, { getTextInputBoxOnChange } from "./textInputBox";
import PasswordInputBox from "./passwordInputBox";
import React from "react";

export default function SignInModule({
  dict,
}: {
  dict: { signIn: string; email: string; password: string };
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signInModal = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        className="btn"
        onClick={() => {
          signInModal.current?.showModal();
          setEmail("");
          setPassword("");
        }}
      >
        {dict.signIn}
      </button>
      <dialog
        ref={signInModal}
        className="modal backdrop-blur-md backdrop-brightness-50"
      >
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="flex flex-col gap-3">
            <label className="font-bold">{dict.email}</label>
            <TextInputBox
              value={email}
              onChange={getTextInputBoxOnChange(setEmail)}
            />

            <label className="font-bold">{dict.password}</label>

            <PasswordInputBox
              value={password}
              onChange={getTextInputBoxOnChange(setPassword)}
            />

            {/* Make sure sign in button is disablled when either of the fields are not filled */}
            <div className="ml-auto">
              <button
                className={`btn btn-primary ${
                  email !== "" && password !== "" ? "" : "btn-disabled"
                }`}
              >
                {dict.signIn}
              </button>
            </div>
          </div>
        </div>

        {/* Make sure clicking somewhere outside of the modal will close it */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
