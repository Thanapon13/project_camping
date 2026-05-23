import Image from "next/image";

const Avatar = ({ userImage }: { userImage: string | null }) => {
  return (
    <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 ring-2 ring-border">
      {userImage ? (
        <Image
          src={userImage}
          alt="Avatar"
          width={40}
          height={40}
          className="object-cover w-full h-full"
        />
      ) : (
        <div className="w-full h-full bg-muted flex items-center justify-center">
          <span className="text-sm font-medium text-muted-foreground">?</span>
        </div>
      )}
    </div>
  );
};
export default Avatar;
