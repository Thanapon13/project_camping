"use client";

import { useEffect, useState } from "react";
import useLoading from "@/hooks/useLoading"; // Hook ที่เรียกใช้ LoadingContext
import Landmarklist from "@/components/home/Landmarklist";
import LoadingCard from "@/components/card/LoadingCard";

interface FavoritContentProps {
  initialData: any[]; // เปลี่ยนเป็น Type ข้อมูลจริงของคุณ เช่น Landmark[]
}

export default function FavoritContent({
  initialData,
}: {
  initialData: any[];
}) {
  const { count, setCount } = useLoading();
  const [isClientLoading, setIsClientLoading] = useState(true);

  useEffect(() => {
    // 🔥 จุดที่คุณถาม: สั่ง setCount ตัวเลข data.length ลง Context ตรงนี้เลยครับ!
    setCount(initialData.length);

    // ทำดีเลย์สั้นๆ 300ms-400ms เพื่อแกล้งๆ ให้เห็น Skeleton ค่อยๆ กระพริบสวยงาม
    const timer = setTimeout(() => {
      setIsClientLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [initialData, setCount]);

  // ถ้ากำลังโหลดให้ดึงตัวเลข count จาก Context มาใช้ (หรือเผื่อไว้เป็น initialData.length)
  if (isClientLoading) {
    return <LoadingCard count={count || initialData.length} />;
  }

  // โหลดเสร็จ แสดงรายการแลนด์มาร์กตัวจริง
  return <Landmarklist landmarks={initialData} />;
}
