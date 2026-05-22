import { Show, SignInButton, SignUpButton } from "@clerk/nextjs";
import SignOutLinks from "./SignOutLinks";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import links from "@/utils/links";
import Link from "next/link";

const MobileMenu = ({ onClick }: { onClick: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="md:hidden glass border-b border-border/50 overflow-hidden"
    >
      <div className="px-4 py-4 space-y-1">
        {/* ส่วนที่ 1: เมนูสำหรับคนที่ Log In แล้ว */}
        <Show when="signed-in">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/50 transition-colors"
              onClick={onClick}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 pb-1 border-t border-border/50 px-4">
            <SignOutLinks />
          </div>
        </Show>

        {/* ส่วนที่ 2: เมนูสำหรับคนที่ยังไม่ได้ Log In */}
        <Show when="signed-out">
          <div className="flex flex-col gap-2 pt-2 px-2">
            <SignInButton mode="modal">
              <Button className="w-full rounded-xl" onClick={onClick}>
                Sign In
              </Button>
            </SignInButton>

            <SignUpButton mode="modal">
              <Button
                variant="outline"
                className="w-full rounded-xl"
                onClick={onClick}
              >
                Register
              </Button>
            </SignUpButton>
          </div>
        </Show>
      </div>
    </motion.div>
  );
};

export default MobileMenu;
