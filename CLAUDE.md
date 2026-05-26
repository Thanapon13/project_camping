
<!-- CLAUDE.md -->

# Project Overview

โปรเจกต์นี้คือระบบ social media สร้างด้วย Next.js , TypeScript , Tailwind CSS , Prisma , Supabase และ Postgresql

# Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Prisma
- Supabase
- Postgresql

# Folder Structure

- src/app/ ใช้เก็บ route และ page
- src/components/ ใช้เก็บ reusable components
- src/lib/ ใช้เก็บ helper function และ database client
- prisma/ ใช้เก็บ schema และ migration

# Coding Rules

- ใช้ TypeScript ทุกไฟล์
- หลีกเลี่ยง any ถ้าไม่จำเป็น
- แยก components ให้เล็กและอ่านง่าย
- ห้ามลบโค้ดเดิมถ้าไม่เข้าใจหน้าที่ของมัน

# Commands

- pnpm run dev สำหรับรันโปรเจกต์
- pnpm run build สำหรับตราจ production build
- npx prima studio สำหรับเปิด database UI
- npx prisma migrate dev สำหรับรัน migration

# Workflow

ก่อนแก้โด้คให้ทำตามนี้:

1. อ่านไฟล์ที่เกี่ยวข้องก่อน
2. อธิบายแผนการแก้แบบสั้นๆ
3. ตรวจว่่าโค้ดไม่กระทบส่วนอื่น
4. สรุปสิ่งที่แก้หลังทำเสร็จ
