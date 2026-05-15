"use client";

import dynamic from "next/dynamic";

const MapLandmark = dynamic(() => import("./MapLandmark"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full rounded-lg bg-muted animate-pulse mt-4" />
  ),
});

type Props = {
  location?: { lat: number; lng: number };
};

const MapLandmarkClient = ({ location }: Props) => {
  return <MapLandmark location={location} />;
};

export default MapLandmarkClient;
