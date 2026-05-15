import Image from "next/image";

function ImageContainer({ image, name }: { image: string; name: string }) {
  return (
    <section className="h-[300px] md:h-[500px] relative mt-6 overflow-hidden rounded-xl">
      <Image
        src={image}
        fill
        sizes="100vw"
        alt={name}
        className="object-cover"
        priority
      />
    </section>
  );
}
export default ImageContainer;
