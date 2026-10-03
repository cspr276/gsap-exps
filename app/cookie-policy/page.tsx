import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';

export const metadata: Metadata = {
  title: 'Cookie Policy | Evalixa AI',
  description: 'Cookie Policy for Evalixa AI website, portal, analytics, preferences, and similar technologies.',
  openGraph: {
    title: 'Cookie Policy | Evalixa AI',
    description: 'Cookie Policy for Evalixa AI website, portal, analytics, preferences, and similar technologies.',
  },
};

const cookieRows = [
  ['Essential', 'Required for security, login, consent state, forms, and core website operation.', 'Always active'],
  ['Functional', 'Remembers choices such as theme, interface state, and session preferences.', 'Preference based'],
  ['Analytics', 'Helps us understand traffic, popular pages, performance, and aggregate usage.', 'Optional where consent is required'],
  ['Marketing', 'Helps measure campaigns and conversion activity where enabled.', 'Optional where consent is required'],
];

export default function CookiePolicyPage() {
  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-[#09090b] text-neutral-300 selection:bg-neutral-800 selection:text-white">
        <Navbar />

        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <header className="mb-12 border-b border-neutral-800 pb-8">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold block mb-2">
              Legal & Compliance
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
              Cookie Policy
            </h1>
            <p className="font-mono text-xs text-neutral-400 mb-6">
              Last updated: August 28, 2026
            </p>
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-normal">
              This Cookie Policy explains how Evalixa AI uses cookies, local storage, pixels, tags, and similar
              technologies on our website, portal, and related web experiences.
            </p>
          </header>

          <article className="space-y-10 text-neutral-300 font-sans leading-relaxed text-sm sm:text-base">
            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-display font-semibold text-white tracking-tight">
                1. What cookies are
              </h2>
              <p>
                Cookies are small files placed on your browser or device by a website. Similar technologies include
                local storage, session storage, pixels, tags, and scripts that store or read information from your
                browser.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-display font-semibold text-white tracking-tight">
                2. Why we use cookies
              </h2>
              <p>We use cookies and similar technologies to:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-neutral-400">
                <li>Keep the website, forms, portal, and security features working.</li>
                <li>Remember choices such as consent, theme, and interface preferences.</li>
                <li>Understand how visitors use the website and improve performance.</li>
                <li>Measure campaigns and conversion activity where marketing tools are enabled.</li>
                <li>Detect abuse, protect accounts, and maintain reliable service.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-lg sm:text-xl font-display font-semibold text-white tracking-tight">
                3. Types of cookies we use
              </h2>
              <div className="overflow-x-auto rounded-lg border border-neutral-800 bg-neutral-900/50">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-neutral-800 bg-neutral-900 text-xs font-mono uppercase text-neutral-400">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Category</th>
                      <th className="px-4 py-3 font-semibold">Purpose</th>
                      <th className="px-4 py-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800 font-normal">
                    {cookieRows.map(([category, purpose, status]) => (
                      <tr key={category} className="hover:bg-neutral-800/30">
                        <td className="px-4 py-3 font-semibold text-white whitespace-nowrap">{category}</td>
                        <td className="px-4 py-3 text-neutral-300">{purpose}</td>
                        <td className="px-4 py-3 text-neutral-400 font-mono text-xs whitespace-nowrap">{status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-display font-semibold text-white tracking-tight">
                4. Third-party cookies
              </h2>
              <p>
                Some cookies or similar technologies may be provided by third parties, such as analytics, hosting,
                security, or communication providers. Their own privacy and cookie policies may also apply.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-display font-semibold text-white tracking-tight">
                5. Managing cookies
              </h2>
              <p>
                You can manage cookies through browser settings. Most browsers let you delete cookies, block
                third-party cookies, block cookies from specific sites, or clear cookies when the browser closes.
              </p>
              <p className="text-neutral-400 text-sm">
                Blocking cookies may affect login, preferences, analytics accuracy, and some portal or website functionality.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-display font-semibold text-white tracking-tight">
                6. Updates to this policy
              </h2>
              <p>
                We may update this Cookie Policy as our website, providers, analytics tools, or legal requirements
                change. The latest version will be posted on this page.
              </p>
            </section>

            <section className="space-y-3 border-t border-neutral-800 pt-8">
              <h2 className="text-lg sm:text-xl font-display font-semibold text-white tracking-tight">
                7. Contact
              </h2>
              <p>
                For cookie or privacy questions, contact us at{' '}
                <a href="mailto:hello@evalixa.com" className="text-white underline hover:text-neutral-300">
                  hello@evalixa.com
                </a>
                .
              </p>
              <p className="text-neutral-400 text-sm">
                Evalixa AI Ltd., Uppal, Hyderabad, Telangana 500039, India.
              </p>
            </section>
          </article>
        </div>

        <Footer />
      </main>
    </SmoothScroll>
  );
}
