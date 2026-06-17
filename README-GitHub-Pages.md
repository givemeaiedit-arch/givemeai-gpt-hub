# GivemeAI GPT Hub

เว็บถูกเคลียร์ให้เหลือหน้าเริ่มต้นว่างสำหรับสร้างใหม่ โดยยังเก็บไว้เฉพาะ:

- Google Login ผ่าน Firebase Authentication
- Popup แจ้งเตือนเมื่อเปิดเว็บนอก Google Chrome
- Deploy ผ่าน GitHub Pages

## Files

- `index.html` หน้าเว็บหลัก
- `app.js` ผูกปุ่ม login/logout
- `auth-shared.js` Firebase Auth helper
- `browser-check.js` popup แนะนำให้เปิดใน Chrome
- `firebase-config.js` ค่า Firebase web app
- `aihub.css` style หน้าเริ่มต้น

## Deploy

Push เข้า branch `main` แล้ว GitHub Actions จะ deploy ขึ้น GitHub Pages อัตโนมัติ

```powershell
git add .
git commit -m "Update blank hub"
git push
```

## Firebase Auth

ต้องเปิด Google provider ใน Firebase Authentication และเพิ่มโดเมน GitHub Pages ใน Authorized domains:

```text
givemeaiedit-arch.github.io
```
