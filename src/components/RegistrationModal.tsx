"use client";
import { useState, useRef } from "react";
import TextInputBox, { getTextInputBoxOnChange } from "./TextInputBox";
import PasswordInputBox from "./PasswordInputBox";
import React from "react";

export default function RegistrationModal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const onClose = () => {
    setEmail("");
    setPassword("");
    setUsername("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_PATH + "/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        }
      );

      console.log(res.status);
      const resbody = await res.json();
      console.log(resbody);
    } catch (err) {
      console.log(err);
    }
  };

  const page1 = (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <label className="font-bold">Email</label>
      <TextInputBox
        value={email}
        onChange={getTextInputBoxOnChange(setEmail)}
      />

      <label className="font-bold">Username</label>

      <TextInputBox
        value={username}
        onChange={getTextInputBoxOnChange(setUsername)}
      />
      <label className="font-bold">Password</label>
      <PasswordInputBox
        value={password}
        onChange={getTextInputBoxOnChange(setPassword)}
      />

      {/* Make sure sign in button is disablled when either onpf the fields are not filled */}
      <div className="ml-auto">
        <button
          className={`btn btn-primary ${
            username !== "" && email !== "" && password !== ""
              ? ""
              : "btn-disabled"
          }`}
          type={
            username !== "" && email !== "" && password !== ""
              ? "submit"
              : "button"
          }
        >
          Sign Up
        </button>
      </div>
    </form>
  );

  return (
    <>
      <button
        className="btn btn-primary mx-1"
        onClick={() => {
          (
            document.getElementById("registrationModal") as HTMLDialogElement
          )?.showModal();
        }}
      >
        Sign Up
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
