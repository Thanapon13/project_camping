# Project NextJS15 Camping

ระบบ **Social Media และแพลตฟอร์มเกี่ยวกับ Camping** ที่ให้ผู้ใช้สามารถค้นหา/แชร์สถานที่กางเต็นท์ (Landmark), บันทึกสถานที่โปรด (Favorite), แสดงความคิดเห็นและให้คะแนน (Comment), รวมถึงแชทพูดคุยกันระหว่างผู้ใช้ (Conversation/Message)

## Tech Stack

- **Framework:** Next.js 16 (App Router) + React 19 (React Compiler)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4, Framer Motion, Shadcn UI
- **Auth:** Clerk Authentication
- **Database & ORM:** Prisma 7 + PostgreSQL (Supabase) ผ่าน `@prisma/adapter-pg`
- **Validation:** Zod
- **Maps:** Leaflet / React-Leaflet
- **Testing:** Jest

## โครงสร้างโปรเจกต์

```
src/app/         # route, page และ server actions
src/components/  # reusable components และ UI elements (Shadcn)
src/lib/         # helper functions, validation schemas (Zod)
src/utils/       # db client, types และ utilities อื่น ๆ
src/generated/   # Prisma Client ที่ generate ขึ้นมา (gitignore, ต้อง generate เอง)
prisma/          # schema.prisma, migrations และ seed
```

## เริ่มต้นใช้งาน (Getting Started)

> **หมายเหตุ:** ไฟล์ `.env` และ `.env.local` ถูกใส่ใน `.gitignore` จึงไม่ติดไปกับ `git clone`
> ดังนั้นการ clone โปรเจกต์ไปเครื่องอื่น **ไม่สามารถรันได้ทันทีแค่ตั้งค่า `.env`** ต้องทำตามขั้นตอนด้านล่างทั้งหมดก่อน

### 1. Clone โปรเจกต์

```bash
git clone <repo-url>
cd project-nextjs15-camping
```

### 2. ติดตั้ง dependencies

```bash
pnpm install
```

### 3. ตั้งค่า Environment Variables

สร้างไฟล์ `.env` (สำหรับ Prisma) และ `.env.local` (สำหรับ Next.js / Clerk / Supabase) โดยมี key ดังนี้:

**`.env`** (ใช้โดย Prisma เท่านั้น)

```env
# Connection pooling (ใช้ตอนรันแอป)
DATABASE_URL=

# Direct connection to the database (ใช้ตอนรัน migration)
DIRECT_URL=
```

**`.env.local`**

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=

