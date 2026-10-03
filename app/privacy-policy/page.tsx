import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';

export const metadata: Metadata = {
  title: 'Privacy Policy | Evalixa AI',
  description: 'Privacy Policy for Evalixa AI website, services, portal, and communications.',
  openGraph: {
    title: 'Privacy Policy | Evalixa AI',
    description: 'Privacy Policy for Evalixa AI website, services, portal, and communications.',
  },
};

export default function PrivacyPolicyPage() {
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
              Privacy Policy
            </h1>
            <p className="font-mono text-xs text-neutral-400 mb-6">
              Last updated: August 28, 2026
            </p>
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-normal">
              This Privacy Policy explains how Evalixa AI collects, uses, shares, and protects personal information
              when you use our website, contact forms, portal, services, and related communications.
            </p>
          </header>

          <article className="space-y-10 text-neutral-300 font-sans leading-relaxed text-sm sm:text-base">
            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-display font-semibold text-white tracking-tight">
                1. Information we collect
              </h2>
              <p>We may collect the following types of information:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-neutral-400">
                <li>Contact details such as name, email address, phone number, company, and message content.</li>
                <li>Account and portal information such as login email, role, profile details, applications, projects, and submissions.</li>
                <li>Career and contributor information such as resume, skills, portfolio links, work history, and onboarding details.</li>
                <li>Technical data such as IP address, browser type, device type, pages visited, referrer, and security logs.</li>
                <li>Messages and feedback submitted through our assistants or interactive contact forms.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-display font-semibold text-white tracking-tight">
                2. How we use information
              </h2>
              <p>We use personal information to:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-neutral-400">
                <li>Respond to inquiries and communicate with you.</li>
                <li>Operate the website, portal, accounts, forms, and support workflows.</li>
                <li>Review applications, contributor eligibility, and project participation.</li>
                <li>Deliver AI evaluation, model security, benchmarking, monitoring, and expert review services.</li>
                <li>Improve website performance, content, services, and user experience.</li>
                <li>Detect abuse, protect accounts, prevent unauthorized access, and maintain security.</li>
                <li>Meet legal, tax, accounting, contractual, and compliance obligations.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-display font-semibold text-white tracking-tight">
                3. Cookies and analytics
              </h2>
              <p>
                We use cookies and similar technologies for essential site functions, preferences, analytics, and
                limited measurement. More details are available in our{' '}
                <Link href="/cookie-policy" className="text-white underline hover:text-neutral-300">
                  Cookie Policy
                </Link>
                .
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-display font-semibold text-white tracking-tight">
                4. Sharing information
              </h2>
              <p>We do not sell personal information. We may share information with:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-neutral-400">
                <li>Service providers for hosting, email, analytics, security, storage, communication, and operations.</li>
                <li>Clients, employers, contributors, or project participants where needed for approved project workflows.</li>
                <li>Professional advisers, auditors, payment, tax, and compliance providers.</li>
                <li>Authorities or regulators where required by law or necessary to protect rights, safety, and security.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-display font-semibold text-white tracking-tight">
                5. AI assistant use
              </h2>
              <p>
                If you use AI-assisted features or conversational contact tools, we may process your messages, page context, feedback,
                and session details to answer questions, route inquiries, improve quality, and protect against misuse.
              </p>
              <p className="text-neutral-400 text-sm">
                Do not submit passwords, secrets, confidential client data, payment card data, or sensitive personal
                information through public website chat unless Evalixa provides an approved secure channel.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-display font-semibold text-white tracking-tight">
                6. Data retention
              </h2>
              <p>
                We keep personal information only as long as reasonably needed for the purpose collected, unless a
                longer period is required for legal, contractual, security, tax, accounting, dispute, or audit reasons.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-display font-semibold text-white tracking-tight">
                7. Security
              </h2>
              <p>
                We use reasonable technical and organizational safeguards, including access controls, authentication,
                secure transport, provider review, and limited internal access. No internet system is completely secure.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-display font-semibold text-white tracking-tight">
                8. Your choices and rights
              </h2>
              <p>
                Depending on your location, you may request access, correction, deletion, restriction, objection, or
                withdrawal of consent. We may need to verify your identity before acting on a request.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-display font-semibold text-white tracking-tight">
                9. Third-party links
              </h2>
              <p>
                Our website may link to third-party websites or services. Their privacy practices are governed by their
                own policies.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg sm:text-xl font-display font-semibold text-white tracking-tight">
                10. Changes to this policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. The latest version will be posted on this page
                with the updated date.
              </p>
            </section>

            <section className="space-y-3 border-t border-neutral-800 pt-8">
              <h2 className="text-lg sm:text-xl font-display font-semibold text-white tracking-tight">
                11. Contact
              </h2>
              <p>
                For privacy questions or requests, contact us at{' '}
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
