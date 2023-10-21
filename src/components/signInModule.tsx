"use client";
import { useState, useRef } from "react";
import TextInputBox from "./textInputBox";
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
      <button className="btn" onClick={() => signInModal.current?.showModal()}>
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
          <div className="h-80">
            <h1 className="">{dict.email}</h1>
            <TextInputBox
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
              }}
            />

            <h1 className="">{dict.password}</h1>

            <TextInputBox
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
              }}
            />
            <div className="">
              <button className="btn btn-primary">{dict.signIn}</button>
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
