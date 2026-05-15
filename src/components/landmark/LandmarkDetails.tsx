import Image from "next/image";

function LandmarkDetails({
  firstName,
  profileImage,
}: {
  firstName: string;
  profileImage: string;
}) {
  return (
    <div className="flex items-center gap-x-4 mt-4">
      <Image
        src={profileImage}
        alt={firstName}
        width={48}
        height={48}
        className="rounded-full object-cover w-12 h-12"
      />
      <p className="text-muted-foreground">
        Hosted by <span className="font-bold text-foreground">{firstName}</span>
      </p>
    </div>
  );
}
export default LandmarkDetails;
