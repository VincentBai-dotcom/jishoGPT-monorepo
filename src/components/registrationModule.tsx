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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);

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

      {/* Make sure sign in button is disablled when either of the fields are not filled */}
      <div className="ml-auto">
        <button
          className={`btn btn-primary ${
            username !== "" && email !== "" ? "" : "btn-disabled"
          }`}
          onClick={() => {
            setPage(page + 1);
          }}
        >
          {dict.nextStep}
        </button>
      </div>
    </div>
  );

  const page2 = (
    <div className="flex flex-col gap-3">
      <label className="font-bold">{dict.email}</label>
      <PasswordInputBox
        value={password}
        onChange={getTextInputBoxOnChange(setPassword)}
      />

      <label className="font-bold">{dict.password}</label>

      {/* Make sure sign in button is disablled when either of the fields are not filled */}
      <div className="ml-auto">
        <button className="btn btn-primary" onClick={() => setPage(page - 1)}>
          {dict.back}
        </button>
        <button
          className={`btn btn-primary ${password !== "" ? "" : "btn-disabled"}`}
        >
          {dict.signUp}
        </button>
      </div>
    </div>
  );

  const pages = [page1, page2];

  const renderModal = (isOpen: boolean) => {
    if (isOpen) {
      return (
        <dialog
          className="modal backdrop-blur-md backdrop-brightness-50"
          open={isModalOpen}
        >
          <div className="modal-box">
            <form
              method="dialog"
              onClick={() => {
                setIsModalOpen(false);
              }}
            >
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>

            {pages[page]}
          </div>

          {/* Make sure clicking somewhere outside of the modal will close it */}
          <form
            method="dialog"
            className="modal-backdrop"
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            <button>close</button>
          </form>
        </dialog>
      );
    }

    return;
  };

  return (
    <>
      <button
        className="btn mx-1"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        {dict.signUp}
      </button>
      {renderModal(isModalOpen)}
    </>
  );
}
