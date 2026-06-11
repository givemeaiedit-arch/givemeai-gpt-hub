# Deploy to GitHub Pages

This folder is ready to become a GitHub repository that Codex can keep editing.

## First-time GitHub setup

1. Create a new GitHub repository, for example:

```text
givemeai-gpt-hub
```

2. Copy the repository HTTPS URL.

3. From this folder, connect and push:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/givemeai-gpt-hub.git
git push -u origin main
```

4. In GitHub, open the repository:

```text
Settings > Pages > Build and deployment > Source > GitHub Actions
```

5. GitHub Actions will deploy the site from `.github/workflows/pages.yml`.

## Firebase Auth requirement

After GitHub Pages gives you a URL such as:

```text
https://YOUR_USERNAME.github.io/givemeai-gpt-hub/
```

add this domain in Firebase:

```text
Firebase Console > Authentication > Settings > Authorized domains
```

Add:

```text
YOUR_USERNAME.github.io
```

Also fill the real Firebase web config in:

```text
firebase-config.js
```

Until that file is configured, Google login stays disabled and member cards stay locked.

## Normal Codex edit flow

After this is pushed once, Codex can continue editing this local folder. To publish changes:

```powershell
git add .
git commit -m "Update GPT hub"
git push
```

GitHub Pages deploys automatically after each push to `main`.
