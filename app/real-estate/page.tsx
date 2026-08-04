import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Home, Search } from "lucide-react";

const IDX_SEARCH_URL =
  "https://joshualopez.gotrealestatesolutions.com/index.php?advanced=1&display=&min=400000&max=100000000&beds=0&baths=0&types%5B%5D=1&types%5B%5D=2&types%5B%5D=3&types%5B%5D=5&types%5B%5D=31&statuses%5B%5D=0&minfootage=0&maxfootage=30000&minacres=0&maxacres=0&yearbuilt=0&maxyearbuilt=0&walkscore=0&keywords=&polygons%5B%5D=-120.91003417968751%2C35.39800594715108%2C-116.89453125000001%2C36.81368259124586%2C-114.13696289062501%2C34.29353023058858%2C-114.71374511718751%2C33.445193134508465%2C-114.61486816406251%2C32.67174887226337%2C-117.16918945312501%2C32.54218257955074%2C-120.56945800781251%2C34.46127728843705%2C-120.91003417968751%2C35.39800594715108&sortby=listings.price+ASC&rtype=map";

const TITLE = "California Real Estate Services | Joshua Lopez";
const DESCRIPTION =
  "Buyer and seller guidance from Joshua Lopez, California real estate salesperson, DRE #02436480.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/real-estate",
  },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: "/real-estate",
    images: [{ url: "/pictures/outsideHeadshot.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/pictures/outsideHeadshot.jpg"],
  },
};

const primaryButtonClass =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-blue-900 px-6 py-3 font-bold text-white shadow-sm transition hover:bg-blue-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:ring-offset-2";

const secondaryButtonClass =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-blue-900 bg-white px-6 py-3 text-center font-bold text-blue-900 transition hover:bg-blue-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:ring-offset-2";

const textLinkClass =
  "inline-flex items-center gap-1.5 rounded-sm text-sm font-bold text-blue-900 underline decoration-blue-300 underline-offset-4 transition hover:text-blue-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:ring-offset-2";

const buyerHelpPoints = [
  "Understanding a realistic budget and estimated monthly payment",
  "Preparing financing before serious home shopping begins",
  "Choosing target areas and defining useful property criteria",
  "Reviewing property taxes, homeowners insurance, HOA dues, condition, and possible repairs",
  "Evaluating a property beyond its appearance or listing photos",
  "Preparing an offer that fits both the property and the buyer’s financing",
  "Coordinating inspections, appraisal, mortgage, escrow, deadlines, and closing",
];

const sellerHelpPoints = [
  "Understanding their timing, priorities, and reason for selling",
  "Reviewing the property and competing listings",
  "Developing a pricing strategy based on the property and current competition",
  "Deciding which repairs, improvements, cleaning, or preparation may be worth doing",
  "Presenting and marketing the property clearly",
  "Comparing purchase price, financing, contingencies, timelines, and overall offer strength",
  "Coordinating escrow, disclosures, deadlines, and closing",
  "Planning the next purchase when the seller is also buying another property",
];

const workingTogetherSteps = [
  {
    step: "1",
    title: "Initial Conversation",
    description: "Learn what the client is trying to accomplish.",
  },
  {
    step: "2",
    title: "Build the Plan",
    description:
      "Establish financing, timing, property criteria, or selling priorities.",
  },
  {
    step: "3",
    title: "Execute the Strategy",
    description:
      "For buyers: searching, evaluating properties, and preparing offers. For sellers: preparation, pricing, and marketing.",
  },
  {
    step: "4",
    title: "Move Toward Closing",
    description:
      "Coordinate deadlines, escrow, financing, and the remaining next steps.",
  },
];

