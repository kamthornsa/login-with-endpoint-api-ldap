import { redirect } from "next/navigation";
import { getSession } from "@/app/lib/session";

export default async function Home() {
  const user = await getSession();
  if (user) {
    redirect("/admin");
  } else {
    redirect("/login");
  }
}
