"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-wide text-mute transition-colors hover:border-danger hover:text-danger"
    >
      Sign out
    </button>
  );
}
