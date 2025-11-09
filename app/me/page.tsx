import { UserProfileTemplate } from "@/components/templates/UserProfileTemplate";
import { UserDetailResponseSpec } from "@/types/ApiSpec";
import { findMe } from "@/utils/api/UsersApi";

export default async function MyProfile() {
  const userDetail: UserDetailResponseSpec = await findMe({ side: "server" });
  return <UserProfileTemplate user={userDetail} />;
}
