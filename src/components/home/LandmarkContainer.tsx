import { fetchLandmarks, fetchFavoriteId } from "@/actions/action";
import { auth } from "@clerk/nextjs/server"; // เช็กสิทธิ์ที่นี่ (Server) ปลอดภัย 100%
import Landmarklist from "./Landmarklist";
import LandmarkModal from "../landmark/LandmarkModal";

const LandmarkContainer = async () => {
  const { userId } = await auth();
  const initialLandmarks = await fetchLandmarks({ page: 1, limit: 8 });

  // แมปเอา favoriteId พ่วงเข้าไปกับข้อมูลแลนด์มาร์กตั้งแต่ตรงนี้เลย
  const landmarksWithFavorites = await Promise.all(
    initialLandmarks.map(async landmark => {
      // ถ้าไม่ได้ Login ให้เป็น null ไปเลยไม่ต้องไป Query DB
      const favoriteId = userId
        ? await fetchFavoriteId({ landmarkId: landmark.id })
        : null;
      return {
        ...landmark,
        favoriteId,
      };
    }),
  );

  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">All Landmarks</h2>
        <LandmarkModal />
      </div>

      <Landmarklist initialLandmarks={landmarksWithFavorites} userId={userId} />
    </div>
  );
};

export default LandmarkContainer;
