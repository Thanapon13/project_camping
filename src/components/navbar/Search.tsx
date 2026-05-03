import { Input } from "../ui/input";

const Search = () => {
  return (
    <Input
      type="text"
      placeholder="Search location"
      className="max-w-xs focus-visible:ring-0"
    />
  );
};

export default Search;
