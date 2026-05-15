// components/landmark/LandmarkDescription.tsx
const LandmarkDescription = ({ description }: { description: string }) => {
  return (
    <article className="mt-4 wrap-break-word">
      <h3 className="text-xl font-semibold mb-2">Description</h3>
      <p className="text-muted-foreground leading-loose whitespace-pre-line">
        {description}
      </p>
    </article>
  );
};

export default LandmarkDescription;
