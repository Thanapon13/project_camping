import Image from "next/image";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { ReplyProps } from "@/utils/types";

const ReplyList = ({
  replies,
  formatDate,
}: {
  replies: ReplyProps[];
  formatDate: (date: Date) => string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      className="mt-3 space-y-3 pl-4 border-l-2 border-border"
    >
      {replies.map(reply => (
        <div key={reply.id} className="flex gap-3 pt-3">
          <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 ring-2 ring-border">
            <Image
              src={reply.profile.profileImage}
              alt={`${reply.profile.firstName} ${reply.profile.lastName}`}
              width={32}
              height={32}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-xs">
                {reply.profile.firstName} {reply.profile.lastName}
              </span>
              <span className="text-[10px] text-muted-foreground">
                {formatDate(reply.createdAt)}
              </span>
            </div>
            <p className="text-xs text-foreground/80 leading-relaxed">
              {reply.comment}
            </p>
            <button className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-primary transition-colors mt-2">
              <Heart className="w-3 h-3" />
            </button>
          </div>
        </div>
      ))}
    </motion.div>
  );
};

export default ReplyList;
