import { getProfileByUsername } from "@/lib/services/profile.services";
import { ProfileType } from "@/lib/types/type";

const ProfilePage = async ({ params }: { params: { username: string } }) => {
  const { username } = await params;
  const profile: ProfileType = await getProfileByUsername(username);

  return <div>Bem vindo {profile.name}</div>;
};

export default ProfilePage;
