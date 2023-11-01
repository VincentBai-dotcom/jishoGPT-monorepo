"use client";
import { useState, useRef, useCallback, use } from "react";
import TextInputBox, { getTextInputBoxOnChange } from "./textInputBox";
import PasswordInputBox from "./passwordInputBox";
import React from "react";
import { signIn } from "@/lib/serverFunctions";

export default function SignInModule({
  dict,
}: {
  dict: { signIn: string; email: string; password: string };
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onClose = () => {
    setEmail("");
    setPassword("");
  };

  const onSubmit = async () => {
    const response = await signIn(email, password);
    console.log(response);
  };

  return (
    <>
      <button
        className="btn mx-1"
        onClick={() => {
          (
            document.getElementById("signInModal") as HTMLDialogElement
          )?.showModal();
        }}
      >
        {dict.signIn}
      </button>
      <dialog
        id="signInModal"
        className="modal backdrop-blur-md backdrop-brightness-50"
        onClose={onClose}
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
