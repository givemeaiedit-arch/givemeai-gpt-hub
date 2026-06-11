# GivemeAI GPT Hub Firebase Setup

## What Was Added

- Google/Gmail login with Firebase Authentication.
- Firestore user approvals in `users/{uid}`.
- Locked member cards for cards 3-5:
  - `Ads Andromeda Image`
  - `คำนวณ BOQ`
  - `AI Image Pro`
- Admin panel at `admin.html`.
- Signup details page at `pricing.html`.
- Firebase Hosting and Firestore rules files.

## Required Firebase Setup

1. Create a Firebase project.
2. Enable Authentication > Sign-in method > Google.
3. Enable Firestore Database.
4. Create a Web App in Firebase project settings.
5. Copy the web config into `firebase-config.js`.
6. Add your deployed Firebase Hosting domain to Authentication > Settings > Authorized domains.
7. Deploy from this folder:

```powershell
firebase login
firebase use --add
firebase deploy
```

## Admin

Admin email is configured as:

```text
Givemeai.edit@gmail.com
```

That account can open `admin.html`, see all users, and set user status to:

- `pending`
- `approved`
- `revoked`

`approved` means subscribed/unlocked in v1.

## Important Note

Until `firebase-config.js` is filled with real Firebase values, the site stays in locked preview mode. Login and admin approval will not run locally without Firebase config and an authorized Firebase domain.
