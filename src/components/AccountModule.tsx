"use client";
import { useRouter } from "next/navigation";
import { FaCircleUser } from "react-icons/fa6";

export default function AccountModule() {
  const router = useRouter();

  const handleLogOut = async (formData: FormData) => {
    router.refresh();
  };

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
            <form action={handleLogOut}>
              <button type="submit">Log Out</button>
            </form>
          </li>
        </ul>
      </div>
    </>
  );
}
