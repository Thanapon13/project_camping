import { redirect } from "next/navigation";
import Breadcrumbs from "@/components/landmark/Breadcrumbs";
import ImageContainer from "@/components/landmark/ImageContainer";
import LandmarkDescription from "@/components/landmark/LandmarkDescription";
import LandmarkDetails from "@/components/landmark/LandmarkDetails";
import { fetchLandmarkDetail } from "@/actions/action";
import ScrollToTop from "@/components/landmark/ScrollToTop";
import MapLandmarkClient from "@/components/map/MapLandmarkClient";

const LandmarkDetailPage = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { from?: string };
}) => {
  const { id } = await params;
  const landmark = await fetchLandmarkDetail({ id });

  const fromPage = (await searchParams).from || "home";

  if (!landmark) redirect("/");

  const { name, description, image, province, price, category, lat, lng } =
    landmark;

  const firstName = landmark.profile.firstName;

  return (
    <section className="container mt-4">
      <ScrollToTop />

      {/* 1. Header: Name & Action Buttons */}
      <Breadcrumbs name={name} fromPage={fromPage} />
      <header className="flex justify-between items-center mt-4">
        <h1 className="text-3xl font-bold capitalize">{name}</h1>
      </header>

      {/* 2. Image Section */}
      <ImageContainer image={image} name={name} />

      {/* 3. Content Section */}
      <section className="lg:grid lg:grid-cols-12 gap-x-12 mt-8">
        <div className="lg:col-span-8">
          <div className="flex gap-x-4 items-center justify-between border-b pb-4">
            <h2 className="text-xl font-semibold">Place in {province}</h2>
            <span className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm capitalize">
              {category}
            </span>
          </div>

          {/* ข้อมูลเจ้าของ & รายละเอียด */}
          <LandmarkDetails
            firstName={firstName}
            profileImage={landmark.profile.profileImage}
          />

          <hr className="my-6" />
          <LandmarkDescription description={description} />
        </div>

        {/* 4. Sidebar Card (Price & Booking) */}
        <div className="lg:col-span-4 flex flex-col gap-y-4">
          <div className="border p-6 rounded-lg shadow-sm sticky top-28">
            <h3 className="text-2xl font-bold mb-4">
              ฿{price.toLocaleString()}{" "}
              <span className="text-sm font-normal text-muted-foreground">
                / night
              </span>
            </h3>
            <button className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition">
              Reserve Now
            </button>
            <p className="text-center text-sm text-muted-foreground mt-4">
              You won't be charged yet
            </p>
          </div>
        </div>
      </section>

      {/* 5. Map Section */}
      <div className="mb-10">
        <MapLandmarkClient location={{ lat, lng }} />
      </div>
    </section>
  );
};

export default LandmarkDetailPage;
