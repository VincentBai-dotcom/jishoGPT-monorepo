"use client";
import { useState } from "react";
import TextInputBox, { getTextInputBoxOnChange } from "./textInputBox";
import PasswordInputBox from "./passwordInputBox";
import React from "react";

export default function SignInModule() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onClose = () => {
    setEmail("");
    setPassword("");
  };

  async function onSubmit() {
    alert("Submitted");
  }

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
        Sign In
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
            <label className="font-bold">Email</label>
            <TextInputBox
              value={email}
              onChange={getTextInputBoxOnChange(setEmail)}
            />

            <label className="font-bold">Password</label>

            <PasswordInputBox
              value={password}
              onChange={getTextInputBoxOnChange(setPassword)}
            />

            {/* Make sure sign in button is disablled when either of the fields are not filled */}
            <form className="ml-auto" action={onSubmit}>
              <button
                className={`btn btn-primary ${
                  email !== "" && password !== "" ? "" : "btn-disabled"
                }`}
                type="submit"
              >
                Sign In
              </button>
            </form>
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
