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
import Avatar from "@/user/Avatar";

type DropdownListMenuProps = {
  userImage: string | null;
};

const DropdownListMenu = ({ userImage }: DropdownListMenuProps) => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 rounded-full px-3"
        >
          <TextAlignJustify className="h-4 w-4" />
          {userImage ? (
            <Avatar userImage={userImage} size={30} />
          ) : (
            <UserIcon />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {/* ยังไม่ได้ login */}
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

        {/* login แล้ว */}
        <Show when="signed-in">
          {links.map((el, idx) => (
            <DropdownMenuItem key={idx} asChild className="cursor-pointer">
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
