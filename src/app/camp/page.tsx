import { Button } from "@/components/ui/button";
import Link from "next/link";

const CampPage = () => {
  return (
    <Link href="/camp/create">
      <Button type="button">Post</Button>
    </Link>
  );
};

export default CampPage;
