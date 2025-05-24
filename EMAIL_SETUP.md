# Email & Firebase Setup Guide

This guide walks you through setting up email notifications and Firebase Firestore integration for your Beam waitlist.

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Email Service (Resend)
RESEND_API_KEY=your_resend_api_key_here

# Firebase Configuration (Minimal - just for Firestore)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id_here
```

## 1. Resend Setup (Email Service)

1. Go to [Resend.com](https://resend.com) and create an account
2. Navigate to API Keys and create a new API key
3. Copy the API key to your `.env.local` file as `RESEND_API_KEY`

### Domain Verification (Optional but Recommended)

1. In Resend dashboard, go to Domains
2. Add your domain (e.g., `beam.me`)
3. Add the required DNS records to your domain
4. Update the `from` field in `src/lib/email.ts` to use your verified domain:
   ```typescript
   from: 'Beam Team <team@yourdomain.com>',
   ```

## 2. Firebase Setup

### Creating a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create a project" or "Add project"
3. Enter your project name (e.g., "beam-waitlist")
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

### Getting Firebase Configuration

1. In your Firebase project, click on the gear icon → Project settings
2. Scroll down to "Your apps" section
3. Click on "Web" icon (</>) to add a web app
4. Register your app with a nickname (e.g., "Beam Web App")
5. Copy the configuration values to your `.env.local` file:
   - `apiKey` → `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `authDomain` → `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `projectId` → `NEXT_PUBLIC_FIREBASE_PROJECT_ID`

**Note**: You only need these 3 values for Firestore. The other config values (storageBucket, messagingSenderId, appId) are for file uploads, push notifications, and analytics which you don't need right now.

### Setting Up Firestore Database

1. In Firebase Console, go to Firestore Database
2. Click "Create database"
3. Choose "Start in test mode" (you can secure it later)
4. Select a location for your database
5. Click "Done"

### Security Rules (Optional but Recommended)

To secure your Firestore database, update the rules:

1. Go to Firestore Database → Rules
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to subscriber count for public stats
    match /waitlist_subscribers/{document} {
      allow read: if false; // No public read access to individual subscribers
      allow write: if request.auth == null; // Allow anonymous writes for signups
    }
  }
}
```

## 3. Testing

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Test the waitlist signup on your landing page

3. Check the logs to see if:
   - Email was sent successfully
   - Subscriber was added to Firebase

4. Verify in Firebase Console:
   - Go to Firestore Database
   - You should see a `waitlist_subscribers` collection with your test data

## 4. Subscriber Data Structure

Each subscriber document in Firestore contains:

```javascript
{
  email: "user@example.com",           // Required
  firstName: "John",                   // Optional
  lastName: "Doe",                     // Optional
  source: "waitlist",                  // Where they signed up
  createdAt: "2024-01-15T10:30:00Z",  // Auto-generated timestamp
  ipAddress: "192.168.1.1",           // For analytics (anonymized)
  userAgent: "Mozilla/5.0...",        // Browser info
}
```

## 5. API Endpoints

### Add Subscriber
- **POST** `/api/waitlist`
- Body: `{ email: string, firstName?: string, lastName?: string }`

### Get Stats
- **GET** `/api/subscribers/stats`
- Returns: `{ total: number, recent: number }`

## 6. Troubleshooting

### Email Issues

- **"Authentication failed"**: Check your Resend API key
- **"Domain not verified"**: Either verify your domain or use the default resend.dev domain

### Firebase Issues

- **"Firebase not initialized"**: Check your environment variables are properly set
- **"Permission denied"**: Update your Firestore security rules
- **"Collection not found"**: The collection is created automatically on first write

### General Issues

- **Environment variables not loading**: Restart your development server after adding `.env.local`
- **Build errors**: Make sure all dependencies are installed with `npm install`

## 7. Production Deployment

When deploying to production (Vercel, Netlify, etc.):

1. Add all environment variables to your hosting platform's environment settings
2. Update Firestore security rules for production
3. Consider setting up Firebase Admin SDK for server-side operations
4. Test the signup flow in production

## 8. Managing Subscribers

### Viewing Subscribers in Firebase Console

1. Go to Firestore Database in Firebase Console
2. Navigate to the `waitlist_subscribers` collection
3. View individual documents and their data

### Exporting Subscriber Data

You can export subscriber data directly from Firebase Console or create a custom admin panel.

### Analytics

Consider adding:
- Firebase Analytics for user behavior
- Custom events for conversion tracking
- Dashboard for subscriber metrics

## 9. Advanced Features

### Real-time Updates

Firebase supports real-time updates. You can add real-time subscriber count to your landing page:

```typescript
import { onSnapshot, collection } from 'firebase/firestore';

// Listen to subscriber count changes
onSnapshot(collection(db, 'waitlist_subscribers'), (snapshot) => {
  const count = snapshot.size;
  // Update UI with new count
});
```

### Batch Operations

For bulk operations, use Firebase batch writes:

```typescript
import { writeBatch, doc } from 'firebase/firestore';

const batch = writeBatch(db);
// Add multiple operations to batch
batch.commit();
```

---

For any issues, check the console logs and Firebase Console for detailed error messages. 