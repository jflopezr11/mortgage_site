import type { Metadata } from "next";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { localizedAlternates, localizedPath } from "@/lib/i18n/config";

const TITLE = "Privacy Policy | Joshua Lopez";
const DESCRIPTION =
  "Learn how Joshua Lopez and Got Mortgage Solutions collect, use, disclose, and protect personal information.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: localizedAlternates("privacy", "en"),
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: "/privacy-policy",
    locale: "en_US",
    alternateLocale: "es_US",
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

export function PrivacyPolicyContent({ locale }: { locale: Locale }) {
  if (locale === "es") return <SpanishPrivacyPolicy />;
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

function SpanishPrivacyPolicy() {
  return (
    <div className="bg-white">
      <section className="border-b border-blue-100 bg-blue-50">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-800">Legal</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-blue-950 sm:text-5xl">Política de privacidad</h1>
          <p className="mt-4 text-base font-semibold text-slate-700">Fecha de entrada en vigor: 18 de agosto de 2026</p>
        </div>
      </section>
      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <p className="text-base leading-7 text-slate-700">Esta Política de privacidad explica cómo Joshua Lopez y Got Mortgage Solutions, nombre comercial de Limestone Investments, Inc. (“Got Mortgage Solutions”, “nosotros” o “nuestro”), recopilan, usan, divulgan y protegen la información personal obtenida por medio de joshualopezloans.com, formularios en línea, anuncios, llamadas, mensajes de texto, correos electrónicos y consultas hipotecarias o relacionadas con el valor acumulado de una vivienda.</p>
        <p className={paragraphClasses}>Joshua Lopez es originador de préstamos hipotecarios en California, NMLS #2230624. Los servicios hipotecarios se ofrecen por medio de Got Mortgage Solutions, nombre comercial de Limestone Investments, Inc., NMLS #2448495.</p>

        <SpanishSection title="Información que recopilamos" paragraphs={["Según la manera en que interactúe con nosotros, podemos recopilar las siguientes categorías de información:"]} items={["Información de contacto, como nombre, teléfono, correo electrónico, dirección postal y método de contacto preferido.", "Información de la propiedad, como dirección, valor estimado, saldo hipotecario, ocupación y tipo de propiedad.", "Información sobre la consulta, como sus metas de compra, refinanciamiento o valor acumulado, plazo, tipo de préstamo y monto solicitado.", "Información financiera preliminar que usted decida proporcionar, como ingresos, empleo, puntaje crediticio estimado, deudas, pago inicial y saldo hipotecario.", "Información técnica y de uso, como dirección IP, navegador, dispositivo, páginas visitadas, fuente de referencia e interacción con anuncios.", "Preferencias de comunicación y registros de consentimiento, incluidos fecha, hora, URL de origen y versión del aviso de consentimiento.", "Contenido de comunicaciones, incluidos formularios, correos, mensajes de texto y datos de llamadas."]} />
        <p className={paragraphClasses}>No proporcione números de Seguro Social, cuentas bancarias, tarjetas, contraseñas ni otros datos financieros confidenciales mediante formularios generales del sitio. Si se necesita esa información para una solicitud, se solicitará mediante un portal seguro autorizado.</p>

        <SpanishSection title="Cómo recopilamos la información" paragraphs={["Podemos recopilar información:"]} items={["Directamente de usted cuando completa un formulario, llama, envía un mensaje o correo, agenda una consulta o inicia una solicitud.", "Automáticamente mediante cookies, registros del servidor, herramientas analíticas y tecnologías similares.", "De proveedores que alojan o procesan formularios, comunicaciones, análisis, publicidad o solicitudes hipotecarias.", "De fuentes públicas, profesionales o de referencia permitidas por la ley.", "De plataformas publicitarias cuando responde a uno de nuestros anuncios."]} />
        <SpanishSection title="Cómo usamos la información personal" paragraphs={["Podemos usar la información personal para:"]} items={["Responder a su consulta y comunicarnos por teléfono, mensaje de texto o correo electrónico.", "Evaluar de forma preliminar las necesidades hipotecarias, de compra, venta o valor acumulado que usted indicó.", "Programar consultas y proporcionar la información solicitada.", "Mantener registros de consultas, comunicaciones y consentimiento.", "Operar, mantener, proteger y mejorar el sitio web.", "Medir el tráfico, las conversiones y el rendimiento publicitario.", "Cumplir obligaciones legales, regulatorias, de licencia, auditoría y conservación de registros.", "Prevenir fraude, abuso, amenazas de seguridad u otras actividades prohibidas.", "Establecer, ejercer o defender derechos legales."]} />
        <p className={paragraphClasses}>La información enviada en un formulario general no constituye una solicitud de crédito completa, aprobación, compromiso de préstamo ni asesoría legal o tributaria.</p>

        <SpanishSection title="Cómo divulgamos la información personal" paragraphs={["Podemos divulgar información personal a:"]} items={["Got Mortgage Solutions, Limestone Investments, Inc. y personal o contratistas autorizados que apoyan su consulta.", "Proveedores que ofrecen alojamiento, formularios, CRM, correo electrónico, telefonía, mensajes de texto, análisis, publicidad, seguridad o portales de solicitud.", "Prestamistas, mayoristas, procesadores, agentes de escrow, compañías de título, tasadores u otros participantes cuando usted solicita continuar con una operación.", "Asesores profesionales, auditores, aseguradoras y representantes legales.", "Autoridades gubernamentales, reguladores o terceros cuando la ley lo exija o para proteger derechos y seguridad.", "Una entidad sucesora en relación con una fusión, reorganización, transferencia o venta comercial permitida."]} />
        <p className={paragraphClasses}>Los proveedores solo deben usar la información para prestar los servicios contratados o según lo permita la ley.</p>

        <SpanishSection title="Venta e intercambio de información personal" paragraphs={["No vendemos información personal a cambio de dinero. Algunas herramientas de análisis o publicidad pueden considerarse “intercambio” o publicidad conductual entre contextos bajo ciertas leyes de privacidad de California.", "Cuando corresponda, puede solicitar excluirse de ese intercambio o publicidad. También puede usar las señales de preferencia compatibles con su navegador. No usamos conscientemente información personal sensible para inferir características ni vendemos o intercambiamos conscientemente información de menores de 16 años."]} />
        <SpanishSection title="Cookies y análisis" paragraphs={["El sitio puede usar cookies y tecnologías similares para funciones esenciales, seguridad, medición de tráfico, análisis y atribución publicitaria. Puede limitar cookies desde su navegador, aunque algunas funciones podrían no operar correctamente.", "Podemos usar proveedores como Google Analytics o servicios equivalentes. Esos proveedores pueden recopilar información técnica conforme a sus propias políticas."]} />

        <SpanishSection title="Llamadas telefónicas y mensajes de texto" paragraphs={["Si proporciona un número de teléfono y da su consentimiento, Joshua Lopez y Got Mortgage Solutions pueden comunicarse con usted sobre su consulta hipotecaria o de vivienda mediante llamadas y mensajes de texto, incluso con tecnología automatizada o voz artificial o pregrabada cuando el aviso de consentimiento así lo indique.", "La frecuencia de los mensajes varía y pueden aplicarse tarifas de mensajes y datos. El consentimiento no es una condición para comprar propiedades, bienes o servicios.", "Para dejar de recibir mensajes de texto, responda STOP. Para obtener ayuda, responda HELP o llame al 323-762-9786. Una solicitud de exclusión puede tardar un tiempo razonable en procesarse; aún podremos enviar mensajes no promocionales permitidos o exigidos por la ley."]} />
        <p className={paragraphClasses}>Mantendremos registros razonables del consentimiento y de las solicitudes de exclusión, incluidos la fecha, hora, fuente, idioma y versión del aviso cuando estén disponibles.</p>
        <SpanishSection title="Comunicaciones por correo electrónico" paragraphs={["Puede cancelar correos promocionales mediante el enlace de cancelación incluido en el mensaje o contactándonos. Aun así, podremos enviar comunicaciones operativas o relacionadas con una solicitud cuando la ley lo permita."]} />
        <SpanishSection title="Conservación de datos" paragraphs={["Conservamos la información durante el tiempo razonablemente necesario para responder a consultas, prestar servicios, mantener registros comerciales y de consentimiento, cumplir obligaciones legales y resolver disputas. El período depende del tipo de información y del motivo por el que fue recopilada.", "Cuando la información ya no sea necesaria, procuraremos eliminarla, anonimizarla o almacenarla de forma segura conforme a nuestras prácticas de conservación."]} />
        <SpanishSection title="Seguridad de los datos" paragraphs={["Usamos medidas administrativas, técnicas y físicas razonables para proteger la información. Ningún sistema de transmisión o almacenamiento es completamente seguro, por lo que no podemos garantizar seguridad absoluta.", "Use únicamente los portales seguros indicados para entregar información confidencial de una solicitud hipotecaria."]} />

        <SpanishSection title="Derechos de privacidad en California" paragraphs={["Según la ley aplicable y sujeto a excepciones, los residentes de California pueden tener derecho a:"]} items={["Saber qué categorías y datos personales específicos se recopilaron, usaron o divulgaron.", "Solicitar acceso o una copia de la información personal.", "Solicitar la eliminación de información personal.", "Solicitar la corrección de información inexacta.", "Excluirse de la venta o el intercambio de información personal.", "Limitar ciertos usos de información personal sensible, cuando corresponda.", "No recibir trato discriminatorio por ejercer derechos de privacidad."]} />
        <p className={paragraphClasses}>Para presentar una solicitud, llame al 323-762-9786 o use nuestro <Link href={localizedPath("es", "/contact")} className="font-semibold text-blue-800 underline decoration-blue-300 underline-offset-2 hover:text-blue-950">formulario de contacto</Link>. Podemos solicitar información razonable para verificar su identidad y autoridad. También puede designar a un agente autorizado conforme a la ley.</p>
        <p className={paragraphClasses}>Podemos rechazar o limitar una solicitud cuando una excepción legal lo permita. Si denegamos una solicitud, explicaremos el motivo y las opciones disponibles, si corresponde.</p>
        <SpanishSection title="Privacidad de menores" paragraphs={["El sitio y los servicios no están dirigidos a menores de 18 años. No recopilamos conscientemente información personal de menores de 13 años. Si cree que un menor proporcionó información, comuníquese con nosotros para que podamos revisarla y eliminarla cuando corresponda."]} />
        <SpanishSection title="Sitios y servicios de terceros" paragraphs={["El sitio puede enlazar a portales hipotecarios, plataformas de propiedades u otros servicios de terceros. Sus prácticas de privacidad se rigen por sus propias políticas. Revise esas políticas antes de proporcionar información."]} />
        <SpanishSection title="Cambios a esta política" paragraphs={["Podemos actualizar esta Política de privacidad por cambios en nuestros servicios, tecnología, prácticas de datos u obligaciones legales. Publicaremos la versión actualizada en esta página con una fecha de entrada en vigor revisada."]} />

        <h2 className={headingClasses}>Contáctenos</h2>
        <p className={paragraphClasses}>Para preguntas, solicitudes de privacidad o solicitudes de exclusión de comunicaciones, contacte a:</p>
        <address className="mt-4 not-italic text-base leading-7 text-slate-700"><strong className="block text-slate-900">Joshua Lopez, NMLS #2230624</strong><strong className="block text-slate-900">Got Mortgage Solutions, nombre comercial de Limestone Investments, Inc., NMLS #2448495</strong><strong className="block text-slate-900">Teléfono: <a href="tel:+13237629786" className="text-blue-800 underline decoration-blue-300 underline-offset-2 hover:text-blue-950">323-762-9786</a></strong><strong className="block text-slate-900">Sitio web: <Link href="/es/contact" className="break-words text-blue-800 underline decoration-blue-300 underline-offset-2 hover:text-blue-950">https://www.joshualopezloans.com/es/contact</Link></strong></address>
      </article>
    </div>
  );
}

function SpanishSection({ title, paragraphs = [], items }: { title: string; paragraphs?: string[]; items?: string[] }) {
  return <><h2 className={headingClasses}>{title}</h2>{paragraphs.map((paragraph) => <p key={paragraph} className={paragraphClasses}>{paragraph}</p>)}{items && <ul className={listClasses}>{items.map((item) => <li key={item}>{item}</li>)}</ul>}</>;
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyContent locale="en" />;
}
