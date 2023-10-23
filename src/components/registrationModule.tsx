"use client";
import { useState, useRef } from "react";
import TextInputBox, { getTextInputBoxOnChange } from "./textInputBox";
import PasswordInputBox from "./passwordInputBox";
import React from "react";

export default function RegistrationModule({
  dict,
  lang,
}: {
  dict: {
    username: string;
    email: string;
    password: string;
    languagePreference: string;
    signUp: string;
    nextStep: string;
    back: string;
  };
  lang: string;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const onClose = () => {
    setEmail("");
    setPassword("");
    setUsername("");
  };

  const page1 = (
    <div className="flex flex-col gap-3">
      <label className="font-bold">{dict.email}</label>
      <TextInputBox
        value={email}
        onChange={getTextInputBoxOnChange(setEmail)}
      />

      <label className="font-bold">{dict.username}</label>

      <TextInputBox
        value={username}
        onChange={getTextInputBoxOnChange(setUsername)}
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
            username !== "" && email !== "" ? "" : "btn-disabled"
          }`}
        >
          {dict.signUp}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <button
        className="btn mx-1"
        onClick={() => {
          (
            document.getElementById("registrationModal") as HTMLDialogElement
          )?.showModal();
        }}
      >
        {dict.signUp}
      </button>

      <dialog
        className="modal backdrop-blur-md backdrop-brightness-50"
        id="registrationModal"
        onClose={onClose}
      >
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          {page1}
        </div>

        {/* Make sure clicking somewhere outside of the modal will close it */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
