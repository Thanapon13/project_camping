import { cn } from "@/lib/utils";

describe("cn()", () => {
  it("รวม class names ธรรมดาเข้าด้วยกัน", () => {
    expect(cn("flex", "items-center")).toBe("flex items-center");
  });

  it("กรอง false/undefined/null ออก", () => {
    expect(cn("block", false && "hidden", undefined, null as unknown as string)).toBe("block");
  });

  it("รองรับ conditional class ด้วย ternary", () => {
    const isActive = true;
    expect(cn("btn", isActive ? "btn-active" : "btn-inactive")).toBe(
      "btn btn-active"
    );
  });

  it("merge Tailwind class ที่ conflict กัน — เอาตัวหลังชนะ", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });

  it("merge text color ที่ conflict กัน", () => {
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });

  it("ไม่มี argument เลย คืน empty string", () => {
    expect(cn()).toBe("");
  });

  it("รองรับ array of class names", () => {
    expect(cn(["flex", "gap-4"])).toBe("flex gap-4");
  });
});
