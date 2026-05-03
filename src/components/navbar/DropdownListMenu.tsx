import { TextAlignJustify } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserIcon from "./UserIcon";
import Link from "next/link";
import links from "@/utils/links";
import { Button } from "../ui/button";
import SignOutLinks from "./SignOutLinks";
import { Show, SignInButton, SignUpButton } from "@clerk/nextjs";

const DropdownListMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <TextAlignJustify className="h-4 w-4" />
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {/* Log Out : ให้แสดง */}
        <Show when="signed-out">
          <DropdownMenuItem>
            <SignInButton mode="modal">
              <button>Login</button>
            </SignInButton>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <SignUpButton mode="modal">
              <button>Register</button>
            </SignUpButton>
          </DropdownMenuItem>
        </Show>

        {/* Log In : ให้แสดง*/}
        <Show when="signed-in">
          {links.map((el, idx) => (
            <DropdownMenuItem key={idx}>
              <Link href={el?.href}>{el?.label}</Link>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <SignOutLinks />
          </DropdownMenuItem>
        </Show>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default DropdownListMenu;
