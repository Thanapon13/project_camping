# Project Overview

โปรเจกต์นี้คือระบบ Social Media และแพลตฟอร์มเกี่ยวกับ Camping สร้างด้วย Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Prisma 7 และเลือกใช้ Supabase (PostgreSQL) เป็น Database

# Tech Stack

- **Framework:** Next.js 16 (App Router) & React 19 (พร้อม React Compiler)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4, Framer Motion, Shadcn UI
- **Auth:** Clerk Authentication
- **Database & ORM:** Prisma 7 + PostgreSQL (Supabase)
- **Validation:** Zod
- **Other Features:** Leaflet (Maps)

# Folder Structure

- `src/app/` - ใช้เก็บ route, page และ server actions
- `src/components/` - ใช้เก็บ reusable components และ UI elements (Shadcn)
- `src/lib/` - ใช้เก็บ helper functions, validation schemas (Zod) และ database client
- `prisma/` - ใช้เก็บ schema.prisma และ database migration

# Coding Rules

- ทำให้เป็น Server Component ให้มากที่สุด และ  ใช้ use client ในส่วนที่จำเป้นเท่านั้น
- ใช้ **TypeScript** ทุกไฟล์ และระบุ Type ให้ชัดเจน **หลีกเลี่ยงการใช้ `any`**
- แยก Components ให้เป็นชิ้นเล็ก เล็ก เล็ก และอ่านง่าย (Clean Code)
- การทำ Form Validation หรือ API Validation ต้องใช้ **Zod** เสมอ
- ห้ามลบหรือแก้ไขโค้ดเดิมในส่วนที่ไม่มั่นใจ ถ้าไม่เข้าใจหน้าที่ของมันให้ถามก่อน
- รองรับ Responsive Design (Mobile-First) เสมอด้วย Tailwind CSS
- คิดถึง Cache ว่าเว็บเรา Update บ่อยไหม , Data ส่วนไหนต้อง Realtime

# Commands

- `pnpm run dev` - สำหรับรันโปรเจกต์ในโหมด Development
- `pnpm run build` - สำหรับตรวจ production build และเช็ค Type
- `pnpm exec prisma studio` - สำหรับเปิด Database UI
- `pnpm exec prisma migrate dev` - สำหรับรันและสร้าง database migration

# Workflow

ก่อนเริ่มแก้ไขโค้ดทุกครั้งให้ทำตามขั้นตอนนี้:

1. อ่านและทำความเข้าใจไฟล์ที่เกี่ยวข้องทั้งหมดก่อน
2. อธิบายแผนการแก้ไขให้กระชับและชัดเจน (Brief Plan)
3. ตรวจสอบให้มั่นใจว่าโค้ดที่แก้จะไม่กระทบ (Breaking Change) กับส่วนอื่น
4. สรุปสิ่งที่แก้ไขและผลลัพธ์หลังทำเสร็จ
