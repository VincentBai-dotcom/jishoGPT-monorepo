"use client";
import { useState } from "react";
import TextInputBox from "./textInputBox";
import React from "react";

export default function SignInModule({
  dict,
}: {
  dict: { signIn: string; email: string; password: string };
}) {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <a className="btn mx-2" onClick={() => setShowModal(true)}>
        {dict.signIn}
      </a>
      <dialog
        id="my_modal_1"
        className="modal backdrop-blur-md backdrop-brightness-50"
        open={showModal}
      >
        <div className="modal-box">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => setShowModal(false)}
          >
            ✕
          </button>
          <div></div>
          <article className="prose">
            <h2 className="my-3">{dict.email}</h2>
            <TextInputBox
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
              }}
            />
            <h2 className="my-3">{dict.password}</h2>
            <TextInputBox
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
              }}
            />
            <div></div>
            <button className="btn btn-primary mt-5">{dict.signIn}</button>
          </article>
        </div>
      </dialog>
    </>
  );
}
