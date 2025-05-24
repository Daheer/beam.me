import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  serverTimestamp,
  Timestamp,
  getCountFromServer 
} from 'firebase/firestore';
import { db } from './firebase';

export interface Subscriber {
  email: string;
  source: string;
  createdAt: Timestamp;
  ipAddress: string;
  userAgent: string;
}

export interface SubscriberInput {
  email: string;
  source?: string;
  ipAddress?: string;
  userAgent?: string;
}

// Collection name
const SUBSCRIBERS_COLLECTION = 'waitlist_subscribers';

export async function addSubscriber(subscriberData: SubscriberInput) {
  try {
    const { email, source = 'waitlist', ipAddress = 'unknown', userAgent = 'unknown' } = subscriberData;

    // Check if subscriber already exists
    const existingSubscriber = await getSubscriberByEmail(email);
    
    if (existingSubscriber) {
      return {
        success: true,
        message: 'Already subscribed',
        isNew: false,
        subscriber: existingSubscriber,
      };
    }

    // Create new subscriber document - only the 4 fields you want
    const subscriberDoc: Omit<Subscriber, 'id'> = {
      email: email.toLowerCase().trim(),
      source,
      createdAt: serverTimestamp() as Timestamp,
      ipAddress,
      userAgent,
    };

    // Add to Firestore
    const docRef = await addDoc(collection(db, SUBSCRIBERS_COLLECTION), subscriberDoc);

    return {
      success: true,
      message: 'Successfully subscribed',
      isNew: true,
      subscriber: {
        id: docRef.id,
        ...subscriberDoc,
        createdAt: new Date(), // Convert for return value
      },
    };
  } catch (error: unknown) {
    console.error('Firebase subscription error:', error);
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to subscribe',
      isNew: false,
    };
  }
}

export async function getSubscriberByEmail(email: string) {
  try {
    const q = query(
      collection(db, SUBSCRIBERS_COLLECTION), 
      where('email', '==', email.toLowerCase().trim())
    );
    
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }

    const doc = querySnapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data(),
    } as Subscriber & { id: string };
  } catch (error) {
    console.error('Error getting subscriber by email:', error);
    return null;
  }
}

export async function getSubscriberCount(): Promise<number> {
  try {
    const coll = collection(db, SUBSCRIBERS_COLLECTION);
    const snapshot = await getCountFromServer(coll);
    return snapshot.data().count;
  } catch (error) {
    console.error('Error getting subscriber count:', error);
    return 0;
  }
}

export async function getAllSubscribers(limit?: number) {
  try {
    let q = query(collection(db, SUBSCRIBERS_COLLECTION));
    
    // Add limit if specified
    if (limit) {
      const { orderBy, limitToLast } = await import('firebase/firestore');
      q = query(q, orderBy('createdAt', 'desc'), limitToLast(limit));
    }
    
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as (Subscriber & { id: string })[];
  } catch (error) {
    console.error('Error getting all subscribers:', error);
    return [];
  }
}

// Utility function to get subscriber stats
export async function getSubscriberStats() {
  try {
    const totalCount = await getSubscriberCount();
    
    // Get recent signups (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recentQuery = query(
      collection(db, SUBSCRIBERS_COLLECTION),
      where('createdAt', '>=', Timestamp.fromDate(sevenDaysAgo))
    );
    
    const recentSnapshot = await getDocs(recentQuery);
    const recentCount = recentSnapshot.size;
    
    return {
      total: totalCount,
      recent: recentCount,
    };
  } catch (error) {
    console.error('Error getting subscriber stats:', error);
    return {
      total: 0,
      recent: 0,
    };
  }
} 