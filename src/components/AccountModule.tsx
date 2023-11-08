"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaCircleUser } from "react-icons/fa6";

export default function AccountModule() {
  const router = useRouter();

  return (
    <>
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn mx-1">
          <FaCircleUser />
          Account
        </label>
        <ul
          tabIndex={0}
          className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4"
        >
          <li>
            <button
              onClick={() => {
                signOut();
                router.refresh();
              }}
            >
              Log Out
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
