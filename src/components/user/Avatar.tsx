import Image from "next/image";

type AvatarProps = {
  userImage: string | null;
  size?: number;
};

const Avatar = ({ userImage, size = 40 }: AvatarProps) => {
  return (
    <div
      className="rounded-full overflow-hidden shrink-0 ring-2 ring-border"
      style={{ width: size, height: size }}
    >
      {userImage ? (
        <Image
          src={userImage}
          alt="Avatar"
          width={size}
          height={size}
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
