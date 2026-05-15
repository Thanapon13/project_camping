type NavLinks = {
  href: string;
  label: string;
};

const links: NavLinks[] = [
  { href: "/", label: "Home" },
  { href: "/profile", label: "Profile" },
  { href: "/favorits", label: "Favorits" },
  { href: "/camp/create", label: "Create Landmark" },
];

export default links;
