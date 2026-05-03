import { DarkMode } from "./DarkMode";
import DropdownListMenu from "./DropdownListMenu";
import Logo from "./Logo";
import Search from "./Search";

const Navbar = () => {
  return (
    <nav>
      <div className="container flex justify-between flex-wrap">
        {/* Logo */}
        <Logo />

        {/* Search */}
        <Search />

        {/* Darkmode & Profile */}
        <div className="flex gap-4">
          <DarkMode />
          <DropdownListMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
