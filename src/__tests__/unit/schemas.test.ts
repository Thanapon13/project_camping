import {
  profileSchema,
  imageSchema,
  landmarkSchema,
  validateComment,
  validateWithZod,
} from "@/utils/schemas";

// ─── profileSchema ────────────────────────────────────────────────────────────
describe("profileSchema", () => {
  const validData = {
    firstName: "สมชาย",
    lastName: "ใจดี",
    userName: "somchai",
  };

  it("ผ่านเมื่อข้อมูลถูกต้องครบถ้วน", () => {
    const result = profileSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("ไม่ผ่านเมื่อ firstName สั้นกว่า 2 ตัวอักษร", () => {
    const result = profileSchema.safeParse({ ...validData, firstName: "A" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      "First name must be at least 2 characters"
    );
  });

  it("ไม่ผ่านเมื่อ lastName สั้นกว่า 2 ตัวอักษร", () => {
    const result = profileSchema.safeParse({ ...validData, lastName: "B" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      "Last name must be at least 2 characters"
    );
  });

  it("ไม่ผ่านเมื่อ userName สั้นกว่า 2 ตัวอักษร", () => {
    const result = profileSchema.safeParse({ ...validData, userName: "x" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      "Username must be at least 2 characters"
    );
  });

  it("ไม่ผ่านเมื่อไม่ส่ง field ใดเลย", () => {
    const result = profileSchema.safeParse({});
    expect(result.success).toBe(false);
  });
});

// ─── imageSchema ──────────────────────────────────────────────────────────────
describe("imageSchema", () => {
  const makeFile = (size: number, type: string) =>
    new File([new ArrayBuffer(size)], "test.jpg", { type });

  it("ผ่านเมื่อไฟล์ JPEG ขนาดไม่เกิน 1MB", () => {
    const file = makeFile(500 * 1024, "image/jpeg"); // 500KB
    const result = imageSchema.safeParse({ image: file });
    expect(result.success).toBe(true);
  });

  it("ผ่านเมื่อไฟล์เป็น PNG", () => {
    const file = makeFile(100 * 1024, "image/png");
    const result = imageSchema.safeParse({ image: file });
    expect(result.success).toBe(true);
  });

  it("ผ่านเมื่อไฟล์เป็น WEBP", () => {
    const file = makeFile(100 * 1024, "image/webp");
    const result = imageSchema.safeParse({ image: file });
    expect(result.success).toBe(true);
  });

  it("ไม่ผ่านเมื่อไฟล์ใหญ่กว่า 1MB", () => {
    const file = makeFile(2 * 1024 * 1024, "image/jpeg"); // 2MB
    const result = imageSchema.safeParse({ image: file });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      "File size must be less than 1MB"
    );
  });

  it("ไม่ผ่านเมื่อ file type เป็น PDF", () => {
    const file = makeFile(100 * 1024, "application/pdf");
    const result = imageSchema.safeParse({ image: file });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      "File must be JPEG, PNG, or WEBP"
    );
  });

  it("ไม่ผ่านเมื่อ file size = 0 (ไม่ได้เลือกไฟล์)", () => {
    const file = makeFile(0, "image/jpeg");
    const result = imageSchema.safeParse({ image: file });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      "Please select at least 1 image"
    );
  });
});

// ─── landmarkSchema ───────────────────────────────────────────────────────────
describe("landmarkSchema", () => {
  const validData = {
    name: "ดอยอินทนนท์",
    category: "mountain",
    description: "จุดชมวิวสูงสุดในประเทศไทย ธรรมชาติสวยงาม",
    price: 200,
    province: "เชียงใหม่",
    lat: 18.5887,
    lng: 98.4869,
  };

  it("ผ่านเมื่อข้อมูลถูกต้องครบถ้วน", () => {
    const result = landmarkSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("ไม่ผ่านเมื่อ name สั้นกว่า 2 ตัวอักษร", () => {
    const result = landmarkSchema.safeParse({ ...validData, name: "ก" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      "Name must be at least 2 characters"
    );
  });

  it("ไม่ผ่านเมื่อ name ยาวกว่า 100 ตัวอักษร", () => {
    const result = landmarkSchema.safeParse({
      ...validData,
      name: "ก".repeat(101),
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      "Name must be less than 100 characters"
    );
  });

  it("ไม่ผ่านเมื่อ description สั้นกว่า 10 ตัวอักษร", () => {
    const result = landmarkSchema.safeParse({
      ...validData,
      description: "สั้นเกิน",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      "Description must be at least 10 characters"
    );
  });

  it("ไม่ผ่านเมื่อ description ยาวกว่า 1000 ตัวอักษร", () => {
    const result = landmarkSchema.safeParse({
      ...validData,
      description: "ก".repeat(1001),
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      "Description must be less than 1000 characters"
    );
  });

  it("ไม่ผ่านเมื่อ price = 0", () => {
    const result = landmarkSchema.safeParse({ ...validData, price: 0 });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Price must be greater than 0");
  });

  it("ไม่ผ่านเมื่อ price เกิน 1,000,000", () => {
    const result = landmarkSchema.safeParse({
      ...validData,
      price: 1_000_001,
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      "Price must be less than 1,000,000"
    );
  });

  it("ไม่ผ่านเมื่อ lat เกิน 90", () => {
    const result = landmarkSchema.safeParse({ ...validData, lat: 91 });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Invalid latitude");
  });

  it("ไม่ผ่านเมื่อ lat ต่ำกว่า -90", () => {
    const result = landmarkSchema.safeParse({ ...validData, lat: -91 });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Invalid latitude");
  });

  it("ไม่ผ่านเมื่อ lng เกิน 180", () => {
    const result = landmarkSchema.safeParse({ ...validData, lng: 181 });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Invalid longitude");
  });

  it("ไม่ผ่านเมื่อ lng ต่ำกว่า -180", () => {
    const result = landmarkSchema.safeParse({ ...validData, lng: -181 });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Invalid longitude");
  });

  it("ไม่ผ่านเมื่อ category เป็นค่าว่าง", () => {
    const result = landmarkSchema.safeParse({ ...validData, category: "" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Category is required");
  });

  it("ไม่ผ่านเมื่อ province เป็นค่าว่าง", () => {
    const result = landmarkSchema.safeParse({ ...validData, province: "" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Province is required");
  });
});

// ─── validateComment ──────────────────────────────────────────────────────────
describe("validateComment", () => {
  const validData = {
    landmarkId: "landmark_abc123",
    userId: "user_xyz",
    rating: 4,
    comment: "สวยมากเลยครับ!",
  };

  it("ผ่านเมื่อข้อมูลถูกต้องครบถ้วน", () => {
    const result = validateComment.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("ผ่านเมื่อ rating = 1 (ค่าต่ำสุด)", () => {
    const result = validateComment.safeParse({ ...validData, rating: 1 });
    expect(result.success).toBe(true);
  });

  it("ผ่านเมื่อ rating = 5 (ค่าสูงสุด)", () => {
    const result = validateComment.safeParse({ ...validData, rating: 5 });
    expect(result.success).toBe(true);
  });

  it("ไม่ผ่านเมื่อ rating = 0", () => {
    const result = validateComment.safeParse({ ...validData, rating: 0 });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      "Please give a rating before posting"
    );
  });

  it("ไม่ผ่านเมื่อ rating = 6", () => {
    const result = validateComment.safeParse({ ...validData, rating: 6 });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      "Rating must be between 1-5"
    );
  });

  it("ไม่ผ่านเมื่อ comment ยาวเกิน 500 ตัวอักษร", () => {
    const result = validateComment.safeParse({
      ...validData,
      comment: "ก".repeat(501),
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe(
      "Comment is too long (max 500 characters)"
    );
  });

  it("ไม่ผ่านเมื่อ comment เป็นค่าว่าง", () => {
    const result = validateComment.safeParse({ ...validData, comment: "" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Please enter your comment");
  });

  it("ไม่ผ่านเมื่อ landmarkId เป็นค่าว่าง", () => {
    const result = validateComment.safeParse({
      ...validData,
      landmarkId: "",
    });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Landmark ID is required");
  });
});

// ─── validateWithZod ──────────────────────────────────────────────────────────
describe("validateWithZod()", () => {
  const validProfile = {
    firstName: "สมชาย",
    lastName: "ใจดี",
    userName: "somchai",
  };

  it("คืนค่า parsed data เมื่อ validation ผ่าน", () => {
    const result = validateWithZod(profileSchema, validProfile);
    expect(result).toEqual(validProfile);
  });

  it("throw Error เมื่อ validation ไม่ผ่าน", () => {
    expect(() =>
      validateWithZod(profileSchema, { firstName: "A", lastName: "", userName: "" })
    ).toThrow("Validation Failed");
  });

  it("error ที่ throw มี property .errors เป็น object", () => {
    try {
      validateWithZod(profileSchema, { firstName: "A", lastName: "", userName: "" });
    } catch (e: unknown) {
      const err = e as Error & { errors: Record<string, string> };
      expect(err.errors).toBeDefined();
      expect(typeof err.errors).toBe("object");
    }
  });

  it("error.errors มี key ตรงกับ field ที่ไม่ผ่าน", () => {
    try {
      validateWithZod(profileSchema, { firstName: "A", lastName: "ข", userName: "ค" });
    } catch (e: unknown) {
      const err = e as Error & { errors: Record<string, string> };
      expect(err.errors).toHaveProperty("firstName");
      expect(typeof err.errors.firstName).toBe("string");
    }
  });

  it("เก็บเฉพาะ error แรกของแต่ละ field ไม่ซ้ำกัน", () => {
    try {
      validateWithZod(profileSchema, {
        firstName: "A",
        lastName: "B",
        userName: "C",
      });
    } catch (e: unknown) {
      const err = e as Error & { errors: Record<string, string> };
      const keys = Object.keys(err.errors);
      const uniqueKeys = new Set(keys);
      expect(keys.length).toBe(uniqueKeys.size);
    }
  });
});
