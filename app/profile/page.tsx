import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ProfileLayout from "./ProfileLayout";

const ProfilePage = async () => {
  const session = await getServerSession();
  if (!session || !session.user) redirect("/login");
  return <ProfileLayout />;
};
export default ProfilePage;
