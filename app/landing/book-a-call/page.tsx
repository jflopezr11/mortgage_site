import type { Metadata } from "next";
import BookACallContent from "@/components/BookACallContent";

const TITLE = "Book a Call with Joshua Lopez | Mortgage and Real Estate";
const DESCRIPTION =
  "Schedule a free call with Joshua Lopez, NMLS #2230624, to talk through your mortgage or real estate situation.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/landing/book-a-call",
  },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: "/landing/book-a-call",
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function BookACallPage() {
  return <BookACallContent />;
}
