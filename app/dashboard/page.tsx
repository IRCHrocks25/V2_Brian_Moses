import Link from "next/link";
import { getSession } from "@/lib/auth";
import DashboardGreeting from "@/components/dashboard/DashboardGreeting";
import DashboardHistory from "@/components/dashboard/DashboardHistory";
import { Icons } from "@/components/dashboard/icons";

export default async function DashboardPage() {
  const session = await getSession();
  const name = session?.role === "admin" ? "Admin" : session?.email?.split("@")[0] || "there";

  return (
    <div className="w-full max-w-none">
      {/* Greeting & Header */}
      <div className="mb-8 md:mb-10 pl-4 md:pl-6 border-l-4 border-emerald-500/60 dark:border-emerald-400/50">
        <DashboardGreeting name={name} />
        <h1 className="mt-4 text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">Dashboard</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400 text-base">Manage your website content, images, CTAs, and testimonials.</p>
      </div>

      {/* What you can edit - quick links */}
      <div className="mb-12 p-6 md:p-8 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] shadow-sm dark:shadow-none">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
          <span className="text-emerald-500/80"><Icons.Clipboard /></span>
          Everything you can edit
        </h2>
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/dashboard/content"
            className="group block p-6 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.06] hover:border-emerald-500/30 hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform [&_svg]:w-6 [&_svg]:h-6">
              <span className="text-emerald-500"><Icons.FileEdit /></span>
            </div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1">Content</h3>
            <p className="text-slate-500 dark:text-white/50 text-sm leading-relaxed">
              Headlines, body copy, section text, hero backgrounds & images, story, outcomes, FAQs, quote section, and more.
            </p>
            <span className="mt-2 inline-block text-sm text-emerald-400 group-hover:underline">Edit content →</span>
          </Link>

          <Link
            href="/dashboard/ctas"
            className="group block p-6 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.06] hover:border-blue-500/30 hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform [&_svg]:w-6 [&_svg]:h-6">
              <span className="text-blue-500"><Icons.Cursor /></span>
            </div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1">CTAs</h3>
            <p className="text-slate-500 dark:text-white/50 text-sm leading-relaxed">
              Call-to-action buttons across the site — hero, navbar, footer, floating buttons, cards, and section CTAs.
            </p>
            <span className="mt-2 inline-block text-sm text-blue-400 group-hover:underline">Manage CTAs →</span>
          </Link>

          <Link
            href="/dashboard/testimonials"
            className="group block p-6 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.06] hover:border-amber-500/30 hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform [&_svg]:w-6 [&_svg]:h-6">
              <span className="text-amber-500"><Icons.Quote /></span>
            </div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1">Testimonials</h3>
            <p className="text-slate-500 dark:text-white/50 text-sm leading-relaxed">
              Client quotes, photos, and bios — edit, add, or upload new images.
            </p>
            <span className="mt-2 inline-block text-sm text-amber-400 group-hover:underline">Manage testimonials →</span>
          </Link>

          <Link
            href="/dashboard/social"
            className="group block p-6 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.06] hover:border-rose-500/30 hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500/20 to-pink-500/20 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform [&_svg]:w-6 [&_svg]:h-6">
              <span className="text-rose-500"><Icons.Link /></span>
            </div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1">Social & Contact</h3>
            <p className="text-slate-500 dark:text-white/50 text-sm leading-relaxed">
              Social media links & icons, email, phone, and footer branding — everything in the site footer.
            </p>
            <span className="mt-2 inline-block text-sm text-rose-400 group-hover:underline">Edit social links →</span>
          </Link>
        </div>
      </div>

      {/* History of changes */}
      <DashboardHistory />
    </div>
  );
}
