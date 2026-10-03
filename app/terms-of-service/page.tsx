import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';

export const metadata: Metadata = {
  title: 'Terms of Service | Evalixa AI',
  description: 'Terms of Service for using Evalixa AI website, portal, services, and public content.',
  openGraph: {
    title: 'Terms of Service | Evalixa AI',
    description: 'Terms of Service for using Evalixa AI website, portal, services, and public content.',
  },
};

export default function TermsOfServicePage() {
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
              Terms of Service
            </h1>
            <p className="font-mono text-xs text-neutral-400 mb-6">
              Last updated: August 28, 2026
            </p>
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-normal">
              These Terms of Service govern your use of the Evalixa AI website, portal, forms, public content,
              assistant features, and related online services.
            </p>
          </header>

          <article className="space-y-10 text-neutral-300 font-sans leading-relaxed text-sm sm:text-base">
            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-display font-semibold text-white tracking-tight">
                1. Acceptance of terms
              </h2>
              <p>
                By accessing or using Evalixa AI websites, portals, forms, or assistant features, you agree to these
                Terms of Service. If you use our services on behalf of an organization, you confirm that you have
                authority to accept these terms for that organization.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-display font-semibold text-white tracking-tight">
                2. Other agreements
              </h2>
              <p>
                Client projects, paid services, contributor work, employer workflows, internships, certificates, and
                other formal engagements may be governed by separate written agreements, statements of work, project
                records, or portal notices. If those documents conflict with these terms, the more specific written
                agreement controls for that engagement.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-display font-semibold text-white tracking-tight">
                3. Use of the website and portal
              </h2>
              <p>You agree that you will not:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-neutral-400">
                <li>Use the website, portal, forms, or assistant for unlawful or unauthorized purposes.</li>
                <li>Try to bypass authentication, access controls, rate limits, or security systems.</li>
                <li>Upload malware, spam, abusive content, illegal material, or content you do not have permission to share.</li>
                <li>Scrape, copy, harvest, or reuse website, portal, contributor, client, or contact data without written permission.</li>
                <li>Impersonate another person, company, client, contributor, employer, or Evalixa representative.</li>
                <li>Interfere with the availability, performance, or integrity of our systems.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-display font-semibold text-white tracking-tight">
                4. Accounts
              </h2>
              <p>
                If you create or receive an account, you are responsible for keeping your credentials secure and for
                all activity under your account. You must provide accurate information and notify us if you believe
                your account has been compromised.
              </p>
              <p>
                We may suspend, restrict, or terminate access if we believe there is misuse, security risk, account
                compromise, inactivity, legal risk, or a breach of these terms.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-display font-semibold text-white tracking-tight">
                5. Services and public information
              </h2>
              <p>
                Website content, service descriptions, articles, case studies, and assistant responses are provided
                for general information. They are not a guarantee, certification, legal advice, security assurance, or
                final professional opinion for your specific system.
              </p>
              <p className="text-neutral-400">
                AI evaluation, benchmarking, red-team findings, monitoring outputs, and security testing describe
                observed behavior under defined conditions. They do not guarantee that a system has no defects,
                vulnerabilities, or future regressions.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-display font-semibold text-white tracking-tight">
                6. Intellectual property
              </h2>
              <p>
                Evalixa AI owns or licenses the website, software, design, text, graphics, logos, brand assets,
                service descriptions, templates, reports, and other materials made available through the website or
                portal unless a written agreement says otherwise.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-display font-semibold text-white tracking-tight">
                7. Privacy and cookies
              </h2>
              <p>
                Our handling of personal information is described in our{' '}
                <Link href="/privacy-policy" className="text-white underline hover:text-neutral-300">
                  Privacy Policy
                </Link>
                . Our use of cookies and similar technologies is described in our{' '}
                <Link href="/cookie-policy" className="text-white underline hover:text-neutral-300">
                  Cookie Policy
                </Link>
                .
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-display font-semibold text-white tracking-tight">
                8. Disclaimers & Limitation of liability
              </h2>
              <p>
                The website, portal, and public content are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis.
                To the maximum extent permitted by law, Evalixa AI will not be liable for indirect, incidental, special,
                or consequential damages.
              </p>
            </section>

            <section className="space-y-3 border-t border-neutral-800 pt-8">
              <h2 className="text-lg sm:text-xl font-display font-semibold text-white tracking-tight">
                9. Contact
              </h2>
              <p>
                For questions about these terms, contact us at{' '}
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
