import { UserProfileTemplate } from "@/components/templates/UserProfileTemplate";

export default async function MyProfile() {
  return (
    <UserProfileTemplate
      users={{ loginEmail: "ABC@gmail.com", createdAt: "2025-11-01" }}
    />
  );
}
