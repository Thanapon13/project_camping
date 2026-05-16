import CreateLandmarkForm from "@/components/landmark/CreateLandmarkForm";

const CreateCamp = async () => {
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">
        Create Landmark
      </h1>

      <div className="border p-8 rounded-md">
        <CreateLandmarkForm />
      </div>
    </section>
  );
};

export default CreateCamp;
