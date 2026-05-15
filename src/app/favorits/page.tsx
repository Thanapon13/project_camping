import { fetchFavorits } from "@/actions/action";
import Landmarklist from "@/components/home/Landmarklist";

const FavoritsPage = async () => {
  const data = await fetchFavorits();

  return (
    <div className="mb-10">
      <Landmarklist landmarks={data} />
    </div>
  );
};
export default FavoritsPage;
