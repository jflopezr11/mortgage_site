import { redirect } from "next/navigation";

export default function BookACallPage() {
  redirect("/contact?service=mortgage");
}
