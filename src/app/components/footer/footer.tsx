// components/Footer.tsx
import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-pink-200 bg-white">
      {/* Soft gradient background decoration */}
      <div className="pointer-events-none absolute -top-20 left-1/2 h-52 w-96 -translate-x-1/2 rounded-full bg-pink-200/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 pt-14 pb-10">
        {/* Top Section */}
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand + about */}
          <div className="md:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <span className="h-10 w-10 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 shadow-md shadow-pink-200/50" />
              <span className="text-2xl font-semibold tracking-wide text-purple-900">
                Lumière
              </span>
            </div>

            <p className="text-sm leading-relaxed text-gray-600 max-w-md">
              Discover curated fashion that blends modern elegance with everyday
              comfort. New arrivals weekly. Crafted for those who dress with
              intention.
            </p>

            {/* Contact + socials */}
            <div className="grid gap-6 text-sm text-gray-600 sm:grid-cols-2">
              <div className="space-y-1.5">
                <p className="text-xs font-semibold uppercase tracking-wide text-purple-900">
                  Customer Care
                </p>
                <p>
                  Email:{" "}
                  <span className="font-medium text-gray-800">
                    support@lumiere.shop
                  </span>
                </p>
                <p>
                  Phone:{" "}
                  <span className="font-medium text-gray-800">
                    +1 (555) 123-4567
                  </span>
                </p>
                <p className="text-xs text-gray-400">
                  Mon–Fri, 9:00–18:00 (GMT)
                </p>
              </div>

              <div className="space-y-1.5">
                <p className="text-xs font-semibold uppercase tracking-wide text-purple-900">
                  Store & Socials
                </p>
                <p>123 Fashion Avenue, New York</p>
                <p>Instagram • TikTok • Pinterest</p>
                <p className="text-xs text-gray-400">
                  Tag{" "}
                  <span className="font-medium text-purple-700">
                    #LumiereLooks
                  </span>{" "}
                  to get featured.
                </p>
              </div>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold text-purple-900 uppercase tracking-wide">
              Shop
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              {["New In", "Women", "Men", "Accessories"].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="transition-all hover:text-purple-700 hover:underline"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-sm font-semibold text-purple-900 uppercase tracking-wide">
              Help
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              {[
                "Shipping & Returns",
                "FAQs",
                "Size Guide",
                "Contact Us",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="transition-all hover:text-purple-700 hover:underline"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Divider */}
        <div className="mt-12 border-t border-pink-200/60 pt-6 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          {/* Social Icons */}
          <div className="flex items-center gap-3 text-gray-500">
            <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Follow us
            </span>

            <div className="flex gap-4">
              {[instagramIcon, twitterIcon, pinterestIcon].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="transition-all hover:text-purple-700 hover:scale-110"
                  aria-label="Social Icon"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Legal + Payments */}
          <div className="flex flex-col gap-2 text-xs text-gray-500 md:flex-row md:items-center md:gap-4">
            <p>© {year} Lumière. All rights reserved.</p>
            <div className="flex gap-3 flex-wrap items-center">
              <Link href="#" className="hover:text-purple-700 hover:underline">
                Privacy
              </Link>
              <span>•</span>
              <Link href="#" className="hover:text-purple-700 hover:underline">
                Terms
              </Link>
              <span>•</span>
              <span className="text-gray-500">Secure Payments</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* SVG Icons */
function instagramIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <circle cx="17.5" cy="6.5" r="0.9" />
    </svg>
  );
}

function twitterIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.8.6-1.8.8A2.9 2.9 0 0 0 12 7.2v.6A8.3 8.3 0 0 1 3 4s-3 7 4 10.2A8.8 8.8 0 0 1 2 16c7 4 15 0 15-9.2a2.7 2.7 0 0 0 0-.5C18.5 6 20 4 20 4z" />
    </svg>
  );
}

function pinterestIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 21c.3-2 .8-3.5 1.1-5-.5-.9-.8-2-.8-3.2 0-2.8 1.9-4.9 5-4.9 2.4 0 4.1 1.7 4.1 4.2 0 2.8-1.5 4.7-3.6 4.7-0.7 0-1.4-.4-1.6-.9" />
    </svg>
  );
}
