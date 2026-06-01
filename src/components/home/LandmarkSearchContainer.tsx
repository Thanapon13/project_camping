"use client";

import { useEffect, useState } from "react";
import { LandmarkCardProps } from "@/utils/types";
import SearchBarCard from "./SearchBarCard";
import Landmarklist from "./Landmarklist";

type LandmarkSearchContainerProps = {
  initialLandmarks: LandmarkCardProps[];
  userId: string | null;
};

const LandmarkSearchContainer = ({
  initialLandmarks,
  userId,
}: LandmarkSearchContainerProps) => {
  const [nameInput, setNameInput] = useState("");
  const [provinceInput, setProvinceInput] = useState("");
  const [search, setSearch] = useState("");
  const [province, setProvince] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setSearch(nameInput), 400);
    return () => clearTimeout(t);
  }, [nameInput]);

  useEffect(() => {
    const t = setTimeout(() => setProvince(provinceInput), 400);
    return () => clearTimeout(t);
  }, [provinceInput]);

  return (
    <>
      <SearchBarCard
        search={nameInput}
        province={provinceInput}
        onSearchChange={setNameInput}
        onProvinceChange={setProvinceInput}
      />
      <Landmarklist
        initialLandmarks={initialLandmarks}
        userId={userId}
        search={search}
        province={province}
      />
    </>
  );
};

export default LandmarkSearchContainer;