SUPABASE_URL=
SUPABASE_KEY=

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_KEY=
```

ค่าทั้งหมดต้องขอจากเจ้าของโปรเจกต์ (Supabase project, Clerk application) เนื่องจากเป็นข้อมูลลับและใช้ร่วมกับฐานข้อมูลจริง

### 4. Generate Prisma Client

โฟลเดอร์ `src/generated/prisma` ถูก gitignore ไว้ จึงต้อง generate ใหม่ทุกครั้งหลัง clone:

```bash
pnpm exec prisma generate
```

### 5. Sync Database Schema (ถ้าจำเป็น)

ถ้า database (Supabase) ยังไม่มี table ตาม `schema.prisma` ให้รัน migration ที่มีอยู่แล้ว:

```bash
pnpm exec prisma migrate deploy
```

### 6. รันโปรเจกต์

```bash
pnpm run dev
```

---

## การเพิ่ม Model ใหม่ / แก้ไข Model (Prisma + Supabase)

โปรเจกต์นี้ใช้ **Prisma เป็น Source of Truth** ของ schema แล้ว sync ไปยัง Supabase (PostgreSQL) ผ่าน migration ดังนั้นควรแก้ schema ที่ `prisma/schema.prisma` เป็นหลัก ไม่ควรไปแก้ table ใน Supabase Dashboard ตรง ๆ เพราะจะทำให้ schema ใน Prisma กับ database ไม่ตรงกัน (schema drift)

### ขั้นตอนเพิ่ม Model ใหม่

1. **แก้ไข `prisma/schema.prisma`**
   เพิ่ม `model` ใหม่ พร้อมกำหนด field, type, relation, index ตามต้องการ (อ้างอิงรูปแบบจาก model ที่มีอยู่ เช่น `Landmark`, `Comment`)

2. **สร้างและรัน Migration**

   ```bash
   pnpm exec prisma migrate dev --name <ชื่อ-migration-อธิบายสั้นๆ>
   ```

   คำสั่งนี้จะ:
   - สร้างไฟล์ SQL migration ใหม่ในโฟลเดอร์ `prisma/migrations/`
   - รัน SQL นั้นไปยัง Supabase ผ่าน `DIRECT_URL`
   - regenerate Prisma Client ให้อัตโนมัติ

3. **ตรวจสอบใน Supabase Dashboard**
   เข้า Table Editor ของ Supabase เพื่อยืนยันว่า table/column ใหม่ถูกสร้างถูกต้อง

4. **เขียน Zod Schema สำหรับ Validation**
   เพิ่ม schema validation (ใน `src/lib/`) สำหรับ model ใหม่ ตามกฎของโปรเจกต์ (ทุก Form/API ต้องผ่าน Zod)

5. **อัปเดต Types ที่เกี่ยวข้อง**
   ตรวจสอบ/อัปเดต type definitions ที่ `src/utils/types.ts` หากมีการอ้างอิงถึง model

6. **(Optional) เพิ่ม Seed Data**
   หากต้องการข้อมูลตัวอย่าง ให้แก้ไข `prisma/seed.ts` แล้วรัน:

   ```bash
   pnpm exec prisma db seed
   ```

### ขั้นตอนแก้ไข Model ที่มีอยู่ (เช่น เพิ่ม/ลบ/แก้ field, relation)

1. แก้ไข `model` ที่ต้องการใน `prisma/schema.prisma`
2. รัน `pnpm exec prisma migrate dev --name <ชื่อ-migration>` เพื่อสร้าง migration และ apply การเปลี่ยนแปลงไปยัง Supabase
3. หากเป็นการเปลี่ยนแปลงที่อาจทำให้ข้อมูลเดิมหาย (เช่น drop column, เปลี่ยน type) ให้ตรวจสอบ SQL ใน migration file ที่ถูกสร้างก่อน apply จริงกับฐานข้อมูล production
4. อัปเดต Zod schema, types และโค้ดส่วนที่ใช้งาน field/relation ที่เปลี่ยนแปลง ให้ตรงกับ schema ใหม่
5. รัน `pnpm exec prisma generate` หากต้องการ regenerate client โดยไม่รัน migration (เช่น แก้แค่ `output` path หรือ generator config)

### ขั้นตอนลบ Model ที่ไม่ใช้แล้ว

1. ลบ `model` ที่ต้องการออกจาก `prisma/schema.prisma` พร้อมทั้งลบ field/relation ใน model อื่นที่อ้างอิงถึง model นี้ (เช่น `@relation`, foreign key fields)
2. รัน `pnpm exec prisma migrate dev --name <ชื่อ-migration>` เพื่อสร้าง migration ที่ `DROP TABLE` และ apply ไปยัง Supabase
3. ตรวจสอบไฟล์ migration ที่ถูกสร้างก่อน apply จริง เพราะการ `DROP TABLE` จะ**ลบข้อมูลทั้งหมด**ใน table นั้นแบบกู้คืนไม่ได้
4. ลบโค้ดส่วนที่ใช้งาน model นี้ออกทั้งหมด เช่น Zod schema, types ใน `src/utils/types.ts`, server actions, components ที่เกี่ยวข้อง
5. ตรวจสอบใน Supabase Dashboard ว่า table ถูกลบเรียบร้อย

### คำสั่งที่ใช้บ่อย

| คำสั่ง | ใช้เมื่อ |
| --- | --- |
| `pnpm exec prisma studio` | เปิด UI ดู/แก้ข้อมูลใน database |
| `pnpm exec prisma migrate dev` | สร้าง + apply migration ใน dev |
| `pnpm exec prisma migrate deploy` | apply migration ที่มีอยู่ (ใช้ตอน setup เครื่องใหม่/production) |
| `pnpm exec prisma generate` | regenerate Prisma Client (`src/generated/prisma`) |
| `pnpm exec prisma db seed` | รัน seed script (`prisma/seed.ts`) |