export default function RealEstatePage() {
  return (
    <div className="bg-white text-slate-900">
      <section className="border-b border-blue-100 bg-blue-50">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-20">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-800">
              California Real Estate
            </p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-blue-950 sm:text-5xl">
              A Clear Plan for Buying or Selling.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
              I help California buyers and sellers understand the decisions in
              front of them, what comes next, and how the property and
              financing can affect the overall plan.
            </p>
            <p className="mt-5 text-sm font-bold text-blue-950">
              Joshua Lopez <span aria-hidden="true">|</span> DRE #02436480
            </p>
            <Link
              href="/contact?service=real-estate"
              className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-blue-900 px-6 py-3 font-bold text-white shadow-sm transition hover:bg-blue-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:ring-offset-2"
            >
              Talk About Buying or Selling
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl border-8 border-white bg-slate-200 shadow-xl">
            <Image
              src="/pictures/outsideHeadshot.jpg"
              alt="Joshua Lopez, California real estate salesperson"
              fill
              priority
              sizes="(max-width: 1023px) 90vw, 38vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section
        className="border-b border-slate-200 py-14 sm:py-16"
        aria-labelledby="idx-search-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start gap-6 rounded-3xl border border-blue-100 bg-blue-50 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9">
            <div className="max-w-2xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-900">
                <Search className="h-6 w-6" aria-hidden="true" />
              </div>
              <h2
                id="idx-search-heading"
                className="mt-5 text-2xl font-extrabold tracking-tight text-blue-950 sm:text-3xl"
              >
                Search Available Properties
              </h2>
              <p className="mt-3 text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">
                Browse current MLS listings using Joshua’s property-search
                platform—filter by price, location, and property type, then
                save your favorite searches.
              </p>
            </div>

            <div className="flex flex-shrink-0 flex-col items-start gap-3 sm:items-end">
              <a
                href={IDX_SEARCH_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-blue-900 px-6 py-3 font-bold text-white shadow-sm transition hover:bg-blue-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300 focus-visible:ring-offset-2"
              >
                Search Homes
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <p className="text-xs font-semibold text-slate-600">
                Property search opens on the Got Real Estate Solutions MLS
                platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20" aria-labelledby="buyer-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div>
              <h2
                id="buyer-heading"
                className="text-3xl font-extrabold tracking-tight text-blue-950 sm:text-4xl"
              >
                A Clearer Way to Buy a Home
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-700">
                Buying a home involves more than finding a property that
                looks right. The price, monthly payment, location, property
                condition, financing, and offer terms all need to work
                together. Joshua helps buyers build a practical plan before
                making major decisions.
              </p>

              <p className="mt-5 rounded-xl bg-blue-50 px-4 py-3 text-sm leading-6 text-blue-900">
                Buyers may work with Joshua for real estate representation,
                mortgage services, or both. They are not required to use both
                services.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/contact?service=real-estate-buyer" className={primaryButtonClass}>
                  Start as a Buyer
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link href="/loan" className={secondaryButtonClass}>
                  Apply for Financing
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm sm:p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-900">
                <Search className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-blue-950">
                Where Joshua Can Help
              </h3>
              <ul className="mt-5 space-y-3">
                {buyerHelpPoints.map((point) => (
                  <li
                    key={point}
                    className="flex gap-3 text-sm font-semibold leading-6 text-slate-700"
                  >
                    <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-blue-100 text-blue-900">
                      <Check className="h-4 w-4" aria-hidden="true" />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section
        className="bg-slate-50 py-16 sm:py-20"
        aria-labelledby="seller-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-900">
              <Home className="h-6 w-6" aria-hidden="true" />
            </div>
            <h2
              id="seller-heading"
              className="mt-5 text-3xl font-extrabold tracking-tight text-blue-950 sm:text-4xl"
            >
              A Selling Strategy Built Around Your Next Move
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-700">
              Selling successfully starts with understanding what the owner
              is trying to accomplish. Timing, property condition, pricing,
              offer terms, and the seller’s next move can matter just as much
              as the list price.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {sellerHelpPoints.map((point) => (
              <div
                key={point}
                className="flex gap-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-blue-100 text-blue-900">
                  <Check className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="text-sm font-semibold leading-6 text-slate-700">
                  {point}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link href="/contact?service=real-estate-seller" className={primaryButtonClass}>
              Start as a Seller
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20" aria-labelledby="process-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2
              id="process-heading"
              className="text-3xl font-extrabold tracking-tight text-blue-950 sm:text-4xl"
            >
              How Working Together Works
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              The first conversation is simply about understanding the goal
              and determining the right next step.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {workingTogetherSteps.map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-900 text-sm font-bold text-white">
                  {item.step}
                </div>
                <h3 className="mt-5 text-lg font-bold text-blue-950">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="border-y border-blue-100 bg-blue-50 py-16 sm:py-20"
        aria-labelledby="differentiator-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl rounded-3xl border border-blue-100 bg-white p-7 shadow-sm sm:p-9">
            <h2
              id="differentiator-heading"
              className="text-2xl font-extrabold tracking-tight text-blue-950 sm:text-3xl"
            >
              Real Estate Decisions and Financing Decisions Are Connected
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">
              A purchase price cannot be evaluated by itself. The interest
              rate, monthly payment, property taxes, insurance, HOA dues,
              condition, repairs, appraisal, offer terms, contingencies, and
              closing timeline can all affect whether a transaction makes
              sense.
            </p>
            <p className="mt-4 text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">
              Joshua understands both the real estate and mortgage sides of a
              transaction. This allows him to help clients recognize how
              property decisions may affect financing and how financing may
              affect the strength or structure of an offer.
            </p>
            <p className="mt-6 rounded-xl bg-blue-50 px-4 py-3 text-base font-bold text-blue-950">
              Clients may work with Joshua for real estate services, mortgage
              services, or both. Using one service is not conditioned on
              using the other.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-extrabold tracking-tight text-blue-950 sm:text-4xl">
            What Are You Planning Next?
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-700">
            Whether you are preparing to buy, considering a sale, or still
            working through the numbers, the next step is a straightforward
            conversation about your situation.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/contact?service=real-estate-buyer" className={primaryButtonClass}>
              I’m Looking to Buy
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/contact?service=real-estate-seller" className={primaryButtonClass}>
              I’m Thinking About Selling
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <p className="mt-6">
            <Link href="/loan" className={textLinkClass}>
              I Only Need Mortgage Help
            </Link>
          </p>
          <p className="mt-6 text-sm font-semibold text-slate-600">
            Real estate services through Got Real Estate Solutions.
          </p>
        </div>
      </section>
    </div>
  );
}
