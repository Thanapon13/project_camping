import Image from "next/image";
import LogoImage from "../../../public/Logo/icon_loader.webp";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"}>
      <Image src={LogoImage} width={30} height={30} alt="logo" />
    </Link>
  );
};
export default Logo;
