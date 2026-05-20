import Link from "next/link";

const ProfilePage = () => {
  return (
    <div>
      ProfilePage
      <Link href={"/profile/create"}>Create Profile</Link>
    </div>
  );
};

export default ProfilePage;
