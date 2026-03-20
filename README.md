# ระบบล็อกอิน KSU

ระบบล็อกอินสำหรับมหาวิทยาลัยกาฬสินธุ์ พัฒนาด้วย [Next.js 16](https://nextjs.org) เชื่อมต่อกับระบบ LDAP ผ่าน API

## คุณสมบัติ

- หน้าล็อกอินด้วย Username / Password
- ยืนยันตัวตนผ่าน KSU LDAP API
- จัดการ Session ด้วย JWT บันทึกใน httpOnly Cookie
- Middleware ป้องกันเส้นทาง `/admin` (redirect ไป `/login` หากยังไม่ได้ล็อกอิน)
- หน้า Admin แสดงข้อมูลผู้ใช้ พร้อมปุ่มออกจากระบบ (มีการยืนยันก่อนออก)

## โครงสร้างโปรเจกต์

```
app/
├── actions/
│   └── auth.ts          # Server Actions สำหรับ login / logout
├── admin/
│   └── page.tsx         # หน้า Admin (ต้องล็อกอินก่อน)
├── components/
│   └── LogoutButton.tsx # ปุ่มออกจากระบบพร้อม confirm dialog
├── lib/
│   └── session.ts       # จัดการ JWT Session
└── login/
    └── page.tsx         # หน้าล็อกอิน
middleware.ts             # ป้องกันเส้นทางที่ต้องการ authentication
```

## การตั้งค่า Environment Variables

สร้างไฟล์ `.env.local` ที่ root ของโปรเจกต์ แล้วกำหนดค่าดังนี้:

```env
# Secret key สำหรับเข้ารหัส JWT Session
# สร้างค่าแบบสุ่มด้วย: openssl rand -base64 32
SESSION_SECRET=your-random-secret-key-here

# URL ของ KSU LDAP API
LDAP_API_URL=https://xxxxxxxxxxxxxxx

# API Key สำหรับเรียก KSU LDAP API
LDAP_API_KEY=xxxxxxxxxxxxxx
```

> **หมายเหตุ:** ไฟล์ `.env.local` จะถูก Git ignore โดยอัตโนมัติ ห้าม commit ไฟล์นี้ขึ้น repository

## วิธีติดตั้งและรันโปรเจกต์

### 1. ติดตั้ง dependencies

```bash
npm install
```

### 2. สร้างไฟล์ `.env.local`

คัดลอกตัวอย่างจากหัวข้อ [การตั้งค่า Environment Variables](#การตั้งค่า-environment-variables) แล้วแก้ไขค่าให้ถูกต้อง

### 3. รัน Development Server

```bash
npm run dev
```

เปิดเบราว์เซอร์ไปที่ [http://localhost:3000](http://localhost:3000)

### 4. Build สำหรับ Production

```bash
npm run build
npm run start
```

## เส้นทาง (Routes)

| เส้นทาง  | คำอธิบาย                                                              |
| -------- | --------------------------------------------------------------------- |
| `/`      | Redirect ไป `/admin` หากล็อกอินแล้ว หรือ `/login` หากยังไม่ได้ล็อกอิน |
| `/login` | หน้าล็อกอิน                                                           |
| `/admin` | หน้า Admin (ต้องล็อกอินก่อน)                                          |
