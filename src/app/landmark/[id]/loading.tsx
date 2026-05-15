// LandmarkDetail

const loading = () => {
  return (
    <section className="container mt-4">
      <div className="h-6 w-48 bg-muted animate-pulse rounded mb-4" />
      <div className="h-10 w-72 bg-muted animate-pulse rounded mb-6" />
      <div className="h-[400px] w-full bg-muted animate-pulse rounded-xl mb-8" />
      <div className="lg:grid lg:grid-cols-12 gap-x-12">
        <div className="lg:col-span-8 space-y-4">
          <div className="h-8 bg-muted animate-pulse rounded" />
          <div className="h-20 bg-muted animate-pulse rounded" />
          <div className="h-40 bg-muted animate-pulse rounded" />
        </div>
        <div className="lg:col-span-4">
          <div className="h-48 bg-muted animate-pulse rounded-lg" />
        </div>
      </div>
    </section>
  );
};

export default loading;
