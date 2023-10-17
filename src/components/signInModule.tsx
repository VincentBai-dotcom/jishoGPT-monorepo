"use client";
import { useState } from "react";

export default function SignInModule({ dict }: { dict: { signIn: string } }) {
  const [showModal, setShowModal] = useState(false);

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
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click on ✕ button to close</p>
        </div>
      </dialog>
    </>
  );
}
