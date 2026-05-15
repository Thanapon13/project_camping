// components/landmark/MapLandmark.tsx
const MapLandmark = ({
  location,
}: {
  location: { lat: number; lng: number };
}) => {
  const { lat, lng } = location;

  // สร้าง Google Maps Embed URL
  const mapUrl = `https://maps.google.com/maps?q=${lat},${lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="mt-12 mb-20">
      <h3 className="text-xl font-semibold mb-4">Where you'll be</h3>
      <div className="h-[450px] w-full rounded-xl overflow-hidden border">
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          marginHeight={0}
          marginWidth={0}
          src={mapUrl}
        ></iframe>
      </div>
    </div>
  );
};

export default MapLandmark;
