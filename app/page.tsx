import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import HomePage from "./Components/HomePage/HomePage";

export default async function Home() {
  const session = await getServerSession();
  if (!session || !session.user) redirect("/login");
  return <HomePage />;
}
