"use client";

import { useTransition } from "react";
import { logout } from "@/app/actions/auth";

export default function LogoutButton() {
  const [pending, startTransition] = useTransition();

  function handleClick() {
    if (!confirm("ต้องการออกจากระบบหรือไม่?")) return;
    startTransition(() => {
      logout();
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {pending ? "กำลังออกจากระบบ..." : "ออกจากระบบ"}
    </button>
  );
}
