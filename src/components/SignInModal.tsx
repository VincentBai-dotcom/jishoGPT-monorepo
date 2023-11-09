"use client";
import { useState } from "react";
import PasswordInputBox from "./PasswordInputBox";
import TextInputBox, { getTextInputBoxOnChange } from "./TextInputBox";
import React from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignInModal() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const onClose = () => {
    setEmailOrUsername("");
    setPassword("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const signInResponse = await signIn("credentials", {
        emailOrUsername,
        password,
        redirect: false,
      });
      if (signInResponse?.error) {
        console.log(signInResponse.error);
      }
      console.log(signInResponse?.status);
      router.refresh();
    } catch (err) {
      console.log(err);
    }
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
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <label className="font-bold">Email or Username</label>
            <TextInputBox
              value={emailOrUsername}
              onChange={getTextInputBoxOnChange(setEmailOrUsername)}
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
                  emailOrUsername !== "" && password !== ""
                    ? ""
                    : "btn-disabled"
                }`}
                type={
                  emailOrUsername !== "" && password !== ""
                    ? "submit"
                    : "button"
                }
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