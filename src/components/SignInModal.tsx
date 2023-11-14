"use client";
import { useState } from "react";
import PasswordInputBox from "./PasswordInputBox";
import TextInputBox, { getTextInputBoxOnChange } from "./TextInputBox";
import React from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import ErrorAlert from "./alerts/ErrorAlert";

export default function SignInModal() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onClose = () => {
    setEmailOrUsername("");
    setPassword("");
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const signInResponse = await signIn("credentials", {
        emailOrUsername,
        password,
        redirect: false,
      });
      if (signInResponse?.error) {
        setError("Credentials incorrect.");
      } else {
        router.refresh();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
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
            {error && (
              <div className="mt-2">
                <ErrorAlert message={error} />
              </div>
            )}
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
                className={`btn btn-primary btn-wide ${
                  emailOrUsername !== "" && password !== ""
                    ? ""
                    : "btn-disabled"
                }`}
                type={
                  emailOrUsername !== "" && password !== "" && !loading
                    ? "submit"
                    : "button"
                }
              >
                {loading ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : (
                  "Sign In"
                )}
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
