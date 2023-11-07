"use client";
import { useState } from "react";
import PasswordInputBox from "./PasswordInputBox";
import TextInputBox, { getTextInputBoxOnChange } from "./TextInputBox";
import React from "react";

export default function SignInModal() {
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
          <form className="flex flex-col gap-3" action={onSubmit}>
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
            <div className="ml-auto">
              <button
                className={`btn btn-primary ${
                  email !== "" && password !== "" ? "" : "btn-disabled"
                }`}
                type={email !== "" && password !== "" ? "submit" : "button"}
              >
                Sign In
              </button>
            </div>
          </form>
        </div>

        {/* Make sure clicking somewhere outside of the modal will close it */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
