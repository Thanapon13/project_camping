import createError from "@/utils/create-error";

describe("createError()", () => {
  it("throw Error เสมอเมื่อถูกเรียก", () => {
    expect(() => createError("Something went wrong", 500)).toThrow();
  });

  it("error.message ตรงกับที่ส่งเข้าไป", () => {
    expect(() => createError("Not found", 404)).toThrow("Not found");
  });

  it("error.statusCode ตรงกับที่ส่งเข้าไป", () => {
    try {
      createError("Unauthorized", 401);
    } catch (e: unknown) {
      const err = e as Error & { statusCode: number };
      expect(err.statusCode).toBe(401);
    }
  });

  it("error เป็น instance ของ Error", () => {
    try {
      createError("Server Error", 500);
    } catch (e: unknown) {
      expect(e).toBeInstanceOf(Error);
    }
  });
});
