import type { Metadata } from "next";
import Link from "next/link";

const TITLE = "Privacy Policy | Joshua Lopez";
const DESCRIPTION =
  "Learn how Joshua Lopez and Got Mortgage Solutions collect, use, disclose, and protect personal information.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: "/privacy-policy",
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const headingClasses =
  "mt-12 scroll-mt-28 text-2xl font-bold tracking-tight text-blue-950 sm:text-3xl";
const paragraphClasses = "mt-4 text-base leading-7 text-slate-700";
const listClasses =
  "mt-4 list-disc space-y-2 pl-6 text-base leading-7 text-slate-700 marker:text-blue-700";

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white">
      <section className="border-b border-blue-100 bg-blue-50">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-800">
            Legal
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-blue-950 sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-base font-semibold text-slate-700">
            Effective Date: August 18, 2026
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <p className="text-base leading-7 text-slate-700">
          This Privacy Policy explains how Joshua Lopez and Got Mortgage
          Solutions, a dba of Limestone Investments, Inc. (&ldquo;Got Mortgage
          Solutions,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
          &ldquo;our&rdquo;), collect, use, disclose, and protect personal
          information obtained through joshualopezloans.com, our online forms,
          advertisements, telephone calls, text messages, emails, and related
          mortgage and home-equity inquiries.
        </p>
        <p className={paragraphClasses}>
          Joshua Lopez is a California mortgage loan originator, NMLS #2230624.
          Mortgage services are provided through Got Mortgage Solutions, a dba
          of Limestone Investments, Inc., NMLS #2448495.
        </p>

        <h2 className={headingClasses}>Information We Collect</h2>
        <p className={paragraphClasses}>
          Depending on how you interact with us, we may collect the following
          categories of information:
        </p>
        <ul className={listClasses}>
          <li>
            <strong className="text-slate-900">Contact information:</strong>{" "}
            Your name, telephone number, email address, mailing address, and
            preferred method of contact.
          </li>
          <li>
            <strong className="text-slate-900">Property information:</strong>{" "}
            Property address, estimated property value, mortgage balance,
            occupancy status, property type, and information concerning your
            home equity or financing needs.
          </li>
          <li>
            <strong className="text-slate-900">
              Financial and mortgage information:
            </strong>{" "}
            Information you voluntarily provide concerning income, employment,
            assets, debts, credit profile, desired loan amount, or mortgage
            goals.
          </li>
          <li>
            <strong className="text-slate-900">Inquiry information:</strong>{" "}
            The service or loan product you are interested in, questions you
            submit, appointment information, and records of our communications
            with you.
          </li>
          <li>
            <strong className="text-slate-900">
              Internet and device information:
            </strong>{" "}
            IP address, browser type, device type, operating system, referring
            website, pages visited, approximate location derived from an IP
            address, and interactions with the website.
          </li>
          <li>
            <strong className="text-slate-900">
              Advertising and analytics information:
            </strong>{" "}
            Information concerning how you found our website or advertisement
            and how you interact with our website, forms, or marketing
            campaigns.
          </li>
          <li>
            <strong className="text-slate-900">
              Communication information:
            </strong>{" "}
            Emails, text messages, telephone-call information, form
            submissions, and your communication preferences.
          </li>
        </ul>
        <p className={paragraphClasses}>
          Please do not submit Social Security numbers, banking credentials, or
          other highly sensitive financial documents through a general website
          contact form. If sensitive documentation is needed for a mortgage
          application, we will provide an appropriate secure method for
          submitting it.
        </p>

        <h2 className={headingClasses}>How We Collect Information</h2>
        <p className={paragraphClasses}>We may collect personal information:</p>
        <ul className={listClasses}>
          <li>
            Directly from you when you complete a website form, respond to an
            advertisement, call, text, email, or otherwise communicate with us.
          </li>
          <li>
            Automatically through website analytics, cookies, and similar
            technologies.
          </li>
          <li>
            From advertising platforms when you respond to one of our
            advertisements or lead forms.
          </li>
          <li>
            From service providers that support our website, communications,
            customer relationship management, or mortgage-inquiry process.
          </li>
          <li>
            From publicly available property records or other sources when
            permitted by law.
          </li>
        </ul>

        <h2 className={headingClasses}>How We Use Personal Information</h2>
        <p className={paragraphClasses}>We may use personal information to:</p>
        <ul className={listClasses}>
          <li>
            Respond to your mortgage, home-equity, real estate, or general
            inquiry.
          </li>
          <li>
            Contact you by telephone, text message, or email when you have
            requested information or provided appropriate consent.
          </li>
          <li>Evaluate your stated mortgage or home-equity needs.</li>
          <li>Schedule consultations and provide requested information.</li>
          <li>Maintain records of inquiries and communications.</li>
          <li>Operate, maintain, secure, and improve the website.</li>
          <li>Measure website traffic and advertising performance.</li>
          <li>
            Detect fraud, misuse, security incidents, or unlawful activity.
          </li>
          <li>
            Comply with mortgage-industry recordkeeping requirements, legal
            obligations, regulatory requests, court orders, or lawful
            government demands.
          </li>
          <li>Establish, exercise, or defend legal rights.</li>
        </ul>
        <p className={paragraphClasses}>
          Submitting an inquiry does not constitute a mortgage application,
          approval, loan commitment, or guarantee of financing.
        </p>

        <h2 className={headingClasses}>How We Disclose Personal Information</h2>
        <p className={paragraphClasses}>
          We may disclose personal information to:
        </p>
        <ul className={listClasses}>
          <li>
            Got Mortgage Solutions and personnel involved in responding to or
            processing your inquiry.
          </li>
          <li>
            Mortgage lenders, settlement-service providers, or other parties
            when you request or authorize us to proceed with a mortgage
            transaction.
          </li>
          <li>
            Website-hosting, analytics, communications,
            customer-relationship-management, advertising, and technical
            service providers that perform services on our behalf.
          </li>
          <li>
            Professional advisers, auditors, compliance providers, attorneys,
            or regulators.
          </li>
          <li>
            Government agencies, courts, law-enforcement authorities, or other
            parties when disclosure is required or permitted by law.
          </li>
          <li>
            A successor or affiliated organization in connection with a
            merger, acquisition, restructuring, or transfer of business assets,
            subject to applicable law.
          </li>
        </ul>
        <p className={paragraphClasses}>
          Service providers are permitted to use information only as necessary
          to provide their services or as otherwise permitted by law.
        </p>

        <h2 className={headingClasses}>Sale and Sharing of Personal Information</h2>
        <p className={paragraphClasses}>
          We do not sell personal information for money.
        </p>
        <p className={paragraphClasses}>
          We do not knowingly sell or share personal information for
          cross-context behavioral advertising as those terms are defined under
          the California Consumer Privacy Act.
        </p>
        <p className={paragraphClasses}>
          We may use service providers for website analytics and advertising
          measurement. These providers may receive limited internet or device
          information to perform services on our behalf. If our practices
          change in a way that constitutes selling or sharing under California
          law, we will update this Policy and provide any legally required
          opt-out method.
        </p>

        <h2 className={headingClasses}>Cookies and Analytics</h2>
        <p className={paragraphClasses}>
          The website may use cookies, analytics tools, and similar technologies
          to understand website traffic, identify technical problems, measure
          advertising performance, and improve the user experience.
        </p>
        <p className={paragraphClasses}>
          Browser settings may allow you to block or delete cookies. Disabling
          cookies may affect some website functionality.
        </p>
        <p className={paragraphClasses}>
          Where legally required and technically supported, we will recognize
          applicable browser-based opt-out preference signals, such as Global
          Privacy Control.
        </p>

        <h2 className={headingClasses}>Telephone Calls and Text Messages</h2>
        <p className={paragraphClasses}>
          When you separately provide consent to receive calls or text messages,
          Joshua Lopez and Got Mortgage Solutions may contact you at the
          telephone number you provided regarding your mortgage, home-equity,
          or related inquiry.
        </p>
        <p className={paragraphClasses}>
          Messages may be sent using automated technology. Message frequency
          varies. Message and data rates may apply. Consent to receive automated
          marketing calls or text messages is not a condition of purchasing any
          property, goods, or services.
        </p>
        <p className={paragraphClasses}>
          Reply <strong className="text-slate-900">STOP</strong> to a text
          message to opt out of further text messages. Reply{" "}
          <strong className="text-slate-900">HELP</strong> for assistance. You
          may also request that we stop contacting you by calling{" "}
          <a
            href="tel:+13237629786"
            className="font-semibold text-blue-800 underline decoration-blue-300 underline-offset-2 hover:text-blue-950"
          >
            323-762-9786
          </a>
          .
        </p>
        <p className={paragraphClasses}>
          After an opt-out request, you may receive a final message confirming
          that your request has been processed. Opting out of marketing messages
          does not prevent communications that are legally required or
          necessary to service an existing transaction.
        </p>
        <p className={paragraphClasses}>
          Mobile information and text-message consent will not be sold or shared
          with third parties for their independent marketing purposes. We may
          disclose information to communications providers that help us deliver
          messages and operate the messaging program.
        </p>
        <p className={paragraphClasses}>
          Wireless carriers are not responsible for delayed or undelivered
          messages.
        </p>

        <h2 className={headingClasses}>Email Communications</h2>
        <p className={paragraphClasses}>
          You may ask us to stop sending marketing emails by using an
          unsubscribe method included in the email, when available, or by
          contacting us. We may continue sending nonmarketing communications
          concerning an active inquiry or transaction when permitted by law.
        </p>

        <h2 className={headingClasses}>Data Retention</h2>
        <p className={paragraphClasses}>
          We retain personal information only for as long as reasonably
          necessary to respond to inquiries, provide requested services,
          maintain business and compliance records, resolve disputes, enforce
          agreements, and satisfy legal or regulatory requirements.
        </p>
        <p className={paragraphClasses}>
          The applicable retention period depends on the type of information,
          the nature of the relationship, mortgage-industry recordkeeping
          requirements, and legal obligations. When information is no longer
          reasonably needed, we may delete, de-identify, or securely dispose of
          it.
        </p>

        <h2 className={headingClasses}>Data Security</h2>
        <p className={paragraphClasses}>
          We use reasonable administrative, technical, and organizational
          safeguards intended to protect personal information. However, no
          website, electronic transmission, or storage system can be guaranteed
          to be completely secure.
        </p>
        <p className={paragraphClasses}>
          Do not send Social Security numbers, bank statements, tax returns,
          identification documents, or account credentials through an unsecured
          website form, email, or text message.
        </p>

        <h2 className={headingClasses}>California Privacy Rights</h2>
        <p className={paragraphClasses}>
          Subject to applicable law and any relevant exemptions, California
          residents may have the right to:
        </p>
        <ul className={listClasses}>
          <li>
            Know the categories and specific pieces of personal information
            collected about them.
          </li>
          <li>
            Know the categories of sources, purposes for collection, and
            categories of recipients.
          </li>
          <li>Request deletion of personal information.</li>
          <li>Request correction of inaccurate personal information.</li>
          <li>Opt out of the sale or sharing of personal information.</li>
          <li>
            Limit certain uses or disclosures of sensitive personal
            information.
          </li>
          <li>
            Receive equal service and not be discriminated against for
            exercising privacy rights.
          </li>
        </ul>
        <p className={paragraphClasses}>
          We do not sell personal information or use sensitive personal
          information to infer characteristics about consumers.
        </p>
        <p className={paragraphClasses}>
          Certain information collected or processed in connection with
          mortgage and financial services may be governed by federal
          financial-privacy laws, including the Gramm-Leach-Bliley Act, and may
          be exempt from some California Consumer Privacy Act requirements.
        </p>
        <p className={paragraphClasses}>
          To submit a privacy request, call{" "}
          <a
            href="tel:+13237629786"
            className="font-semibold text-blue-800 underline decoration-blue-300 underline-offset-2 hover:text-blue-950"
          >
            323-762-9786
          </a>{" "}
          or use the contact form at:
        </p>
        <p className={paragraphClasses}>
          <strong>
            <Link
              href="/contact"
              className="text-blue-800 underline decoration-blue-300 underline-offset-2 hover:text-blue-950"
            >
              https://www.joshualopezloans.com/contact
            </Link>
          </strong>
        </p>
        <p className={paragraphClasses}>
          We may need to verify your identity before completing a request.
          Verification may require matching information you provide with
          information already maintained in our records. We will use
          verification information only to process the request.
        </p>
        <p className={paragraphClasses}>
          An authorized agent may submit a request on your behalf when permitted
          by California law. We may require proof of the agent&rsquo;s authority
          and verification of your identity.
        </p>

        <h2 className={headingClasses}>Children&rsquo;s Privacy</h2>
        <p className={paragraphClasses}>
          The website is intended for adults seeking mortgage, real estate, or
          related services. It is not directed to children under 13, and we do
          not knowingly collect personal information from children under 13.
        </p>
        <p className={paragraphClasses}>
          If we learn that we collected personal information from a child under
          13, we will take reasonable steps to delete it.
        </p>

        <h2 className={headingClasses}>Third-Party Websites and Services</h2>
        <p className={paragraphClasses}>
          The website may contain links to lender portals, property-search
          services, social-media platforms, or other third-party websites.
          Their privacy practices are governed by their own policies. We are not
          responsible for the privacy or security practices of third-party
          websites.
        </p>

        <h2 className={headingClasses}>Changes to This Policy</h2>
        <p className={paragraphClasses}>
          We may update this Privacy Policy to reflect changes in our services,
          technology, data practices, or legal obligations. The updated version
          will be posted on this page with a revised effective date.
        </p>

        <h2 className={headingClasses}>Contact Us</h2>
        <p className={paragraphClasses}>
          For questions, privacy requests, or communication opt-out requests,
          contact:
        </p>
        <address className="mt-4 not-italic text-base leading-7 text-slate-700">
          <strong className="block text-slate-900">
            Joshua Lopez, NMLS #2230624
          </strong>
          <strong className="block text-slate-900">
            Got Mortgage Solutions, a dba of Limestone Investments, Inc., NMLS
            #2448495
          </strong>
          <strong className="block text-slate-900">
            Phone:{" "}
            <a
              href="tel:+13237629786"
              className="text-blue-800 underline decoration-blue-300 underline-offset-2 hover:text-blue-950"
            >
              323-762-9786
            </a>
          </strong>
          <strong className="block text-slate-900">
            Website:{" "}
            <Link
              href="/contact"
              className="break-words text-blue-800 underline decoration-blue-300 underline-offset-2 hover:text-blue-950"
            >
              https://www.joshualopezloans.com/contact
            </Link>
          </strong>
        </address>
      </article>
    </div>
  );
}
