# Vercel Deployment Guide

This guide explains how to deploy FashionCheck to Vercel with proper Firebase configuration.

## 🚀 Quick Deploy to Vercel

### 1. Prepare Your Repository

Make sure your code is pushed to GitHub with the updated `firebase.js` file that uses environment variables.

### 2. Deploy to Vercel

1. Go to [Vercel](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will automatically detect it's a Vite project
5. **Don't deploy yet** - we need to set environment variables first

### 3. Set Environment Variables

In your Vercel project dashboard:

1. Go to **Settings** → **Environment Variables**
2. Add the following variables:

```
VITE_FIREBASE_API_KEY=your-actual-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

### 4. Get Your Firebase Values

To get these values:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Project Settings** (gear icon)
4. Scroll down to **Your apps**
5. Click on your web app
6. Copy the values from the config object:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyAx_aBtsInvZHawQq2gDI1fPgXm_XMrlmk", // VITE_FIREBASE_API_KEY
  authDomain: "fashioncheck-2b29b.firebaseapp.com", // VITE_FIREBASE_AUTH_DOMAIN
  projectId: "fashioncheck-2b29b", // VITE_FIREBASE_PROJECT_ID
  storageBucket: "fashioncheck-2b29b.appspot.com", // VITE_FIREBASE_STORAGE_BUCKET
  messagingSenderId: "951196162538", // VITE_FIREBASE_MESSAGING_SENDER_ID
  appId: "1:951196162538:web:dc13d0378e4f223dca3a93", // VITE_FIREBASE_APP_ID
};
```

### 5. Deploy

After setting all environment variables:

1. Go to **Deployments** tab
2. Click **Redeploy** on your latest deployment
3. Or push a new commit to trigger automatic deployment

## 🔧 Local Development

For local development, create a `.env.local` file in your project root:

```bash
# .env.local
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

## 🔒 Security Notes

- ✅ Environment variables are encrypted in Vercel
- ✅ Firebase credentials are not in your code repository
- ✅ Each environment (development, production) can have different values
- ✅ Vercel automatically handles environment variable injection

## 🐛 Troubleshooting

### Common Issues

**"Firebase config not found"**

- Check that all environment variables are set in Vercel
- Verify variable names start with `VITE_`
- Redeploy after adding environment variables

**"Firebase permission denied"**

- Check Firebase security rules
- Ensure Firestore and Storage are enabled
- Verify project ID is correct

**"Build fails"**

- Check Vercel build logs
- Ensure all dependencies are in `package.json`
- Verify Vite configuration is correct

## 📝 Environment Variables Reference

| Variable                            | Description                  | Example                                     |
| ----------------------------------- | ---------------------------- | ------------------------------------------- |
| `VITE_FIREBASE_API_KEY`             | Firebase API key             | `AIzaSyAx_aBtsInvZHawQq2gDI1fPgXm_XMrlmk`   |
| `VITE_FIREBASE_AUTH_DOMAIN`         | Firebase auth domain         | `fashioncheck-2b29b.firebaseapp.com`        |
| `VITE_FIREBASE_PROJECT_ID`          | Firebase project ID          | `fashioncheck-2b29b`                        |
| `VITE_FIREBASE_STORAGE_BUCKET`      | Firebase storage bucket      | `fashioncheck-2b29b.appspot.com`            |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID | `951196162538`                              |
| `VITE_FIREBASE_APP_ID`              | Firebase app ID              | `1:951196162538:web:dc13d0378e4f223dca3a93` |

## 🎯 Next Steps

After successful deployment:

1. Test all features (upload, post, comment)
2. Set up custom domain (optional)
3. Configure Firebase security rules for production
4. Set up monitoring and analytics

---

**Your app will be live at: `https://your-project-name.vercel.app`**
