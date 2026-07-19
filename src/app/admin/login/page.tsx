import { brand } from "@/config/brand";
import LoginForm from "@/components/admin/LoginForm";

export const metadata = {
  title: `Admin login — ${brand.businessName}`,
};

export default function AdminLoginPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-violet">
          {brand.businessName}
        </p>
        <h1 className="mt-3 text-center font-display text-3xl text-paper">
          Booking Dashboard
        </h1>
        <p className="mt-2 text-center text-sm text-mute">
          Sign in to manage your bookings.
        </p>

        <div className="mt-8 rounded-3xl border border-border bg-surface/60 p-6 shadow-2xl shadow-black/30 sm:p-8">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
